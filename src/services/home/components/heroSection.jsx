import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import {
  ArrowRight,
  CreditCard,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const trustItems = [
  { icon: ShieldCheck, label: "Secure checkout" },
  { icon: Truck, label: "Fast delivery" },
  { icon: RefreshCw, label: "Easy returns" },
];

const eyeKeys = ["start", "end"];

export default function HeroSection() {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  const mouseX = useSpring(0, { stiffness: 120, damping: 14 });
  const mouseY = useSpring(0, { stiffness: 120, damping: 14 });

  const rotateY = useTransform(mouseX, [-1, 1], [-18, 18]);
  const rotateX = useTransform(mouseY, [-1, 1], [18, -18]);

  const tagX = useTransform(mouseX, [-1, 1], [25, -25]);
  const tagY = useTransform(mouseY, [-1, 1], [25, -25]);

  const visaX = useTransform(mouseX, [-1, 1], [-25, 25]);
  const visaY = useTransform(mouseY, [-1, 1], [-25, 25]);

  const pupilX = useTransform(mouseX, [-1, 1], [-9, 9]);
  const pupilY = useTransform(mouseY, [-1, 1], [-9, 9]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let blinkTimeout;

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      blinkTimeout = setTimeout(() => setIsBlinking(false), 200);
    }, 4500);

    return () => {
      clearInterval(blinkInterval);
      clearTimeout(blinkTimeout);
    };
  }, [shouldReduceMotion]);

  const handleMouseMove = (event) => {
    if (shouldReduceMotion || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();

    const x =
      (event.clientX - (rect.left + rect.width / 2)) /
      (rect.width / 2);
    const y =
      (event.clientY - (rect.top + rect.height / 2)) /
      (rect.height / 2);

    mouseX.set(Math.max(-1, Math.min(1, x)));
    mouseY.set(Math.max(-1, Math.min(1, y)));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative isolate flex min-h-svh w-full items-center overflow-hidden bg-[linear-gradient(135deg,var(--theme-hero-bg-start)_0%,var(--theme-hero-bg-mid)_45%,var(--theme-hero-bg-end)_100%)] px-5 pt-28 pb-16 text-text-primary transition-colors duration-500 sm:px-6 md:pt-32 md:pb-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-hero-accent/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-hero-accent/10 blur-[140px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="space-y-6 text-center lg:text-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border-main bg-card-bg px-3.5 py-1.5 text-xs font-semibold text-hero-accent shadow-sm"
          >
            <Sparkles
              className="size-3.5 animate-pulse"
              aria-hidden="true"
            />
            <span>Blink and You'll Order</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-black leading-[1.12] tracking-tight text-balance sm:text-5xl md:text-6xl"
          >
            Elevate Your Style With{" "}
            <span className="bg-gradient-to-r from-hero-accent via-hero-accent-soft to-text-primary bg-clip-text text-transparent">
              Dokkan
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-xl text-sm leading-relaxed text-text-secondary md:text-base lg:mx-0"
          >
            Curated items so good, even your bank account will forgive
            you. Discover luxury pieces, smooth-as-butter shopping, and
            delivery so fast it feels like magic.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2 lg:justify-start"
          >
            <NavLink
              to="/products"
              className="group inline-flex items-center gap-2.5 rounded-full bg-hero-accent px-7 py-3.5 text-sm font-bold text-bg-main shadow-lg shadow-black/15 transition-all duration-300 hover:bg-hero-accent-hover hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main"
            >
              <span>Explore Collection</span>
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </NavLink>

            <NavLink
              to="/cart"
              className="inline-flex items-center gap-2 rounded-full border border-border-main bg-card-bg/50 px-6 py-3.5 text-sm font-semibold text-text-primary transition-colors duration-300 hover:bg-card-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main"
            >
              <ShoppingBag
                className="size-4 text-hero-accent"
                aria-hidden="true"
              />
              <span>View Cart</span>
            </NavLink>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-border-main/60 pt-6 text-xs font-medium text-text-secondary lg:justify-start"
          >
            {trustItems.map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2">
                <Icon
                  className="size-4 text-hero-accent"
                  aria-hidden="true"
                />
                <span>{label}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative flex items-center justify-center py-10 [perspective:1000px] lg:py-14">
          <motion.div
            style={
              shouldReduceMotion
                ? undefined
                : { rotateX, rotateY }
            }
            className="relative"
            aria-hidden="true"
          >
            <div className="absolute -bottom-6 left-1/2 h-5 w-36 -translate-x-1/2 rounded-full bg-black/30 blur-md dark:bg-black/50" />

            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : { x: tagX, y: tagY }
              }
              className="absolute -top-7 -start-6 z-20 flex items-center gap-2 rounded-2xl border border-hero-accent/30 bg-card-bg p-2.5 shadow-xl sm:-start-10 lg:-start-14"
            >
              <Tag
                className="size-4 text-hero-accent"
                aria-hidden="true"
              />
              <span className="text-[10px] font-bold text-text-primary">
                HOT DEALS 50%
              </span>
            </motion.div>

            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : { x: visaX, y: visaY }
              }
              className="absolute -end-6 -bottom-4 z-20 flex items-center gap-2 rounded-2xl bg-gradient-to-r from-hero-accent to-hero-wallet-rim p-2.5 font-bold text-bg-main shadow-xl sm:-end-10 lg:-end-14"
            >
              <CreditCard className="size-4" aria-hidden="true" />
              <span className="text-[10px]">VIP MEMBER</span>
            </motion.div>

            <motion.div
              animate={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: isHovered ? [0, -8, 0] : [0, -4, 0] }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                    }
              }
              className="relative flex h-48 w-44 flex-col items-center justify-center gap-3 rounded-b-3xl rounded-t-xl bg-gradient-to-br from-hero-wallet-start via-hero-wallet-mid to-hero-wallet-end p-1 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),inset_10px_10px_20px_rgba(255,255,255,0.3),0_20px_40px_rgba(0,0,0,0.4)] sm:h-56 sm:w-52"
            >
              <div className="absolute -top-10 h-14 w-20 rounded-t-full border-4 border-hero-accent shadow-md" />

              <div className="relative z-10 flex gap-6 pt-4">
                {eyeKeys.map((eye) => (
                  <div
                    key={eye}
                    className="relative flex h-13 w-11 items-center justify-center overflow-hidden rounded-full bg-white shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)] sm:h-14 sm:w-12"
                  >
                    <motion.div
                      animate={{ scaleY: isBlinking ? 1 : 0 }}
                      className="absolute inset-0 z-20 origin-top bg-hero-wallet-rim"
                    />

                    <motion.div
                      style={
                        shouldReduceMotion
                          ? undefined
                          : { x: pupilX, y: pupilY }
                      }
                      className="relative flex h-7 w-6 items-center justify-center rounded-full bg-hero-ink"
                    >
                      <span className="absolute start-1 top-1 size-2 rounded-full bg-white" />
                    </motion.div>
                  </div>
                ))}
              </div>

              <span className="relative z-10 text-[11px] font-black uppercase tracking-widest text-hero-ink opacity-80">
                DOKKAN
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
