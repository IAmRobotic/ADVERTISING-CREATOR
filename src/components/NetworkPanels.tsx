import { ArrowRight, Sparkles, Calendar, Network, ChevronUp, ChevronDown, Trophy } from "lucide-react";

interface NetworkPanelsProps {
  className?: string;
}

export const NetworkPanels = ({ className = "" }: NetworkPanelsProps) => {
  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Momentum Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200/80">
          <div className="flex flex-col">
            <p className="text-xl text-gray-700 mb-4">This week's momentum</p>
            {/* Interactions Item: Tracks user engagement. */}
            <div className="pb-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  <h3 className="font-semibold text-gray-700">Interactions</h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ChevronUp className="h-4 w-4" />
                  <span>+23%</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-purple-700">12</p>
                <p className="text-sm text-gray-500">of 20 goal</p>
              </div>
              <div className="w-full bg-purple-100 rounded-full h-2 mt-3">
                <div className="bg-purple-500 h-2 rounded-full w-3/5"></div>
              </div>
            </div>

            {/* Meetings Item: Tracks scheduled meetings. */}
            <div className="py-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <h3 className="font-semibold text-gray-700">Meetings</h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <ChevronDown className="h-4 w-4" />
                  <span>-12%</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-orange-700">5</p>
                <p className="text-sm text-gray-500">of 10 goal</p>
              </div>
              <div className="w-full bg-orange-100 rounded-full h-2 mt-3">
                <div className="bg-orange-500 h-2 rounded-full w-1/2"></div>
              </div>
            </div>

            {/* New Connections Item: Tracks new network contacts. */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Network className="h-5 w-5 text-teal-500" />
                  <h3 className="font-semibold text-gray-700">New Connections</h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <ChevronUp className="h-4 w-4" />
                  <span>+67%</span>
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold text-teal-700">8</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-500">of 5 goal</p>
                  <Trophy className="h-4 w-4 text-amber-500" />
                </div>
              </div>
              <div className="w-full bg-teal-100 rounded-full h-2 mt-3">
                <div className="bg-teal-500 h-2 rounded-full w-full"></div>
              </div>

              {/* Gamification Elements */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                {/* Streak Indicator */}
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800">Connection Streak</p>
                      <span className="text-sm font-medium text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">
                        4 weeks
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Consistently hitting your connection goals!</p>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="mt-3 flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Trophy className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800">Meeting Master</p>
                      <span className="text-sm font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                        Unlocked!
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Attended 25+ networking meetings. You're a pro!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Follow-up Wall Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200/80">
          <div className="flex flex-col">
            <p className="text-xl text-gray-700 mb-4">Follow-up wall</p>
            
            <div className="space-y-4">
              {/* Follow-up item 1: LinkedIn introduction - OVERDUE (Most urgent, goes first) */}
              <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border-2 border-red-300 relative">
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full animate-pulse flex items-center justify-center">
                  <span className="text-white text-xs font-bold">!</span>
                </div>
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  MJ
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800 text-sm">Marcus Johnson</p>
                    <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                      2 days late
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">LinkedIn introduction</p>
                  <p className="text-xs text-red-700 bg-red-100 px-2 py-1 rounded-full inline-block">
                    Schedule coffee
                  </p>
                </div>
              </div>

              {/* Follow-up item 2: Recent conference connection - DUE TODAY */}
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border-2 border-blue-300 relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  SL
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800 text-sm">Sarah Lin</p>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                      Due today
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Met at TechConf 2024</p>
                  <p className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full inline-block">
                    Share portfolio
                  </p>
                </div>
              </div>

              {/* Follow-up item 3: Previous client check-in - DUE TODAY */}
              <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-2 border-purple-300 relative">
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  EC
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800 text-sm">Emma Chen</p>
                    <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                      Due today
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Former client</p>
                  <p className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-full inline-block">
                    Schedule quarterly check-in
                  </p>
                </div>
              </div>

              {/* Follow-up item 4: Mentor connection - FUTURE */}
              <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  DR
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800 text-sm">David Rodriguez</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      Tomorrow
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Former colleague</p>
                  <p className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-full inline-block">
                    Send email to re-connect. It's been 9 months! 
                  </p>
                </div>
              </div>

              {/* Follow-up item 5: Potential collaborator - FUTURE */}
              <div className="flex items-start gap-3 p-3 bg-teal-50 rounded-lg border border-teal-100">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  KW
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-800 text-sm">Katie Wilson</p>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                      Friday
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Marketing Director @ Google</p>
                  <p className="text-xs text-teal-700 bg-teal-100 px-2 py-1 rounded-full inline-block">
                    Send resume and cover letter for Sr. Manager role
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 