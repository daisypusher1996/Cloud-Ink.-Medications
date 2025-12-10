
import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { Insight } from '../types';

interface InsightsSectionProps {
  insights: Insight[];
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ insights }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {insights.map((insight) => {
        let bgClass = 'bg-white';
        let icon = <Info className="h-6 w-6 text-blue-500" />;
        let borderClass = 'border-l-4 border-blue-500';

        if (insight.type === 'risk') {
          bgClass = 'bg-red-50';
          icon = <AlertTriangle className="h-6 w-6 text-red-600" />;
          borderClass = 'border-l-4 border-red-500';
        } else if (insight.type === 'opportunity') {
          bgClass = 'bg-emerald-50';
          icon = <TrendingUp className="h-6 w-6 text-emerald-600" />;
          borderClass = 'border-l-4 border-emerald-500';
        } else if (insight.type === 'anomaly') {
            bgClass = 'bg-amber-50';
            icon = <Lightbulb className="h-6 w-6 text-amber-600" />;
            borderClass = 'border-l-4 border-amber-500';
        }

        return (
          <div key={insight.id} className={`${bgClass} rounded-xl shadow-sm p-6 border border-slate-100 ${borderClass} transition-transform hover:-translate-y-1`}>
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                    {icon}
                </div>
                <span className="text-2xl font-bold text-slate-900">{insight.metric}</span>
             </div>
             <h4 className="font-bold text-slate-800 mb-2 text-sm uppercase tracking-wide opacity-80">{insight.title}</h4>
             <p className="text-sm text-slate-600 leading-relaxed">
                {insight.description}
             </p>
          </div>
        );
      })}
    </div>
  );
};

export default InsightsSection;
