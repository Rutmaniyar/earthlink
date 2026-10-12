export const COOKIE_CONSENT_VERSION = "2026-10-12-ga4";
export const COOKIE_CONSENT_COOKIE = "earthlink_cookie_consent";
export const COOKIE_CONSENT_CHANGED_EVENT = "earthlink:cookie-consent-changed";
export const COOKIE_SETTINGS_OPEN_EVENT = "earthlink:cookie-settings-open";

export type CookiePreferences = {
  externalMedia: boolean;
  analytics: boolean;
};

export type CookieConsentRecord = {
  version: string;
  decidedAt: string;
  expiresAt: string;
  preferences: CookiePreferences;
};

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  externalMedia: true,
  analytics: true,
};

function isBrowser() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function readCookieValue(name: string) {
  if (!isBrowser()) return null;
  const prefix = `${name}=`;
  const value = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
}

export function readCookieConsent(): CookieConsentRecord | null {
  const raw = readCookieValue(COOKIE_CONSENT_COOKIE);
  if (!raw) return null;

  try {
    const record = JSON.parse(decodeURIComponent(raw)) as CookieConsentRecord;
    if (
      record.version !== COOKIE_CONSENT_VERSION ||
      !record.preferences ||
      typeof record.preferences.externalMedia !== "boolean" ||
      typeof record.preferences.analytics !== "boolean" ||
      !record.expiresAt ||
      Date.parse(record.expiresAt) <= Date.now()
    ) {
      return null;
    }
    return record;
  } catch {
    return null;
  }
}

export function saveCookieConsent(preferences: CookiePreferences) {
  if (!isBrowser()) return null;

  const now = new Date();
  const expires = new Date(now);
  expires.setMonth(expires.getMonth() + 6);

  const record: CookieConsentRecord = {
    version: COOKIE_CONSENT_VERSION,
    decidedAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    preferences,
  };
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(record))}; Path=/; Expires=${expires.toUTCString()}; SameSite=Lax${secure}`;
  window.dispatchEvent(
    new CustomEvent<CookieConsentRecord>(COOKIE_CONSENT_CHANGED_EVENT, { detail: record }),
  );
  return record;
}

export function openCookieSettings() {
  if (!isBrowser()) return;
  window.dispatchEvent(new Event(COOKIE_SETTINGS_OPEN_EVENT));
}
