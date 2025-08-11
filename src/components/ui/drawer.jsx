import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

const Drawer = ({ 
  isOpen, 
  onClose, 
  children, 
  title,
  className 
}) => {
  // Handle body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      )}
      
      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-[800px] bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out",
          "overflow-hidden", // Prevent drawer content from causing scrollbar
          isOpen ? "translate-x-0" : "translate-x-full",
          className
        )}
        style={{ position: 'fixed' }} // Ensure fixed positioning
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="h-[calc(100%-64px)] overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default Drawer;
