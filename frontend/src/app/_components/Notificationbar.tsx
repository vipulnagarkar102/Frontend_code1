"use client";
import { useState, useEffect } from "react";

const notifications = [
  "🔥 Limited Offer: 50% Off on Annual Plans!",
  "📢 Free Health Checkup 2025 – Register Now!",
  "🚀 New Features Added – Explore Now!",
];

export default function NotificationBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
    }, 2000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#F4F4F4] text-[#000000] text-sm py-2 flex justify-center items-center z-50">
      <p className="animate-fade">{notifications[currentIndex]}</p>
    </div>
  );
}
