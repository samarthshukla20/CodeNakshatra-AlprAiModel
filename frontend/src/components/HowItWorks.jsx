import { motion } from 'framer-motion';
import { ImagePlus, Scan, Type } from 'lucide-react';

const steps = [
  {
    icon: ImagePlus,
    title: "1. Data Ingestion",
    desc: "Feed raw traffic or security camera footage into the pipeline. Optimized for varying lighting conditions and angles.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10"
  },
  {
    icon: Scan,
    title: "2. YOLOv8 Localization",
    desc: "The custom-trained YOLOv8 Nano model scans the frame to instantly draw high-confidence bounding boxes around license plates.",
    color: "text-violet-400",
    bg: "bg-violet-500/10"
  },
  {
    icon: Type,
    title: "3. EasyOCR Extraction",
    desc: "The localized plate is cropped and passed to the GPU-accelerated EasyOCR engine to digitize the alphanumeric characters.",
    color: "text-amber-400",
    bg: "bg-amber-500/10"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Architecture</h2>
          <p className="text-slate-400 text-lg">A seamless, two-stage machine learning pipeline.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, type: "spring", stiffness: 50 }}
              className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group"
            >
              <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-slate-400 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}