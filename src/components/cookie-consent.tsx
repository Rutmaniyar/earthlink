import { useEffect, useState } from "react";
import {
  COOKIE_SETTINGS_OPEN_EVENT,
  DEFAULT_COOKIE_PREFERENCES,
  readCookieConsent,
  saveCookieConsent,
  type CookiePreferences,
} from "@/lib/cookie-consent";

const choiceButton =
  "rounded-sm border border-navy/25 bg-card px-4 py-2.5 text-sm font-medium text-navy transition-colors hover:border-brand hover:text-brand focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [customising, setCustomising] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(DEFAULT_COOKIE_PREFERENCES);

  useEffect(() => {
    const existing = readCookieConsent();
    setHasDecision(!!existing);
    setPreferences(existing?.preferences ?? DEFAULT_COOKIE_PREFERENCES);
    setOpen(!existing);

    const handleOpen = () => {
      const current = readCookieConsent();
      setHasDecision(!!current);
      setPreferences(current?.preferences ?? DEFAULT_COOKIE_PREFERENCES);
      setCustomising(true);
      setOpen(true);
    };
    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, handleOpen);
  }, []);

  function commit(next: CookiePreferences) {
    const previouslyAllowed =  readCookieConsent()?.preferences.analytics === true;
    saveCookieConsent(next);
    if (previouslyAllowed && !next.analytics) {
      window.location.reload();
      return;
    }
    setPreferences(next);
    setHasDecision(true);
    setCustomising(false);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-5">
      <section
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
        className="mx-auto max-w-3xl rounded border hairline bg-paper p-5 shadow-2xl sm:p-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand">Your privacy choices</p>
            <h2 id="cookie-consent-title" className="mt-1 font-serif text-2xl text-navy">
              Cookies and external media
            </h2>
          </div>
          {hasDecision && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-navy"
              aria-label="Close cookie settings"
            >
              Close
            </button>
          )}
        </div>

        <p id="cookie-consent-description" className="mt-3 text-sm leading-relaxed text-navy/75">
          We use a necessary first-party cookie to remember your choices. External media such as
          Google Maps and the Trustindex certificate stay off unless you allow them. You can change
          your choice at any time.
        </p>

        {customising ? (
          <div className="mt-5 space-y-3">
            <ConsentChoice
              label="Necessary"
              description="Required to remember your privacy choice. Always on."
              checked
              disabled
              onChange={() => undefined}
            />
            <ConsentChoice
              label="External media"
              description="Allows the Google Map and Trustindex review certificate."
              checked={preferences.externalMedia}
              onChange={(externalMedia) =>
                setPreferences((current) => ({ ...current, externalMedia }))
              }
            />
            <ConsentChoice
              label="Analytics"
              description="Allow Google Analytics to measure website visits and usage."
              checked={preferences.analytics}
              onChange={(analytics) =>
                setPreferences((current) => ({
                  ...current,
                  analytics,
                }))
              }
            />
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => commit(preferences)}
                className="btn-primary rounded-sm px-5 py-2.5 text-sm font-medium"
              >
                Save choices
              </button>
              {!hasDecision && (
                <button
                  type="button"
                  onClick={() => setCustomising(false)}
                  className="text-sm text-muted-foreground underline underline-offset-4 hover:text-navy"
                >
                  Back
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => commit({ externalMedia: true, analytics: true })}
              className={choiceButton}
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => commit(DEFAULT_COOKIE_PREFERENCES)}
              className={choiceButton}
            >
              Reject non-essential
            </button>
            <button type="button" onClick={() => setCustomising(true)} className={choiceButton}>
              Customise
            </button>
          </div>
        )}

        <a
          href="/privacy#cookies"
          className="mt-4 inline-block text-xs text-brand underline underline-offset-4"
        >
          Read our cookie information
        </a>
      </section>
    </div>
  );
}

function ConsentChoice({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-5 rounded border hairline bg-card p-4">
      <span>
        <span className="block text-sm font-medium text-navy">{label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          {description}
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 accent-brand"
      />
    </label>
  );
}
