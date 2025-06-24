import { Lightbulb, ArrowRight } from "lucide-react";

const AISuggestions = () => {
  return (
    <div className="mt-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 rounded-3xl p-8 border border-purple-100/50">
      <div className="text-center mb-8">
        <h4 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Message Suggestions</h4>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Never stare at a blank message again. Our AI analyzes your conversation history and relationship context to suggest the perfect follow-up.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Contact Context Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/80">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              SL
            </div>
            <div>
              <h5 className="font-semibold text-gray-900">Sarah Lin</h5>
              <p className="text-sm text-gray-600">Senior Product Manager at Stripe</p>
            </div>
            <div className="ml-auto">
              <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                Follow-up due
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-gray-600">LAST INTERACTION</span>
              </div>
              <p className="text-sm text-gray-800">Coffee chat on Jan 15th - discussed product roadmap challenges and shared interest in AI tools</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-medium text-gray-600">MUTUAL CONNECTIONS</span>
              </div>
              <p className="text-sm text-gray-800">Alex Chen (Figma), Maria Rodriguez (OpenAI)</p>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs font-medium text-gray-600">SHARED INTERESTS</span>
              </div>
              <p className="text-sm text-gray-800">Product management, AI/ML, design systems</p>
            </div>
          </div>
        </div>

        {/* AI Suggestions Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg">
              <Lightbulb className="h-5 w-5 text-purple-600" />
            </div>
            <h5 className="font-semibold text-gray-900">Suggested Messages</h5>
            <div className="ml-auto">
              <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                AI Generated
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Suggestion 1 - Most relevant */}
            <div className="border-2 border-purple-200 bg-purple-50/50 rounded-xl p-4 relative">
              <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                Best Match
              </div>
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                  FOLLOW-UP
                </span>
                <span className="text-xs text-gray-500">95% confidence</span>
              </div>
              <p className="text-sm text-gray-800 italic leading-relaxed">
                "Hi Sarah! I've been thinking about our conversation on AI tools in product management. I just came across this interesting article about Stripe's approach to ML-driven user insights that reminded me of our chat. Would you be interested in grabbing coffee again soon to continue our discussion?"
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Tone: Professional & Personal</span>
                  <span>•</span>
                  <span>Length: Medium</span>
                </div>
                <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  Use this →
                </button>
              </div>
            </div>

            {/* Suggestion 2 - Alternative */}
            <div className="border border-gray-200 bg-gray-50/50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-full">
                  ALTERNATIVE
                </span>
                <span className="text-xs text-gray-500">87% confidence</span>
              </div>
              <p className="text-sm text-gray-800 italic leading-relaxed">
                "Hope you're doing well! I wanted to circle back after our great conversation about product challenges. I'd love to hear how your Q1 roadmap planning is going. Any chance you're free for a quick call this week?"
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Tone: Casual & Direct</span>
                  <span>•</span>
                  <span>Length: Short</span>
                </div>
                <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                  Use this →
                </button>
              </div>
            </div>

            {/* Suggestion 3 - Value-add approach */}
            <div className="border border-teal-200 bg-teal-50/50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-1 rounded-full">
                  VALUE-ADD
                </span>
                <span className="text-xs text-gray-500">82% confidence</span>
              </div>
              <p className="text-sm text-gray-800 italic leading-relaxed">
                "I remembered you mentioning challenges with user feedback integration. My friend Alex at Figma just shared some insights on their new feedback pipeline that might be relevant. Happy to make an intro if you think it'd be helpful!"
              </p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>Tone: Helpful & Connected</span>
                  <span>•</span>
                  <span>Length: Medium</span>
                </div>
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Use this →
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-2">
              Generate more suggestions
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions; 