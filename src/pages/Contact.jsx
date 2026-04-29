import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const phoneNumber = '+233201534711';
    const message = `[SYSTEM INQUIRY]
---------------------------
ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}
SUBJECT: ${formData.subject || 'GENERAL_QUERY'}
NAME: ${formData.name}
EMAIL: ${formData.email}
PHONE: ${formData.phone}
---------------------------
MESSAGE:
${formData.message || 'NO_CONTENT_PROVIDED'}
---------------------------
END TRANSMISSION`;

    setTimeout(() => {
      const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
    }, 800);
  };

  const contactInfo = [
    { icon: <MapPin className="w-5 h-5" />, title: 'Terminal Location', content: 'UCC Campus, Cape Coast, Ghana' },
    { icon: <Phone className="w-5 h-5" />, title: 'Voice Line', content: '+233 20 153 4711' },
    { icon: <Mail className="w-5 h-5" />, title: 'Digital Mail', content: 'laptopconnect@gmail.com' },
    { icon: <Clock className="w-5 h-5" />, title: 'Operational Hours', content: 'Mon-Sat: 09:00 - 18:00' }
  ];

  return (
    <>
      <SEO
        title="Contact Support | Future Engineering"
        description="Initiate a support protocol with Laptop Connect. Our technical team is standing by to assist with your hardware inquiries."
        keywords="contact laptop connect, tech support ghana, laptop repair, hardware inquiry"
      />

      <div className="min-h-screen bg-white text-gray-900 selection:bg-black selection:text-white">
        
        {/* Technical Header */}
        <header className="relative bg-gray-900 pt-32 pb-24 md:pt-48 md:pb-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90"></div>
          
          <div className="relative max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="max-w-4xl">
              <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-gray-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                Protocol / 002 / Support
              </span>
              <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-12">
                Initiate <br />
                <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Contact.</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-400 font-medium leading-relaxed max-w-2xl tracking-tight">
                System support is active. Select your preferred communication channel to begin the technical inquiry process.
              </p>
            </div>
          </div>
        </header>

        {/* Contact Grid Area */}
        <section className="py-24 border-b border-gray-50">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="p-8 bg-gray-50 rounded-[40px] border border-gray-100 space-y-6 hover:shadow-2xl hover:shadow-gray-200 transition-all duration-500 group">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-900 shadow-sm group-hover:bg-black group-hover:text-white transition-colors duration-500">
                    {info.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400">{info.title}</h3>
                    <p className="text-lg font-black text-gray-900 uppercase tracking-tighter leading-tight italic">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Communication Portal */}
        <section className="py-32">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-24">
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <span className="text-[10px] uppercase font-black tracking-[0.5em] text-gray-400">Technical Portal</span>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">Transmission <br /><span className="italic text-gray-400">Interface.</span></h2>
                </div>
                
                <div className="space-y-8">
                   <div className="flex gap-6 items-start">
                      <div className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></div>
                      <p className="text-lg text-gray-600 font-medium leading-relaxed tracking-tight">
                         Direct WhatsApp routing is active for real-time synchronization with our support team.
                      </p>
                   </div>
                   <div className="flex gap-6 items-start">
                      <div className="mt-2 w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></div>
                      <p className="text-lg text-gray-600 font-medium leading-relaxed tracking-tight">
                         Standard response latency: 5-30 minutes during operational hours.
                      </p>
                   </div>
                </div>

                <div className="p-12 bg-gray-900 rounded-[50px] space-y-8 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 text-white/5 group-hover:text-white/10 transition-colors">
                      <MessageSquare size={120} strokeWidth={1} />
                   </div>
                   <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic z-10 relative">Instant Protocol</h3>
                   <button 
                     onClick={() => window.open('https://wa.me/233201534711', '_blank')}
                     className="relative z-10 flex items-center justify-center w-full py-6 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl hover:scale-105 active:scale-95 transition-all"
                   >
                     Direct Chat / WA
                   </button>
                </div>
              </div>

              {/* Technical Form */}
              <div className="bg-gray-50 rounded-[60px] p-8 md:p-16 border border-gray-100 shadow-sm">
                <form onSubmit={handleWhatsAppSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400 ml-4">Identifier</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-black transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400 ml-4">Return Path</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-black transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400 ml-4">Protocol Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Device Inquiry, Order Status"
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-black transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase font-black tracking-[0.3em] text-gray-400 ml-4">Payload Content</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Detailed technical description..."
                      rows="5"
                      className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold placeholder:text-gray-300 focus:outline-none focus:border-black transition-all resize-none"
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-black text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl flex items-center justify-center gap-4 hover:bg-gray-800 transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : (
                      <>
                        <Send size={16} />
                        Transmit Message
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;