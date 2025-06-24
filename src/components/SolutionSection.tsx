import { Bell, MessageSquare, Lightbulb, TrendingUp, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

// Solution data with corresponding images
const solutions = [
  {
    id: "follow-up",
    icon: Bell,
    title: "Never miss a follow-up",
    description: "Stop relying on sticky notes and scattered reminders. Our smart system tells you exactly when to reach out to nurture important relationships at the right time.",
    image: "/follow-up-wall.png",
    iconColor: "text-purple-600"
  },
  {
    id: "centralize",
    icon: MessageSquare,
    title: "Centralize interactions, communications and meetings",
    description: "LinkedIn messages, emails, and notes in one organized workspace. Meetings synced automatically.",
    image: "/interaction-hub.png",
    iconColor: "text-teal-600"
  },
  {
    id: "ai-suggestions",
    icon: Lightbulb,
    title: "Know exactly what to say next",
    description: "Reach out with purpose. AI-powered suggestions for follow-up messages based on your prior conversations and your network.",
    image: "/AI-suggestions.png",
    iconColor: "text-orange-600"
  },
  {
    id: "progress",
    icon: TrendingUp,
    title: "Measure and celebrate your progress",
    description: "Celebrate small wins, quantify your efforts and build momentum toward your career goals.",
    image: "/momentum-sidebar.png",
    iconColor: "text-green-600"
  }
];

const SolutionSection = () => {
  // State for desktop hover/auto-cycling
  const [activeDesktopSolution, setActiveDesktopSolution] = useState(0);
  const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);
  
  // State for mobile accordion
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  // Auto-cycling for desktop when not hovering
  useEffect(() => {
    if (hoveredSolution === null) {
      const interval = setInterval(() => {
        setActiveDesktopSolution((prev) => (prev + 1) % solutions.length);
      }, 4000);
      
      return () => clearInterval(interval);
    }
  }, [hoveredSolution]);

  // Update active solution when hovering
  useEffect(() => {
    if (hoveredSolution !== null) {
      setActiveDesktopSolution(hoveredSolution);
    }
  }, [hoveredSolution]);

  const handleMobileToggle = (solutionId: string) => {
    setExpandedMobile(expandedMobile === solutionId ? null : solutionId);
  };

  const handleDesktopHover = (index: number) => {
    setHoveredSolution(index);
  };

  const handleDesktopLeave = () => {
    setHoveredSolution(null);
  };

  return (
    <section className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            From networking chaos to career momentum. 
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            One organized system. Every interaction, note, and meeting <span className="highlight-auto">syncs automatically.</span> <br /> <span className="highlight-ai">AI suggestions</span> and visual progress tracking turn networking from a daunting task into <span className="highlight-wins">simple daily wins</span> you can see and feel.
          </p>
        </div>

        {/* Mobile Accordion Layout */}
        <div className="lg:hidden space-y-4">
          {solutions.map((solution) => {
            const IconComponent = solution.icon;
            const isExpanded = expandedMobile === solution.id;
            
            return (
              <div key={solution.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => handleMobileToggle(solution.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="rounded-full p-3 bg-gradient-to-r from-purple-100 to-teal-100">
                        <IconComponent className={`h-6 w-6 ${solution.iconColor}`} />
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{solution.title}</h3>
                  </div>
                  <ChevronDown 
                    className={`h-5 w-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 mb-4">{solution.description}</p>
                    <div>
                      <img 
                        src={solution.image} 
                        alt={solution.title}
                        className="w-full rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop Side-by-Side Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="h-full flex flex-col justify-between" onMouseLeave={handleDesktopLeave}>
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              const isActive = activeDesktopSolution === index;
              
              return (
                <div 
                  key={solution.id}
                  className={`flex items-start space-x-6 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    isActive ? 'bg-gradient-to-r from-purple-50 to-teal-50 shadow-sm' : 'hover:bg-gray-50'
                  }`}
                  onMouseEnter={() => handleDesktopHover(index)}
                >
                  <div className="flex-shrink-0">
                    <div className={`rounded-full p-4 bg-gradient-to-r from-purple-100 to-teal-100 shadow-lg shadow-purple-500/10 ring-1 ring-white/20 transition-all duration-300 ${
                      isActive ? 'scale-105 shadow-xl shadow-purple-500/15' : 'hover:scale-105 hover:shadow-xl hover:shadow-purple-500/15'
                    } backdrop-blur-sm`}>
                      <IconComponent className={`h-8 w-8 ${solution.iconColor}`} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{solution.title}</h3>
                    <p className="text-lg text-gray-600">{solution.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Image Display */}
          <div className="bg-gradient-to-br from-purple-50 to-teal-50 rounded-2xl p-4 h-full flex flex-col">
            <div className="bg-white rounded-xl shadow-sm p-0 flex-1 flex items-center justify-center">
              <img 
                src={solutions[activeDesktopSolution].image} 
                alt={solutions[activeDesktopSolution].title}
                className="max-w-full max-h-full rounded-lg object-contain transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
