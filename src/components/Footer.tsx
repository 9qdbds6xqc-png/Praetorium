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
        
        <div className="border-t border-border/50 mt-10 pt-6 flex items-center justify-center text-sm text-muted-foreground text-center">
          <p>© {new Date().getFullYear()} Praetorium – alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

