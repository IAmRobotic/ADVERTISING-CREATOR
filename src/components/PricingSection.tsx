import { Button } from "@/components/ui/button";
import { Check, Star, Zap, X } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Start getting organized fast.",
      includedFeatures: [
        "Up to 60 contacts",
        "10 active follow-up reminders",
        "Interaction hub",
        "Dynamic relationship strength indicators (AI-powered)",
        "Goal setting & tracking",
        "Network visualization",
        
      ],
      excludedFeatures: [
        "Email and calendar integration",
        "Analytics and Insights",
        "LinkedIn integration",
        "AI message suggestions",
        "Smart timing follow-up suggestions",
        "Custom fields and tags",
      ],
      popular: false,
      ctaText: "Free"
    },
    {
      name: "Momentum",
      price: "$9.99",
      period: "month",
      description: "Accelerate your momentum.",
      includedFeatures: [
        "500 contacts",
        "Unlimited follow-up reminders",
        "Interaction hub",
        "Dynamic relationship strength indicators (AI-powered)",
        "Goal setting & tracking",
        "Network visualization",
        "Email and calendar integration",
        "Analytics and Insights"

      ],
      excludedFeatures: [
        "LinkedIn integration",
        "AI message suggestions",
        "Smart timing follow-up suggestions",
        "Custom fields and tags",
      ],
      popular: true,
      ctaText: "Try it free for 30 days"
    },
    {
      name: "Strategic",
      price: "$14.99",
      period: "month",
      description: "For those serious about growing and nurturing a strong network.",
      includedFeatures: [
        "Unlimited contacts",
        "Everything in Growth",
        "LinkedIn integration",
        "AI message suggestions",
        "Smart timing follow-up suggestions",
        "Custom fields and tags",
      ],
      excludedFeatures: [],
      popular: false,
      ctaText: "Try it free for 45 days"
    }
  ];

  return (
          <section id="pricing" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Pick the package that fits you best.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't stress - you can always switch packages later. <br />
            No credit card required for the free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-xl shadow-sm border-2 p-8 relative ${plan.popular ? 'border-purple-400 shadow-lg' : 'border-gray-200'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="animate-gradient-badge text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4 h-12 flex items-center justify-center">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">/{plan.period}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {/* Included Features */}
                {plan.includedFeatures.map((feature, featureIndex) => (
                  <div key={`included-${featureIndex}`} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                
                {/* Excluded Features */}
                {plan.excludedFeatures.map((feature, featureIndex) => (
                  <div key={`excluded-${featureIndex}`} className="flex items-center">
                    <X className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 stroke-[3] filter drop-shadow-sm" style={{strokeLinecap: 'round', strokeLinejoin: 'round'}} />
                    <span className="text-gray-500">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full py-3 text-lg rounded-lg transition-all ${
                  plan.popular 
                    ? 'animate-gradient-pricing text-white hover:scale-110 transition-all duration-300' 
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
                onClick={() => {
                  // Track pricing tier clicks with Fathom Analytics
                  if (typeof window !== 'undefined' && (window as any).fathom) {
                    (window as any).fathom.trackEvent(`pricing_click_${plan.name.toLowerCase()}`);
                  }
                  // Pass the plan name as a URL parameter for email capture
                  window.location.href = `/coming-soon?plan=${plan.name.toLowerCase()}`;
                }}
              >
                {plan.ctaText}
                {plan.popular && <Zap className="ml-2 h-5 w-5" />}
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                No credit card required for free trial
              </p>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default PricingSection;
