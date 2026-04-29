import { useEffect } from 'react';
import { ScrollText, ShieldCheck, Scale, FileCode } from 'lucide-react';
import SEO from '../components/SEO';

const TermsAndConditions = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            id: "01",
            title: "Service Protocol",
            content: "By accessing Laptop Connect (the 'System'), you agree to operate within the defined technical parameters of our platform. Our service is a digital bridge for premium technology acquisition in Ghana."
        },
        {
            id: "02",
            title: "Hardware Acquisition",
            content: "All transactions are final upon technical verification and physical handover. Inventory availability is subject to real-time synchronization and may fluctuate based on global supply chain logistics."
        },
        {
            id: "03",
            title: "Operational Liability",
            content: "Laptop Connect engineers a secure environment for transactions. However, users are responsible for the physical security and technical maintenance of their acquired hardware post-delivery."
        },
        {
            id: "04",
            title: "Data Integrity",
            content: "System metadata, including pricing and specifications, is subject to iterative updates. We reserve the right to correct any technical inaccuracies within the inventory data without prior notification."
        }
    ];

    return (
        <>
            <SEO
                title="Terms of Operation | Future Engineering"
                description="Review the technical protocols and terms of operation for Laptop Connect. Our legal framework is engineered for transparency and security."
            />

            <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white">

                {/* Technical Header */}
                <header className="relative bg-gray-900 pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90"></div>
                    <div className="relative max-w-[1400px] mx-auto px-6 md:px-8 text-center">
                        <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            Legal / Protocol / 003
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-12">
                            Terms of <br />
                            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Operation.</span>
                        </h1>
                    </div>
                </header>

                {/* Documentation Content */}
                <section className="py-32">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-8">
                        <div className="grid lg:grid-cols-12 gap-16">

                            {/* Sidebar Navigation */}
                            <aside className="lg:col-span-4 space-y-12">
                                <div className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 space-y-6">
                                    <h3 className="text-[10px] uppercase font-black tracking-[0.5em] text-gray-400">Documentation Index</h3>
                                    <nav className="space-y-4">
                                        {sections.map((section) => (
                                            <a
                                                key={section.id}
                                                href={`#section-${section.id}`}
                                                className="flex items-center gap-4 group"
                                            >
                                                <span className="text-xs font-black text-gray-300 group-hover:text-black transition-colors">{section.id}</span>
                                                <span className="text-sm font-black uppercase tracking-tight text-gray-500 group-hover:text-black transition-colors">{section.title}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                <div className="p-8 bg-black rounded-[40px] text-white space-y-6">
                                    <FileCode className="w-8 h-8 text-gray-500" />
                                    <h4 className="text-xl font-black uppercase tracking-tighter italic">Compliance Sync</h4>
                                    <p className="text-xs text-gray-400 font-medium leading-relaxed">Our terms are updated iteratively to align with the latest regional technology regulations and consumer protection protocols.</p>
                                </div>
                            </aside>

                            {/* Main Text Area */}
                            <div className="lg:col-span-8 space-y-24">
                                {sections.map((section) => (
                                    <div key={section.id} id={`#section-${section.id}`} className="space-y-8 scroll-mt-40">
                                        <div className="flex items-center gap-6">
                                            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-400 italic">
                                                {section.id}
                                            </div>
                                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-gray-900">{section.title}</h2>
                                        </div>
                                        <div className="pl-18 border-l border-gray-100 ml-6 space-y-6">
                                            <p className="text-xl text-gray-600 font-medium leading-relaxed tracking-tight">
                                                {section.content}
                                            </p>
                                            <p className="text-sm text-gray-400 font-bold uppercase tracking-widest italic">
                                                Protocol Ref: GH-TECH-{section.id}-2026
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>

                {/* Technical Footer Area */}
                <section className="py-24 bg-gray-50/50">
                    <div className="max-w-[1400px] mx-auto px-6 md:px-8">
                        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
                            <div className="space-y-4">
                                <ShieldCheck className="mx-auto md:mx-0 w-8 h-8 text-gray-900" />
                                <h5 className="font-black uppercase tracking-tight">Encrypted</h5>
                                <p className="text-xs text-gray-500 font-bold">Protocol fully secured via end-to-end encryption standards.</p>
                            </div>
                            <div className="space-y-4">
                                <Scale className="mx-auto md:mx-0 w-8 h-8 text-gray-900" />
                                <h5 className="font-black uppercase tracking-tight">Legal Integrity</h5>
                                <p className="text-xs text-gray-500 font-bold">Iterative updates based on Ghanaian tech compliance acts.</p>
                            </div>
                            <div className="space-y-4">
                                <ScrollText className="mx-auto md:mx-0 w-8 h-8 text-gray-900" />
                                <h5 className="font-black uppercase tracking-tight">Transparency</h5>
                                <p className="text-xs text-gray-500 font-bold">Scrupulous reporting on all hardware acquisition policies.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default TermsAndConditions;