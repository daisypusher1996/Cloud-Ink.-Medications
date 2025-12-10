import React from 'react';
import { Users, Activity, Bed, Clock, Pill, ClipboardList, Database, AlertTriangle, Truck, Tag, Factory } from 'lucide-react';
import { HospitalStat } from '../types';

interface StatCardProps {
  stat: HospitalStat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  let ThemeIcon = Activity;
  let themeClass = "bg-blue-100 text-blue-600"; 
  let badgeClass = "bg-blue-50 text-blue-700";

  switch (stat.iconName) {
    case 'users': 
      ThemeIcon = Users; 
      themeClass = "bg-blue-100 text-blue-600";
      break;
    case 'activity': 
      ThemeIcon = Activity; 
      themeClass = "bg-emerald-100 text-emerald-600";
      break;
    case 'bed': 
      ThemeIcon = Bed; 
      themeClass = "bg-indigo-100 text-indigo-600";
      break;
    case 'clock': 
      ThemeIcon = Clock; 
      themeClass = "bg-amber-100 text-amber-600";
      badgeClass = "bg-amber-50 text-amber-700";
      break;
    case 'pill': 
      ThemeIcon = Pill; 
      themeClass = "bg-blue-100 text-blue-600";
      break;
    case 'clipboard': 
      ThemeIcon = ClipboardList; 
      themeClass = "bg-green-100 text-green-600";
      badgeClass = "bg-green-50 text-green-700";
      break;
    case 'database': 
      ThemeIcon = Database; 
      themeClass = "bg-indigo-100 text-indigo-600";
      break;
    case 'alert': 
      ThemeIcon = AlertTriangle; 
      themeClass = "bg-red-100 text-red-600";
      badgeClass = "bg-red-50 text-red-700";
      break;
    case 'truck': 
      ThemeIcon = Truck; 
      themeClass = "bg-purple-100 text-purple-600";
      badgeClass = "bg-purple-50 text-purple-700";
      break;
    case 'tag': 
      ThemeIcon = Tag; 
      themeClass = "bg-orange-100 text-orange-600";
      badgeClass = "bg-orange-50 text-orange-700";
      break;
    case 'factory': 
      ThemeIcon = Factory; 
      themeClass = "bg-slate-200 text-slate-700"; 
      badgeClass = "bg-slate-100 text-slate-700";
      break;
    default: 
      ThemeIcon = Activity;
  }

  const badgeText = stat.change !== 0 
    ? `${stat.change}`
    : `-`;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow aspect-square h-full">
      <div className="flex justify-between items-start">
         <h3 className="text-slate-500 font-medium text-xs uppercase tracking-wider leading-tight flex-1 mr-2">{stat.label}</h3>
         <div className={`${themeClass} p-2 rounded-lg flex-shrink-0`}>
            <ThemeIcon className="h-4 w-4" />
         </div>
      </div>
      
      <div className="mt-2 mb-1">
        <div className="text-3xl font-bold text-slate-900 tracking-tight leading-none">
          {typeof stat.value === 'number' && stat.value > 1000 ? `${(stat.value / 1000).toFixed(1)}k` : stat.value}
        </div>
      </div>

      <div className="mt-auto pt-2">
        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${badgeClass} w-full text-center truncate`}>
          {stat.iconName === 'activity' ? 'PHP' : (stat.change === 0 ? 'Active' : `${stat.change} Items`)}
        </span>
      </div>
    </div>
  );
};

export default StatCard;