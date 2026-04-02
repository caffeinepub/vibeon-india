import { Toaster } from "@/components/ui/sonner";
import {
  ChevronDown,
  Instagram,
  Loader2,
  Mail,
  Menu,
  Music,
  Send,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { useEffect, useState } from "react";
import { SiSpotify } from "react-icons/si";
import { toast } from "sonner";
import { useSubmitContact } from "./hooks/useQueries";
import { useScrollReveal } from "./hooks/useScrollReveal";

const YT_CHANNEL = "https://www.youtube.com/channel/UCRykKSp62IWGPM8eYxz61pw";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Music", href: "#music" },
  { label: "Vibes", href: "#vibes" },
  { label: "Connect", href: "#contact" },
];

const STATS = [
  { value: "1 Year", label: "Of Music Creation" },
  { value: "YouTube", label: "Our Home Platform" },
  { value: "Original", label: "Music & Beats" },
  { value: "India", label: "Made With Love" },
];

const PRODUCTIONS = [
  {
    id: 1,
    title: "TRACK 1",
    videoId: "CnpBeYVJXGE",
    desc: "High-energy Punjabi track — created and produced by VibeOn India.",
  },
  {
    id: 2,
    title: "TRACK 2",
    videoId: "kHCJAXJ-wag",
    desc: "A melodic original from our YouTube channel — pure emotion in every beat.",
  },
  {
    id: 3,
    title: "TRACK 3",
    videoId: "uNF-HdIiIdU",
    desc: "Electronic fusion with an Indian touch — one of our personal favourites.",
  },
  {
    id: 4,
    title: "TRACK 4",
    videoId: "i8aT0L8s1FE",
    desc: "Soulful original composition — made with love, straight from the heart.",
  },
];

const STUDIO_IMAGES = [
  {
    src: "/assets/generated/gallery-concert-1.dim_800x600.jpg",
    alt: "Live stage performance",
  },
  {
    src: "/assets/generated/gallery-studio-2.dim_800x600.jpg",
    alt: "Main recording studio",
  },
  {
    src: "/assets/generated/gallery-backstage-3.dim_800x600.jpg",
    alt: "Backstage production area",
  },
  {
    src: "/assets/generated/gallery-crowd-4.dim_800x600.jpg",
    alt: "Live session recording",
  },
  {
    src: "/assets/generated/gallery-headphones-5.dim_800x600.jpg",
    alt: "Sound engineering suite",
  },
  {
    src: "/assets/generated/gallery-stage-6.dim_800x600.jpg",
    alt: "Stage production setup",
  },
];

