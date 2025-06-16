'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Twitter, Mail, MessageCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FaWhatsapp } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-cream/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
         {/* Logo */}
          <div className="flex flex-col">
            <span 
              className="text-2xl sm:text-3xl font-black tracking-[0.15em] text-charcoal transition-colors duration-300"
              style={{
                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                letterSpacing: '0.15em'
              }}
            >
              NORIZA
            </span>
            <p className="text-sm text-brown uppercase tracking-wider">
              Photography & Videography
            </p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-charcoal hover:text-gold transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

{/* Social Links & CTA */}
<div className="hidden lg:flex items-center space-x-4">
  <div className="flex items-center space-x-3">
    <a href="https://www.instagram.com/noriza_bihandu?igsh=MTkwNGo5dHQ5MTY1cg==" className="text-charcoal hover:text-gold transition-colors duration-300">
      <Instagram size={20} />
    </a>
    <a href="https://www.facebook.com/profile.php?id=100088179564542&mibextid=kFxxJD" className="text-charcoal hover:text-gold transition-colors duration-300">
      <Facebook size={20} />
    </a>
    <a 
  href="https://wa.me/94750845396" 
  target="_blank" 
  rel="noopener noreferrer" 
  className="text-charcoal hover:text-gold transition-colors duration-300"
>
  <FaWhatsapp size={20} />
</a>
  </div>
            <Button
              onClick={() => scrollToSection('#contact')}
              className="bg-gold hover:bg-gold/90 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              Get In Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-charcoal hover:text-gold transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-cream/95 backdrop-blur-md rounded-lg shadow-lg mb-4 p-6">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-charcoal hover:text-gold transition-colors duration-300 font-medium text-left"
                >
                  {item.name}
                </button>
              ))}
            </nav>
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-brown/20">
              <div className="flex items-center space-x-4">
                <a href="#" className="text-charcoal hover:text-gold transition-colors duration-300">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-charcoal hover:text-gold transition-colors duration-300">
                  <Facebook size={20} />
                </a>
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-gold transition-colors duration-300">
                  <FaWhatsapp size={20} />
                </a>
              </div>
              <Button
                onClick={() => scrollToSection('#contact')}
                className="bg-gold hover:bg-gold/90 text-white px-4 py-2 rounded-full font-medium"
              >
                Get In Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;