import { useState } from "react";

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded contact options */}
      {open && (
        <div className="flex flex-col items-end gap-3 animate-fade-in">
          {/* Email */}
          <a
            href="mailto:tkmart81501@gmail.com"
            className="flex items-center gap-2 group"
            data-ocid="float.email.button"
            title="Email us"
          >
            <span className="bg-card text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              tkmart81501@gmail.com
            </span>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              style={{ background: "#EA4335" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </div>
          </a>

          {/* Phone */}
          <a
            href="tel:+919176580731"
            className="flex items-center gap-2 group"
            data-ocid="float.phone.button"
            title="Call us"
          >
            <span className="bg-card text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              +91 9176580731
            </span>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
              style={{ background: "oklch(0.55 0.18 250)" }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
              </svg>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919176580731?text=Hi%2C%20I'm%20interested%20in%20TKMART%20products"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 group"
            data-ocid="float.whatsapp.button"
            title="WhatsApp us"
          >
            <span className="bg-card text-foreground text-xs font-medium px-3 py-1.5 rounded-full border border-border shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              WhatsApp: 9176580731
            </span>
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.554 4.12 1.524 5.854L.054 23.25a.75.75 0 0 0 .916.916l5.396-1.47A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.52-5.18-1.426l-.37-.217-3.84 1.046 1.046-3.84-.217-.37A9.95 9.95 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
            </div>
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200"
        style={{
          background: open
            ? "oklch(0.45 0.02 45)"
            : "linear-gradient(135deg, oklch(0.78 0.14 85), oklch(0.88 0.18 90))",
          color: open ? "white" : "oklch(0.12 0.01 45)",
        }}
        aria-label={open ? "Close contact options" : "Open contact options"}
        type="button"
        data-ocid="float.toggle.button"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-6 h-6"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
