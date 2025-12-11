import React from 'react';
import { ArrowRight, Activity, ShieldCheck, Zap, Send, PhoneCall, MessageSquareText, Pill } from 'lucide-react';
import { View } from '../types';

interface HomeProps {
  setView: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ setView }) => {
  return (
    <div className="flex flex-col min-h-screen animate-enter">
      
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-sm mb-8 animate-pulse">
            <span className="flex h-2 w-2 rounded-full bg-indigo-400 mr-2"></span>
            <span className="text-sm font-medium text-indigo-100">Next-Gen Hospital Management</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Advanced Analytics for <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Modern Pharmacy Operations
            </span>
          </h1>
          
          <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
            Cloud Ink Co. empowers healthcare providers with real-time inventory tracking, 
            predictive supply chain insights, and financial efficiency models.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setView('dashboard')}
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 active:scale-95 transform"
            >
              Access Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a 
              href="#support"
              className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-base font-medium rounded-xl text-white bg-slate-800/50 hover:bg-slate-800 backdrop-blur-sm transition-all duration-200 active:scale-95 transform"
            >
              Contact Support
            </a>
          </div>
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Features Grid - Removed bg-slate-50 to let body pattern show */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Capabilities</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Precision Medicine Meets Precision Data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Activity className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Tracking</h3>
              <p className="text-slate-500 leading-relaxed">
                Monitor stock levels, expiration dates, and batch numbers instantly with our Supabase-integrated live database.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Compliance & Safety</h3>
              <p className="text-slate-500 leading-relaxed">
                Automated alerts for low stock and expiring items ensure you never compromise on patient safety or regulatory standards.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Predictive Analytics</h3>
              <p className="text-slate-500 leading-relaxed">
                Utilize clustering analysis and ABC pareto charts to optimize capital allocation and reduce waste.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Get Support Section (Dark Theme) */}
      <div id="support" className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">Get Support</h2>
            <p className="mt-4 text-xl text-slate-400">
              Our technical support team is here to help with any questions or issues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Phone Support Card */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 flex flex-col items-center text-center hover:bg-slate-800 transition-all duration-300 group cursor-pointer active:scale-95">
              <div className="h-16 w-16 rounded-2xl bg-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-indigo-900/20 group-hover:scale-105 transition-transform">
                <PhoneCall className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Phone Support</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Get immediate help from our support specialists
              </p>
              <a href="tel:1-800-HEALTH" className="text-indigo-400 font-bold hover:text-indigo-300 text-lg mt-auto transition-colors">
                1-800-HEALTH
              </a>
            </div>

            {/* Email Support Card */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 flex flex-col items-center text-center hover:bg-slate-800 transition-all duration-300 group cursor-pointer active:scale-95">
              <div className="h-16 w-16 rounded-2xl bg-violet-600 flex items-center justify-center mb-6 shadow-lg shadow-violet-900/20 group-hover:scale-105 transition-transform">
                <Send className="h-8 w-8 text-white ml-1" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Email Support</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Send us your questions and we'll respond within 24 hours
              </p>
              <a href="mailto:support@cloudink.co" className="text-violet-400 font-bold hover:text-violet-300 text-lg mt-auto transition-colors">
                support@cloudink.co
              </a>
            </div>

            {/* Live Chat Card */}
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700/50 flex flex-col items-center text-center hover:bg-slate-800 transition-all duration-300 group cursor-pointer active:scale-95">
              <div className="h-16 w-16 rounded-2xl bg-teal-500 flex items-center justify-center mb-6 shadow-lg shadow-teal-900/20 group-hover:scale-105 transition-transform">
                <MessageSquareText className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Chat</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Chat with our support team in real-time
              </p>
              <span className="text-teal-400 font-bold text-lg mt-auto">
                Available 24/7
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-10 border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            
            <div className="flex items-center space-x-2 mb-4">
                 <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1.5 rounded-lg">
                    <Pill className="h-5 w-5 text-white" />
                 </div>
                 <span className="text-xl font-bold text-white tracking-tight">Cloud Ink Co.</span>
            </div>
            
            <p className="text-slate-500 text-sm text-center">
                &copy; {new Date().getFullYear()} Cloud Ink Co. All rights reserved. HIPAA Compliant Healthcare Solutions.
            </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;