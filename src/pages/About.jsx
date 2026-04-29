import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Shield, Award, Users, Calendar, Zap, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: "500+", label: "Units Verified", icon: <Award className="w-5 h-5" /> },
    { number: "2025", label: "Protocol Initiated", icon: <Calendar className="w-5 h-5" /> },
    { number: "24/7", label: "Active Support", icon: <MessageSquare className="w-5 h-5" /> },
    { number: "100%", label: "System Uptime", icon: <Zap className="w-5 h-5" /> }
  ];

  return (
    <>
      <SEO
        title="About Laptop Connect | Future Engineering"
        description="Learn about the technical vision behind Laptop Connect. We engineer the bridge between premium technology and performance-driven users in Ghana."
        keywords="about laptop connect, future engineering, tech shop ghana, premium electronics"
      />

      <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white">
        
        {/* Technical Header */}
        <header className="relative bg-gray-900 pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black"></div>
          
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

          <div className="relative max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="max-w-4xl">
              <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Document / 001 / Vision
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-12">
                Future <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Engineering.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl mb-12 tracking-tight">
                Laptop Connect isn't just a storefront. It's a technical protocol designed to bridge the gap between premium computing and performance users in Ghana.
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link to="/" className="px-10 py-5 bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                  Browse Hardware
                </Link>
                <Link to="/contact" className="px-10 py-5 bg-transparent border border-white/20 text-white font-black uppercase text-[11px] tracking-[0.2em] rounded-2xl hover:bg-white/5 transition-all">
                  Technical Support
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Technical Stats Area */}
        <section className="py-24 border-b border-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-20">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-4">
                  <div className="text-gray-300">{stat.icon}</div>
                  <div className="space-y-1">
                    <div className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter italic">{stat.number}</div>
                    <div className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Narrative Section */}
        <section className="py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-black tracking-[0.5em] text-gray-400">The Mission</span>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">Bridging the Digital <span className="italic text-gray-400">Divide.</span></h2>
                </div>
                
                <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-medium">
                  <p>
                    Founded in 2025, Laptop Connect was born from a singular realization: access to high-performance technology shouldn't be a privilege. It should be the baseline for progress.
                  </p>
                  <p>
                    We engineer a curated experience where every unit is technically verified, every specification is scrutinized, and every user journey is optimized. Whether you are a developer, an architect, or a student, we provide the hardware foundation for your future.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 pt-8">
                  <div className="p-8 bg-gray-50 rounded-[40px] space-y-4 border border-gray-100">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                      <Target size={20} />
                    </div>
                    <h3 className="font-black uppercase tracking-tight text-gray-900">Precision</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-bold">Scrupulous selection of hardware that meets exact performance benchmarks.</p>
                  </div>
                  <div className="p-8 bg-gray-50 rounded-[40px] space-y-4 border border-gray-100">
                    <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
                      <Shield size={20} />
                    </div>
                    <h3 className="font-black uppercase tracking-tight text-gray-900">Integrity</h3>
                    <p className="text-xs text-gray-500 leading-relaxed font-bold">Transparent reporting on device condition and historical performance data.</p>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-4 bg-gray-100 rounded-[60px] transform rotate-2 group-hover:rotate-0 transition-transform duration-700"></div>
                <div className="relative aspect-[4/5] bg-gray-900 rounded-[50px] overflow-hidden shadow-2xl">
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
                   <div className="absolute bottom-12 left-12 z-20 space-y-2">
                      <p className="text-[10px] uppercase font-black tracking-[0.4em] text-gray-400">System / Status</p>
                      <p className="text-2xl font-black text-white uppercase italic tracking-tighter underline decoration-gray-600 underline-offset-8">Optimized For Progress</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Vision Section */}
        <section className="py-32 bg-gray-50/50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-3 gap-16">
               <div className="lg:col-span-1 space-y-6">
                  <span className="text-[10px] uppercase font-black tracking-[0.5em] text-gray-400">Values / Core</span>
                  <h3 className="text-5xl font-black uppercase tracking-tighter leading-none italic">The Technical <br /> Mandate.</h3>
               </div>
               <div className="lg:col-span-2 grid md:grid-cols-2 gap-12">
                  {[
                    { title: "Quality Control", desc: "No unit enters our inventory without a rigorous 24-point technical inspection.", icon: <Shield /> },
                    { title: "Performance First", desc: "We prioritize specs that enable productivity, not just aesthetic appeal.", icon: <Zap /> },
                    { title: "Customer Centric", desc: "Your technical needs dictate our inventory acquisition strategy.", icon: <Users /> },
                    { title: "Future Ready", desc: "Access to the latest generations of computing hardware, today.", icon: <Eye /> }
                  ].map((val, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="text-gray-900">{val.icon}</div>
                      <h4 className="text-lg font-black uppercase tracking-tight text-gray-900">{val.title}</h4>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{val.desc}</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>

        {/* Technical CTA */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 text-center">
            <div className="p-12 md:p-24 bg-gray-900 rounded-[60px] relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-black to-gray-800 opacity-90 transition-transform duration-1000 group-hover:scale-110"></div>
              <div className="relative z-10 space-y-12">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none">
                    Ready to Initiate <br /> <span className="italic text-gray-400">Operation?</span>
                  </h2>
                  <p className="text-gray-400 font-medium text-lg md:text-xl max-w-xl mx-auto">
                    Join the thousands of users who have upgraded their hardware through the Laptop Connect protocol.
                  </p>
                </div>
                <Link to="/" className="inline-flex px-12 py-6 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5">
                  Start System Upgrade
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;