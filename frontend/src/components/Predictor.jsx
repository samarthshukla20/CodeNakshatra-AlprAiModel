import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, RefreshCw } from 'lucide-react';
import axios from 'axios';

export default function Predictor() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8000/predict', formData);
      setResult(res.data);
    } catch (err) {
      console.error("Inference failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10">
      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Left: Upload Zone */}
        <motion.div 
          whileHover={!image ? { scale: 1.02 } : {}}
          className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center min-h-[400px] border-dashed border-2 border-white/10 relative overflow-hidden"
        >
          {!image ? (
            <label className="cursor-pointer text-center w-full h-full flex flex-col items-center justify-center">
              <Upload className="w-12 h-12 mb-4 mx-auto text-emerald-400" />
              <p className="text-xl font-medium">Drop vehicle image</p>
              <p className="text-slate-500 text-sm mt-2">Supports JPG, PNG (Max 10MB)</p>
              <input type="file" className="hidden" onChange={handleUpload} />
            </label>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-between">
              <img 
                src={result?.image || image} 
                className="rounded-xl max-h-[300px] w-full object-contain mb-6" 
                alt="Preview" 
              />
              
              <AnimatePresence>
                {!loading && result && (
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleReset}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all text-sm font-semibold text-emerald-300"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Scan Another Plate
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        {/* Right: AI Terminal Feed */}
        <div className="glass-card rounded-3xl p-6 font-mono text-sm flex flex-col">
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          
          <div className="flex-1 space-y-3">
            <p className="text-violet-400">{">"} Initializing ALPR Pipeline...</p>
            {loading && <p className="animate-pulse text-amber-400">{">"} YOLOv8 Tensor Cores Active...</p>}
            
            <AnimatePresence>
              {result && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  <p className="text-emerald-400 mt-2">{">"} Detection Success!</p>
                  
                  <div className="mt-6 p-4 bg-black/40 rounded-xl border border-white/5">
                    <p className="text-slate-400 mb-1">EXTRACTED TEXT</p>
                    <p className="text-white font-bold text-3xl tracking-wider">
                      {result.results[0]?.plate || "NO PLATE DETECTED"}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-4">
                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20">
                      Confidence: {((result.results[0]?.confidence || 0) * 100).toFixed(1)}%
                    </div>
                    <div className="px-3 py-1 bg-violet-500/10 text-violet-300 rounded border border-violet-500/20">
                      Model: YOLOv8 Nano
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}