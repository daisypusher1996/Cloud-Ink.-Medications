
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  ComposedChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ReferenceLine
} from 'recharts';
import { DashboardData } from '../types';

// Distinct Color Palette matching the reference image for the Pie Chart
const COLORS = [
  '#2563eb', // Blue (Tablet)
  '#9333ea', // Purple (Syrup)
  '#06b6d4', // Cyan/Teal (Ointment)
  '#ef4444', // Red (Injection)
  '#d97706', // Amber/Orange (Inhaler)
  '#10b981', // Emerald Green (Cream)
  '#ec4899', // Pink (Capsule)
  '#8b5cf6', // Violet
  '#f59e0b', // Yellow
];

export const OrdersChart: React.FC<{ data: DashboardData['orderTrends'] }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
           <h3 className="text-lg font-semibold text-slate-900">Purchase Order Volume</h3>
           <p className="text-sm text-slate-500">Monthly spend vs order count</p>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value: number) => [`₱${value.toLocaleString()}`, 'Total Cost']} />
            <Area type="monotone" dataKey="totalCost" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" name="Order Cost (₱)" />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const StockChart: React.FC<{ data: DashboardData['inventoryLevels'] }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
      <div className="flex items-center justify-between mb-6">
         <div>
            <h3 className="text-lg font-semibold text-slate-900">Critical Stock Levels</h3>
            <p className="text-sm text-slate-500">Items closest to reorder point</p>
         </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" width={100} tick={{fill: '#475569', fontSize: 11, fontWeight: 500}} axisLine={false} tickLine={false} />
            <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            <Legend />
            {/* Restored Green Bar Color */}
            <Bar dataKey="stock" name="Current Stock" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
            <Line dataKey="reorderLevel" name="Reorder Point" stroke="#ef4444" strokeWidth={2} type="monotone" dot={{r: 4}} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const SupplierAssociationChart: React.FC<{ data: DashboardData['associationData'] }> = ({ data }) => {
  // Dynamic height: 40px per item to allow breathing room, minimum 320px
  const chartHeight = Math.max(data.length * 40, 320);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
         <div>
            <h3 className="text-lg font-semibold text-slate-900">Supplier Rules</h3>
            <p className="text-sm text-slate-500">Order Outcome by Supplier (Complete List)</p>
         </div>
      </div>
      {/* Scrollable Container */}
      <div className="h-80 w-full overflow-y-auto pr-2 custom-scrollbar relative">
        <div style={{ height: `${chartHeight}px` }}>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }} barSize={16}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="supplier" type="category" width={100} tick={{fill: '#475569', fontSize: 11, fontWeight: 500}} interval={0} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '10px' }}/>
                <Bar dataKey="delivered" stackId="a" fill="#10b981" name="Delivered" radius={[0,0,0,0]} />
                <Bar dataKey="shipped" stackId="a" fill="#3b82f6" name="Shipped" radius={[0,0,0,0]} />
                <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" radius={[0,4,4,0]} />
            </BarChart>
            </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- NEW RUBRIC CHART 1: Inventory Distribution (Pie Chart) ---
export const InventoryDistributionChart: React.FC<{ data: DashboardData['distributionData'] }> = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
             <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">Capital Allocation</h3>
                    <p className="text-sm text-slate-500">Inventory Value by Category</p>
                </div>
            </div>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `₱${value.toLocaleString()}`} contentStyle={{ borderRadius: '8px' }} />
                        <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// --- NEW RUBRIC CHART 2: Pareto Chart (ABC Analysis) ---
export const ParetoChart: React.FC<{ data: DashboardData['paretoData'] }> = ({ data }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full">
             <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">ABC Analysis (Pareto)</h3>
                    <p className="text-sm text-slate-500">Value Concentration (80/20 Rule)</p>
                </div>
            </div>
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={data}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" scale="band" hide />
                        <YAxis yAxisId="left" label={{ value: 'Value (₱)', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Cum. %', angle: 90, position: 'insideRight' }} />
                        <Tooltip formatter={(value: number, name: string) => [name === 'Stock Value ($)' ? `₱${value.toLocaleString()}` : value, name === 'Stock Value ($)' ? 'Stock Value (₱)' : name]} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="value" barSize={20} fill="#8884d8" name="Stock Value (₱)" />
                        <Line yAxisId="right" type="monotone" dataKey="cumulativePercentage" stroke="#ff7300" name="Cumulative %" dot={false} strokeWidth={2} />
                        <ReferenceLine yAxisId="right" y={80} label="80% Cutoff" stroke="red" strokeDasharray="3 3" />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

// --- NEW RUBRIC CHART 3: Lead Time Chart (Scrollable) ---
export const LeadTimeChart: React.FC<{ data: DashboardData['leadTimeData'] }> = ({ data }) => {
    // Dynamic height: 40px per item to allow breathing room, minimum 320px to fill space if few items
    const chartHeight = Math.max(data.length * 40, 320);

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-full flex flex-col">
             <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">Supplier Lead Times</h3>
                    <p className="text-sm text-slate-500">Avg days to delivery (All Suppliers)</p>
                </div>
            </div>
            {/* Scrollable Container */}
            <div className="h-80 w-full overflow-y-auto pr-2 custom-scrollbar relative">
                <div style={{ height: `${chartHeight}px` }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ left: 0, right: 10, top: 0, bottom: 0 }}>
                             <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                             <XAxis type="number" hide />
                             <YAxis 
                                dataKey="supplier" 
                                type="category" 
                                width={100} 
                                tick={{fontSize: 11, fill: '#475569'}} 
                                interval={0} 
                             />
                             <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                             <Bar dataKey="avgDays" fill="#8884d8" radius={[0, 4, 4, 0]} name="Avg Days" barSize={12}>
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.avgDays > 14 ? '#ff4d4f' : '#8884d8'} />
                                ))}
                             </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
