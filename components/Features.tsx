
import React from 'react';

const FeatureCard = ({ title, description, iconColor }: { title: string, description: string, iconColor: string }) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-blue-100 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all group">
    <div className={`w-14 h-14 ${iconColor} rounded-2xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform`}></div>
    <h3 className="text-2xl font-black text-blue-900 mb-4">{title}</h3>
    <p className="text-blue-900/50 font-medium leading-relaxed">
      {description}
    </p>
  </div>
);

const Features: React.FC = () => {
  return (
    <section className="py-32 bg-sky-50 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-blue-900 mb-6 tracking-tight">
            Infinite possibilities with <span className="text-blue-600">GOGO</span>
          </h2>
          <p className="text-blue-900/60 text-lg font-medium">
            GOGO isn't just a mascot. It's an ecosystem of interactive components, 3D assets, and emotional intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard 
            title="Emotional AI" 
            description="Powered by the latest GenAI models, GOGO reacts to your input with unique animations and expressions."
            iconColor="bg-blue-500"
          />
          <FeatureCard 
            title="3D Asset Library" 
            description="Access thousands of high-quality rounded 3D models specifically designed to match GOGO's aesthetic."
            iconColor="bg-indigo-500"
          />
          <FeatureCard 
            title="Social Hub" 
            description="Join a community of explorers discovering new digital frontiers alongside their GOGO companions."
            iconColor="bg-sky-400"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
