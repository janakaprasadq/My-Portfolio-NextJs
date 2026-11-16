"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { trackCustomEvent } from "@/components/AnalyticsTracker";

export default function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return null;
  }

  const phoneNumber = "94713031383"; // From personalInfo in data.ts
  const defaultMessage = encodeURIComponent(
    "Hi Janaka, I reviewed your engineering portfolio and would like to discuss a project / role."
  );

  const handleClick = () => {
    trackCustomEvent("/contact/whatsapp");
    window.open(`https://wa.me/${phoneNumber}?text=${defaultMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Direct message via WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center bg-[#101415] hover:bg-[#141a18] text-[#e5ece8] border border-[#1e2624] hover:border-[#25D366] px-3.5 py-2 transition-colors cursor-pointer shadow-xl font-mono text-xs"
    >
      <MessageCircle size={15} className="text-[#25D366] mr-2 shrink-0" />
      <span className="text-[11px] font-semibold tracking-wider text-[#81918a] group-hover:text-[#e5ece8]">
        WHATSAPP // DIRECT
      </span>
    </button>
  );
}
