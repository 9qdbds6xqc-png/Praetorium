import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [language, setLanguage] = useState<"en" | "de">("en");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const content = {
    en: {
      privacy: "Privacy Policy",
      terms: "Terms of Service"
    },
    de: {
      privacy: "Datenschutzerklärung",
      terms: "Nutzungsbedingungen"
    }
  };

  return <main className="page-load relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(207_40%_15%/0.15),transparent_50%)]" />
      
      {/* Cursor glow effect */}
      <div className="pointer-events-none fixed h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl transition-all duration-500" style={{
      left: `${mousePosition.x}px`,
      top: `${mousePosition.y}px`
    }} />

      {/* Theme and Language controls */}
      <div className="fade-in absolute right-6 top-6 z-20 flex items-center gap-3">
        <ThemeToggle />
        <Tabs value={language} onValueChange={(value) => setLanguage(value as "en" | "de")}>
          <TabsList>
            <TabsTrigger value="en">EN</TabsTrigger>
            <TabsTrigger value="de">DE</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <div className="fade-in mb-10 flex flex-col items-center gap-6">
          <svg
            width="96"
            height="96"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="hero-arrow-icon"
          >
            <polyline points="18 15 12 9 6 15" />
          </svg>

          <h1 className="text-sm font-light uppercase tracking-[0.3em] text-muted-foreground">
            Praetorium
          </h1>
        </div>

        {/* Contact */}
        <a
          href="mailto:contact@praetorium.tech"
          className="fade-in-delay-2 group relative text-sm font-light tracking-wide text-muted-foreground transition-colors hover:text-foreground"
        >
          contact@praetorium.tech
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </a>

      </div>

      {/* Footer */}
      <footer className="fade-in-delay-2 absolute bottom-6 left-0 right-0 z-10">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6">
          {/* Links */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              {content[language].privacy}
            </Link>
            <span>•</span>
            <Link to="/terms" className="transition-colors hover:text-foreground">
              {content[language].terms}
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            Copyright © {new Date().getFullYear()} PRAETORIUM. All rights reserved.
          </p>
        </div>
      </footer>
    </main>;
};

export default Landing;

