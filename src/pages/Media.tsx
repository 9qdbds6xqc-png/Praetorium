import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

const Media = () => {
  const [language, setLanguage] = useState<"en" | "de">("en");

  const content = {
    en: {
      title: "Media & Logos",
      description: "Download PRAETORIUM logos and brand assets",
      chevronLogo: "Chevron Logo",
      fullLogo: "Full Logo",
      download: "Download",
      back: "Back"
    },
    de: {
      title: "Medien & Logos",
      description: "PRAETORIUM Logos und Marken-Assets herunterladen",
      chevronLogo: "Chevron-Logo",
      fullLogo: "Vollständiges Logo",
      download: "Herunterladen",
      back: "Zurück"
    }
  };

  return (
    <main className="page-load relative min-h-screen bg-background px-6 py-12">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(207_40%_15%/0.15),transparent_50%)]" />

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

      {/* Back button */}
      <Link 
        to="/" 
        className="fade-in absolute left-6 top-6 z-20 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {content[language].back}
      </Link>

      <div className="relative z-10 mx-auto max-w-4xl pt-20">
        <h1 className="fade-in mb-2 text-4xl font-light tracking-tight text-foreground">
          {content[language].title}
        </h1>
        <p className="fade-in-delay mb-16 text-sm text-muted-foreground">
          {content[language].description}
        </p>

        <div className="flex flex-col items-center gap-16">
          {/* Chevron only logo */}
          <div className="fade-in-delay flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <svg 
                width="96" 
                height="96" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-accent"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
              <h2 className="text-lg font-light text-foreground">
                {content[language].chevronLogo}
              </h2>
            </div>
            <div className="flex gap-4">
              <a 
                href="/praetorium-logo.svg" 
                download="praetorium-logo.svg"
                className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Download className="h-4 w-4" />
                SVG
              </a>
              <a 
                href="/praetorium-logo.png" 
                download="praetorium-logo.png"
                className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Download className="h-4 w-4" />
                PNG
              </a>
            </div>
          </div>

          {/* Full logo with text */}
          <div className="fade-in-delay flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <img 
                src="/praetorium-full-logo.svg" 
                alt="PRAETORIUM Full Logo" 
                className="h-24 w-auto"
              />
              <h2 className="text-lg font-light text-foreground">
                {content[language].fullLogo}
              </h2>
            </div>
            <div className="flex gap-4">
              <a 
                href="/praetorium-full-logo.svg" 
                download="praetorium-full-logo.svg"
                className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Download className="h-4 w-4" />
                SVG
              </a>
              <a 
                href="/praetorium-full-logo.png" 
                download="praetorium-full-logo.png"
                className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Download className="h-4 w-4" />
                PNG
              </a>
            </div>
            
            {/* Direct URL info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Direct URL: <a 
                  href="/praetorium-full-logo.png" 
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /praetorium-full-logo.png
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Media;

