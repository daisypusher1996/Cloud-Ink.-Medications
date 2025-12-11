
import React from 'react';
import { Menu, Pill, LayoutDashboard, Database, FileText, Home } from 'lucide-react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const getLinkClass = (view: View) => {
    const baseClass = "px-3 py-2 rounded-md text-sm font-medium transition-all duration-150 cursor-pointer flex items-center active:scale-95";
    return currentView === view 
      ? `${baseClass} bg-indigo-600 text-white shadow-lg shadow-indigo-500/30` 
      : `${baseClass} text-slate-300 hover:text-white hover:bg-slate-800`;
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center cursor-pointer active:scale-95 transition-transform" onClick={() => setView('home')}>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg mr-2 shadow-lg shadow-indigo-500/20">
                 <Pill className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="block text-xl font-bold text-white tracking-tight">Cloud Ink Co.</span>
                <span className="block text-xs text-indigo-400 uppercase tracking-wider font-semibold">Medications Dept.</span>
              </div>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:items-center space-x-2">
              <button onClick={() => setView('home')} className={getLinkClass('home')}>
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
              <div className="h-6 w-px bg-slate-700 mx-2"></div>
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
            <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none active:scale-95 transition-transform">
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu (simplified) */}
      <div className="sm:hidden border-t border-slate-800 bg-slate-900">
         <div className="grid grid-cols-4 gap-1 p-2">
             <button onClick={() => setView('home')} className={`text-xs py-2 text-center rounded active:scale-95 transition-transform ${currentView === 'home' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>Home</button>
             <button onClick={() => setView('dashboard')} className={`text-xs py-2 text-center rounded active:scale-95 transition-transform ${currentView === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>Dashboard</button>
             <button onClick={() => setView('inventory')} className={`text-xs py-2 text-center rounded active:scale-95 transition-transform ${currentView === 'inventory' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>Inventory</button>
             <button onClick={() => setView('orders')} className={`text-xs py-2 text-center rounded active:scale-95 transition-transform ${currentView === 'orders' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>Orders</button>
         </div>
      </div>
    </nav>
  );
};

export default Navbar;
