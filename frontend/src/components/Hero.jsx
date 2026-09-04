import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, AlertTriangle, MapPin, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <div className="hero-gradient min-h-screen flex flex-col justify-center relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="glass-card inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-slate-400">Built for SLIIT students</span>
          </div>
        </div>

        {/* Main heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            <span className="text-white">Never Lose</span>
            <br />
            <span className="gradient-text">What Matters</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every semester, hundreds of items go missing across the SLIIT campus — from student IDs and wallets to lecture notes and electronics. <strong className="text-slate-200">CampusFind</strong> is your centralized digital platform to report, search, and recover lost belongings instantly.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              to="/report"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 glow-indigo hover:scale-105"
            >
              <PlusCircle size={20} />
              Report an Item
            </Link>
            <Link
              to="/search"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all duration-300 hover:scale-105"
            >
              <Search size={20} />
              Search Database
            </Link>
          </div>
        </div>

        {/* Problem statement cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="glass-card rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-red-500/15 flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-red-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">The Problem</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Students lose valuables daily across SLIIT's sprawling campus. With no centralized system, lost items rarely find their way back to their owners.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-4">
              <MapPin size={24} className="text-emerald-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Our Solution</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              CampusFind provides a unified digital platform where anyone can report, search, and track lost or found items in real-time — completely free.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-500 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 flex items-center justify-center mb-4">
              <Shield size={24} className="text-amber-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Why It Works</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              SLIIT-specific locations, instant search, and status tracking make reuniting with your belongings faster and more reliable than ever before.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-16 pt-10 border-t border-slate-800/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">500+</div>
            <div className="text-sm text-slate-500 mt-1">Items Reported Daily</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">73%</div>
            <div className="text-sm text-slate-500 mt-1">Recovery Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">SLIIT</div>
            <div className="text-sm text-slate-500 mt-1">Campus Coverage</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
