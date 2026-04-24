import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  
  // Parallax calculations: As you scroll down, these elements move up at different speeds
  const blob1Y = useTransform(scrollY, [0, 500], [0, -150]);
  const blob2Y = useTransform(scrollY, [0, 500], [0, -250]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
      
      {/* Background Parallax Elements */}
      <motion.div 
        style={{ y: blob1Y }}
        className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob z-0" 
      />
      <motion.div 
        style={{ y: blob2Y }}
        className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-violet-600/20 rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000 z-0" 
      />

      {/* Foreground Text */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="z-10 relative"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-emerald-400 font-mono tracking-[0.2em] uppercase text-sm mb-6 block"
        >
          Computer Vision / Real-Time OCR
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-gradient-to-br from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
        >
          ALPR <br /> INTELLIGENCE
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-10 leading-relaxed font-light"
        >
          High-precision vehicle localization and character extraction powered by YOLOv8. 
          Built for seamless edge inference.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 justify-center"
        >
          <button onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })} className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-emerald-400 transition-all shadow-[0_0_40px_rgba(52,211,153,0.3)] hover:shadow-[0_0_60px_rgba(52,211,153,0.5)]">
            Start Inference
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 animate-bounce"
      >
        <span className="text-slate-500 text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
}