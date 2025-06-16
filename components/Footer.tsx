import { Camera, Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Services', href: '#services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Dronography',
    'Wedding Photography',
    'Wedding Videography',
    'Graduations',
    'Commercial Work',
    'Event Photography',
    'Event Videography',
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-charcoal text-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-4">
              <span 
                className="text-2xl sm:text-3xl font-black tracking-[0.15em] text-cream transition-colors duration-300"
                style={{
                  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  letterSpacing: '0.15em'
                }}
              >
                NORIZA
              </span>
              <p className="text-sm text-cream/70 uppercase tracking-wider">
                Photography & Videography
              </p>
            </div>
            <p className="text-cream/80 mb-6 leading-relaxed">
              Crafting timeless memories through the art of visual storytelling. 
              Every frame tells a story, every moment becomes eternal.
            </p>
            {/* Social Links & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <a href="https://www.instagram.com/noriza_bihandu?igsh=MTkwNGo5dHQ5MTY1cg==" className="text-cream hover:text-gold transition-colors duration-300">
                  <Instagram size={20} />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100088179564542&mibextid=kFxxJD" className="text-cream hover:text-gold transition-colors duration-300">
                  <Facebook size={20} />
                </a>
                <a href="https://wa.me/94750845396" target="_blank" rel="noopener noreferrer" className="text-cream hover:text-gold transition-colors duration-300">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 text-gold">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-cream/80 hover:text-gold transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 text-gold">
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-cream/80 text-sm">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4 text-gold">
              Contact
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="text-gold" size={16} />
                <a 
  href="https://www.google.com/maps/search/Boralesgamuwa,+Sri+Lanka"
  target="_blank"
  rel="noopener noreferrer"
  className="text-cream/80 text-sm hover:text-gold transition-colors duration-300"
>
  Boralesgamuwa, Sri Lanka
</a>

              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gold" size={16} />
                <a 
                  href="tel:+94750845396"
                  className="text-cream/80 text-sm hover:text-gold transition-colors duration-300"
                >
                  +94 75 084 5396
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-gold" size={16} />
                <a 
                  href="mailto:bihandumethsilu55@gmail.com"
                  className="text-cream/80 text-sm hover:text-gold transition-colors duration-300"
                >
                  bihandumethsilu55@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-cream/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-cream/60 text-sm mb-4 md:mb-0">
            © {currentYear} Noriza Production. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-cream/60 hover:text-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-cream/60 hover:text-gold transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;