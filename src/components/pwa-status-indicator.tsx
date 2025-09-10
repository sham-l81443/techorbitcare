"use client";

import { usePWA } from "@/hooks/use-pwa";
import { Wifi, WifiOff, CheckCircle } from "lucide-react";

export default function PWAStatusIndicator() {
  const { isOnline, isInstalled } = usePWA();

  if (isInstalled) {
    return (
      <div className="fixed top-4 right-4 z-40 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
        <CheckCircle className="w-3 h-3" />
        <span>App Installed</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="fixed top-4 right-4 z-40 bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
        <WifiOff className="w-3 h-3" />
        <span>Offline</span>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-40 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
      <Wifi className="w-3 h-3" />
      <span>Online</span>
    </div>
  );
}
