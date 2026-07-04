import React from 'react';

export default function Footer() {
  return (
    <footer className="relative bg-emerald-950 text-emerald-100 font-sans mt-24">
      {/* Floating Call-to-Action Card */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-4xl bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl p-6 md:p-10 shadow-xl shadow-emerald-950/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-emerald-950">Late night cravings?</h3>
          <p className="text-emerald-900/80 text-sm md:text-base font-medium mt-1">Get 15% off your first midnight order straight to your inbox.</p>
        </div>
        <div className="w-full md:w-auto flex items-center bg-white/20 backdrop-blur-md rounded-xl p-1 border border-white/30 focus-within:ring-2 focus-within:ring-emerald-950 transition-all">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="bg-transparent text-emerald-950 placeholder-emerald-900/60 font-medium px-4 py-2 w-full md:w-64 outline-none text-sm"
          />
          <button className="bg-emerald-950 text-emerald-300 hover:text-white px-5 py-2 rounded-lg text-sm font-bold tracking-wide shadow-md transition-all active:scale-95 whitespace-nowrap">
            Join Club
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 pt-36 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <h2 className="text-2xl font-black tracking-tight text-white">
                The<span className="text-emerald-300">Food</span>Spot
              </h2>
            </div>
            <p className="text-sm text-emerald-200/70 leading-relaxed max-w-sm">
              We slice, dice, and spice with raw obsession. Locally sourced, obsessively crafted, and delivered with zero compromises.
            </p>
            <div className="flex gap-4 pt-2">
              {['Instagram', 'TikTok', 'Yelp'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social.toLowerCase()}`} 
                  className="text-xs font-semibold tracking-wider uppercase text-emerald-300 hover:text-white border border-emerald-800/60 hover:border-emerald-300/40 rounded-full px-3 py-1.5 transition-all"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Menus */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-300 mb-5">Craving Box</h4>
            <ul className="space-y-3 text-sm font-medium">
              {[
                { name: 'Smash Burgers', tag: 'Hot' },
                { name: 'Truffle Fries', tag: null },
                { name: 'Vegan Bowls', tag: 'Fresh' },
                { name: 'Craft Shakes', tag: null }
              ].map((item) => (
                <li key={item.name}>
                  <a href={`#${item.name.toLowerCase().replace(' ', '-')}`} className="group flex items-center justify-between max-w-[200px] hover:text-white transition-colors">
                    <span>{item.name}</span>
                    {item.tag && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-emerald-300 text-emerald-950 font-bold uppercase rounded tracking-wide scale-90 group-hover:bg-white transition-colors">
                        {item.tag}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-300 mb-5">The Kitchen Clock</h4>
            <ul className="space-y-3 text-sm text-emerald-200/80 font-medium">
              <li className="flex justify-between border-b border-emerald-900/40 pb-2">
                <span>Weekdays</span>
                <span className="text-white">11a — 10p</span>
              </li>
              <li className="flex justify-between border-b border-emerald-900/40 pb-2">
                <span>Friday</span>
                <span className="text-white">11a — Midnight</span>
              </li>
              <li className="flex justify-between border-b border-emerald-900/40 pb-2">
                <span>Saturday</span>
                <span className="text-emerald-300 font-bold">10a — 1a</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday Brunch</span>
                <span className="text-white">10a — 9p</span>
              </li>
            </ul>
          </div>

          {/* Contact / Delivery Button */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-emerald-300 mb-4">Drop By</h4>
              <p className="text-sm font-medium text-emerald-100">452 Botanical Way, Suite 10</p>
              <p className="text-xs text-emerald-300/70 mt-1">Greenwich Village, NY</p>
            </div>
            <a 
              href="#order" 
              className="group relative inline-flex items-center justify-between bg-emerald-300 hover:bg-white text-emerald-950 text-sm font-bold py-3.5 px-5 rounded-xl transition-all duration-300 shadow-lg shadow-emerald-400/10 hover:shadow-white/5 active:scale-[0.98]"
            >
              <span>DISPATCH A COURIER</span>
              <span className="transform group-hover:translate-x-1 transition-transform font-mono">→</span>
            </a>
          </div>

        </div>

        {/* Sub-Footer Copyright */}
        <div className="mt-16 pt-8 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/40 font-medium">
          <p>&copy; {new Date().getFullYear()} The Food Spot Corp. All plates reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-emerald-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-emerald-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}