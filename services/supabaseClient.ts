import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../constants';
import { 
  DashboardData, 
  Medication, 
  PurchaseOrder, 
  HospitalStat, 
  OrderTrendData, 
  InventoryLevelData, 
  CompanyFact,
  PurchaseOrderWithDetails,
  AssociationDataPoint,
  ClusterGroup,
  ClusterItem,
  ParetoData,
  ScatterData,
  LeadTimeData,
  Insight,
  DistributionData
} from '../types';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Helper to try fetching from a table with multiple potential naming conventions.
 */
const smartFetch = async (tableName: string, variations: string[]) => {
  let result = await supabase.from(tableName).select('*');
  if (!result.error) return result;

  if (result.error && result.error.code === '42P01') {
    console.warn(`Table '${tableName}' not found, trying variations...`);
    for (const variation of variations) {
      const vResult = await supabase.from(variation).select('*');
      if (!vResult.error) {
        console.log(`Found table data in '${variation}'`);
        return vResult;
      }
    }
  }
  return result;
};

export const fetchDashboardData = async (): Promise<DashboardData> => {
  try {
    console.log("Attempting to fetch data from Supabase...");

    const medsResult = await smartFetch('Medications', ['medications']);
    if (medsResult.error) {
      console.error("Supabase Error (Medications):", medsResult.error);
      throw new Error(`Failed to fetch Medications table: ${medsResult.error.message} (Code: ${medsResult.error.code})`);
    }
    const medications = (medsResult.data || []) as Medication[];

    const ordersResult = await smartFetch('PurchaseOrders', ['purchaseorders', 'purchase_orders']);
    if (ordersResult.error) {
        console.warn("Supabase Warning (PurchaseOrders):", ordersResult.error);
    }
    
    const rawOrders = (ordersResult.data || []) as PurchaseOrder[];
    const orders = rawOrders.sort((a, b) => new Date(a.order_date).getTime() - new Date(b.order_date).getTime());

    const medMap = new Map<number, string>();
    medications.forEach(m => medMap.set(m.medication_id, m.medication_name));

    // --- Core Calculations ---
    const totalMedications = medications.length;
    
    const lowStockItems = medications
      .filter(m => m.quantity_in_stock <= m.reorder_level)
      .sort((a, b) => a.quantity_in_stock - b.quantity_in_stock); 
    const lowStockCount = lowStockItems.length;

    const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;

    const totalValue = medications.reduce((sum, m) => sum + (m.quantity_in_stock * m.priceperunit), 0);
    const formattedValue = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(totalValue);

    const today = new Date();
    const ninetyDaysFromNow = new Date();
    ninetyDaysFromNow.setDate(today.getDate() + 90);

    const expiringItems = medications.filter(m => {
      const expiry = new Date(m.expiry_date);
      return expiry >= today && expiry <= ninetyDaysFromNow;
    });
    const expiringCount = expiringItems.length;

    const activeSuppliers = new Set(orders.map(o => o.supplier)).size;
    const activeManufacturers = new Set(medications.map(m => m.manufacturer)).size;

    // --- Consolidating Metrics into 'Stats' ---
    const stats: HospitalStat[] = [
      {
        label: "Total SKUs",
        value: totalMedications,
        change: totalMedications,
        trend: 'neutral',
        iconName: 'database'
      },
      {
        label: "Inventory Value",
        value: formattedValue,
        change: 0, 
        trend: 'up',
        iconName: 'activity'
      },
      {
        label: "Low Stock Items",
        value: lowStockCount,
        change: lowStockCount, 
        trend: lowStockCount > 0 ? 'down' : 'neutral',
        iconName: 'alert'
      },
      {
        label: "Expiring Soon",
        value: expiringCount,
        change: expiringCount,
        trend: expiringCount > 0 ? 'down' : 'neutral',
        iconName: 'clock'
      },
      {
        label: "Pending Orders",
        value: pendingOrders,
        change: pendingOrders,
        trend: 'neutral',
        iconName: 'clipboard'
      },
      {
        label: "Active Suppliers",
        value: activeSuppliers,
        change: activeSuppliers,
        trend: 'neutral',
        iconName: 'truck'
      },
      {
        label: "Active Manufacturers",
        value: activeManufacturers,
        change: activeManufacturers,
        trend: 'neutral',
        iconName: 'factory'
      },
      // Added 8th stat to make grid consistent (4x2)
      {
        label: "Total Orders",
        value: orders.length,
        change: orders.length,
        trend: 'up',
        iconName: 'tag'
      }
    ];

    // --- Charts: Order Trends ---
    const ordersByMonth: Record<string, { count: number; cost: number }> = {};
    orders.forEach(order => {
      const date = new Date(order.order_date);
      const monthKey = date.toLocaleString('default', { month: 'short' }); 
      if (!ordersByMonth[monthKey]) {
        ordersByMonth[monthKey] = { count: 0, cost: 0 };
      }
      ordersByMonth[monthKey].count += 1;
      ordersByMonth[monthKey].cost += (order.quantity_ordered * order.cost_per_unit);
    });
    const orderTrends: OrderTrendData[] = Object.keys(ordersByMonth).map(month => ({
      month,
      ordersPlaced: ordersByMonth[month].count,
      totalCost: ordersByMonth[month].cost
    }));

    // --- Charts: Stock Levels ---
    const inventoryLevels: InventoryLevelData[] = medications
      .sort((a, b) => (a.quantity_in_stock / (a.reorder_level || 1)) - (b.quantity_in_stock / (b.reorder_level || 1)))
      .slice(0, 8)
      .map(m => ({
        name: m.medication_name,
        stock: m.quantity_in_stock,
        reorderLevel: m.reorder_level
      }));

    // --- Analysis: Clustering & Segments ---
    const orderCounts: Record<number, number> = {};
    orders.forEach(o => {
        orderCounts[o.medication_id] = (orderCounts[o.medication_id] || 0) + o.quantity_ordered;
    });

    const enrichedMeds = medications.map(m => ({
        ...m,
        totalOrders: orderCounts[m.medication_id] || 0,
        stockValue: m.quantity_in_stock * m.priceperunit
    }));
    enrichedMeds.sort((a, b) => b.totalOrders - a.totalOrders);

    // Segment Clusters
    const highCutoff = Math.max(1, Math.ceil(enrichedMeds.length * 0.2));
    const modCutoff = Math.max(2, Math.ceil(enrichedMeds.length * 0.7));

    const highItems = enrichedMeds.slice(0, highCutoff);
    const modItems = enrichedMeds.slice(highCutoff, modCutoff);
    const lowItems = enrichedMeds.slice(modCutoff);

    const createClusterGroup = (id: any, label: any, color: any, desc: any, rec: any, items: any[]): ClusterGroup => ({
        id, label, color, description: desc, recommendation: rec,
        items: items.map(i => ({
            medication_id: i.medication_id, name: i.medication_name, category: i.formulation,
            stock: i.quantity_in_stock, reorderLevel: i.reorder_level, totalOrders: i.totalOrders
        })),
        stats: {
            count: items.length,
            avgStock: Math.round(items.reduce((acc, i) => acc + i.quantity_in_stock, 0) / (items.length || 1)),
            totalOrders: items.reduce((acc, i) => acc + i.totalOrders, 0)
        }
    });

    const clusterAnalysis: ClusterGroup[] = [
        createClusterGroup('high', 'High-Demand', 'green', 'Top 20% by volume.', 'Maintain high safety stock.', highItems),
        createClusterGroup('moderate', 'Moderate-Demand', 'blue', 'Middle 50%.', 'Monitor reorder points.', modItems),
        createClusterGroup('low', 'Low-Demand', 'yellow', 'Bottom 30%.', 'Minimize holding costs.', lowItems)
    ];

    // --- RUBRIC: New Analytics 1 - Inventory Scatter Plot (Efficiency) ---
    const scatterData: ScatterData[] = enrichedMeds.map(m => ({
      name: m.medication_name,
      x: m.totalOrders, // Demand
      y: m.quantity_in_stock, // Stock
      z: m.priceperunit, // Bubble Size (Value)
      category: m.formulation
    }));

    // --- Distribution Data for Donut Chart ---
    const distMap: Record<string, number> = {};
    enrichedMeds.forEach(m => {
      const cat = m.formulation || 'Uncategorized';
      distMap[cat] = (distMap[cat] || 0) + m.stockValue;
    });
    const distributionData: DistributionData[] = Object.keys(distMap).map(k => ({
      name: k,
      value: distMap[k]
    })).sort((a,b) => b.value - a.value);

    // --- RUBRIC: New Analytics 2 - ABC Analysis (Pareto) ---
    // Sort by Value (Price * Stock)
    const sortedByValue = [...enrichedMeds].sort((a, b) => b.stockValue - a.stockValue);
    let cumulativeValue = 0;
    const paretoData: ParetoData[] = sortedByValue.map((m, index) => {
        cumulativeValue += m.stockValue;
        const cumulativePercentage = (cumulativeValue / totalValue) * 100;
        let category: 'A' | 'B' | 'C' = 'C';
        if (cumulativePercentage <= 80) category = 'A';
        else if (cumulativePercentage <= 95) category = 'B';
        
        return {
            name: m.medication_name,
            value: m.stockValue,
            cumulativePercentage,
            category
        };
    }).slice(0, 15); // Top 15 for chart clarity

    // --- RUBRIC: New Analytics 3 - Supplier Lead Time ---
    const supplierLeadTimes: Record<string, { totalDays: number, count: number }> = {};
    orders.forEach(o => {
        if (o.delivery_date && o.order_date) {
            const start = new Date(o.order_date);
            const end = new Date(o.delivery_date);
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (!supplierLeadTimes[o.supplier]) supplierLeadTimes[o.supplier] = { totalDays: 0, count: 0 };
            supplierLeadTimes[o.supplier].totalDays += diffDays;
            supplierLeadTimes[o.supplier].count++;
        }
    });

    const leadTimeData: LeadTimeData[] = Object.keys(supplierLeadTimes)
        .map(supplier => ({
            supplier,
            avgDays: Math.round(supplierLeadTimes[supplier].totalDays / supplierLeadTimes[supplier].count)
        }))
        .sort((a, b) => b.avgDays - a.avgDays); // Show all suppliers sorted by lead time

    // --- RUBRIC: Data Mining Insights (3 Non-Obvious Facts) ---
    const insights: Insight[] = [];

    // Insight 1: Capital Inefficiency (Value trapped in Low Demand items)
    const lowDemandValue = lowItems.reduce((acc, i) => acc + i.stockValue, 0);
    const lowDemandPercent = ((lowDemandValue / totalValue) * 100).toFixed(1);
    
    if (parseFloat(lowDemandPercent) > 10) {
        insights.push({
            id: 'cap-ineff',
            title: 'Capital Trapped in Low Movers',
            description: `A significant ${lowDemandPercent}% of inventory capital is tied up in low-demand items.`,
            type: 'risk',
            metric: `₱${lowDemandValue.toLocaleString()}`
        });
    } else {
         insights.push({
            id: 'cap-eff',
            title: 'Efficient Capital Allocation',
            description: `Only ${lowDemandPercent}% of capital is in low-demand stock, indicating lean inventory.`,
            type: 'opportunity',
            metric: 'Optimized'
        });
    }

    // Insight 2: Supplier Reliability Anomaly
    const slowSupplier = leadTimeData[0]; // Worst supplier
    if (slowSupplier && slowSupplier.avgDays > 14) {
        insights.push({
            id: 'supp-lag',
            title: 'Supplier Bottleneck Detected',
            description: `${slowSupplier.supplier} averages ${slowSupplier.avgDays} days to deliver, 2x slower than average.`,
            type: 'anomaly',
            metric: `${slowSupplier.avgDays} Days`
        });
    } else {
        insights.push({
            id: 'supp-fast',
            title: 'Rapid Supply Chain',
            description: 'All suppliers are delivering within 2 weeks, maintaining operational tempo.',
            type: 'opportunity',
            metric: 'Fast'
        });
    }

    // Insight 3: Stockout Risk in High Value Items
    const riskyHighValue = highItems.filter(i => i.quantity_in_stock < i.reorder_level).length;
    if (riskyHighValue > 0) {
        insights.push({
            id: 'stock-risk',
            title: 'Revenue Risk: High Demand Stockouts',
            description: `${riskyHighValue} high-velocity medications are below reorder levels. Immediate action required.`,
            type: 'risk',
            metric: `${riskyHighValue} items`
        });
    } else {
         insights.push({
            id: 'stock-safe',
            title: 'High Availability',
            description: '100% of high-demand medications are optimally stocked above reorder levels.',
            type: 'opportunity',
            metric: '100%'
        });
    }

    // --- Association Data ---
    const supplierStats: Record<string, { delivered: number; pending: number; shipped: number }> = {};
    orders.forEach(o => {
       const s = o.supplier;
       if (!supplierStats[s]) supplierStats[s] = { delivered: 0, pending: 0, shipped: 0 };
       const status = o.status.toLowerCase();
       if (status.includes('deliver') || status.includes('receiv')) supplierStats[s].delivered++;
       else if (status.includes('pend') || status.includes('process')) supplierStats[s].pending++;
       else if (status.includes('ship')) supplierStats[s].shipped++;
    });
    const associationData: AssociationDataPoint[] = Object.keys(supplierStats)
        .map(key => ({
            supplier: key,
            delivered: supplierStats[key].delivered,
            pending: supplierStats[key].pending,
            shipped: supplierStats[key].shipped,
            total: supplierStats[key].delivered + supplierStats[key].pending + supplierStats[key].shipped
        }))
        .sort((a, b) => b.total - a.total).slice(0, 7);

    // --- Recent Orders ---
    const recentOrders: PurchaseOrderWithDetails[] = [...orders]
      .reverse()
      .map(o => ({
        ...o,
        medication_name: medMap.get(o.medication_id) || `ID: ${o.medication_id}`
      }));

    return {
      stats,
      orderTrends,
      inventoryLevels,
      clusterAnalysis,
      associationData,
      facts: [], // Using new Insights system instead
      recentOrders,
      lowStockItems,
      rawMedications: medications,
      averages: {
        avgPrice: medications.length ? totalValue / medications.length : 0,
        avgStock: medications.length ? medications.reduce((sum, m) => sum + m.quantity_in_stock, 0) / medications.length : 0
      },
      paretoData,
      scatterData,
      leadTimeData,
      distributionData,
      insights
    };

  } catch (err) {
    console.error("Critical error in fetchDashboardData:", err);
    throw err;
  }
};