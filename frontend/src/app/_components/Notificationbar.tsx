"use client";
import { useState, useEffect } from "react";

export default function NotificationBar() {
  const [notifications, setNotifications] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch notifications from backend
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await fetch("https://flashmsg.onrender.com/api/flash-messages/active");
        const data = await response.json();

        // Extract only the "message" strings from the data array
        const messages = data?.data?.map((item: { message: string }) => item.message) || [];
        setNotifications(messages);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    }

    fetchNotifications();
  }, []);

  // Cycle through notifications every 2 seconds
  useEffect(() => {
    if (notifications.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % notifications.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [notifications]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-8 bg-[#F4F4F4] text-[#000000] text-sm py-2 flex justify-center items-center z-50">
      <p className="animate-fade">{notifications[currentIndex]}</p>
    </div>
  );
}
