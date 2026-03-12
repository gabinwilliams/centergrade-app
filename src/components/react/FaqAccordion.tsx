import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-xl border transition-colors"
            style={{
              borderColor: isOpen ? "rgba(0,212,170,0.3)" : "rgba(255,255,255,0.05)",
              background: isOpen ? "#141928" : "rgba(20,25,40,0.5)",
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold pr-4" style={{ color: "#FFFFFF" }}>{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xl flex-shrink-0"
                style={{ color: "#00D4AA" }}
              >
                +
              </motion.span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-6 pb-4 leading-relaxed ml-6"
                    style={{ color: "#8B8FA3", borderLeft: "2px solid #00D4AA" }}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
