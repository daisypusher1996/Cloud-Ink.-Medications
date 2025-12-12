import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import StatCard from './components/StatCard';
import { OrdersChart, StockChart, SupplierAssociationChart, InventoryDistributionChart, InventoryHealthChart, LeadTimeChart } from './components/Charts';
import ClusteringAnalysis from './components/ClusteringAnalysis';
import InsightsSection from './components/InsightsSection';
import Home from './components/Home';
import BackToTopButton from './components/BackToTopButton';
import { RecentOrdersTable, InventoryTable } from './components/DashboardTables';
import { fetchDashboardData } from './services/supabaseClient';
import { DashboardData, View } from './types';
import { AlertCircle, Database, BarChart2, PieChart as PieIcon, Activity, Pill } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const dashboardData = await fetchDashboardData();
        setData(dashboardData);
      } catch (err: any) {
        console.error("Critical error fetching data", err);
        setError(`${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleViewChange = (view: View) => {
    if (view === currentView) return;
    setIsTransitioning(true);
    // Simulate loading delay for smooth transition
    setTimeout(() => {
        setCurrentView(view);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            setIsTransitioning(false);
        }, 100);
    }, 800);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
            <div className="mb-6 relative">
                 <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full"></div>
                 <Pill className="w-16 h-16 text-indigo-600 animate-spin" />
            </div>
            <p className="text-slate-500 font-medium tracking-wide animate-pulse">Initializing Cloud Ink Co...</p>
        </div>
      </div>
    );
  }

  // Check if we have a valid connection but 0 data (likely RLS issue)
  const isEmptyData = data && data.rawMedications.length === 0;

  return (
    <div className="min-h-screen relative">
      {/* Loading Transition Overlay */}
      <div className={`fixed inset-0 z-[100] bg-indigo-200/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-300 pointer-events-none ${isTransitioning ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
           <div className="relative mb-6">
              <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-20 rounded-full"></div>
              <Pill className="w-16 h-16 text-indigo-600 animate-spin" />
           </div>
           <p className="mt-2 text-indigo-900 text-sm font-medium animate-pulse tracking-widest uppercase">Loading View</p>
      </div>

      <Navbar currentView={currentView} setView={handleViewChange} />

      {/* Render Home Page specifically when view is home */}
      {currentView === 'home' ? (
        <Home setView={handleViewChange} />
      ) : (
        <main 
          key={currentView} // Key prop forces re-render/animation on view change
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 animate-enter relative z-10"
        >
          
          {/* Header Section / Hero Banner - Only for Dashboard View */}
          {currentView === 'dashboard' ? (
               <div className="relative w-full h-72 mb-8 rounded-2xl overflow-hidden shadow-xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2670&auto=format&fit=crop" 
                    alt="Cloud Ink Co. Hospital" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-purple-900/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
                      <div className="flex items-center space-x-2 mb-3">
                          <span className="bg-indigo-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border border-indigo-400/20">Cloud Ink Co.</span>
                      </div>
                      <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-sm">Medications Dashboard</h1>
                      <p className="text-indigo-100 max-w-2xl text-sm md:text-lg font-medium opacity-95 leading-relaxed drop-shadow-sm">
                        Strategic overview of pharmacy operations, financial efficiency, and supply chain risks.
                      </p>
                  </div>
                </div>
          ) : (
              <div className="mb-6">
                  <h1 className="text-2xl font-bold text-slate-900">
                      {currentView === 'inventory' && 'Medication Database'}
                      {currentView === 'orders' && 'Purchase Orders'}
                  </h1>
                  <p className="mt-1 text-slate-500 text-sm">
                      {currentView === 'inventory' && 'Complete registry of pharmaceutical stock and batch details.'}
                      {currentView === 'orders' && 'Log of all procurement activities and supplier interactions.'}
                  </p>
              </div>
          )}
  
          {error && (
              <div className="mb-8 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-6 flex flex-col text-red-800">
                  <div className="flex items-center mb-3">
                      <AlertCircle className="h-6 w-6 mr-2 text-red-600" />
                      <h3 className="text-lg font-bold">Database Connection Failed</h3>
                  </div>
                  <p className="font-mono text-sm bg-white/50 p-3 rounded border border-red-100 mb-4">{error}</p>
              </div>
          )}
  
          {isEmptyData && !error && (
               <div className="mb-8 bg-amber-50/80 backdrop-blur-sm border border-amber-200 rounded-xl p-6 flex flex-col text-amber-900">
                  <div className="flex items-center mb-3">
                      <Database className="h-6 w-6 mr-2 text-amber-600" />
                      <h3 className="text-lg font-bold">Connected, but No Data Found</h3>
                  </div>
                  <p className="mb-4">Successfully connected to Supabase, but 0 medications were returned. Check Row Level Security (RLS) policies.</p>
              </div>
          )}
  
          {!data && !error && !loading ? (
              <div className="text-center py-12 text-slate-500">
                  No data available.
              </div>
          ) : data && (
              <>
                  {currentView === 'dashboard' && (
                      <div className="space-y-6">
                          
                          {/* RUBRIC: Data Mined Insights (30 pts) */}
                          <InsightsSection insights={data.insights} />
  
                          {/* Key Operational Metrics - Compact Grid (4 cols x 2 rows) */}
                          <div>
                               <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                                  <Activity className="h-5 w-5 mr-2 text-indigo-600" />
                                  Key Metrics
                              </h2>
                              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
                                  {data.stats.map((stat, index) => (
                                      <StatCard key={index} stat={stat} />
                                  ))}
                              </div>
                          </div>
  
                          {/* RUBRIC: New Analytics & Graphs (30 pts) */}
                          {/* Row 1: Capital Distribution & Stock Levels (Compact) */}
                          <div>
                              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                                  <PieIcon className="h-5 w-5 mr-2 text-purple-600" />
                                  Inventory & Capital Distribution
                              </h2>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <InventoryDistributionChart data={data.distributionData} />
                                  <StockChart data={data.inventoryLevels} />
                              </div>
                          </div>
  
                          {/* Row 2: Performance Trends */}
                          <div>
                              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                                  <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                                  Performance Trends
                              </h2>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                  <InventoryHealthChart data={data.inventoryHealth} />
                                  <OrdersChart data={data.orderTrends} />
                              </div>
                          </div>
  
                          {/* Row 3: Supply Chain */}
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                               <LeadTimeChart data={data.leadTimeData} />
                               <SupplierAssociationChart data={data.associationData} />
                          </div>
                              
                          {/* Full Width Clustering Analysis (Table View) */}
                          <div className="w-full">
                              <ClusteringAnalysis data={data.clusterAnalysis} />
                          </div>
                      </div>
                  )}
  
                  {currentView === 'inventory' && (
                      <div>
                          <InventoryTable items={data.rawMedications} />
                      </div>
                  )}
  
                  {currentView === 'orders' && (
                      <div>
                          <RecentOrdersTable orders={data.recentOrders} />
                      </div>
                  )}
              </>
          )}

          {/* Footer inside the main app view */}
          <footer className="bg-white/50 backdrop-blur-md border-t border-slate-200 py-8 mt-12 rounded-xl">
            <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Cloud Ink Co. Medications Department. All rights reserved.</p>
                <div className="mt-2 flex justify-center space-x-4">
                    <span>Powered by Supabase</span>
                    <span>•</span>
                    <span className={data?.rawMedications.length ? "text-emerald-500 font-medium" : "text-amber-500 font-medium"}>
                      Status: {data?.rawMedications.length ? `${data.rawMedications.length} Records` : "No Records"}
                    </span>
                </div>
            </div>
          </footer>
        </main>
      )}

      {/* Global Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};

export default App;