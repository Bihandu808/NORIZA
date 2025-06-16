import React, { useState, useEffect } from 'react';
import { X, Camera, Star, ArrowLeft, ArrowRight, Eye, MapPin, Calendar, Download, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

type PortfolioItem = {
  id: number;
  category: string;
  title: string;
  mainImage: string;
  description: string;
  location: string;
  date: string;
  gallery: string[];
  stats: {
    featured: boolean;
  };
};

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'birthday', label: 'Birthdays' },
    { id: 'graduation', label: 'Graduation' },
    { id: 'real Estate', label: 'Real Estate' },
    { id: 'cars', label: 'Cars' },
    { id: 'events', label: 'Events' },
  ];

  const [portfolioItems] = useState<PortfolioItem[]>([
    {
      id: 1,
      category: 'birthday',
      title: 'Birthday Portraits',
      mainImage: '/A-BDY1.jpg',
      description: "A graceful celebration of joy and self-love—Tharushi's 28th birthday portraits capture radiant moments, playful elegance, and the beauty of embracing another meaningful year. Each frame reflects her unique charm, quiet confidence, and the happiness of marking this special milestone with style and warmth.",
      location: 'Mt. Lavinia beach, Sri Lanka',
      date: 'March 2025',
      gallery: [
        '/A-BDY1.jpg',
        '/A-BDY2.jpg',
        '/A-BDY3.jpg',
        '/A-BDY4.jpg',
        '/A-BDY5.jpg',
        '/A-BDY6.jpg',
        '/A-BDY7.jpg',
        '/A-BDY8.jpg',
        '/A-BDY9.jpg',
        '/A-BDY10.jpg',
      ],
      stats: { featured: true }
    },
    {
      id: 2,
      category: 'birthday',
      title: '50th Birthday Celebration',
      mainImage: '/BDY1.jpg',
      description: 'A timeless celebration captured with elegance—Nalaka’s 50th birthday photoshoot highlights heartfelt moments, genuine connections, and the joy of a life well-lived, all beautifully framed in natural light.',
      location: 'Bellanwilla, Colombo, Sri Lanka',
      date: 'May 2025',
      gallery: [
        '/BDY1.jpg',
        '/BDY2.jpg',
        '/BDY3.jpg',
        '/BDY4.jpg',
        '/BDY5.jpg',
        '/BDY6.jpg',
        '/BDY7.jpg',
        '/BDY8.jpg',
        '/BDY9.jpg',

      ],
      stats: { featured: false }
    },
    {
      id: 3,
      category: 'graduation',
      title: 'Graduation Day',
      mainImage: '/T-GRAD2.jpg',
      description: 'A celebration of hard work, growth, and new beginnings—this graduation session with Thirushi captures the quiet pride of a journey completed and the excitement of what lies ahead. With a graceful presence and heartfelt joy, each portrait reflects the strength behind her success and the elegance of stepping confidently into the future.',
      location: 'BMICH, Bauddhaloka Mawatha, Colombo 07, Sri Lanka',
      date: 'November 2024',
      gallery: [
        '/T-GRAD2.jpg',
        '/T-GRAD1.jpg',
        '/T-GRAD3.jpg',
        '/T-GRAD4.jpg',
        '/T-GRAD5.jpg',
        '/T-GRAD6.jpg',
        '/T-GRAD7.jpg',
        '/T-GRAD8.jpg',
      ],
      stats: { featured: true }
    },
    {
      id: 4,
      category: 'birthday',
      title: 'Birthday Portraits',
      mainImage: '/G-BDY1.jpg',
      description: 'A graceful and timeless birthday portrait session celebrating Gayandi on her special day. This shoot blends urban sophistication with soft elegance. Holding a bouquet of blooms and dressed in a flowing white dress, Gayandi radiates quiet confidence and beauty—perfectly marking another memorable year in her journey.',
      location: 'Janadhipathi Mawatha, Colombo 01, Sri Lanka',
      date: 'May 2025',
      gallery: [
        '/G-BDY1.jpg',
        '/G-BDY2.jpg',
        '/G-BDY3.jpg',
        '/G-BDY4.jpg',
        '/G-BDY5.jpg',
        '/G-BDY6.jpg',
        '/G-BDY7.jpg',
        '/G-BDY8.jpg',
        '/G-BDY9.jpg',
        '/G-BDY10.jpg',
        '/G-BDY11.jpg',
        '/G-BDY12.jpg',
      ],
      stats: { featured: false }
    },
    {
      id: 5,
      category: 'real Estate',
      title: 'Real Estate Showcase',
      mainImage: '/RE1.jpg',
      description: 'Where architecture meets emotion—this real estate session captures inviting spaces, natural flow, and the unique character of each property through thoughtful composition and beautiful natural light, creating images that feel like home.',
      location: 'Galle, Sri Lanka',
      date: 'July 2024',
      gallery: [
        '/RE1.jpg',
        '/RE2.jpg',
        '/RE3.jpg',
        '/RE4.jpg',
        '/RE5.jpg',
        '/RE6.jpg',
        '/RE7.jpg',
        '/RE8.jpg',
        '/RE9.jpg',
        '/RE10.jpg',
      ],
      stats: { featured: true }
    },
    {
      id: 6,
      category: 'cars',
      title: 'Lancer Evolution IX',
      mainImage: '/LANCER1.jpg',
      description: 'Power, precision, and presence—this Lancer Evolution shoot captures the raw performance and iconic design of a true motorsport legend. Framed in dynamic angles and natural light, every detail reflects speed, strength, and style in perfect harmony.',
      location: 'Colombo, Sri Lanka',
      date: 'May 2025',
      gallery: [
        '/LANCER1.jpg',
        '/LANCER2.jpg',
        '/LANCER3.jpg',
        '/LANCER4.jpg',
        '/LANCER5.jpg',
        '/LANCER6.jpg',
        '/LANCER7.jpg',
        '/LANCER8.jpg',
      ],
      stats: { featured: false }
    },

    
    {
      id: 7,
      category: 'graduation',
      title: 'Graduation Day',
      mainImage: '/Grad1.jpg',
      description: 'A radiant milestone captured with grace—Sanidi’s graduation session celebrates personal achievement, quiet confidence, and the promise of new beginnings. Natural light and soft tones highlight the proud joy of a chapter well-written and a future ready to unfold.',
      location: ' Cinnamon grand, Colombo 03, Sri Lanka',
      date: 'December 2024',
      gallery: [
        '/Grad1.jpg',
        '/Grad2.jpg',
        '/Grad3.jpg',
        '/Grad4.jpg',
        '/Grad5.jpg',
        '/Grad6.jpg',
        '/Grad7.jpg',
        '/Grad8.jpg',
      ],
      stats: { featured: true }
    },

        {
      id: 8,
      category: 'birthday',
      title: '20th Birthday Celebration',
      mainImage: '/CLARA-1.jpg',
      description: 'A timeless celebration captured with elegance—Clara’s 20th birthday photoshoot highlights youthful charm, heartfelt moments, and the joy of stepping into a new decade, all beautifully framed in natural light.',
      location: 'Barasthi, galle road, Colombo 06, Sri Lanka',
      date: 'March 2025',
      gallery: [
        '/CLARA-1.jpg',
        '/CLARA-2.jpg',
        '/CLARA-3.jpg',
        '/CLARA-4.jpg',
        '/CLARA-5.jpg',
        '/CLARA-6.jpg',
        '/CLARA-7.jpg',

      ],
      stats: { featured: false }
    },


        {
      id: 9,
      category: 'events',
      title: 'Sallys Manor 25',
      mainImage: '/SALLY-11.jpg',
      description: "A night of eerie elegance and spirited celebration—Sally’s Manor 25 transformed into a haunted haven as the IIT Rotaract Club hosted a Halloween party to remember. From chilling costumes to spine-tingling décor, every moment was a perfect blend of fright and delight, captured in moody tones and dramatic light.",
      location: 'Trapobane, Colombo 03, Sri Lanka',
      date: 'February 2025',
      gallery: [
        '/SALLY-11.jpg',
        '/SALLY-2.jpg',
        '/SALLY-3.jpg',
        '/SALLY-4.jpg',
        '/SALLY-5.jpg',
        '/SALLY-6.jpg',
        '/SALLY-7.jpg',
        '/SALLY-8.jpg',
        '/SALLY-9.jpg',
        '/SALLY-10.jpg',
        '/SALLY-13.jpg',
        '/SALLY-12.jpg',
        '/SALLY-1.jpg',
      ],
      stats: { featured: true }
    },

  ]);

  const filteredItems = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const handleItemClick = (item: PortfolioItem) => {
    setIsLoading(true);
    setSelectedItem(item);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'hidden';
    
    // Simulate loading delay for smooth transition
    setTimeout(() => setIsLoading(false), 300);
  };

  const closeGallery = () => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev === selectedItem.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedItem) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedItem.gallery.length - 1 : prev - 1
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      
      if (e.key === 'Escape') {
        closeGallery();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedItem]);

  return (
    <div id="gallery" className="min-h-screen  bg-white">
      {/* Gallery Header */}
      <div className="text-center py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            Gallery
          </h1>
          <p className="text-xl text-brown max-w-2xl mx-auto leading-relaxed">
            Capturing life's most precious moments through the lens of creativity and passion
          </p>
        </div>
      </div>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-8 py-3 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-500/25'
                    : 'bg-white border border-gray-300 text-gray-700 hover:border-yellow-600 hover:text-yellow-600 hover:shadow-lg'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredItems.map((item, index) => (
              <article
                key={item.id}
                className="group cursor-pointer"
                onClick={() => handleItemClick(item)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[4/3]">
                  <img
                    src={item.mainImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {item.stats.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1 hover:bg-yellow-700 transition-colors">
                        <Star className="w-3 h-3 fill-current" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Eye className="w-10 h-10 mx-auto mb-3 opacity-90 text-yellow-400" />
                      <p className="font-medium text-yellow-200">View Collection</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center space-y-1">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-serif font-bold text-gray-600 mb-4">No collections found</h3>
              <p className="text-gray-500 mb-8">Try selecting a different category to explore more work</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="bg-yellow-600 text-white px-8 py-3 rounded-full font-medium hover:bg-yellow-700 transition-colors"
              >
                View All Work
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Gallery Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black backdrop-blur-sm">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black z-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-white"></div>
            </div>
          )}

          {/* Top Header Bar */}
          <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
            <div className="flex items-center justify-between p-4">
              <button
                onClick={closeGallery}
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="hidden sm:inline font-medium">Back</span>
              </button>
              
              <div className="text-center text-white">
                <h2 className="text-lg font-semibold">{selectedItem.title}</h2>
                <p className="text-sm text-white/70">{currentImageIndex + 1} of {selectedItem.gallery.length}</p>
              </div>
              
              <button
                onClick={closeGallery}
                className="text-white hover:text-yellow-400 transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex h-full pt-16">
            {/* Left Sidebar - Hidden on mobile */}
            <div className="hidden lg:flex lg:w-80 bg-black/20 backdrop-blur-sm border-r border-white/10 flex-col">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-white font-semibold text-lg mb-2">{selectedItem.title}</h3>
                <div className="flex items-center space-x-4 text-white/70 text-sm mb-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedItem.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedItem.date}</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{selectedItem.description}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-end">
                  <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex-1 p-6 overflow-y-auto">
                <h4 className="text-white font-medium mb-4">Gallery ({selectedItem.gallery.length})</h4>
                <div className="grid grid-cols-2 gap-3">
                  {selectedItem.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index 
                          ? 'border-yellow-500 scale-95' 
                          : 'border-transparent hover:border-white/30'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Image Display */}
            <div className="flex-1 relative flex items-center justify-center p-4 lg:p-8">
              {/* Navigation Arrows */}
              {selectedItem.gallery.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all backdrop-blur-sm border border-white/20"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all backdrop-blur-sm border border-white/20"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Main Image */}
              <div className="relative max-w-full max-h-full">
                <img
                  key={currentImageIndex}
                  src={selectedItem.gallery[currentImageIndex]}
                  alt={`${selectedItem.title} - Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[80vh] lg:max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in-95 duration-500"
                />
              </div>
            </div>
          </div>

          {/* Bottom Action Bar - Mobile */}
          <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent">
            <div className="p-4">
              {/* Image Counter */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex space-x-2">
                  {selectedItem.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index ? 'bg-white' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center justify-end">
                <button className="px-4 py-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;