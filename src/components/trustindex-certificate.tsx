import { useEffect } from "react";
import { COOKIE_CONSENT_CHANGED_EVENT, readCookieConsent } from "@/lib/cookie-consent";

const SCRIPT_ID = "trustindex-certificate-loader";
const SCRIPT_SRC = "https://cdn.trustindex.io/loader-cert.js?17dc6201947a609acb964ed6147";

export function TrustindexCertificate() {
  useEffect(() => {
    const sync = () => {
      if (readCookieConsent()?.preferences.externalMedia) {
        if (document.getElementById(SCRIPT_ID)) return;
        const script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
        return;
      }

      document.getElementById(SCRIPT_ID)?.remove();
      document.querySelectorAll(".ti-widget.ti-certificate").forEach((node) => node.remove());
    };

    sync();
    window.addEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGED_EVENT, sync);
  }, []);

  return null;
}
