import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { whatsappLink } from "@/lib/lead";

const STEPS = [
  { q: "Hi! What's your goal?", options: ["Study abroad", "Work / recruitment", "Visit visa", "University admission"] },
  { q: "Got a destination in mind?", options: ["UK", "USA", "Canada", "Australia", "Not sure yet"] },
  { q: "Ready to chat with an adviser?", options: ["Yes, open WhatsApp"] },
];

export function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const choose = (opt: string) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (step === STEPS.length - 1) {
      window.open(
        whatsappLink({
          service: next[0],
          country: next[1],
          message: "Hi Earthlink, I'd like to book a free consultation.",
        }, "WhatsApp widget"),
        "_blank",
        "noopener",
      );
      setOpen(false);
      setStep(0);
      setAnswers([]);
    } else {
      setStep((s) => s + 1);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-4 z-50 w-[min(92vw,340px)] rounded-lg border hairline bg-paper shadow-2xl sm:right-6">
          <div className="flex items-center justify-between rounded-t-lg bg-secondary px-4 py-3 text-foreground">
            <div>
              <p className="font-serif text-base">Earthlink Adviser</p>
              <p className="text-xs text-muted-foreground">Typically replies within 10 minutes</p>
            </div>
            <button
              aria-label="Close adviser chat"
              onClick={() => setOpen(false)}
              className="rounded-sm p-1 text-foreground/85 transition-colors hover:bg-background/50 hover:text-foreground active:bg-background/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            ><X className="h-4 w-4" /></button>
          </div>
          <div className="p-4">
            <p className="text-sm text-navy">{STEPS[step].q}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {STEPS[step].options.map((o) => (
                <button
                  key={o}
                  onClick={() => choose(o)}
                  className="rounded-full border hairline px-3 py-1.5 text-xs text-navy transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand active:bg-brand active:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {o}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No data is stored. You'll continue on WhatsApp.</p>
          </div>
        </div>
      )}
      <button
        aria-label="WhatsApp Earthlink"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform duration-200 hover:scale-105 hover:shadow-[#25D366]/50 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:right-6"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </>
  );
}
