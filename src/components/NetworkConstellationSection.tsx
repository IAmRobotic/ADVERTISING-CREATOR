import { Network, Users, Filter, Eye, ZoomIn, ZoomOut } from "lucide-react";

const NetworkConstellationSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            See your network like never before.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Your network as a beautiful, interactive visualization. <br /> See who introduced you to whom, filter by relationship types, discover patterns 
            and reveal opportunities.
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative w-full bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
            <video
              className="w-full h-auto object-cover"
              autoPlay
              loop
              muted
              playsInline
              style={{ aspectRatio: '16/9' }}
            >
              <source src="/constellation.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default NetworkConstellationSection;
