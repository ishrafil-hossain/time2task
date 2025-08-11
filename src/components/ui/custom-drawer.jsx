import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const CustomDrawer = ({ 
  isOpen, 
  onClose, 
  children, 
  trigger, 
  title,
  footer
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ANIMATION_DURATION = 500; // Increased duration for smoother animation

  useEffect(() => {
    if (isOpen) {
      // Show immediately when opening
      setIsVisible(true);
    } else {
      // Delay hiding until animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop with smooth fade */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-all duration-${ANIMATION_DURATION} ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        style={{ 
          zIndex: 40,
          transitionDuration: `${ANIMATION_DURATION}ms`
        }}
      />
      
      {/* Drawer with smooth slide */}
      <div 
        className={`fixed right-0 top-0 h-screen w-1/3 bg-white shadow-lg transform transition-all duration-${ANIMATION_DURATION} ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          zIndex: 50,
          transitionDuration: `${ANIMATION_DURATION}ms`,
          willChange: 'transform'
        }}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2 text-xl font-semibold">
              {title}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-4 border-t">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomDrawer; 