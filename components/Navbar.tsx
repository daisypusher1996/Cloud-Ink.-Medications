import React from 'react';
import { Menu, Pill, LayoutDashboard, Database, FileText } from 'lucide-react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const getLinkClass = (view: View) => {
    const baseClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 cursor-pointer flex items-center";
    return currentView === view 
      ? `${baseClass} bg-blue-50 text-blue-700` 
      : `${baseClass} text-slate-600 hover:text-slate-900 hover:bg-slate-50`;
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setView('dashboard')}>
              <div className="bg-blue-600 p-2 rounded-lg mr-2">
                 <Pill className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block text-xl font-bold text-slate-900 tracking-tight">Cloud Ink Co.</span>
                <span className="block text-xs text-slate-500 uppercase tracking-wider font-semibold">Medications Dept.</span>
              </div>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:items-center space-x-4">
              <button onClick={() => setView('dashboard')} className={getLinkClass('dashboard')}>
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </button>
              <button onClick={() => setView('inventory')} className={getLinkClass('inventory')}>
                <Database className="w-4 h-4 mr-2" />
                Medication Database
              </button>
              <button onClick={() => setView('orders')} className={getLinkClass('orders')}>
                <FileText className="w-4 h-4 mr-2" />
                Purchase Orders
              </button>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none">
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu (simplified) */}
      <div className="sm:hidden border-t border-slate-100 bg-slate-50">
         <div className="grid grid-cols-3 gap-1 p-2">
             <button onClick={() => setView('dashboard')} className={`text-xs py-2 text-center rounded ${currentView === 'dashboard' ? 'bg-white shadow-sm font-bold text-blue-600' : 'text-slate-500'}`}>Dashboard</button>
             <button onClick={() => setView('inventory')} className={`text-xs py-2 text-center rounded ${currentView === 'inventory' ? 'bg-white shadow-sm font-bold text-blue-600' : 'text-slate-500'}`}>Inventory</button>
             <button onClick={() => setView('orders')} className={`text-xs py-2 text-center rounded ${currentView === 'orders' ? 'bg-white shadow-sm font-bold text-blue-600' : 'text-slate-500'}`}>Orders</button>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;