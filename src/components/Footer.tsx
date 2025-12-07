export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 text-foreground py-12 mt-auto">
      <div className="fsm-container">
        <div className="flex flex-col items-center text-center">
          <div className="text-xl font-light mb-2">
            Praetorium Assistant
          </div>
          <p className="text-muted-foreground text-sm">Konversations-Interface für technische Dokumente</p>
        </div>
        
        <div className="border-t border-border/50 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Praetorium. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/landing" className="hover:text-foreground transition-colors">Landing</a>
            <a href="/privacy" className="hover:text-foreground transition-colors">Datenschutz</a>
            <a href="/terms" className="hover:text-foreground transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

