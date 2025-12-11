
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { generateHospitalInsights } from '../services/geminiService';
import { DashboardData } from '../types';

interface GeminiInsightProps {
  data: DashboardData;
}

const GeminiInsight: React.FC<GeminiInsightProps> = ({ data }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [generated, setGenerated] = useState<boolean>(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateHospitalInsights(data);
    setInsight(result);
    setLoading(false);
    setGenerated(true);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl shadow-lg text-white p-6 md:p-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-pink-500 opacity-10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-yellow-300" />
            <h3 className="text-xl font-bold tracking-wide">Gemini AI Intelligence</h3>
          </div>
          {!generated && !loading && (
             <button 
               onClick={handleGenerate}
               className="bg-white/20 hover:bg-white/30 text-white text-sm py-1.5 px-4 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 font-medium active:scale-95 transform"
             >
               Generate Analysis
             </button>
          )}
           {generated && !loading && (
             <button 
               onClick={handleGenerate}
               className="text-white/70 hover:text-white p-1 rounded-full transition-colors active:scale-90 transform"
               title="Regenerate"
             >
               <RefreshCw className="h-4 w-4" />
             </button>
          )}
        </div>

        <div className="bg-white/10 rounded-lg p-5 backdrop-blur-sm border border-white/10 min-h-[100px] flex items-center justify-center">
            {loading ? (
                <div className="flex flex-col items-center space-y-3">
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="text-sm text-indigo-100 animate-pulse">Analyzing hospital metrics...</span>
                </div>
            ) : insight ? (
                <p className="text-indigo-50 leading-relaxed font-light text-lg">
                    {insight}
                </p>
            ) : (
                <p className="text-indigo-200 text-center italic">
                    Click "Generate Analysis" to receive a real-time executive summary of the department's performance powered by Google Gemini.
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default GeminiInsight;
