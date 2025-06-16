import { Camera, Film, Users, Calendar, Award, Palette } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      icon: Camera,
      title: 'Wedding Photography & Videography',
      description: 'Complete wedding coverage combining timeless photography with cinematic videography.',
      features: ['Pre-wedding shoots', 'Ceremony coverage', 'Reception photography', 'Wedding films', 'Edited gallery', 'Cinematic storytelling'],
    },
    {
      icon: Calendar,
      title: 'Event Photography & Videography',
      description: 'Comprehensive photo and video coverage for all your special events and celebrations.',
      features: ['Corporate events', 'Private parties', 'Cultural ceremonies', 'Event videography', 'Documentary coverage', 'Social gatherings'],
    },
    {
      icon: Film,
      title: 'Dronography',
      description: 'Stunning aerial photography and videography for unique perspectives.',
      features: ['Aerial photography', 'Drone videography', 'Real estate aerials', 'Event drone coverage', 'Landscape shots', 'Commercial aerials'],
    },
    {
      icon: Users,
      title: 'Graduations',
      description: 'Capturing milestone moments and academic achievements with pride and elegance.',
      features: ['Graduation ceremonies', 'Portrait sessions', 'Family group photos', 'Academic celebrations', 'Individual portraits', 'Candid moments'],
    },
    {
      icon: Award,
      title: 'Commercial Work',
      description: 'Professional photography and videography for businesses and brands.',
      features: ['Product photography', 'Brand campaigns', 'Corporate portraits', 'Marketing videos', 'Commercial videography', 'Marketing materials'],
    },
  ];

  return (
    <section id="services" className="py-20 lg:py-32 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-6">
            Professional <span className="text-gold">Services</span>
          </h2>
          <p className="text-lg text-brown max-w-3xl mx-auto">
            Offering a comprehensive range of photography and videography services, 
            each tailored to capture your unique story with artistic excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white">
              <CardContent className="p-8">
                <div className="text-gold mb-6">
                  <service.icon size={48} />
                </div>
                <h3 className="text-xl font-serif font-bold text-charcoal mb-4">
                  {service.title}
                </h3>
                <p className="text-brown mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-brown">
                      <div className="w-2 h-2 bg-gold rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">
              Ready to Create Something Beautiful?
            </h3>
            <p className="text-brown mb-6">
              Let's discuss your vision and bring your story to life through the art of photography.
            </p>
            <button 
  className="bg-gold hover:bg-gold/90 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
  onClick={() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }}
>
  Schedule a Consultation
</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;