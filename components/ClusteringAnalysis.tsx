import React from 'react';
import { Layers, TrendingUp, Minus, TrendingDown } from 'lucide-react';
import { ClusterGroup } from '../types';

interface ClusteringAnalysisProps {
  data: ClusterGroup[];
}

const ClusteringAnalysis: React.FC<ClusteringAnalysisProps> = ({ data }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'high': return <TrendingUp className="h-5 w-5 mr-2" />;
      case 'moderate': return <Minus className="h-5 w-5 mr-2" />;
      case 'low': return <TrendingDown className="h-5 w-5 mr-2" />;
      default: return <Layers className="h-5 w-5 mr-2" />;
    }
  };

  const getThemeClasses = (color: string) => {
    switch(color) {
      case 'green': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100', icon: 'text-green-600' };
      case 'blue': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', icon: 'text-blue-600' };
      case 'yellow': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', icon: 'text-amber-600' };
      default: return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-100', icon: 'text-slate-600' };
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center mb-6">
        <div className="bg-emerald-100 p-2 rounded-lg mr-3">
            <Layers className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-900">Clustering Analysis</h3>
            <p className="text-sm text-slate-500">Medication grouping based on demand patterns (Order Volume) and inventory data</p>
        </div>
      </div>

      {/* Methodology Box */}
      <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-8">
        <h4 className="text-green-800 font-semibold mb-1 text-sm">Clustering Methodology:</h4>
        <p className="text-green-700 text-sm leading-relaxed">
          Medications are automatically grouped into three clusters based on purchase order frequency and stock levels. 
          This analysis helps optimize inventory management, reduce holding costs, and prevent stockouts for critical medications.
        </p>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {data.map((group) => {
          const theme = getThemeClasses(group.color);
          return (
            <div key={group.id} className={`${theme.bg} rounded-lg p-5 border ${theme.border}`}>
              <div className={`flex items-center mb-4 font-bold ${theme.text}`}>
                {getIcon(group.id)}
                {group.label}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Medications:</span>
                  <span className="font-semibold text-slate-900">{group.stats.count}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Avg Stock:</span>
                  <span className="font-semibold text-slate-900">{group.stats.avgStock}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total Orders:</span>
                  <span className="font-semibold text-slate-900">{group.stats.totalOrders}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Sections */}
      <div className="space-y-8">
        {data.map((group) => {
           const theme = getThemeClasses(group.color);
           // Take top 5 items for display to keep it clean
           const displayItems = group.items.slice(0, 5);
           
           return (
             <div key={group.id} className="border border-slate-200 rounded-xl overflow-hidden">
                {/* Header */}
                <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center">
                    <div className={`p-1.5 rounded mr-3 ${theme.bg}`}>
                        <div className={theme.icon}>{getIcon(group.id)}</div>
                    </div>
                    <h4 className="font-bold text-slate-900">{group.label}</h4>
                </div>

                {/* Recommendation */}
                <div className={`mx-6 mt-6 p-4 rounded-lg text-sm ${theme.bg} ${theme.text} border ${theme.border}`}>
                    <span className="font-bold block mb-1">Recommendation:</span>
                    {group.recommendation}
                </div>

                {/* Table */}
                <div className="p-6 overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead>
                            <tr className="border-b border-slate-100 text-slate-400 uppercase text-xs tracking-wider">
                                <th className="text-left py-3 font-medium">Medication</th>
                                <th className="text-left py-3 font-medium">Category</th>
                                <th className="text-right py-3 font-medium">Stock Level</th>
                                <th className="text-right py-3 font-medium">Reorder Level</th>
                                <th className="text-right py-3 font-medium">Total Orders</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {displayItems.length > 0 ? (
                                displayItems.map(item => (
                                    <tr key={item.medication_id} className="hover:bg-slate-50">
                                        <td className="py-3 font-medium text-slate-900">{item.name}</td>
                                        <td className="py-3 text-slate-500">{item.category}</td>
                                        <td className="py-3 text-right text-slate-600">{item.stock}</td>
                                        <td className="py-3 text-right text-slate-500">{item.reorderLevel}</td>
                                        <td className="py-3 text-right">
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${theme.bg} ${theme.text}`}>
                                                {item.totalOrders}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="py-4 text-center text-slate-400 italic">No medications in this cluster</td></tr>
                            )}
                        </tbody>
                    </table>
                    {group.items.length > 5 && (
                        <div className="mt-4 text-center text-xs text-slate-400">
                            Showing top 5 of {group.items.length} medications
                        </div>
                    )}
                </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default ClusteringAnalysis;