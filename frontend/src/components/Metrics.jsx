import { motion } from 'framer-motion';

const stats = [
  { label: "mAP@50", value: "0.97", suffix: "", desc: "Mean Average Precision" },
  { label: "Precision", value: "98", suffix: "%", desc: "False positive reduction" },
  { label: "Recall", value: "95", suffix: "%", desc: "True positive detection rate" },
  { label: "Inference", value: "<50", suffix: "ms", desc: "Edge-ready speed" }
];

export default function Metrics() {
  return (
    <section className="py-24 px-4 relative z-10 border-t border-white/5 bg-slate-950/50">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Benchmarked for <br/><span className="text-emerald-400">Precision.</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Trained on a robust dataset of diverse vehicle types and environmental conditions, 
              the YOLOv8 model achieves near-perfect localization. Combined with GPU-accelerated OCR, 
              the system minimizes false positives while maintaining real-time processing speeds.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Model Weights: best.pt
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent"
              >
                <div className="text-slate-500 text-sm font-medium mb-2 uppercase tracking-wider">{stat.label}</div>
                <div className="text-4xl md:text-5xl font-black text-white mb-2 flex items-baseline gap-1">
                  {stat.value}
                  <span className="text-2xl text-emerald-400">{stat.suffix}</span>
                </div>
                <div className="text-slate-400 text-xs">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
}