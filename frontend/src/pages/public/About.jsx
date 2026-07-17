import React, { useState } from "react";
import { Leaf, Heart, Recycle, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function About() {
  const [activeTab, setActiveTab] = useState("sourcing");

  const pillars = {
    sourcing: {
      title: "Rooted in Freshness",
      subtitle: "Hyper-Local & 100% Organic",
      description:
        "We partner exclusively with independent, eco-conscious farms located within a 50-mile radius. If it isn't freshly harvested and in-season, it doesn't make it onto our menu. Pure flavor, zero compromises.",
      icon: <Leaf className="w-6 h-6 text-green-700" />,
      tag: "The Dirt",
    },
    soul: {
      title: "Crafted with Connection",
      subtitle: "Made From Scratch, With Love",
      description:
        "Our kitchen functions like a laboratory of flavor and a home cozy dining room combined. Every sauce is simmered for hours, every dough is hand-kneaded, and every plate is served with a story.",
      icon: <Heart className="w-6 h-6 text-green-700" />,
      tag: "The Kitchen",
    },
    waste: {
      title: "Honoring the Planet",
      subtitle: "A Zero-Waste Obsession",
      description:
        "We don't just cook food; we respect it. From composting prep scraps to utilizing root-to-stem cooking techniques, our kitchen runs on a 95% diversion rate from landfills.",
      icon: <Recycle className="w-6 h-6 text-green-700" />,
      tag: "The Mission",
    },
  };

  return (
    <section className="bg-[#fcfbf7] py-20 px-6 md:px-12 lg:px-24 font-sans text-stone-800 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Block */}
        <div className="mb-16 max-w-2xl">
          <span className="text-sm font-semibold tracking-widest text-green-700 uppercase bg-green-100 px-3 py-1 rounded-full">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 mt-4 leading-tight">
            Rooted in Flavor, <br />
            <span className="underline decoration-green-300 decoration-wavy decoration-2">
              Crafted with Soul.
            </span>
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Meet 'The Green Fork'—where vibrant ingredients meet passionate
            people to redefine conscious dining.
          </p>
        </div>

        {/* Unique Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Interactive Navigation Pillars (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {Object.keys(pillars).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 ${
                  activeTab === key
                    ? "border-transparent bg-green-300 shadow-md translate-x-2"
                    : "border-stone-200 bg-white hover:border-green-200"
                }`}
              >
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  {pillars[key].icon}
                </div>
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-stone-500 block mb-0.5">
                    {pillars[key].tag}
                  </span>
                  <span className="font-bold text-lg text-stone-900">
                    {pillars[key].title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* RIGHT COLUMN: The Dynamic Card & Design Elements (8 Cols) */}
          <div className="lg:col-span-8 relative min-h-[420px] w-full">
            {/* Background design accent blob representing green-300 theme */}
            <div className="absolute top-8 left-8 right-0 bottom-0 bg-green-300/40 rounded-3xl -rotate-1 transform pointer-events-none hidden sm:block" />

            {/* Main Interactive Content Card */}
            <div className="relative bg-white border border-stone-200 rounded-3xl p-8 md:p-12 shadow-xl transition-all duration-500 ease-in-out transform flex flex-col justify-between h-full min-h-[380px]">
              <div>
                <div className="flex items-center justify-between border-b border-stone-100 pb-6 mb-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-green-700 bg-green-50 px-2.5 py-1 rounded">
                      {pillars[activeTab].tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-stone-900 mt-2">
                      {pillars[activeTab].title}
                    </h3>
                  </div>
                  <div className="p-4 bg-green-50 rounded-2xl hidden sm:block">
                    {pillars[activeTab].icon}
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-stone-700 mb-3 italic">
                  "{pillars[activeTab].subtitle}"
                </h4>
                <p className="text-stone-600 leading-relaxed text-base md:text-lg">
                  {pillars[activeTab].description}
                </p>
              </div>

              {/* Action Call */}
              <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-stone-400">
                  Founded in 2023 • Community Driven
                </p>
                <Link to="/menu">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors group text-sm self-start sm:self-auto">
                    Order Foods
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
