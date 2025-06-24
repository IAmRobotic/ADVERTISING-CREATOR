const ProblemSection = () => {
  const problems = [
    {
      icon: "/scattered.svg",
      title: "Scattered",
      description: "LinkedIn messages, Excel sheets, post-it notes, emails. Your networking is all over the place, making it less effective."
    },
    {
      icon: "/maze.svg",
      title: "Overwhelming",
      description: "Networking feels like a huge, intimidating mountain to climb. Where do you even start? And who should you reach out to?"
    },
    {
      icon: "/no-plan.svg",
      title: "No Clear System",
      description: "Sporadic outreach. Forgotten follow-ups. Lost connections. And how do you know if you're making progress?"
    }
  ];

  return (
    <section className="pt-12 sm:pt-24 pb-10 sm:pb-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 sm:mb-24">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Just applying to jobs{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                is a dead end.
              </span>
              {/* Handwritten underline effect */}
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3" 
                viewBox="0 0 280 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M2 8c25-3 50-5 75-2s50 5 75 2 50-5 75-2 25 3 50 1" 
                  stroke="#7c3aed" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                  className="opacity-70"
                />
              </svg>
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            You know you should be networking more. <br />
            Building meaningful relationships shouldn't feel so{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 px-1 py-0.5 rounded-sm transform -rotate-1 inline-block">
                overwhelming and draining.
              </span>

            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
          {problems.map((problem, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">
                <div className="rounded-full p-4 bg-gradient-to-r from-purple-100 to-teal-100 shadow-lg shadow-purple-500/10 ring-1 ring-white/20 hover:shadow-xl hover:shadow-purple-500/15 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  <img
                    src={problem.icon}
                    alt={problem.title}
                    className="h-[140px] w-[140px] drop-shadow-sm"
                  />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                {problem.title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        {/* Transitional headline */}
        <div className="text-center mt-16 sm:mt-20">
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 max-w-4xl mx-auto leading-relaxed">
            Without structure and a plan, it's all just busywork.
          </h3>
        </div>

        {/* Decorative connector line with arrow */}
        <div className="flex justify-center mt-10 sm:mt-10" aria-hidden="true">
          <svg
            width="60"
            height="200"
            viewBox="0 0 60 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <marker
                id="arrowhead-problem"
                markerWidth="8"
                markerHeight="8"
                refX="4"
                refY="4"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 8 4 L 0 8 Z" className="fill-purple-400" />
              </marker>
            </defs>
            <path
              d="M30 5 C 5 80, 55 160, 30 235"
              className="stroke-purple-400 opacity-80"
              strokeWidth="2.5"
              fill="none"
              markerEnd="url(#arrowhead-problem)"
              strokeDasharray="6 6"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
