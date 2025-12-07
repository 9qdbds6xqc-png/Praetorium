import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChatMessage } from "./ChatMessage";
import { Send, Loader2, Globe, Link2 } from "lucide-react";
import { askQuestion, preparePDFContext } from "@/lib/openai";
import { findRelevantSections } from "@/lib/pdfExtractor";
import { PricingRequestDialog } from "./PricingRequestDialog";
import { saveToBacklog } from "@/lib/backlog";
import { toast } from "@/hooks/use-toast";
import { fetchWebsiteContent } from "@/lib/siteContent";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Füge den Link deiner Website hinzu, damit ich ausschließlich daraus antworte.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [siteInput, setSiteInput] = useState("");
  const [siteContext, setSiteContext] = useState<string>("");
  const [siteUrl, setSiteUrl] = useState<string | null>(null);
  const [siteStatus, setSiteStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [siteError, setSiteError] = useState<string | null>(null);
  const [showPricingDialog, setShowPricingDialog] = useState(false);
  const [pendingPricingQuestion, setPendingPricingQuestion] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const resetMessages = (url: string) => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content: `Ich habe die Inhalte von ${url} geladen. Was möchtest du darüber wissen?`,
      },
    ]);
  };

  const handleLoadSite = async () => {
    if (!siteInput.trim()) {
      toast({
        title: "Link erforderlich",
        description: "Bitte gib die URL einer Website ein.",
        variant: "destructive",
      });
      return;
    }

    setSiteStatus("loading");
    setSiteError(null);

    try {
      const { url, text } = await fetchWebsiteContent(siteInput.trim());
      setSiteUrl(url);
      setSiteContext(text);
      setSiteInput(url);
      setSiteStatus("ready");
      resetMessages(url);
      toast({
        title: "Website geladen",
        description: "Du kannst jetzt Fragen zur verlinkten Seite stellen.",
      });
    } catch (error) {
      console.error("Site load error:", error);
      const message =
        error instanceof Error ? error.message : "Die Website konnte nicht geladen werden.";
      setSiteStatus("error");
      setSiteError(message);
      toast({
        title: "Fehler beim Laden",
        description: message,
        variant: "destructive",
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    if (!siteContext || siteContext.trim().length === 0) {
      toast({
        title: "Keine Website geladen",
        description: "Bitte gib zuerst eine Website an.",
        variant: "destructive",
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const loadingMessageId = (Date.now() + 1).toString();
    setMessages((prev) => [
      ...prev,
      {
        id: loadingMessageId,
        role: "assistant",
        content: "",
        isLoading: true,
      },
    ]);

    try {
      const relevantContext = findRelevantSections(siteContext, userMessage.content);
      const context =
        relevantContext && relevantContext.length > 50
          ? relevantContext
          : preparePDFContext(siteContext || "", 4000);

      const chatHistory = messages
        .filter((msg) => msg.role !== "assistant" || !msg.isLoading)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const result = await askQuestion(
        userMessage.content,
        context,
        chatHistory,
        siteUrl || undefined
      );

      if (result.isPricingQuestion) {
        setPendingPricingQuestion(userMessage.content);
        setShowPricingDialog(true);
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId
            ? {
                id: msg.id,
                role: "assistant",
                content: result.answer,
                isLoading: false,
              }
            : msg
        )
      );

      await saveToBacklog(userMessage.content, result.answer, siteUrl || undefined, result.isPricingQuestion);
    } catch (error) {
      console.error("Error getting answer:", error);

      const errorMessage =
        error instanceof Error
          ? `Fehler: ${error.message}. Bitte versuche es erneut oder kontaktiere uns direkt.`
          : "Entschuldigung, es ist ein Fehler aufgetreten. Bitte versuche es erneut oder kontaktiere uns direkt.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId
            ? {
                id: msg.id,
                role: "assistant",
                content: errorMessage,
                isLoading: false,
              }
            : msg
        )
      );

      await saveToBacklog(userMessage.content, errorMessage, siteUrl || undefined, false, errorMessage);

      toast({
        title: "Fehler",
        description: "Die Anfrage konnte nicht verarbeitet werden. Bitte versuche es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="flex flex-col h-full border border-white/10 rounded-[28px] bg-white/5 dark:bg-[#05060a]/60 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,15,35,0.35)]">
        <div className="border-b border-white/10 p-6 space-y-4 bg-gradient-to-br from-white/10 via-transparent to-transparent">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-primary/15 flex items-center justify-center text-primary">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                Schritt 1
              </p>
              <h2 className="text-lg font-semibold">Website-Link einfügen</h2>
              <p className="text-sm text-muted-foreground">
                Der Assistent darf ausschließlich Inhalte dieser Seite verwenden.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Input
                  placeholder="https://example.com"
                  value={siteInput}
                  onChange={(e) => setSiteInput(e.target.value)}
                  className="pl-11 h-12 text-base rounded-2xl bg-background/80 border-border/60 focus-visible:ring-primary/40"
                />
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button
                onClick={handleLoadSite}
                disabled={siteStatus === "loading"}
                className="h-12 rounded-2xl px-6 shadow-lg shadow-primary/20"
              >
                {siteStatus === "loading" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Lädt
                  </>
                ) : (
                  "Inhalt laden"
                )}
              </Button>
            </div>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              {siteStatus === "ready" && siteUrl && (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Inhalte geladen für <span className="font-medium text-foreground">{siteUrl}</span>
                </>
              )}
              {siteStatus === "loading" && (
                <>
                  <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                  Inhalte werden analysiert …
                </>
              )}
              {siteStatus === "error" && (
                <>
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  {siteError}
                </>
              )}
              {siteStatus === "idle" && (
                <>
                  <span className="h-2 w-2 rounded-full bg-muted-foreground/50" />
                  Füge einen Link hinzu, damit ich nur daraus zitiere.
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              role={message.role}
              isLoading={message.isLoading}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-border/40 p-4">
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={
                siteContext && siteContext.trim().length > 0
                  ? "Stelle deine Frage zur geladenen Website..."
                  : "Bitte lade zuerst eine Website."
              }
              className="min-h-[60px] max-h-[200px] resize-none rounded-2xl bg-background/70 border-border/60"
              disabled={isLoading || !siteContext || siteContext.trim().length === 0}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading || !siteContext || siteContext.trim().length === 0}
              size="icon"
              className="h-[60px] w-[60px] flex-shrink-0 rounded-2xl"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Enter zum Senden, Shift+Enter für neue Zeile
          </p>
        </div>
      </div>

      <PricingRequestDialog
        open={showPricingDialog}
        onOpenChange={setShowPricingDialog}
        question={pendingPricingQuestion}
      />
    </>
  );
};

