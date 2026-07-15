"use client";

import { useEffect, useState } from "react";

export default function NoInternet() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const onlineHandler = () => setOnline(true);
    const offlineHandler = () => setOnline(false);

    setOnline(navigator.onLine);

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  if (online) return null;

  return (
    <div className="bg-red-600 py-2 text-center text-sm font-medium text-white">
      ⚠️ No internet connection. Some features may not work.
    </div>
  );
}