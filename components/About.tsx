import { Award, Users, Camera, Heart } from 'lucide-react';

const About = () => {
const stats = [
  { icon: Heart, number: '3+', label: 'Years Experience' },
  { icon: Camera, number: '100+', label: 'Projects Completed' },
  { icon: Users, number: '100+', label: 'Happy Clients' },
];

  return (
    <section id="about" className="py-20 lg:py-32 bg-cream">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
<div className="relative">
  <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
    <img
      src="/pexels-technobulka-3014826.jpg"
      alt="Noriza Bihandu"
      className="w-full h-full object-cover"
    />
  </div>
  <div className="absolute -bottom-6 -right-6 bg-gold text-white p-6 rounded-lg shadow-lg">
    <Camera size={32} />
  </div>
</div>

          {/* Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-charcoal mb-6">
              Crafting timeless
              <br />
              <span className="text-gold">memories</span>
            </h2>
            
            <p className="text-lg text-brown mb-6 leading-relaxed">
             Welcome to Noriza Photography & Videography — where real moments become lasting memories.</p>

 <p className="text-lg text-brown mb-8 leading-relaxed">I’m Bihandu Methsilu Wijeriri, the founder and creative force behind Noriza. With over a decade of experience in photography and videography, I’ve dedicated myself to capturing the true essence of life’s most meaningful moments.

Rooted in Sri Lanka, Noriza blends classic composition with modern storytelling, creating visuals that are both emotionally powerful and artistically refined. Whether it’s a wedding, a portrait, a cinematic video, or a personal story, each frame is crafted to reflect authenticity, beauty, and soul.


            </p>
            
            <p className="text-lg text-brown mb-8 leading-relaxed">
            At Noriza, this isn’t just a service — it’s a commitment to preserving your story in the most honest and impactful way possible.

Let’s turn your moments into timeless memories.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="text-gold" size={24} />
                  </div>
                  <div className="text-2xl font-bold text-charcoal mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-brown uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;