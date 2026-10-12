
import { useEffect } from "react";
import {
  COOKIE_CONSENT_CHANGED_EVENT,
  readCookieConsent,
} from "@/lib/cookie-consent";

const MEASUREMENT_ID = "G-6ZW0QPJD5N";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  useEffect(() => {
    const enableAnalytics = () => {
      if (readCookieConsent()?.preferences.analytics !== true) {
        return;
      }

      if (document.getElementById("ga4-script")) return;

      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };

      window.gtag("js", new Date());
      window.gtag("config", MEASUREMENT_ID);

      const script = document.createElement("script");
      script.id = "ga4-script";
      script.async = true;
      script.src =
        `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

      document.head.appendChild(script);
    };

    enableAnalytics();

    window.addEventListener(
      COOKIE_CONSENT_CHANGED_EVENT,
      enableAnalytics,
    );

    return () => {
      window.removeEventListener(
        COOKIE_CONSENT_CHANGED_EVENT,
        enableAnalytics,
      );
    };
  }, []);

  return null;
}
