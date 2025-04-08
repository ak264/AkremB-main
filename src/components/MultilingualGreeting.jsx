import { useState, useEffect } from 'react';

const MultilingualGreeting = () => {
  const [displayText, setDisplayText] = useState('');
  const [languageIndex, setLanguageIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  // Text content only, emoji will be fixed in position
  const greetings = [
    "Hi There, Akrem Here!",
    "السلام عليكم، أنا أكرم",
    "Hola, Soy Akrem!"
  ];
  
  useEffect(() => {
    let currentIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;
    
    // Toggle cursor blink
    const cursorTimer = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    // Function that handles the typing animation
    const animateText = () => {
      const currentGreeting = greetings[currentIndex];
      setLanguageIndex(currentIndex); // Track current language for RTL
      
      // Set typing speeds
      const typingDelay = isDeleting ? 50 : 120; 
      const pauseDelay = 3000; // Pause when fully typed
      const pauseBetweenPhrases = 1000; // Pause between phrases
      
      if (!isDeleting) {
        // Typing text
        setDisplayText(currentGreeting.substring(0, charIndex + 1));
        charIndex++;
        
        // If finished typing
        if (charIndex === currentGreeting.length) {
          // Wait before starting to delete
          timer = setTimeout(() => {
            isDeleting = true;
            animateText();
          }, pauseDelay);
          return;
        }
      } else {
        // Deleting text
        setDisplayText(currentGreeting.substring(0, charIndex));
        charIndex--;
        
        // If completely finished deleting
        if (charIndex <= 0) {
          // Ensure text is completely empty
          setDisplayText('');
          isDeleting = false;
          currentIndex = (currentIndex + 1) % greetings.length;
          
          // Pause between phrases
          timer = setTimeout(animateText, pauseBetweenPhrases);
          return;
        }
      }
      
      // Schedule next frame
      timer = setTimeout(animateText, typingDelay);
    };
    
    // Start the animation
    timer = setTimeout(animateText, 500);
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      clearInterval(cursorTimer);
    };
  }, []);
  
  // Check if current language is RTL (Arabic)
  const isRTL = languageIndex === 1;
  
  return (
    <div className="py-4">
      <div className="relative inline-block">
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-slide-right z-0"></div>
        <h1 className="relative z-10 text-4xl font-bold text-black dark:text-white flex items-center">
          {/* Fixed emoji that doesn't move or flicker */}
          <span className="inline-block mr-2 emoji">👋</span>
          
          {/* Text content with proper direction */}
          <span dir={isRTL ? "rtl" : "ltr"}>
            {displayText}
          </span>
          
          {/* Blinking cursor - only show when there's text */}
          {displayText && (
            <span 
              className={`ml-1 inline-block w-2 h-8 bg-black dark:bg-white ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
            ></span>
          )}
        </h1>
      </div>
      
      <style>{`
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        .animate-slide-right {
          animation: slideRight 0.5s forwards;
        }
        
        .emoji {
          display: inline-block;
          font-size: 1.1em;
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};

export default MultilingualGreeting;