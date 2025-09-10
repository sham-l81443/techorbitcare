"use client";

import { Button } from "@/components/ui/button";
import { WifiOff, RefreshCw } from "lucide-react";

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto text-center px-6">
        <div className="mb-8">
          <WifiOff className="w-24 h-24 mx-auto text-gray-400 mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            You&apos;re Offline
          </h1>
          <p className="text-gray-600 mb-8">
            It looks like you&apos;re not connected to the internet. Please check your connection and try again.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleRefresh}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>While you&apos;re offline, you can still:</p>
            <ul className="mt-2 space-y-1">
              <li>• View previously loaded pages</li>
              <li>• Access cached content</li>
              <li>• Use basic app features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
