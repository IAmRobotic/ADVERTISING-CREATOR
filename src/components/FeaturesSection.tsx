
import { Network, Target, Zap, Shield, Heart, TrendingUp } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Network className="h-6 w-6" />,
      title: "Contact Intelligence",
      description: "Rich profiles with conversation history, mutual connections, and relationship strength indicators."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Goal Setting & Tracking",
      description: "Set weekly networking goals and track your progress with visual dashboards that keep you motivated."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Smart Automations",
      description: "Automated follow-up reminders, connection suggestions, and conversation starters to keep momentum going."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy First",
      description: "Your networking data stays private. We'll never spam your contacts or share your information."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Relationship Nurturing",
      description: "Track relationship warmth and get suggestions for meaningful ways to stay in touch."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Career Momentum",
      description: "See how your networking efforts translate into real career opportunities and job prospects."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Everything you need to network with confidence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built specifically for job seekers and career pivoters who want to turn networking 
            from a dreaded task into a source of genuine career momentum.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="bg-gradient-to-r from-purple-100 to-teal-100 rounded-lg p-3 w-fit mb-4">
                <div className="text-purple-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
