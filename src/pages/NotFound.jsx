import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Terminal, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO title="404 - System Conflict" />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        
        {/* Error Visualization */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-red-500 blur-[80px] opacity-10 animate-pulse"></div>
          <div className="w-32 h-32 bg-gray-900 rounded-[48px] flex items-center justify-center text-white relative z-10 shadow-2xl">
            <AlertTriangle size={48} strokeWidth={1} />
          </div>
          <div className="absolute -top-4 -right-4 bg-black text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-bounce">
            Code / 404
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-6 max-w-lg">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 uppercase tracking-tighter italic">
            Protocol <br /> <span className="text-gray-300">Conflict.</span>
          </h1>
          
          <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 space-y-4">
            <div className="flex items-center gap-3 justify-center text-gray-400">
               <Terminal size={14} />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">System Diagnostics</span>
            </div>
            <p className="text-sm font-medium text-gray-500 leading-relaxed tracking-tight">
              The hardware identifier or transmission path you requested does not exist within the current inventory matrix. 
              Synchronization failed.
            </p>
          </div>

          <div className="pt-8">
            <Link 
              to="/" 
              className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-gray-200"
            >
              <ArrowLeft size={16} />
              Re-Initiate Navigation
            </Link>
          </div>
        </div>

        {/* Technical Footer */}
        <div className="mt-24 text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">
          Laptop Connect / Internal Error Log / 0x404
        </div>
      </div>
    </>
  );
};

export default NotFound;