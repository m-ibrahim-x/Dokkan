import { NavLink } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  Mail,
  Phone,
  Globe,
  Share2,
  MessageCircle,
  Send,
  Flashlight,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import Logo from "../ui/logo";

export default function Footer({ onSocialClick, onNewsletterSubmit }) {
  const footerNavLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/products" },
    { label: "My Orders", path: "/profile/orders" },
    { label: "Carts", path: "/cart" },
    { label: "Wishlist", path: "/wishlist" },
  ];

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (onNewsletterSubmit) {
      const email = e.target.elements?.email?.value;
      onNewsletterSubmit(email);
    }
  };

  return (
    <footer className="relative w-full overflow-hidden bg-[#1C1713] text-[#EBE8E5] pt-28 pb-10">
      {/* Wave SVG separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none -translate-y-[98%] pointer-events-none">
        <svg
          className="relative block w-full h-[80px] md:h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,90 600,-30 900,60 C1050,105 1150,40 1200,20 L1200,120 L0,120 Z"
            className="fill-[#120e0c]"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#2b221e]/80 items-center">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <NavLink to="/" className="dark flex items-center" aria-label="Dokkan Home">
              <Logo markClassName="h-10" textClassName="h-6" />
            </NavLink>
            <p className="text-xs text-text-secondary leading-relaxed">
              Warning: Browsing our collection may cause extreme happiness and heavy carts.
            </p>
          </div>

          {/* Column 2: Quick Links with Spotlight Effect */}
          <div className="space-y-4 md:justify-self-center">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-active">Quick Links</h4>
            <ul className="space-y-3">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `relative inline-flex items-center gap-2 text-xs transition-colors duration-300 ${
                        isActive ? "text-text-primary font-bold ps-1" : "text-text-secondary hover:text-text-primary"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="side-spotlight"
                            className="relative flex items-center pe-1"
                            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                          >
                            <Flashlight className="h-4 w-4 text-brand-active rotate-45 drop-shadow-[0_0_8px_var(--theme-brand-active)]" />
                            <div
                              className="absolute left-3 w-16 h-6 pointer-events-none opacity-80 z-0"
                              style={{
                                clipPath: "polygon(0% 40%, 100% 0%, 100% 100%, 0% 60%)",
                                background:
                                  "linear-gradient(to right, color-mix(in srgb, var(--theme-brand-active) 90%, transparent) 0%, color-mix(in srgb, var(--theme-brand-active) 15%, transparent) 75%, transparent 100%)",
                              }}
                            />
                          </motion.div>
                        )}
                        <span className="relative z-10">{link.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Us & Social Links */}
          <div className="space-y-4 md:mb-12">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-active">Contact Us</h4>
            <div className="space-y-2.5 text-xs text-text-secondary">
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-active" /> Bassanttfarag28@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-brand-active" /> +201277237317
              </p>
            </div>
            <div className="flex items-center gap-3.5 pt-1 text-text-secondary">
              <button
                type="button"
                aria-label="Website"
                onClick={() => onSocialClick?.("globe")}
                className="hover:text-brand-active transition-colors cursor-pointer"
              >
                <Globe className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Share"
                onClick={() => onSocialClick?.("share")}
                className="hover:text-brand-active transition-colors cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Messages"
                onClick={() => onSocialClick?.("message")}
                className="hover:text-brand-active transition-colors cursor-pointer"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Send"
                onClick={() => onSocialClick?.("send")}
                className="hover:text-brand-active transition-colors cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Column 4: 3D Interactive Floating VIP Card */}
          <div className="flex justify-center items-center perspective-1000">
            <motion.div
              animate={{
                y: [0, -8, 0],
                rotateX: [5, -5, 5],
                rotateY: [-10, 10, -10],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-48 h-32 rounded-2xl bg-gradient-to-br from-[#2a211c] via-[#1c1613] to-[#0d0a08] p-4 border border-brand-active/30 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-md flex flex-col justify-between overflow-hidden group cursor-pointer"
            >
              <div className="absolute -right-6 -top-6 w-20 h-20 bg-brand-active/10 rounded-full blur-xl group-hover:bg-brand-active/20 transition-all duration-500" />

              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] uppercase tracking-widest text-brand-active font-semibold">Special Edition</span>
                <Sparkles className="h-4 w-4 text-brand-active animate-pulse" />
              </div>

              <div className="relative z-10 my-auto">
                <p className="text-xs font-bold text-text-primary">Dokkan VIP Club</p>
                <p className="text-[10px] text-text-secondary">Unlock exclusive deals</p>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-brand-active font-semibold relative z-10">
                <ShoppingBag className="h-3 w-3" />
                <span>Shop Premium</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Newsletter & Copyright */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4">
          <form onSubmit={handleNewsletter} className="relative flex w-full max-w-md items-center">
            <input
              type="email"
              name="email"
              placeholder="Enter your email address..."
              className="w-full rounded-full border border-[#2b221e] bg-[#0c0908] py-2.5 ps-5 pe-28 text-xs text-text-primary placeholder:text-text-secondary focus:border-brand-active focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="absolute end-1 flex items-center gap-1.5 rounded-full bg-brand-active px-4 py-1.5 text-xs font-semibold text-text-primary transition-all hover:bg-brand-hover shadow-sm cursor-pointer"
            >
              <span>Submit</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <p className="text-[11px] text-text-secondary">
            &copy; {new Date().getFullYear()} Dokkan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