const BORDER_DEFAULT = "1px solid oklch(0.97 0.01 265 / 0.1)";
const BORDER_FOCUS = "1px solid oklch(0.65 0.28 290 / 0.6)";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submitContact = useSubmitContact();
  useScrollReveal();

  useEffect(() => {
    const sectionIds = ["home", "about", "music", "vibes", "contact"];
    const observers: IntersectionObserver[] = [];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    }
    return () => {
      for (const o of observers) o.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await submitContact.mutateAsync(form);
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.border = BORDER_FOCUS;
  };
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.target.style.border = BORDER_DEFAULT;
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground font-body"
      style={{ colorScheme: "dark" }}
    >
      <Toaster position="top-right" theme="dark" />

      {/* ===== NAVBAR ===== */}
      <header className="glass-nav fixed top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-1 text-xl font-display tracking-wider"
            data-ocid="nav.link"
          >
            <span className="text-white">VibeOn</span>
            <span
              style={{
                background:
                  "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              &nbsp;India
            </span>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                }`}
                style={
                  activeSection === link.href.replace("#", "")
                    ? { color: "var(--neon-purple)" }
                    : {}
                }
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.primary_button"
              className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 neon-border-gradient"
              style={{ color: "var(--neon-purple)" }}
            >
              <Youtube className="w-4 h-4" />
              Subscribe
            </a>
            <button
              type="button"
              className="md:hidden p-2 text-muted-foreground hover:text-white transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-lg px-4 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                data-ocid="nav.link"
                className="text-base font-medium text-muted-foreground hover:text-white transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="nav.primary_button"
              className="mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold neon-border-gradient"
              style={{ color: "var(--neon-purple)" }}
            >
              <Youtube className="w-4 h-4" /> Subscribe
            </a>
          </div>
        )}
      </header>

      {/* ===== HERO ===== */}
      <section
        id="home"
        className="hero-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div
          className="absolute top-20 right-[5%] w-96 h-96 rounded-full blur-3xl"
          style={{ background: "oklch(0.45 0.2 255 / 0.2)" }}
        />
        <div
          className="absolute bottom-20 left-[5%] w-72 h-72 rounded-full blur-3xl"
          style={{ background: "oklch(0.4 0.22 290 / 0.25)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ background: "oklch(0.35 0.15 195 / 0.1)" }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 w-full py-20 text-center">
          <h1
            className="font-display text-6xl sm:text-7xl lg:text-8xl uppercase leading-none tracking-tight reveal"
            style={{ transitionDelay: "0.1s" }}
          >
            <span className="block text-white">FEEL THE VIBE.</span>
            <span
              className="block"
              style={{
                background:
                  "linear-gradient(90deg, var(--neon-purple), var(--neon-pink), var(--neon-cyan))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              LIVE THE
            </span>
            <span className="block text-white">SOUND.</span>
          </h1>

          <p
            className="text-muted-foreground text-lg mt-6 max-w-xl mx-auto leading-relaxed reveal"
            style={{ transitionDelay: "0.2s" }}
          >
            A new music creation channel from India — originals, beats, and pure
            vibe. All on YouTube.
          </p>

          <div
            className="flex flex-wrap justify-center gap-4 mt-10 reveal"
            style={{ transitionDelay: "0.3s" }}
          >
            <a
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.primary_button"
              className="pulse-glow flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.28 290), oklch(0.65 0.28 340))",
                color: "white",
                boxShadow: "0 0 24px oklch(0.65 0.28 290 / 0.4)",
              }}
            >
              <Youtube className="w-4 h-4" />
              Subscribe on YouTube
            </a>
            <button
              type="button"
              onClick={() => handleNavClick("#music")}
              data-ocid="hero.secondary_button"
              className="flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white/10"
              style={{
                border: "1.5px solid oklch(1 0 0 / 0.2)",
                color: "oklch(0.85 0 0)",
              }}
            >
              <Music className="w-4 h-4" />
              Watch Our Music
            </button>
          </div>

          <div
            className="flex justify-center items-center gap-5 mt-10 reveal"
            style={{ transitionDelay: "0.4s" }}
          >
            <a
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.link"
              className="text-muted-foreground hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.link"
              className="text-muted-foreground hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.link"
              className="text-muted-foreground hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://open.spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="hero.link"
              className="text-muted-foreground hover:text-white transition-all duration-200 hover:scale-110"
              aria-label="Spotify"
            >
              <SiSpotify className="w-5 h-5" />
            </a>
          </div>

          <div
            className="flex justify-center mt-16 reveal"
            style={{ transitionDelay: "0.5s" }}
          >
            <button
              type="button"
              onClick={() => handleNavClick("#about")}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-white transition-colors"
              aria-label="Scroll to about section"
            >
              <span className="text-xs tracking-widest uppercase">Explore</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <div
        style={{
          background: "oklch(0.1 0.025 265)",
          borderTop: "1px solid oklch(0.65 0.28 290 / 0.15)",
          borderBottom: "1px solid oklch(0.65 0.28 290 / 0.15)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                data-ocid={`stats.item.${i + 1}`}
                className="text-center rounded-xl p-5 reveal"
                style={{
                  background: "oklch(0.13 0.03 265)",
                  border: "1px solid oklch(0.65 0.28 290 / 0.2)",
                  transitionDelay: `${i * 0.08}s`,
                  boxShadow: "0 0 20px oklch(0.65 0.28 290 / 0.05)",
                }}
              >
                <p
                  className="font-display text-3xl sm:text-4xl font-bold"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm mt-1 leading-tight">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.3 0.12 290 / 0.07) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-left">
              <div
                className="relative rounded-2xl overflow-hidden aspect-[4/5]"
                style={{
                  boxShadow:
                    "0 0 30px oklch(0.65 0.28 290 / 0.25), 0 0 70px oklch(0.65 0.28 290 / 0.1)",
                  border: "1px solid oklch(0.65 0.28 290 / 0.3)",
                }}
              >
                <img
                  src="/assets/generated/gallery-headphones-5.dim_800x600.jpg"
                  alt="VibeOn India"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.08 0.03 270 / 0.6) 0%, transparent 60%)",
                  }}
                />
              </div>
            </div>

            <div className="reveal-right">
              <p className="section-label mb-3">Who We Are</p>
              <h2 className="font-display text-5xl sm:text-6xl uppercase text-white mb-6 leading-none">
                ABOUT{" "}
                <span style={{ color: "var(--neon-purple)" }}>VIBEON</span>
                <br />
                <span style={{ color: "var(--neon-cyan)" }}>INDIA</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-white">VibeOn India</strong> is a
                  music creation channel born out of pure passion. We started
                  just 1 year ago with one goal — to make original music and
                  share it with the world.
                </p>
                <p>
                  From Punjabi vibes to indie beats, every track is made from
                  the heart. No studio for hire. No artist management. Just
                  music — created, recorded, and uploaded.
                </p>
                <p>
                  We're on YouTube sharing our journey, our songs, and our
                  sound. If it moves you, that's the whole point.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Original Music",
                  "Punjabi Vibes",
                  "YouTube Channel",
                  "1 Year Strong",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide"
                    style={{
                      border: "1px solid oklch(0.65 0.28 290 / 0.4)",
                      color: "var(--neon-purple)",
                      background: "oklch(0.65 0.28 290 / 0.08)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MUSIC ===== */}
      <section
        id="music"
        className="py-24"
        style={{ background: "oklch(0.08 0.02 265)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="section-label mb-3">Watch & Listen</p>
            <h2 className="font-display text-5xl sm:text-6xl uppercase text-white">
              OUR MUSIC
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal-stagger">
            {PRODUCTIONS.map((track, i) => (
              <div
                key={track.id}
                data-ocid={`music.item.${i + 1}`}
                className="card-hover rounded-xl overflow-hidden neon-border-gradient relative"
              >
                <div
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "oklch(0.14 0.025 265)", zIndex: 0 }}
                />
                <div className="relative z-10">
                  <div className="aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${track.videoId}?rel=0&modestbranding=1`}
                      title={track.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg text-white tracking-wide mb-1">
                      {track.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {track.desc}
                    </p>
                    <a
                      href={`https://www.youtube.com/watch?v=${track.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-ocid={`music.link.${i + 1}`}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold transition-colors"
                      style={{ color: "var(--neon-cyan)" }}
                    >
                      <Youtube className="w-3.5 h-3.5" /> Watch on YouTube
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 reveal">
            <a
              href={YT_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="music.primary_button"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 neon-glow-purple"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.65 0.28 290), oklch(0.65 0.28 340))",
                color: "white",
              }}
            >
              <Youtube className="w-4 h-4" /> View All on YouTube
            </a>
          </div>
        </div>
      </section>

      {/* ===== VIBES ===== */}
      <section id="vibes" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="section-label mb-3">Our World</p>
            <h2 className="font-display text-5xl sm:text-6xl uppercase text-white">
              THE VIBES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal-stagger">
            {STUDIO_IMAGES.map((img, i) => (
              <div
                key={img.src}
                data-ocid={`vibes.item.${i + 1}`}
                className="card-hover relative rounded-xl overflow-hidden aspect-video group"
                style={{
                  border: "1px solid oklch(0.65 0.28 290 / 0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.08 0.03 270 / 0.8) 0%, transparent 60%)",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow:
                      "inset 0 0 0 1.5px oklch(0.65 0.28 290 / 0.6), 0 0 30px oklch(0.65 0.28 290 / 0.2)",
                  }}
                />
                <div className="absolute bottom-3 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-semibold">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section
        id="contact"
        className="py-24"
        style={{ background: "oklch(0.08 0.02 265)" }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14 reveal">
            <p className="section-label mb-3">Say Hello</p>
            <h2 className="font-display text-5xl sm:text-6xl uppercase text-white">
              CONNECT WITH US
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact form */}
            <div
              className="lg:col-span-2 rounded-2xl p-6 sm:p-8 reveal-left"
              style={{
                background: "oklch(0.12 0.022 265)",
                border: "1px solid oklch(0.65 0.28 290 / 0.2)",
              }}
            >
              <h3 className="font-display text-2xl text-white mb-6 uppercase tracking-wide">
                Drop a Message
              </h3>
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                data-ocid="contact.modal"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Your name"
                      data-ocid="contact.input"
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-muted-foreground text-sm focus:outline-none transition-all duration-200"
                      style={{
                        background: "oklch(0.16 0.025 265)",
                        border: BORDER_DEFAULT,
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      data-ocid="contact.input"
                      className="w-full px-4 py-3 rounded-xl text-white placeholder-muted-foreground text-sm focus:outline-none transition-all duration-200"
                      style={{
                        background: "oklch(0.16 0.025 265)",
                        border: BORDER_DEFAULT,
                      }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold text-muted-foreground uppercase tracking-widest block mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    placeholder="Tell us what you think, suggest a collab, or just say hi..."
                    rows={5}
                    data-ocid="contact.textarea"
                    className="w-full px-4 py-3 rounded-xl text-white placeholder-muted-foreground text-sm focus:outline-none transition-all duration-200 resize-none"
                    style={{
                      background: "oklch(0.16 0.025 265)",
                      border: BORDER_DEFAULT,
                    }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitContact.isPending}
                  data-ocid="contact.submit_button"
                  className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.65 0.28 290), oklch(0.65 0.28 340))",
                    color: "white",
                    boxShadow: "0 0 20px oklch(0.65 0.28 290 / 0.35)",
                  }}
                >
                  {submitContact.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Right cards */}
            <div className="flex flex-col gap-6">
              <div
                className="rounded-2xl p-6 reveal-right"
                style={{
                  background: "oklch(0.12 0.022 265)",
                  border: "1px solid oklch(0.65 0.28 340 / 0.25)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: "oklch(0.65 0.28 340 / 0.15)",
                    border: "1px solid oklch(0.65 0.28 340 / 0.3)",
                  }}
                >
                  <Mail
                    style={{ color: "var(--neon-pink)", width: 18, height: 18 }}
                  />
                </div>
                <h3 className="font-display text-xl text-white uppercase tracking-wide">
                  Collab or Connect
                </h3>
                <p className="text-muted-foreground text-sm mt-2 mb-4 leading-relaxed">
                  Got a song idea, want to collab, or just vibe with us? Drop us
                  a message.
                </p>
                <a
                  href="mailto:hello@vibeonindia.com"
                  data-ocid="contact.link"
                  className="flex items-center gap-2 text-sm font-semibold transition-colors"
                  style={{ color: "var(--neon-pink)" }}
                >
                  <Mail className="w-4 h-4" /> hello@vibeonindia.com
                </a>
              </div>

              <div
                className="rounded-2xl p-6 reveal-right"
                style={{
                  background: "oklch(0.12 0.022 265)",
                  border: "1px solid oklch(0.82 0.18 195 / 0.25)",
                  transitionDelay: "0.1s",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                  style={{
                    background: "oklch(0.82 0.18 195 / 0.12)",
                    border: "1px solid oklch(0.82 0.18 195 / 0.3)",
                  }}
                >
                  <Youtube
                    style={{ color: "var(--neon-cyan)", width: 18, height: 18 }}
                  />
                </div>
                <h3 className="font-display text-xl text-white uppercase tracking-wide mb-2">
                  Follow Us
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stay connected across all platforms.
                </p>
                <div className="flex gap-4">
                  <a
                    href={YT_CHANNEL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.link"
                    className="text-muted-foreground hover:text-white transition-all hover:scale-110"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.link"
                    className="text-muted-foreground hover:text-white transition-all hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.link"
                    className="text-muted-foreground hover:text-white transition-all hover:scale-110"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href="https://open.spotify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.link"
                    className="text-muted-foreground hover:text-white transition-all hover:scale-110"
                    aria-label="Spotify"
                  >
                    <SiSpotify className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        className="py-10"
        style={{
          background: "oklch(0.07 0.018 265)",
          borderTop: "1px solid oklch(0.65 0.28 290 / 0.15)",
          boxShadow: "0 -20px 60px oklch(0.65 0.28 290 / 0.05)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="font-display text-xl tracking-wider">
              <span className="text-white">VibeOn</span>
              <span
                style={{
                  background:
                    "linear-gradient(90deg, var(--neon-purple), var(--neon-pink))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                &nbsp;India
              </span>
            </div>

            <nav className="flex flex-wrap justify-center gap-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="footer.link"
                  className="text-xs text-muted-foreground hover:text-white transition-colors uppercase tracking-widest"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <p className="text-xs text-muted-foreground text-center">
              © {new Date().getFullYear()} VibeOn India.{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Built with ❤️ using caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
