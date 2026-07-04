import React from 'react';
import { useNavigate } from 'react-router';
import About from './About';
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();

  // Features Array for the interactive cards section
  const features = [
   
    {
      icon: "👨‍🍳",
      title: "Master Chefs",
      desc: "Crafted by culinary artists who live to redefine taste boundaries."
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      desc: "Hot, freshly packed gourmet meals delivered straight to your door step."
    },
    {
      icon: "🥗",
      title: "Fresh Ingredients",
      desc: "We use carefully selected fresh ingredients every day to ensure authentic flavors and exceptional quality."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-green-100 to-white text-gray-800">
      
      {/* HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Hero Text content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 backdrop-blur-sm">
              ✨ Fresh Taste, Better Mood
            </div>
            <h1 className="text-4xl font-black tracking-tight text-emerald-950 sm:text-5xl md:text-6xl leading-[1.1]">
              Flavorful Dishes <br />
              Crafted With <span className="text-emerald-600 underline decoration-wavy decoration-3 underline-offset-4">Love</span>
            </h1>
            <p className="mx-auto max-w-md text-base text-gray-600 sm:text-lg lg:mx-0">
              Welcome to The Food Spot. Dive into a sensory celebration where organic farming meets gourmet culinary craftsmanship. Your seat is waiting.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <button 
                onClick={() => navigate('/menu')}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-emerald-600 px-8 py-4 font-bold text-white shadow-xl shadow-emerald-600/20 transition-all duration-300 hover:bg-emerald-700 hover:shadow-emerald-700/30 active:scale-98"
              >
                Explore Full Menu
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
              <button 
                onClick={() => navigate('/sign-up')}
                className="rounded-2xl border-2 border-emerald-600/20 bg-white/60 backdrop-blur-sm px-8 py-4 font-bold text-emerald-800 transition-all duration-300 hover:bg-white hover:border-emerald-600"
              >
                Join the Club
              </button>
            </div>
          </div>

          {/* Interactive Visual Element */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Abstract decorative background ring */}
            <div className="absolute inset-0 -m-6 rounded-full bg-emerald-400/20 blur-3xl animate-pulse"></div>
            
            <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-white bg-green-200 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800" 
                alt="Gourmet Salad Bowl" 
                className="h-[350px] w-full object-cover sm:h-[450px]"
              />
              
              {/* Floating Widget 1 */}
              <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur-md p-3.5 shadow-xl">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-lg">🔥</span>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Popular Item</p>
                  <p className="text-sm font-black text-gray-900">Special Spicy Momo</p>
                </div>
              </div>

              {/* Floating Widget 2 */}
              <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 font-bold text-white shadow-lg">
                <span className="text-sm">⭐️ 4.9</span>
                <span className="text-[10px] text-emerald-200 font-medium">(2k+ reviews)</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* UNIQUE INTERACTIVE CARD HIGHLIGHTS */}
      <section className="bg-white/80 py-16 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-emerald-950">Why Choose Us?</h2>
            <p className="mt-2 text-sm text-gray-500">We prioritize perfection in every single element.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feat, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-green-200"
              >
                {/* Background color block accent triggers on hovering over card */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-green-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-200/50 text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:bg-green-200">
                  {feat.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-700">
                  {feat.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <About/>
      <Footer/>

    

    </div>
  );
};

export default Home;