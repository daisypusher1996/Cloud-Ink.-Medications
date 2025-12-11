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

  // Smaller compact tile design
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center justify-between text-center hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between w-full mb-2">
         <h3 className="text-slate-500 font-medium text-[10px] uppercase tracking-wider truncate">{stat.label}</h3>
         <div className={`${themeClass} p-1.5 rounded-md`}>
            <ThemeIcon className="h-3.5 w-3.5" />
         </div>
      </div>
      
      <div className="my-1">
        <div className="text-2xl font-bold text-slate-900 tracking-tight leading-none">
          {typeof stat.value === 'number' && stat.value > 1000 ? `${(stat.value / 1000).toFixed(1)}k` : stat.value}
        </div>
      </div>

      <div className="w-full mt-2">
        <span className={`block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide ${badgeClass} w-full truncate`}>
          {stat.iconName === 'activity' ? 'PHP' : (stat.change === 0 ? 'Active' : `${stat.change} Items`)}
        </span>
      </div>
    </div>
  );
};

export default StatCard;