import { MessageSquare, Mail, Calendar, FileText, Phone, Video, ExternalLink, Plus, Clock, MapPin } from "lucide-react";

const Interactions = () => {
  return (
    <div className="mt-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border border-blue-100/50">
      <div className="text-center mb-8">
        <h4 className="text-2xl font-bold text-gray-900 mb-3">Centralized Interaction Hub</h4>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Every conversation, meeting, and note in one organized workspace. No more switching between platforms or losing track of important interactions.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Profile Panel */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200/80">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
              MR
            </div>
            <div>
              <h5 className="text-lg font-semibold text-gray-900">Marcus Rodriguez</h5>
              <p className="text-sm text-gray-600">Marketing Manager</p>
              <p className="text-sm text-gray-500">Shopify</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-green-700">CONNECTION STATUS</span>
              </div>
              <p className="text-sm text-gray-800 font-medium">Strong Connection</p>
              <p className="text-xs text-gray-600">Met 6 months ago • 12 interactions</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-xs font-medium text-blue-700">NEXT ACTION</span>
              </div>
              <p className="text-sm text-gray-800 font-medium">Introduce him to Sean</p>
              <p className="text-xs text-gray-600">Due in 3 days</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-xs font-medium text-purple-700">SHARED INTERESTS</span>
              </div>
              <p className="text-sm text-gray-800">Content Marketing, Brand Strategy, Growth Hacking</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Plus className="h-4 w-4" />
              Add Interaction
            </button>
          </div>
        </div>

        {/* Interaction Timeline */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-200/80">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <h5 className="font-semibold text-gray-900">Interaction Timeline</h5>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                Auto-synced
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>

          <div className="space-y-4 max-h-96 overflow-y-auto">
            {/* Upcoming Meeting */}
            <div className="flex gap-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-l-4 border-orange-400">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Video className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full">
                    UPCOMING MEETING
                  </span>
                  <span className="text-xs text-gray-500">Tomorrow, 2:00 PM</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">Career Transition Strategy Discussion</p>
                <p className="text-sm text-gray-600">Video call • 45 minutes</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Zoom Meeting
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Synced from Google Calendar
                  </span>
                </div>
              </div>
            </div>

            {/* Recent LinkedIn Message */}
            <div className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-400">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    LINKEDIN MESSAGE
                  </span>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">Re: Content Marketing Trends 2024</p>
                <p className="text-sm text-gray-600 italic">"Thanks for sharing that article! The section on AI-driven personalization really resonated with what we're trying to achieve..."</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">Inbound message</span>
                  <button className="text-blue-600 hover:text-blue-700 text-xs font-medium flex items-center gap-1">
                    View on LinkedIn <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Email Exchange */}
            <div className="flex gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-400">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                    EMAIL THREAD
                  </span>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">Industry Insights Exchange</p>
                <p className="text-sm text-gray-600">3 messages • Last reply from Marcus</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">marcus.rodriguez@shopify.com</span>
                  <button className="text-green-600 hover:text-green-700 text-xs font-medium">
                    View Thread
                  </button>
                </div>
              </div>
            </div>

            {/* Meeting Notes */}
            <div className="flex gap-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border-l-4 border-purple-400">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                    MEETING NOTES
                  </span>
                  <span className="text-xs text-gray-500">2 weeks ago</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">Coffee Chat - Marketing Strategy</p>
                <p className="text-sm text-gray-600">Discussed customer acquisition challenges, shared experiences with growth marketing...</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">Added manually</span>
                  <button className="text-purple-600 hover:text-purple-700 text-xs font-medium">
                    View Full Notes
                  </button>
                </div>
              </div>
            </div>

            {/* Phone Call */}
            <div className="flex gap-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border-l-4 border-teal-400">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-teal-600 bg-teal-100 px-2 py-0.5 rounded-full">
                    PHONE CALL
                  </span>
                  <span className="text-xs text-gray-500">1 month ago</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">Informational Interview Follow-up</p>
                <p className="text-sm text-gray-600">15 minutes • Discussed career path and growth opportunities in marketing</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">Outbound call</span>
                  <span className="text-xs text-gray-400">Call logged automatically</span>
                </div>
              </div>
            </div>

            {/* First Meeting */}
            <div className="flex gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border-l-4 border-gray-300">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                    FIRST MEETING
                  </span>
                  <span className="text-xs text-gray-500">6 months ago</span>
                </div>
                <p className="font-medium text-gray-900 text-sm">MarketingLand Conference - Networking Event</p>
                <p className="text-sm text-gray-600">Initial introduction through mutual connection Sarah Chen</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">San Francisco, CA</span>
                  <span className="text-xs text-gray-400">Connection established</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>12 total interactions • Last sync: 2 minutes ago</span>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Export Timeline
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/80 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
          <div className="text-xs text-gray-600">Email Threads</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/80 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">5</div>
          <div className="text-xs text-gray-600">Meetings</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/80 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">12</div>
          <div className="text-xs text-gray-600">Messages</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200/80 text-center">
          <div className="text-2xl font-bold text-orange-600 mb-1">6mo</div>
          <div className="text-xs text-gray-600">Connection Age</div>
        </div>
      </div>
    </div>
  );
};

export default Interactions; 