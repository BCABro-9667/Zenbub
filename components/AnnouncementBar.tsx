'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // Check if user has closed the announcement
    const isClosed = localStorage.getItem('announcement-closed');
    if (isClosed) {
      setIsVisible(false);
    }

    // Set default announcement or fetch from API
    setAnnouncement('🎉 Special Offer! Get up to 50% off on selected items. Free shipping on orders above ₹999!');
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('announcement-closed', 'true');
    // Set expiry (e.g., show again after 24 hours)
    setTimeout(() => {
      localStorage.removeItem('announcement-closed');
    }, 24 * 60 * 60 * 1000);
  };

  if (!isVisible || !announcement) return null;

  return (
    <div className="bg-black text-white py-2 px-4 relative">
      <div className="container flex items-center justify-between">
        <div className="flex-1 text-center text-sm md:text-base font-medium">
          {announcement}
        </div>
        <button
          onClick={handleClose}
          className="ml-4 hover:bg-white/20 rounded-full p-1 transition-colors"
          aria-label="Close announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
