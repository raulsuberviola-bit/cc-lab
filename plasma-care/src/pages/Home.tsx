import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Mic, Calendar, Shield, Activity, Clock, CheckCircle,
  Menu, X, User, BarChart, MapPin, Heart
} from "lucide-react";
import { ElevenLabsWidget } from "@/components/ElevenLabsWidget";

const useFadeIn = (delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const id = setTimeout(() => {
            el.classList.add("in-view");
          }, delay * 1000);
          observer.disconnect();
          return () => clearTimeout(id);
        }
      },
      { rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return ref;
};

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useFadeIn(delay);
  return (
    <div ref={ref} className={`fade-up ${className}`}>
      {children}
    </div>
  );
};

// ── HEADER ──────────────────────────────────────────────────────────────────
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled ? "bg-black border-b border-white/10" : "bg-transparent"}`}>
      <div className="mx-auto px-6 max-w-[1400px] flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="text-primary font-black text-3xl leading-none">›</span>
          <span className="text-white font-bold text-lg tracking-tight">VitaFlow</span>
        </div>

        <nav className="hidden md:flex items-center gap-0">
          {["Solutions", "Donor Journey", "Appointments", "Insights", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="px-4 py-5 text-sm font-medium text-white/70 hover:text-white transition-colors border-b-2 border-transparent hover:border-primary"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/5 rounded-none h-9 px-4 text-sm">
            <MapPin className="w-3.5 h-3.5 mr-1.5" /> Find a Center
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-none h-9 px-5 text-sm">
            Book Now
          </Button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/10">
          <div className="px-6 py-4 flex flex-col">
            {["Solutions", "Donor Journey", "Appointments", "Insights", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-base font-medium text-white py-3 border-b border-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-5 mb-2">
              <Button variant="outline" className="w-full rounded-none border-white/20 text-white hover:bg-white/5">
                Find a Center
              </Button>
              <Button className="w-full bg-primary text-white rounded-none">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// ── HERO ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section className="relative pt-28 pb-20 md:pt-44 md:pb-36 overflow-hidden bg-black">
    <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/20 rounded-full blur-[140px] -translate-y-1/3 translate-x-1/4 pointer-events-none" />
    <div className="absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-primary/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />

    <div className="mx-auto px-6 max-w-[1400px] relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <FadeIn>
            <div className="inline-flex items-center gap-2 mb-8 text-xs font-semibold text-primary uppercase tracking-widest">
              <span className="w-6 h-px bg-primary" />
              Next-Generation Plasma Care
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.02] tracking-tight mb-8 text-white">
              Clinical precision meets{" "}
              <span className="text-primary">genuine human warmth.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-white/55 mb-10 leading-relaxed max-w-lg">
              Transforming the plasma donor experience with seamless scheduling, personalized guidance, and intelligent operations built for modern healthcare.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none h-14 px-8 text-base shadow-[0_0_60px_-10px_hsl(274,100%,50%,0.6)]">
                <Mic className="w-5 h-5 mr-2" /> Start Voice Booking
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold rounded-none border-white/20 text-white hover:bg-white/5 hover:border-white/40">
                Explore Services <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.35} className="relative">
          <div className="relative bg-[#0a0a0a] border border-white/10 p-6 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/8 border border-white/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-white/60" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Welcome back, Sarah</div>
                  <div className="text-xs text-white/40">Donor ID: VF-8492</div>
                </div>
              </div>
              <div className="text-[10px] font-bold text-primary bg-primary/15 border border-primary/30 px-2 py-0.5 uppercase tracking-wider">
                Premier
              </div>
            </div>

            <div className="bg-white/4 border border-white/8 p-5 mb-4">
              <div className="text-xs text-white/40 font-medium uppercase tracking-widest mb-4">Your Next Appointment</div>
              <div className="text-2xl font-black text-white mb-2 tracking-tight">Wednesday, April 9</div>
              <div className="flex items-center gap-2 text-white/70 text-sm mb-5">
                <Clock className="w-3.5 h-3.5 text-primary" /> 10:30 AM
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-white/50 bg-black/40 px-3 py-2.5 border border-white/6">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-primary" />
                  VitaFlow Downtown Center
                </div>
                <div className="flex items-center gap-3 text-sm text-white/50 bg-black/40 px-3 py-2.5 border border-white/6">
                  <Heart className="w-3.5 h-3.5 shrink-0 text-primary" />
                  Estimated compensation: <strong className="text-white font-bold">$55–$75</strong>
                </div>
              </div>
            </div>

            <Button className="w-full bg-white text-black hover:bg-white/90 font-bold rounded-none text-sm h-10">
              Reschedule or Modify
            </Button>
          </div>

          <div className="badge-float absolute -right-4 -bottom-5 bg-[#0a0a0a] border border-white/10 px-4 py-3 shadow-2xl flex items-center gap-3 z-20">
            <div className="w-9 h-9 bg-primary/20 border border-primary/30 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Fast-Track Ready</div>
              <div className="text-[10px] text-white/40">Pre-screening complete</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

// ── VALUE PROPS ───────────────────────────────────────────────────────────────
const ValueProps = () => {
  const features = [
    { icon: <Mic className="w-6 h-6 text-primary" />, title: "Voice-Guided Booking", desc: "Natural language scheduling. Just say when you want to come in — our intelligent system handles the rest." },
    { icon: <User className="w-6 h-6 text-primary" />, title: "Donor Onboarding", desc: "A white-glove experience for new donors, with step-by-step guidance and personalized preparation tips." },
    { icon: <Calendar className="w-6 h-6 text-primary" />, title: "Smart Scheduling", desc: "Personalized time recommendations based on center capacity, ensuring zero wait times and optimal flow." },
    { icon: <BarChart className="w-6 h-6 text-primary" />, title: "Operational Excellence", desc: "Empowering care centers with predictive load balancing and seamless donor management tools." }
  ];

  return (
    <section id="solutions" className="py-24 bg-[#070707] border-y border-white/8">
      <div className="mx-auto px-6 max-w-[1400px]">
        <FadeIn>
          <div className="mb-14 max-w-xl">
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-primary" /> Our Capabilities
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">Precision in every interaction.</h2>
            <p className="text-white/50 text-base">Designed for those who value their time. We've eliminated friction to create a flawlessly orchestrated care experience.</p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {features.map((f, idx) => (
            <FadeIn key={idx} delay={0.08 * idx}>
              <div className="bg-[#070707] p-8 h-full group hover:bg-white/3 transition-colors duration-300">
                <div className="w-11 h-11 bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-3">{f.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{f.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── DONOR JOURNEY ─────────────────────────────────────────────────────────────
const DonorJourney = () => {
  const steps = [
    { num: "01", title: "Identify Donor", desc: "Secure, frictionless recognition of returning patrons or seamless onboarding for new guests." },
    { num: "02", title: "Recommend a Day", desc: "Intelligent suggestions based on donor history and optimal clinic capacity windows." },
    { num: "03", title: "Capture Date & Time", desc: "Natural conversation or one-tap confirmation locks in your preferred schedule instantly." },
    { num: "04", title: "Confirm & Adapt", desc: "Instant confirmation with proactive alternatives if your schedule shifts unexpectedly." }
  ];

  return (
    <section id="donor-journey" className="py-28 bg-black relative overflow-hidden">
      <div className="absolute right-0 top-0 w-[600px] h-full bg-primary/5 pointer-events-none" />
      <div className="mx-auto px-6 max-w-[1400px] relative z-10">
        <FadeIn>
          <div className="mb-16">
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-primary" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 max-w-3xl leading-tight">The VitaFlow Journey.</h2>
            <p className="text-lg text-white/50 max-w-2xl">
              A thoughtfully choreographed sequence ensuring your time is respected from the moment you engage.
            </p>
          </div>
        </FadeIn>

        <div className="relative">
          <div className="absolute top-[28px] left-0 right-0 h-px bg-white/8 hidden lg:block" />
          <div className="absolute top-[28px] left-0 w-1/3 h-px bg-gradient-to-r from-primary to-primary/30 hidden lg:block" />
          <div className="grid lg:grid-cols-4 gap-10 lg:gap-6">
            {steps.map((step, idx) => (
              <FadeIn key={idx} delay={idx * 0.12}>
                <div className="relative pt-0">
                  <div className="relative z-10 w-14 h-14 bg-black border border-primary/40 flex items-center justify-center mb-8">
                    <span className="text-sm font-black text-primary tracking-widest">{step.num}</span>
                    <div className="absolute inset-0 bg-primary/10 blur-md -z-10" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-white/45 leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ── APPOINTMENTS ──────────────────────────────────────────────────────────────
const chatMessages = [
  { side: "left",  text: "I'd like to schedule a donation for next Tuesday afternoon." },
  { side: "right", text: "I can schedule you for Tuesday, April 8th at 2:15 PM or 3:30 PM at the Downtown Center. Which works better?" },
  { side: "left",  text: "Let's do 2:15 PM." },
  { side: "right", text: "Perfect. Confirmed for Tuesday at 2:15 PM. Estimated compensation: $65. A reminder will arrive Monday." },
] as const;

const Appointments = () => (
  <section id="appointments" className="py-24 bg-[#060606] border-y border-white/8">
    <div className="mx-auto px-6 max-w-[1400px]">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <div className="relative border border-white/10 bg-black overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary" />
            <div className="p-2 border-b border-white/8 flex items-center gap-2 bg-white/3">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="text-[11px] text-white/30 font-medium">VitaFlow Voice Assistant</span>
            </div>
            <div className="p-6 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] text-sm leading-relaxed px-4 py-3 border ${
                    msg.side === "left"
                      ? "chat-left bg-white/6 border-white/10 text-white/80 mr-auto"
                      : "chat-right bg-primary/15 border-primary/30 text-white/90 ml-auto"
                  }`}
                  style={{ animationDelay: `${idx * 0.25 + 0.3}s` }}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <div className="space-y-8">
          <FadeIn>
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-5 h-px bg-primary" /> Appointments
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
              Effortless scheduling, anywhere.
            </h2>
            <p className="text-white/50 text-base leading-relaxed">
              Say goodbye to clunky portals. Our natural-language booking engine understands context, offers center-aware alternatives, and handles short confirmations with ease.
            </p>
          </FadeIn>

          <div className="space-y-5 border-t border-white/8 pt-8">
            {[
              { title: "Conversational Intelligence", desc: "Book in plain English — just like talking to a premium concierge." },
              { title: "Center-Aware Scheduling", desc: "Live syncing with clinic capacity prevents bottlenecks and ensures swift processing." },
              { title: "Adaptive Rescheduling", desc: "Plans changed? Just ask to move your slot — we instantly find the next best opening." }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.08}>
                <div className="flex gap-4 group">
                  <div className="mt-0.5 w-5 h-5 bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{item.title}</div>
                    <div className="text-sm text-white/40">{item.desc}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ── HEALTHCARE IMPACT ─────────────────────────────────────────────────────────
const HealthcareImpact = () => (
  <section className="py-24 bg-black relative overflow-hidden">
    <div className="absolute inset-0 bg-primary/3 pointer-events-none" />
    <div className="mx-auto px-6 max-w-[1400px] relative z-10">
      <div className="max-w-2xl mb-16">
        <FadeIn>
          <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-5 h-px bg-primary" /> Healthcare Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">Elevating healthcare standards.</h2>
          <p className="text-white/50 text-base leading-relaxed">
            VitaFlow doesn't just improve the donor experience — it fundamentally upgrades clinic operations, ensuring safety, efficiency, and exceptional service quality.
          </p>
        </FadeIn>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-white/8">
        {[
          { icon: <Shield className="w-7 h-7 text-primary" />, title: "Trusted Operations", desc: "Enterprise-grade security and compliance built into the core. We safeguard donor data with clinical rigor while maintaining an approachable interface." },
          { icon: <Activity className="w-7 h-7 text-primary" />, title: "Efficient Workflows", desc: "By smoothing arrival spikes and dynamically routing donors, clinic staff can focus on care rather than administrative crowd control." },
          { icon: <Heart className="w-7 h-7 text-primary" />, title: "Service Quality", desc: "When logistics fade into the background, genuine human connection takes precedence. Healthcare delivered with hospitality." }
        ].map((card, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div className="bg-black p-10 h-full group hover:bg-white/3 transition-colors duration-300">
              <div className="mb-6">{card.icon}</div>
              <h3 className="text-lg font-bold text-white mb-3">{card.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{card.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ── INSIGHTS ──────────────────────────────────────────────────────────────────
const Insights = () => {
  const articles = [
    { category: "Technology", title: "The Voice-First Future of Donor Services", date: "Oct 12, 2025" },
    { category: "Design", title: "Designing Low-Friction Appointment Journeys", date: "Sep 28, 2025" },
    { category: "Operations", title: "Why Timing and Donor Experience Drive Retention", date: "Sep 15, 2025" }
  ];

  return (
    <section id="insights" className="py-24 bg-[#060606] border-t border-white/8">
      <div className="mx-auto px-6 max-w-[1400px]">
        <FadeIn>
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-5 h-px bg-primary" /> Insights
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2">Executive Insights</h2>
              <p className="text-white/40 text-sm">Perspectives on the future of clinical operations.</p>
            </div>
            <Button variant="ghost" className="hidden md:flex text-white/50 hover:text-white rounded-none hover:bg-white/5">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-px bg-white/8">
          {articles.map((article, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="bg-[#060606] group cursor-pointer hover:bg-white/3 transition-colors duration-300">
                <div className="h-44 bg-black relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/12 transition-colors duration-500" />
                  <div
                    className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-40"
                    style={{ background: idx === 0 ? "hsl(274,100%,50%)" : idx === 1 ? "#6366f1" : "#8b5cf6" }}
                  />
                  <div className="absolute bottom-4 left-4">
                    <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-3">{article.category}</div>
                  <h3 className="text-base font-bold text-white group-hover:text-primary/90 transition-colors duration-300 mb-3 leading-snug">
                    {article.title}
                  </h3>
                  <div className="text-xs text-white/30">{article.date}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FINAL CTA ─────────────────────────────────────────────────────────────────
const FinalCta = () => (
  <section className="py-32 bg-black relative overflow-hidden">
    <div className="absolute inset-0 bg-primary/8 pointer-events-none" />
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/15 rounded-full blur-[120px] pointer-events-none" />
    <div className="mx-auto px-6 max-w-[1400px] relative z-10 text-center">
      <FadeIn>
        <div className="text-xs font-bold text-primary uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
          <span className="w-5 h-px bg-primary" /> Get Started <span className="w-5 h-px bg-primary" />
        </div>
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
          Ready to redefine<br />the donor experience?
        </h2>
        <p className="text-xl text-white/45 mb-12 max-w-2xl mx-auto leading-relaxed">
          Try our voice assistant, book a plasma appointment, or find a VitaFlow center near you — all in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-none h-14 px-10 text-base shadow-[0_0_80px_-15px_hsl(274,100%,50%,0.8)]">
            <Mic className="w-5 h-5 mr-2" /> Talk to VitaFlow
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-10 text-base font-bold rounded-none border-white/20 text-white hover:bg-white/5">
            <MapPin className="w-4 h-4 mr-2" /> Find a Center
          </Button>
        </div>
      </FadeIn>
    </div>
  </section>
);

// ── FOOTER ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-[#030303] border-t border-white/8">
    <div className="mx-auto px-6 max-w-[1400px] py-16">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary font-black text-2xl">›</span>
            <span className="text-white font-bold text-base">VitaFlow</span>
          </div>
          <p className="text-sm text-white/35 leading-relaxed max-w-xs">
            Redefining the plasma donation experience through technology, empathy, and operational excellence.
          </p>
        </div>

        {[
          { title: "Platform", links: ["Solutions", "Appointments", "Donor Journey", "Center Locator"] },
          { title: "Company", links: ["About", "Insights", "Careers", "Partners"] },
          { title: "Support", links: ["Help Center", "Contact Us", "Accessibility", "Privacy"] }
        ].map((col) => (
          <div key={col.title}>
            <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-4">{col.title}</div>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-white/45 hover:text-white transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-white/25">© 2026 VitaFlow Health Technologies, Inc. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {["LinkedIn", "Twitter", "YouTube"].map((s) => (
            <a key={s} href="#" className="text-xs text-white/25 hover:text-white transition-colors font-medium">{s}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Hero />
      <ValueProps />
      <DonorJourney />
      <Appointments />
      <HealthcareImpact />
      <Insights />
      <FinalCta />
      <Footer />
      <ElevenLabsWidget />
    </div>
  );
}
