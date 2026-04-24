import Hero from './components/Hero';
import Predictor from './components/Predictor';
import HowItWorks from './components/HowItWorks';
import Metrics from './components/Metrics';

function App() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <Hero />
      <HowItWorks />
      <Metrics />
      <Predictor />
      
      {/* Optional: A simple footer */}
      <footer className="py-8 text-center text-slate-600 text-sm font-mono border-t border-white/5 relative z-10">
        ALPR System • Developed for Hackathon Submission
      </footer>
    </main>
  );
}

export default App;