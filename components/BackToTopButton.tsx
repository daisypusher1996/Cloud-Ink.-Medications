import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`fixed bottom-6 right-6 z-[90] transition-all duration-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg shadow-indigo-500/30 transition-all active:scale-90 flex items-center justify-center border border-indigo-400/20 backdrop-blur-sm"
        aria-label="Back to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default BackToTopButton;