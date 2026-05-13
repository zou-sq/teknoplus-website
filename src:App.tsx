/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Cpu, 
  Globe, 
  Code2, 
  Zap, 
  ShieldCheck, 
  Users, 
  MessageSquare, 
  ArrowRight,
  Menu,
  X,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Impact', href: '#impact' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-accent flex items-center justify-center font-bold text-black text-xs">T+</div>
          <span className="text-xl tracking-[0.2em] font-light uppercase text-white">Tekno Plus</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12 text-[11px] uppercase tracking-[0.15em]">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-gray-400 hover:text-white transition-opacity font-medium"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-6 py-2 border border-accent text-accent text-[10px] uppercase tracking-widest hover:bg-accent hover:text-black transition-all cursor-pointer"
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-indigo-400"
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-white text-black px-5 py-3 rounded-xl text-center font-semibold">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-bg-dark">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 right-10 w-96 h-96 bg-accent opacity-5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-accent opacity-5 blur-[128px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent text-xs uppercase tracking-[0.3em] mb-4 block">Established MMXXIV</span>
            <h1 className="text-6xl md:text-8xl font-serif font-light text-white leading-tight mb-8 italic italic">
              Engineering the <br /> 
              <span className="text-accent not-italic">Next Dimension</span> <br />
              of Excellence.
            </h1>
            <p className="text-lg text-gray-400 font-light leading-relaxed max-w-xl mb-12">
              TEKNO PLUS is a global technology collective dedicated to synthesizing advanced computing with human-centric design. We bridge the gap between speculative innovation and scalable reality.
            </p>
            <div className="flex flex-wrap gap-6">
              <button className="px-8 py-3 border border-accent text-accent text-xs uppercase tracking-widest hover:bg-accent hover:text-black transition-all">
                Explore Solutions
              </button>
              <button className="px-8 py-3 text-white text-xs uppercase tracking-widest opacity-60 hover:opacity-100 underline underline-offset-8 transition-all">
                Our Manifesto
              </button>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-5 hidden md:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="w-full aspect-square bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl overflow-hidden shadow-2xl relative">
               <div className="absolute inset-0 bg-black/20" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {[...Array(9)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2 + i * 0.5,
                          delay: i * 0.2
                        }}
                        className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center text-white"
                      >
                        <Cpu className="w-6 h-6 opacity-40" />
                      </motion.div>
                    ))}
                  </div>
               </div>
            </div>
            {/* Floating Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-black/90 border border-white/10 p-6 rounded-2xl backdrop-blur-xl shadow-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <ShieldCheck className="text-green-500 w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Enterprise Grade</p>
                  <p className="text-white font-bold">Secure by Default</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: 'Patents Pending', value: '140+' },
    { label: 'AUM Intelligence', value: '$2.4B' },
    { label: 'Global Nodes', value: '12 Cities' },
    { label: 'Carbon Target', value: 'Operational' },
  ];

  return (
    <section id="impact" className="bg-bg-dark py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col py-4 ${i < stats.length - 1 ? 'border-r border-white/10' : ''} ${i > 0 ? 'pl-8' : ''}`}
            >
              <span className="text-accent text-3xl font-serif mb-1">{stat.value}</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Custom Software',
      desc: 'Bespoke applications engineered for scale and extreme performance.',
      icon: Code2,
      color: 'bg-blue-500'
    },
    {
      title: 'AI & Data Science',
      desc: 'Predictive analytics and neural network integration for smarter decisions.',
      icon: Cpu,
      color: 'bg-purple-500'
    },
    {
      title: 'Global Infrastructure',
      desc: 'Zero-latency edge computing and global cloud architecture setup.',
      icon: Globe,
      color: 'bg-indigo-500'
    },
    {
      title: 'Cyber Security',
      desc: 'Military-grade encryption and real-time threat detection systems.',
      icon: ShieldCheck,
      color: 'bg-emerald-500'
    },
    {
      title: 'Digital Experience',
      desc: 'Immersive UI/UX design that resonates with modern user expectations.',
      icon: MessageSquare,
      color: 'bg-amber-500'
    },
    {
      title: 'Agile R&D',
      desc: 'Rapid prototyping and iterative development for first-to-market advantage.',
      icon: Zap,
      color: 'bg-rose-500'
    }
  ];

  return (
    <section id="services" className="bg-bg-dark py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-accent text-xs uppercase tracking-[0.3em] mb-4">Core Competencies</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tighter italic leading-none">
              The Architecture <br /> of <span className="not-italic font-sans font-black text-gray-500 uppercase">Intelligence.</span>
            </h3>
          </div>
          <p className="text-gray-400 max-w-sm font-light">
            We synthesize advanced data structures with human intuition to create immutable competitive advantages.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group border-t border-white/10 pt-8"
            >
              <div className="flex justify-between items-start mb-6">
                <service.icon className="text-accent w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] text-gray-600 font-mono">0{i + 1}</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4 tracking-tight uppercase">{service.title}</h4>
              <p className="text-gray-400 leading-relaxed font-light text-sm">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="bg-bg-dark py-32 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="aspect-[4/5] bg-zinc-900/50 rounded-lg p-px overflow-hidden border border-white/10"
          >
            <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-40 hover:opacity-60 transition-opacity duration-700" />
          </motion.div>
          <div className="absolute -bottom-10 -right-10 border border-accent bg-bg-dark text-accent p-10 hidden md:block">
            <p className="text-6xl font-serif italic mb-1">MMXXIV</p>
            <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-80">Collective DNA</p>
          </div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-accent text-xs uppercase tracking-[0.3em] mb-4">Our Manifesto</h2>
            <h3 className="text-4xl md:text-6xl font-serif font-light text-white tracking-tighter italic leading-none mb-8">
              Synthesizing <br /> <span className="not-italic font-sans font-black text-gray-500 uppercase">the Future.</span>
            </h3>
            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
              <p>
                Founded on the principles of absolute precision and creative volition, TEKNO PLUS has evolved into a global powerhouse for digital distillation.
              </p>
              <p>
                We believe that technology should be an extension of intent—a silent engine that powers your wildest ambitions without friction or failure.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-12">
              {[
                { title: 'Global Collective', value: '14 Studios' },
                { title: 'Intelligence Lab', value: 'AGI Division' }
              ].map((item, i) => (
                <div key={item.title}>
                  <span className="text-accent font-serif text-2xl block mb-1">{item.value}</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">{item.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="bg-bg-dark py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border-t border-white/10 pt-24">
          <div className="grid md:grid-cols-2 gap-24">
            <div>
              <h2 className="text-accent text-xs uppercase tracking-[0.4em] mb-6">Contact Interface</h2>
              <h3 className="text-5xl md:text-7xl font-serif font-light text-white tracking-tighter italic mb-12">
                Initiate <br /> <span className="not-italic font-sans font-black text-gray-500 uppercase">Dialogue.</span>
              </h3>
              
              <div className="space-y-12">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 block mb-4">Transmission Channel</span>
                  <p className="text-2xl text-accent font-serif italic">inquiry@teknoplus.io</p>
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gray-600 block mb-4">Geospatial Nodes</span>
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-white/60 text-sm italic">
                    <span>Silicon Valley</span>
                    <span>London</span>
                    <span>Tokyo</span>
                  </div>
                </div>
              </div>
            </div>

            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border-b border-white/20 py-2">
                  <input type="text" placeholder="Identity" className="bg-transparent w-full text-white focus:outline-none placeholder:text-white/20 text-sm tracking-wide" />
                </div>
                <div className="border-b border-white/20 py-2">
                  <input type="email" placeholder="Contact Channel" className="bg-transparent w-full text-white focus:outline-none placeholder:text-white/20 text-sm tracking-wide" />
                </div>
              </div>
              <div className="border-b border-white/20 py-2">
                <textarea rows={4} placeholder="Project Parameters..." className="bg-transparent w-full text-white focus:outline-none placeholder:text-white/20 text-sm tracking-wide resize-none" />
              </div>
              <button className="px-12 py-4 border border-accent text-accent text-xs uppercase tracking-[0.3em] hover:bg-accent hover:text-black transition-all">
                Send Transmission
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-bg-dark border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center opacity-30 text-[9px] uppercase tracking-[0.4em] gap-4">
          <span>© 2026 TEKNO PLUS COLLECTIVE. ALL RIGHTS RESERVED.</span>
          <span>PRIVACY / LEGAL / SECURE NODE</span>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-bg-dark text-text-main selection:bg-accent selection:text-black font-sans">
      <Navbar />
      <Hero />
      <Stats />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
