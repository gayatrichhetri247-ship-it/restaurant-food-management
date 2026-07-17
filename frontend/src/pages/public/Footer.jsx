import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-200 font-sans mt-20 border-t border-amber-500/10">
      {/* Top Value Bar / Newsletter Section */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Accepting Orders Live
            </div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tight">
              Freshly baked, straight to your doorstep.
            </h3>
            <p className="text-stone-400 text-sm mt-2">
              Join our tasting club for secret menu drops, weekend pop-ups, and 10% off your next feast.
            </p>
          </div>
          
          <form onSubmit={(e) => e.preventDefault()} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-stone-900 border border-stone-800 focus:border-amber-500/50 text-white placeholder-stone-500 rounded-xl px-4 py-3 text-sm outline-none min-w-[280px] transition-all"
              required
            />
            <button className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-amber-500/10 transition-all active:scale-98 whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Intro */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-black tracking-tight text-white flex items-center gap-2">
              Bite<span className="text-amber-400">Foods.</span>
            </h2>
            <p className="text-sm text-stone-400 leading-relaxed">
Fresh ingredients, bold flavors, and meals crafted with passion. Every dish is prepared to satisfy your cravings from the very first bite.       
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {['instagram', 'twitter', 'facebook'].map((platform) => (
                <a 
                  key={platform} 
                  href={`#${platform}`}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-amber-400 hover:border-amber-500/30 transition-all"
                  aria-label={platform}
                >
                  <span className="text-xs capitalize">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-5">The Menu</h4>
            <ul className="space-y-3.5 text-sm text-stone-400">
              {[
                { name: 'Momo', label: 'Daily' },
                { name: 'Pizza', label: 'Popular' },
                { name: 'Burger', label: null },
                { name: 'Khana set', label: null }
              ].map((link) => (
                <li key={link.name}>
                  <a href={`#${link.name.toLowerCase().replace(/ /g, '-')}`} className="hover:text-white transition-colors flex items-center justify-between group">
                    <span>{link.name}</span>
                    {link.label && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-stone-900 text-stone-400 group-hover:text-amber-400 border border-stone-800 transition-colors">
                        {link.label}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-5">Kitchen Hours</h4>
            <div className="space-y-3 text-sm text-stone-400">
              <p className="flex justify-between">
                <span>Mon — Thu</span>
                <span className="text-stone-200">12:00 PM - 10:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Fri — Sat</span>
                <span className="text-amber-400 font-medium">12:00 PM - 12:00 AM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday</span>
                <span className="text-stone-200">11:00 AM - 9:00 PM</span>
              </p>
            </div>
          </div>

          {/* Quick Contact & Action */}
          <div className="flex flex-col justify-between space-y-6 lg:space-y-0">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-4">Find Us</h4>
           
              <p className="text-xs text-stone-500 mt-1">Sukedhara, Kathmandu</p>
            </div>
            
            <a 
              href="#order"
              className="inline-flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-amber-400 border border-amber-500/20 hover:border-amber-500/40 text-sm font-bold py-3.5 px-5 rounded-xl transition-all shadow-md active:scale-98"
            >
              <span>Secure Your Delivery Slot</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>

        {/* Sub-Footer Legal */}
        <div className="mt-16 pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p>&copy; {new Date().getFullYear()} Bite Labs Inc. Handcrafted flavor, zero compromises.</p>
          <div className="flex gap-6 font-medium">
            <a href="#privacy" className="hover:text-stone-400 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-stone-400 transition-colors">Terms</a>
            <a href="#safety" className="hover:text-stone-400 transition-colors">Food Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
}