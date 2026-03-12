import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  src: string;
  srcMobile: string;
  alt: string;
}

export default function ParallaxMockup({ src, srcMobile, alt }: Props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="rounded-[2rem] overflow-hidden border border-white/5"
    >
      <picture>
        <source media="(max-width: 767px)" srcSet={srcMobile} />
        <img src={src} alt={alt} className="w-full max-w-xs" loading="lazy" />
      </picture>
    </motion.div>
  );
}
