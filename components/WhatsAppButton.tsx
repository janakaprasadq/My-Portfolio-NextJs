"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { trackCustomEvent } from "@/components/AnalyticsTracker";

export default function WhatsAppButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) {
    return null;
  }

  const phoneNumber = "94770000000"; // Can be updated to Janaka's exact WhatsApp number
  const defaultMessage = encodeURIComponent(
    "Hi Janaka, I visited your portfolio and would like to discuss an opportunity!"
  );

  const handleClick = () => {
    trackCustomEvent("/contact/whatsapp");
    window.open(`https://wa.me/${phoneNumber}?text=${defaultMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center bg-[#25D366] text-white p-3.5 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.7)] transition-all transform hover:scale-105 cursor-pointer"
    >
      <MessageCircle size={24} className="fill-white text-white" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
        Chat on WhatsApp
      </span>
    </button>
  );
}
