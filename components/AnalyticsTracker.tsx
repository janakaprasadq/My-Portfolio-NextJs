"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track if we have a pathname
    if (!pathname) return;

    // Send a silent request to our analytics API
    fetch("/api/analytics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path: pathname }),
      // keepalive ensures the request finishes even if the user navigates away quickly
      keepalive: true, 
    }).catch((err) => {
      console.error("Failed to track page view", err);
    });
  }, [pathname]);

  return null; // This component doesn't render anything
}
