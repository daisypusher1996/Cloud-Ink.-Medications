

export type View = 'dashboard' | 'inventory' | 'orders';

export interface Medication {
  medication_id: number;
  medication_name: string;
  generic_name: string;
  manufacturer: string;
  dosage: string;
  formulation: string;
  description: string;
  priceperunit: number;
  batch_number: string;
  expiry_date: string;
  quantity_in_stock: number;
  reorder_level: number;
}

export interface PurchaseOrder {
  purchase_order_id: number;
  supplier: string;
  order_date: string;
  delivery_date: string | null;
  status: string;
  medication_id: number;
  quantity_ordered: number;
  cost_per_unit: number;
}

export interface PurchaseOrderWithDetails extends PurchaseOrder {
  medication_name?: string;
}

export interface HospitalStat {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  iconName: 'users' | 'activity' | 'bed' | 'clock' | 'pill' | 'clipboard' | 'database' | 'alert' | 'truck' | 'tag' | 'factory';
}

export interface OrderTrendData {
  month: string;
  ordersPlaced: number;
  totalCost: number;
}

export interface InventoryLevelData {
  name: string;
  stock: number;
  reorderLevel: number;
}

export interface CompanyFact {
  title: string;
  value: string | number;
  description: string;
  isAlert?: boolean;
}

export interface AssociationDataPoint {
  supplier: string;
  delivered: number;
  pending: number;
  shipped: number;
  total: number;
}

// Clustering Analysis Types
export interface ClusterItem {
  medication_id: number;
  name: string;
  category: string;
  stock: number;
  reorderLevel: number;
  totalOrders: number;
}

export interface ClusterGroup {
  id: 'high' | 'moderate' | 'low';
  label: string;
  color: 'green' | 'blue' | 'yellow';
  description: string;
  recommendation: string;
  items: ClusterItem[];
  stats: {
    count: number;
    avgStock: number;
    totalOrders: number;
  };
}

// Rubric: New Analytics Types
export interface ParetoData {
  name: string;
  value: number; // Stock Value
  cumulativePercentage: number;
  category: 'A' | 'B' | 'C'; // A=Top 80% value, B=Next 15%, C=Bottom 5%
}

export interface ScatterData {
  name: string;
  x: number; // Demand (Total Orders)
  y: number; // Stock Level
  z: number; // Value (Bubble size)
  category: string;
}

export interface LeadTimeData {
  supplier: string;
  avgDays: number;
}

export interface DistributionData {
  name: string;
  value: number;
}

// Rubric: Data Mined Insight Type
export interface Insight {
  id: string;
  title: string;
  description: string;
  type: 'risk' | 'opportunity' | 'anomaly';
  metric: string;
}

// Rubric: Strategic Plan Type
export interface StrategicPlan {
  severity: 'Critical' | 'Moderate' | 'Low';
  problem: string;
  evidence: string;
  steps: string[];
}

export interface DashboardData {
  stats: HospitalStat[];
  orderTrends: OrderTrendData[];
  inventoryLevels: InventoryLevelData[];
  clusterAnalysis: ClusterGroup[];
  associationData: AssociationDataPoint[];
  facts: CompanyFact[];
  recentOrders: PurchaseOrderWithDetails[];
  lowStockItems: Medication[];
  rawMedications: Medication[];
  averages: {
    avgPrice: number;
    avgStock: number;
  };
  // New Rubric Data
  paretoData: ParetoData[];
  scatterData: ScatterData[];
  leadTimeData: LeadTimeData[];
  distributionData: DistributionData[];
  insights: Insight[];
}