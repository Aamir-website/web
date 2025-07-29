import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onLoadComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const preloadAssets = async () => {
      const assets = [
        '/bg.png',
        '/me.png',
        '/eyes.png',
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      ];

      const loadingSteps = [
        { progress: 20, text: 'LOADING ASSETS' },
        { progress: 40, text: 'PREPARING VISUALS' },
        { progress: 60, text: 'INITIALIZING ANIMATIONS' },
        { progress: 80, text: 'OPTIMIZING EXPERIENCE' },
        { progress: 100, text: 'READY TO LAUNCH' }
      ];

      // Simulate progressive loading
      for (let i = 0; i < loadingSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 600));
        setLoadingProgress(loadingSteps[i].progress);
        setLoadingText(loadingSteps[i].text);
      }

      // Preload images
      const imagePromises = assets.filter(asset => asset.endsWith('.png')).map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
      } catch (error) {
        console.warn('Some assets failed to load:', error);
      }

      // Final delay for smooth transition
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setIsExiting(true);
      setTimeout(() => {
        onLoadComplete();
      }, 1000);
    };

    preloadAssets();
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-all duration-1000 ${isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px, 60px 60px',
            backgroundPosition: '0 0, 30px 30px'
          }}
        />
      </div>

      <div className="text-center z-10">
        {/* Main Logo/Name */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bosenAlt text-white tracking-tight mb-4">
            AAMIR NAQVI
          </h1>
          <div className="w-24 h-px bg-white/30 mx-auto mb-4"></div>
          <p className="text-white/60 text-lg md:text-xl font-light tracking-wide">
            VISUAL STORYTELLER
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-80 max-w-sm mx-auto">
          {/* Progress Bar */}
          <div className="relative mb-6">
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 to-white transition-all duration-500 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            {/* Progress Percentage */}
            <div className="absolute -top-8 left-0 right-0 text-center">
              <span className="text-white/40 text-sm font-bosenAlt tracking-wider">
                {loadingProgress}%
              </span>
            </div>
          </div>

          {/* Loading Text */}
          <div className="text-center">
            <p className="text-white/70 text-sm font-bosenAlt tracking-[0.2em] transition-all duration-300">
              {loadingText}
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center mt-4 space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 bg-white/40 rounded-full animate-pulse"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-px bg-white/20"></div>
            <div className="w-2 h-2 border border-white/30 rounded-full"></div>
            <div className="w-8 h-px bg-white/20"></div>
          </div>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8">
        <div className="w-12 h-px bg-white/20 mb-2"></div>
        <div className="w-6 h-px bg-white/10"></div>
      </div>
      
      <div className="absolute top-8 right-8">
        <div className="w-12 h-px bg-white/20 mb-2 ml-auto"></div>
        <div className="w-6 h-px bg-white/10 ml-auto"></div>
      </div>
      
      <div className="absolute bottom-8 left-8">
        <div className="w-6 h-px bg-white/10 mb-2"></div>
        <div className="w-12 h-px bg-white/20"></div>
      </div>
      
      <div className="absolute bottom-8 right-8">
        <div className="w-6 h-px bg-white/10 mb-2 ml-auto"></div>
        <div className="w-12 h-px bg-white/20 ml-auto"></div>
      </div>
    </div>
  );
};

export default SplashScreen;