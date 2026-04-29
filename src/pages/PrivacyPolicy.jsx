import { useEffect } from 'react';
import { Lock, EyeOff, Fingerprint, Database } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const protocols = [
    {
      id: "01",
      title: "Data Encryption",
      desc: "All customer metadata transmitted via our WhatsApp routing is subject to industry-standard end-to-end encryption. Laptop Connect does not archive unencrypted personal identifiers on public servers."
    },
    {
      id: "02",
      title: "Cookie Protocols",
      desc: "Our system utilizes essential cookies solely for session synchronization and cart persistence. We do not deploy third-party tracking scripts for behavioral profiling."
    },
    {
      id: "03",
      title: "Information Disclosure",
      desc: "Customer acquisition data is only shared with authorized logistics partners for delivery synchronization. We strictly adhere to the Data Protection Act of Ghana (Act 843)."
    },
    {
      id: "04",
      title: "User Control",
      desc: "Users maintain full autonomy over their metadata. Technical requests for data erasure or modification can be initiated through our Technical Support protocol."
    }
  ];

  return (
    <>
      <SEO
        title="Privacy Protocol | Future Engineering"
        description="Learn about the technical data protocols and privacy measures engineered by Laptop Connect to secure your digital footprint."
      />

      <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white">
        
        {/* Technical Header */}
        <header className="relative bg-gray-900 pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90"></div>
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-8 text-center">
            <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              System / Security / 004
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-12">
              Privacy <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Protocol.</span>
            </h1>
          </div>
        </header>

        {/* Protocol Content */}
        <section className="py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-16 md:gap-32">
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-black tracking-[0.5em] text-gray-400">Security / Baseline</span>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">Digital <br /><span className="italic text-gray-400">Autonomy.</span></h2>
                </div>
                
                <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-medium">
                  <p>
                    Laptop Connect engineers its platform with a 'Privacy by Default' philosophy. We minimize the collection of non-essential identifiers to ensure your digital footprint remains secure.
                  </p>
                  <p>
                    Our technical infrastructure is designed to protect the integrity of your purchase history and personal information against unauthorized synchronization attempts.
                  </p>
                </div>

                <div className="p-10 bg-gray-900 rounded-[50px] text-white flex items-center gap-8 relative overflow-hidden">
                   <div className="absolute -right-8 -top-8 text-white/5">
                      <Fingerprint size={160} />
                   </div>
                   <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                      <Lock className="text-white" />
                   </div>
                   <div>
                      <h4 className="font-black uppercase tracking-tight italic">E2E Sync Enabled</h4>
                      <p className="text-xs text-gray-400 font-bold tracking-wide">All inquiry channels are encrypted.</p>
                   </div>
                </div>
              </div>

              <div className="grid gap-12">
                {protocols.map((protocol) => (
                  <div key={protocol.id} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 space-y-4 group hover:bg-white hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-black text-gray-300 italic">{protocol.id}</span>
                      <h3 className="text-xl font-black uppercase tracking-tight text-gray-900">{protocol.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed pl-8 border-l border-gray-200">
                      {protocol.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Technical Summary */}
        <section className="py-24 bg-black text-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div className="space-y-4">
                  <h3 className="text-4xl font-black uppercase tracking-tighter italic">Integrity Verification.</h3>
                  <p className="text-gray-400 font-medium">Our system architecture undergoes periodic technical audits to ensure compliance with global data protection standards.</p>
               </div>
               <div className="flex flex-wrap gap-12 justify-center md:justify-end">
                  <div className="text-center space-y-2">
                     <EyeOff className="mx-auto w-8 h-8 text-gray-600" />
                     <p className="text-[10px] font-black uppercase tracking-widest">No-Track</p>
                  </div>
                  <div className="text-center space-y-2">
                     <Database className="mx-auto w-8 h-8 text-gray-600" />
                     <p className="text-[10px] font-black uppercase tracking-widest">Local-Storage</p>
                  </div>
                  <div className="text-center space-y-2">
                     <Lock className="mx-auto w-8 h-8 text-gray-600" />
                     <p className="text-[10px] font-black uppercase tracking-widest">AES-256</p>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PrivacyPolicy;