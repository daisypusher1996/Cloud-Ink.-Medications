
import React from 'react';
import { Target, Search, ArrowRight, CheckSquare } from 'lucide-react';
import { StrategicPlan } from '../types';

interface StrategicActionPlanProps {
  plan: StrategicPlan;
}

const StrategicActionPlan: React.FC<StrategicActionPlanProps> = ({ plan }) => {
  const severityColor = plan.severity === 'Critical' ? 'bg-red-100 text-red-800' : (plan.severity === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800');

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden mb-10">
       <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center text-white">
             <Target className="h-5 w-5 mr-3 text-blue-400" />
             <h2 className="text-lg font-bold tracking-wide">Strategic Decision Plan</h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${severityColor}`}>
             Severity: {plan.severity}
          </span>
       </div>
       
       <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Problem Definition */}
           <div className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                 <Search className="h-4 w-4 mr-2" />
                 Identified Problem
              </h3>
              <p className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                 {plan.problem}
              </p>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-600 italic">
                 "{plan.evidence}"
              </div>
           </div>

           {/* Action Steps */}
           <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                 <CheckSquare className="h-4 w-4 mr-2" />
                 Recommended Action Steps
              </h3>
              <div className="space-y-4">
                 {plan.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                       <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm mr-4">
                          {index + 1}
                       </div>
                       <div className="pt-1.5 bg-white border-b border-slate-100 w-full pb-4">
                          <p className="text-slate-800 font-medium">{step}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
       </div>
    </div>
  );
};

export default StrategicActionPlan;
