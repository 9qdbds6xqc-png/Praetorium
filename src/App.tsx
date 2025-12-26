import React from 'react';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { trackButtonClick } from './lib/analytics';

function App() {
  return (
    <>
      <GoogleAnalytics />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
              PRAETORIUM
            </h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-slate-300 font-light">
              Enabling startups and KMUs to access the defence market
            </p>
          </div>

          {/* Coming Soon Message */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Coming Soon
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We're building the platform that connects innovative defence technology startups
              with procurement opportunities. Stay tuned for groundbreaking solutions.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => trackButtonClick('notify_me', 'hero-cta')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Notify Me When We Launch
            </button>
            <button
              onClick={() => trackButtonClick('learn_more', 'secondary-cta')}
              className="px-8 py-4 border-2 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Learn More
            </button>
          </div>

          {/* Contact Info */}
          <div className="text-slate-500 text-sm">
            <p>For partnership inquiries: <a href="mailto:contact@praetorium.tech" className="text-blue-400 hover:text-blue-300">contact@praetorium.tech</a></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
