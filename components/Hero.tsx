'use client';

import { useRef } from 'react';
import { ChevronDown, Camera, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  // Add your background video URL here
  const BACKGROUND_VIDEO_URL = "/Bihandu.mp4";
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const scrollToGallery = () => {
    const element = document.querySelector('#gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/Bihandu.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-cream/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-center space-x-8">
          <div className="flex items-center space-x-2 text-[#3E2723]">
            <Camera size={24} />
            <span className="text-sm uppercase tracking-wider">Photography</span>
          </div>
          <div className="flex items-center space-x-2 text-[#3E2723]">
            <Film size={24} />
            <span className="text-sm uppercase tracking-wider">Videography</span>
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-charcoal mb-6 leading-tight drop-shadow-sm">
          Visual stories
          <br />
          through the{' '}
          <span className="relative">
            lens
            <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gold/30 -rotate-1" />
          </span>
        </h1>

        <p className="text-xl sm:text-2xl text-[#3E2723] mb-12 max-w-3xl mx-auto font-light drop-shadow-sm">
          Capturing the unseen rhythms of life, one frame at a time
        </p>

      <Button           
  onClick={scrollToGallery}           
  className="bg-gold hover:bg-gold/90 mt-5 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"         
>           
   Discover my Journey         
</Button>          

{/* Scroll Indicator */}         
<div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce mt-8">           
  <ChevronDown className="text-brown drop-shadow-sm" size={32} />         
</div>
      </div>
    </section>
  );
};

export default Hero;