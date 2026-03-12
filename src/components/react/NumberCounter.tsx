import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function NumberCounter({ value, prefix = "", suffix = "", label, duration = 1.5 }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <motion.div
        className="text-5xl md:text-6xl font-bold tracking-tight"
        style={{ color: "#00D4AA" }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {prefix}{display}{suffix}
      </motion.div>
      <p className="text-sm mt-2 uppercase tracking-wider font-medium" style={{ color: "#8B8FA3" }}>
        {label}
      </p>
    </div>
  );
}
