import React from 'react';

export default function Footer() {
  return (
    <footer className="  font-sans mt-20 border-t border-green-500/10">
      {/* Top Value Bar / Newsletter Section */}
      <div className="border-b bo">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Accepting Orders Live
            </div>
            <h3 className="text-black text-2xl md:text-3xl font-serif font-bold  tracking-tight">
              Freshly baked, straight to your doorstep.
            </h3>
            <p className=" text-sm mt-2">
              Join our tasting club for secret menu drops, weekend pop-ups, and 10% off your next feast.
            </p>
          </div>
          
          
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Intro */}
          <div className="space-y-4">
            <h2 className="text-black text-2xl font-serif font-black tracking-tight  flex items-center gap-2">
              Bite<span className="text-green-400">Foods.</span>
            </h2>
            <p className="text-sm  leading-relaxed">
Fresh ingredients, bold flavors, and meals crafted with passion. Every dish is prepared to satisfy your cravings from the very first bite.       
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 pt-2">
              {['instagram', 'twitter', 'facebook'].map((platform) => (
                <a 
                  key={platform} 
                  href={`#${platform}`}
                  className="w-9 h-9 flex items-center justify-center rounded-xl font-bold bg-green-500 border border-green-500 text-white  hover:border-green-700 transition-all"
                  aria-label={platform}
                >
                  <span className="text-xs capitalize">{platform[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Core Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-5">The Menu</h4>
            <ul className="space-y-3.5 text-sm ">
              {[
                { name: 'Momo', label: 'Daily' },
                { name: 'Pizza', label: 'Popular' },
                { name: 'Burger', label: null },
                { name: 'Khana set', label: null }
              ].map((link) => (
                <li key={link.name}>
                  <a href={`#${link.name.toLowerCase().replace(/ /g, '-')}`} className="hover: transition-colors flex items-center justify-between group">
                    <span>{link.name}</span>
                    {link.label && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-green-500 text-white  group-hover:text-green-400 border border-green-500 transition-colors">
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
            <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-5">Kitchen Hours</h4>
            <div className="space-y-3 text-sm ">
              <p className="flex justify-between">
                <span>Mon — Thu</span>
                <span className="">12:00 PM - 10:00 PM</span>
              </p>
              <p className="flex justify-between">
                <span>Fri — Sat</span>
                <span className="text-green-400 font-medium">12:00 PM - 12:00 AM</span>
              </p>
              <p className="flex justify-between">
                <span>Sunday</span>
                <span className="">11:00 AM - 9:00 PM</span>
              </p>
            </div>
          </div>

          {/* Quick Contact & Action */}
          <div className="flex flex-col justify-between space-y-6 lg:space-y-0">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-green-400 mb-4">Find Us</h4>
           
              <p className="text-xs  mt-1">Sukedhara, Kathmandu</p>
              <p className="text-xs  mt-1">9769674509</p>
              <p className="text-xs  mt-1">thefoodspot@gmail.com</p>
            </div>
            
           
          </div>

        </div>

        {/* Sub-Footer Legal */}
        <div className="mt-16 pt-8 border-t bo flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ">
          <p>&copy; {new Date().getFullYear()} Bite Labs Inc. Handcrafted flavor, zero compromises.</p>
          <div className="flex gap-6 font-medium">
            <a href="#privacy" className="hover: transition-colors">Privacy</a>
            <a href="#terms" className="hover: transition-colors">Terms</a>
            <a href="#safety" className="hover: transition-colors">Food Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
}