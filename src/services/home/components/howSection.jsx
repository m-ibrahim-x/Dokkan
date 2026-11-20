import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { Search, ShoppingCart, Truck, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Browse Products",
    description: "Explore our wide range of premium products.",
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Add to Cart",
    description: "Select your favorites and add them to your cart.",
  },
  {
    number: "03",
    icon: Truck,
    title: "Order & Receive",
    description: "Place your order and get it delivered to your doorstep.",
  },
];

export default function HowSection() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 50%"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const truckX = useTransform(scrollYProgress, [0, 1], ["16%", "84%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-28">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-active/20 blur-[140px] dark:bg-brand-active/10"
      />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-border-main bg-card-bg/80 px-4 py-1.5 text-xs font-semibold text-hero-accent shadow-sm backdrop-blur-md dark:border-border-main dark:bg-card-bg/80 dark:text-brand-active"
        >
          <Sparkles className="h-3.5 w-3.5 text-hero-accent dark:text-brand-active" />
          <span>Three Easy Steps</span>
        </motion.div>

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-text-primary md:text-5xl">
          How It <span className="text-hero-accent dark:text-brand-active">Works</span>
        </h2>
        <p className="mt-3 text-base text-text-secondary">
          Simple steps to get your items quickly and smoothly
        </p>

        {/* Steps Grid */}
        <div className="relative mt-24 grid grid-cols-1 gap-y-20 md:grid-cols-3 md:gap-x-8">
          {/* Animated Connecting Track (Desktop only) */}
          <div className="pointer-events-none absolute -top-12 left-0 z-20 hidden w-full md:block">
            {/* Dotted / Solid SVG Line */}
            <svg
              className="w-full overflow-visible"
              height="8"
              viewBox="0 0 100 1"
              preserveAspectRatio="none"
            >
              {/* Dashed background track */}
              <line
                x1="16"
                y1="0.5"
                x2="84"
                y2="0.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="2 2"
                className="text-text-secondary/35 dark:text-text-secondary/40"
              />

              {/* Animated solid progress line */}
              <motion.line
                x1="16"
                y1="0.5"
                x2="84"
                y2="0.5"
                stroke="currentColor"
                strokeWidth="2"
                className="text-hero-accent drop-shadow-[0_0_8px_var(--color-brand-active)] dark:text-brand-active dark:drop-shadow-[0_0_10px_var(--color-brand-active)]"
                style={shouldReduceMotion ? { pathLength: 1 } : { pathLength }}
              />
            </svg>

            {/* Moving Delivery Truck Badge */}
            <motion.div
              style={shouldReduceMotion ? { left: "50%" } : { left: truckX }}
              className="absolute -top-6 -translate-x-1/2"
            >
              <motion.div
                animate={shouldReduceMotion ? {} : { y: [0, -3, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex items-center justify-center"
              >
                {/* Truck shadow glow */}
                <span className="absolute -bottom-2 h-5 w-14 rounded-full bg-brand-active/40 blur-md opacity-80" />

                {/* Truck pill */}
                <div className="flex items-center gap-1.5 rounded-2xl border border-brand-active/60 bg-card-bg px-4 py-2 text-hero-accent shadow-lg backdrop-blur-xl dark:border-brand-active/60 dark:bg-card-bg dark:text-brand-active">
                  <Truck className="h-5 w-5 animate-pulse text-hero-accent dark:text-brand-active" />
                  <span className="text-[11px] font-extrabold tracking-wide uppercase">Delivering...</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Cards */}
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={shouldReduceMotion ? {} : { y: -8 }}
                className="group relative z-10 mt-4 flex flex-col items-center rounded-3xl border border-border-main/80 bg-card-bg/60 p-8 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-brand-active/80 hover:bg-card-bg/90 hover:shadow-xl dark:border-border-main dark:bg-card-bg/40 dark:hover:border-brand-active/80 dark:hover:bg-card-bg/70"
              >
                {/* Watermark Number */}
                <span className="pointer-events-none absolute top-4 end-5 text-4xl font-black text-text-secondary/15 transition-colors group-hover:text-hero-accent/30 dark:group-hover:text-brand-active/30 select-none">
                  {step.number}
                </span>

                {/* Floating Icon Box */}
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.5 }}
                  className="relative -mt-16 mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border border-border-main bg-input-bg text-hero-accent shadow-md backdrop-blur-md transition-all group-hover:border-brand-active group-hover:shadow-[0_0_20px_var(--color-brand-active)]/40 dark:border-border-main dark:bg-active-bg dark:text-brand-active dark:group-hover:border-brand-active"
                >
                  <Icon className="h-8 w-8" />
                  <span className="absolute inset-0 -z-10 rounded-2xl bg-brand-active/30 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>

                {/* Card Title */}
                <h3 className="mt-2 text-lg font-bold text-text-primary">
                  {step.title}
                </h3>

                {/* Card Description */}
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
