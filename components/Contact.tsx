'use client';

import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Copy, ExternalLink, PhoneCall, CheckCircle, Send, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { FaWhatsapp } from 'react-icons/fa';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  // Contact interaction states
  const [copied, setCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  
  // Form submission states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Image slider states
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Sample images for the slider - replace with your actual portfolio images
  const portfolioImages = [
    {
      url: '/A-BDY5.jpg',
      alt: 'Birthday Portrait',
      title: 'Birthday Portrait'
    },
    {
      url: '/T-GRAD4.jpg',
      alt: 'Graduation Photography',
      title: 'Graduation Photography'
    },
    {
      url: '/BDY2.jpg',
      alt: '50th Birthday Celebration',
      title: '50th Birthday Celebration'
    },
    {
      url: '/SALLY-13.jpg',
      alt: 'Event Photography',
      title: 'Event Photography'
    },
    {
      url: '/LANCER4.jpg',
      alt: 'Lancer Car Photography',
      title: 'Lancer Car Photography'
    }
  ];

  const email = 'bihandumethsilu55@gmail.com';
  const phone = '+94750845396';
  const formattedPhone = '+94 75 084 5396';

  // Auto-play slider
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === portfolioImages.length - 1 ? 0 : prevIndex + 1
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [currentImageIndex, isAutoPlaying, portfolioImages.length]);

  // Slider navigation functions
  const nextImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === portfolioImages.length - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevImage = () => {
    setIsAutoPlaying(false);
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? portfolioImages.length - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToImage = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentImageIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Email functions
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openGmail = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, '_blank');
  };

  // Phone functions
  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
  };

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = phone;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
  };

  // Form validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.service.trim()) {
      newErrors.service = 'Please select a service';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/bihandumethsilu55@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _replyto: formData.email,
          _subject: `New ${formData.service} inquiry from ${formData.name}`
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name]) {
      const { [name]: removed, ...rest } = errors;
      setErrors(rest);
    }
  };

  const contactInfo = [
    {
  icon: MapPin,
  title: 'Location',
  details: ['Boralesgamuwa, Sri Lanka', 'Colombo, Sri Lanka'],
  action: () => window.open('https://maps.google.com/maps?q=Boralesgamuwa,+Sri+Lanka+Colombo', '_blank'),
  clickable: true
},

    {
      icon: Phone,
      title: 'Phone',
      details: [formattedPhone],
      action: handlePhoneClick,
      clickable: true
    },
    {
      icon: Mail,
      title: 'Email',
      details: [email],
      action: handleEmailClick,
      clickable: true
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon - Fri: 9AM - 6PM', 'Weekends: By appointment'],
      action: null,
      clickable: false
    },
  ];

  const handleContactClick = (contact: {
    icon: React.ElementType;
    title: string;
    details: string[];
    action: (() => void) | null;
    clickable: boolean;
  }) => {
    if (contact.clickable && contact.action) {
      contact.action();
    }
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-6">
            Let's Create <span className="text-gold">Together</span>
          </h2>
          <p className="text-lg text-brown max-w-3xl mx-auto">
            Ready to tell your story? I'd love to hear about your vision and 
            discuss how we can bring it to life through beautiful photography.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form with Image Slider */}
          <Card className="border-0 shadow-lg bg-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">
                Send a Message
              </h3>

              {/* Success Message */}
              {submitSuccess && (
                <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                  <div className="flex items-center">
                    <CheckCircle className="mr-2" size={20} />
                    <span>Your message has been sent successfully! I'll get back to you soon.</span>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {submitError && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>Error: {submitError}</span>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brown mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brown mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brown mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-brown mb-2">
                      Service Interested *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring ${errors.service ? 'border-red-500' : 'border-input'}`}
                    >
                      <option value="">Select a service</option>
                      <option value="dronography">Dronography</option>
                      <option value="wedding-photography">Wedding Photography</option>
                      <option value="wedding-videography">Wedding Videography</option>
                      <option value="graduation-photography">Graduations</option>
                      <option value="commercial-work">Commercial Work</option>
                      <option value="event-photography">Event Photography</option>
                      <option value="event-videography">Event Videography</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.service && <p className="mt-1 text-sm text-red-500">{errors.service}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brown mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full ${errors.message ? 'border-red-500' : ''}`}
                    placeholder="Tell me about your vision, event details, preferred dates, and any specific requirements..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>
                
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(e as any);
                  }}
                  disabled={isSubmitting}
                  className="w-full bg-gold hover:bg-gold/90 text-white py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send size={18} className="mr-2" />
                      Send Message
                    </span>
                  )}
                </Button>

                {/* Image Slider - Now inside the form container */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                 
                  <div className="relative h-64 rounded-lg overflow-hidden group">
                    {/* Main Image */}
                    <div className="relative w-full h-full overflow-hidden">
                      <img
                        src={portfolioImages[currentImageIndex].url}
                        alt={portfolioImages[currentImageIndex].alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Image Title */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <h5 className="text-base font-serif font-bold">
                          {portfolioImages[currentImageIndex].title}
                        </h5>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight size={18} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      {portfolioImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-gold w-6' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">
                Get in Touch
              </h3>
              <p className="text-brown mb-8 leading-relaxed">
                I believe every client deserves personal attention and exceptional service. 
                Whether you're planning a wedding, need professional portraits, or have a 
                commercial project in mind, I'm here to help bring your vision to life.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <Card 
                  key={index} 
                  className={`border-0 shadow-md bg-white hover:shadow-lg transition-all duration-300 ${
                    info.clickable && info.action ? 'cursor-pointer hover:bg-gray-50 hover:scale-105' : ''
                  }`}
                  onClick={() => info.action && handleContactClick(info)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`transition-colors duration-300 text-gold`}>
                        <info.icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-serif font-bold text-charcoal mb-2">
                          {info.title}
                        </h4>
                        
                        {/* Special handling for Phone */}
                        {info.title === 'Phone' && (
                          <div className="relative group">
                            <div className="text-sm text-brown cursor-pointer">
                              {info.details.map((detail, idx) => (
                                <p key={idx}>{detail}</p>
                              ))}
                            </div>
                            
                            {/* Hover Options for Phone */}
                            <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex space-x-2 z-10 min-w-max">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.location.href = `tel:${phone}`;
                                }}
                                className="flex items-center space-x-1 px-2 py-1 text-sm hover:bg-gray-100 rounded whitespace-nowrap"
                                title="Call"
                              >
                                <PhoneCall size={14} />
                                <span>Call</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyPhone();
                                }}
                                className="flex items-center space-x-1 px-2 py-1 text-sm hover:bg-gray-100 rounded whitespace-nowrap"
                                title="Copy Phone"
                              >
                                <Copy size={14} />
                                <span>Copy</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openWhatsApp();
                                }}
                                className="flex items-center space-x-1 px-2 py-1 text-sm hover:bg-gray-100 rounded whitespace-nowrap"
                                title="WhatsApp"
                              >
                                <ExternalLink size={14} />
                                <span>WhatsApp</span>
                              </button>
                            </div>
                            
                            {/* Copy Success Message for Phone */}
                            {phoneCopied && (
                              <div className="mt-2 bg-gold text-white px-3 py-1 rounded text-sm inline-block">
                                <CheckCircle size={14} className="inline mr-1" />
                                Phone copied!
                              </div>
                            )}
                            
                            {/* Click instruction for Phone */}
                            <p className="text-xs text-gold mt-1 opacity-75">
                              Click to call or hover for more options
                            </p>
                          </div>
                        )}
                        
                        {/* Special handling for Email */}
                        {info.title === 'Email' && (
                          <div className="relative group">
                            <div className="text-sm text-brown cursor-pointer">
                              {info.details.map((detail, idx) => (
                                <p key={idx}>{detail}</p>
                              ))}
                            </div>
                            
                            {/* Hover Options for Email */}
                            <div className="absolute left-0 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex space-x-2 z-10 min-w-max">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  copyEmail();
                                }}
                                className="flex items-center space-x-1 px-2 py-1 text-sm hover:bg-gray-100 rounded whitespace-nowrap"
                                title="Copy Email"
                              >
                                <Copy size={14} />
                                <span>Copy</span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openGmail();
                                }}
                                className="flex items-center space-x-1 px-2 py-1 text-sm hover:bg-gray-100 rounded whitespace-nowrap"
                                title="Open in Gmail"
                              >
                                <ExternalLink size={14} />
                                <span>Gmail</span>
                              </button>
                            </div>
                            
                            {/* Copy Success Message for Email */}
                            {copied && (
                              <div className="mt-2 bg-gold text-white px-3 py-1 rounded text-sm inline-block">
                                <CheckCircle size={14} className="inline mr-1" />
                                Email copied!
                              </div>
                            )}
                            
                            {/* Click instruction for Email */}
                            <p className="text-xs text-gold mt-1 opacity-75">
                              Click to email or hover for more options
                            </p>
                          </div>
                        )}
                        
                        {/* Default handling for other items */}
                        {info.title !== 'Phone' && info.title !== 'Email' && (
                          <>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-brown text-sm">
                                {detail}
                              </p>
                            ))}
                            {info.clickable && info.action && (
                              <p className="text-xs text-gold mt-1 opacity-75">
                                Click to {info.title === 'Location' ? 'view on map' : 'open'}
                              </p>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-serif font-bold text-charcoal mb-4">
                Follow My Journey
              </h4>
              <div className="flex space-x-4">
                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    <a href="https://www.instagram.com/noriza_bihandu?igsh=MTkwNGo5dHQ5MTY1cg==" className="text-charcoal hover:text-gold transition-colors duration-300">
                      <Instagram size={20} />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=100088179564542&mibextid=kFxxJD" className="text-charcoal hover:text-gold transition-colors duration-300">
                      <Facebook size={20} />
                    </a>
                    <a href="https://wa.me/94750845396" target="_blank" rel="noopener noreferrer" className="text-charcoal hover:text-gold transition-colors duration-300">
                      <FaWhatsapp size={20} />
                    </a>
                  </div>
                  {/* Add more social links here if needed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;