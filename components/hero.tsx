import { ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const floatingLabels = [
  { text: "Runtime Federation", x: "10%", y: "20%", delay: 0 },
  { text: "Nx Monorepos", x: "85%", y: "15%", delay: 0.2 },
  { text: "AI Workflows", x: "75%", y: "75%", delay: 0.4 },
  { text: "Edge Computing", x: "5%", y: "70%", delay: 0.6 },
  { text: "Platform Engineering", x: "80%", y: "45%", delay: 0.8 },
  { text: "Modular Systems", x: "15%", y: "45%", delay: 1 },
];

/* Deterministic dot positions — must be stable between SSR and client. */
const decorDots = [
  { left: "8%", top: "12%", duration: 4.1, delay: 0.4 },
  { left: "92%", top: "8%", duration: 3.4, delay: 1.2 },
  { left: "21%", top: "78%", duration: 4.6, delay: 0.1 },
  { left: "68%", top: "32%", duration: 3.9, delay: 1.7 },
  { left: "55%", top: "62%", duration: 4.3, delay: 0.8 },
  { left: "13%", top: "44%", duration: 3.6, delay: 0.2 },
  { left: "78%", top: "88%", duration: 4.8, delay: 1.1 },
  { left: "44%", top: "20%", duration: 3.3, delay: 0.5 },
  { left: "31%", top: "55%", duration: 4.4, delay: 1.6 },
  { left: "87%", top: "67%", duration: 3.8, delay: 0.9 },
  { left: "5%", top: "82%", duration: 4.7, delay: 1.3 },
  { left: "63%", top: "9%", duration: 3.5, delay: 0.3 },
  { left: "39%", top: "91%", duration: 4.2, delay: 1.0 },
  { left: "72%", top: "53%", duration: 3.7, delay: 1.8 },
  { left: "17%", top: "27%", duration: 4.5, delay: 0.6 },
  { left: "94%", top: "39%", duration: 3.2, delay: 1.5 },
  { left: "48%", top: "75%", duration: 4.0, delay: 0.7 },
  { left: "26%", top: "16%", duration: 3.1, delay: 1.4 },
  { left: "82%", top: "23%", duration: 4.9, delay: 0.0 },
  { left: "57%", top: "47%", duration: 3.0, delay: 1.9 },
];

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Static grid */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Radial gradient overlays */}
      <div className="absolute top-0 left-1/4 w-150 h-150 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-accent/10 rounded-full blur-[100px]" />

      {/* Orbital ellipses — CSS-rotated so they animate without JS */}
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse
          cx="500"
          cy="300"
          rx="400"
          ry="150"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="1"
          style={{
            transformOrigin: "500px 300px",
            animation: "od-orbit-cw 60s linear infinite",
          }}
        />
        <ellipse
          cx="500"
          cy="300"
          rx="300"
          ry="100"
          fill="none"
          stroke="url(#orbitGradient)"
          strokeWidth="0.5"
          style={{
            transformOrigin: "500px 300px",
            animation: "od-orbit-ccw 45s linear infinite",
          }}
        />
      </svg>

      {/* Pulsing connection dots */}
      {decorDots.map((dot, i) => (
        <span
          key={i}
          className="absolute w-1 h-1 bg-accent rounded-full"
          style={{
            left: dot.left,
            top: dot.top,
            animation: `od-pulse-dot ${dot.duration}s ease-in-out ${dot.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingLabel({
  text,
  x,
  y,
  delay,
}: {
  text: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <div
      className="absolute hidden lg:block od-anim-fade-up"
      data-llm-decoration="true"
      aria-hidden="true"
      style={{
        left: x,
        top: y,
        animationDelay: `${delay + 0.5}s`,
      }}
    >
      <div
        className="px-3 py-1.5 bg-card/80 border border-border rounded-full text-xs font-mono text-muted-foreground backdrop-blur-sm"
        style={{
          animation: `od-float-y ${4 + delay}s ease-in-out infinite`,
          animationDelay: `${delay + 1.3}s`,
        }}
      >
        {text}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GridBackground />

      {/* Floating technical labels */}
      {floatingLabels.map((label) => (
        <FloatingLabel key={label.text} {...label} />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 bg-card/60 border border-border rounded-full text-sm text-muted-foreground backdrop-blur-sm od-anim-fade-scale"
          style={{ animationDelay: "0.2s" }}
        >
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          Frontend Architecture Studio
        </div>

        {/*
          LCP element. Renders immediately with no opacity animation.
          Chrome's LCP API ignores elements painted at opacity:0 and does
          not emit a new candidate when the opacity animates to 1, which
          causes Lighthouse to report NO_LCP. Keep this element opaque.
        */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground mb-6 text-balance">
          Engineering{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
            scalable
          </span>{" "}
          systems for{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
            modern
          </span>{" "}
          products.
        </h1>

        <p
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 text-pretty od-anim-fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          We build high-performance systems and AI-powered platforms focused
          on scalability, architecture and execution speed.
        </p>

        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 od-anim-fade-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-accent text-white px-8 py-6 text-base font-medium rounded-lg transition-all duration-300 group"
            asChild
          >
            <a href="/book">
              <Calendar className="mr-2 h-4 w-4" />
              Book a Call
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-border bg-transparent hover:bg-card text-foreground px-8 py-6 text-base font-medium rounded-lg transition-all duration-300 group"
            asChild
          >
            <a href="/solutions">
              Explore Systems
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 od-anim-fade-in"
        style={{ animationDelay: "1s" }}
        aria-hidden="true"
      >
        <div
          className="w-6 h-10 border-2 border-border rounded-full flex justify-center"
          style={{ animation: "od-fade-in 2s ease-in-out 1.4s infinite alternate" }}
        >
          <span
            className="w-1.5 h-3 bg-primary rounded-full mt-2"
            style={{ animation: "od-scroll-bounce 1.5s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
}
