import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Info, Flag, Trash2, ChevronLeft, ChevronRight, Users, Calendar, Clock, Bell, MessageSquare, Plus, Coffee, Mail } from 'lucide-react';

// Enhanced types to include interaction history
type InteractionType = 'meeting' | 'call' | 'email' | 'coffee' | 'other';

type Interaction = {
    type: InteractionType;
    date: string;
    notes?: string;
};

type FollowUp = {
    date: string;
    reason: string;
    priority: 'high' | 'medium' | 'low';
};

type Contact = {
    name: string;
    email?: string;
    company: {
        name: string;
        title: string;
    };
    via?: string;
    lastContact: string;
    relationship: 'Introduction' | 'Networking' | 'Alumni' | 'Personal' | 'Recruiter/HR' | 'Colleague';
    status: 'New' | 'Established' | 'Lead';
    strength: number;
    flagged?: boolean;
    followUp?: FollowUp;
    interactions?: Interaction[];
};

// Updated mock data with interaction history
const contacts: Contact[] = [
    { 
        name: 'Kai Rivera', 
        company: { name: 'Figma', title: 'Product Designer' }, 
        via: 'Lena Chen', 
        lastContact: '3 weeks', 
        relationship: 'Introduction', 
        status: 'New', 
        strength: 2, 
        flagged: true,
        followUp: {
            date: '2024-02-15',
            reason: 'Discuss potential role',
            priority: 'high'
        },
        interactions: [
            { type: 'meeting', date: '2024-01-22', notes: 'Initial intro meeting - discussed design systems' },
            { type: 'email', date: '2024-01-15', notes: 'Scheduled intro call' }
        ]
    },
    { 
        name: 'Joel Hayes', 
        company: { name: 'Home Depot', title: 'Marketing Director' }, 
        lastContact: 'Yesterday', 
        relationship: 'Networking', 
        status: 'New', 
        strength: 1, 
        flagged: false 
    },
    { 
        name: 'June Stone', 
        email: 'juniper.s@vercel.com', 
        company: { name: 'Vercel', title: 'Frontend Developer' }, 
        via: 'Alex Grant', 
        lastContact: '2 weeks', 
        relationship: 'Introduction', 
        status: 'New', 
        strength: 3, 
        flagged: false,
        followUp: {
            date: '2024-02-20',
            reason: 'Catch-up for coffee',
            priority: 'medium'
        }
    },
    { 
        name: 'Zane Maxwell', 
        email: 'zane.maxwell@stripe.com', 
        company: { name: 'Stripe', title: 'API Specialist' }, 
        lastContact: '3 months', 
        relationship: 'Alumni', 
        status: 'Established', 
        strength: 2, 
        flagged: false,
        followUp: {
            date: '2024-02-12',
            reason: 'Quarterly catch-up lunch',
            priority: 'low'
        }
    },
    { 
        name: 'Elara Vance', 
        email: 'elara@airtable.com', 
        company: { name: 'Airtable', title: 'Community Manager' }, 
        lastContact: '1 month', 
        relationship: 'Networking', 
        status: 'Established', 
        strength: 3, 
        flagged: false 
    },
    { 
        name: 'Ronan Steele', 
        company: { name: 'Brex', title: 'Growth Marketer' }, 
        lastContact: '2 months', 
        relationship: 'Personal', 
        status: 'Established', 
        strength: 3, 
        flagged: false 
    },
];

// Maps relationship types to specific Tailwind CSS classes for styling
const relationshipColors: { [key in Contact['relationship']]: string } = {
    Introduction: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
    Networking: "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100",
    Alumni: "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-100",
    Personal: "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-100",
    'Recruiter/HR': "bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-200",
    Colleague: "bg-teal-100 text-teal-800 border-teal-200 hover:bg-teal-100",
};

// Maps status types to specific Tailwind CSS classes for styling
const statusColors: { [key in Contact['status']]: string } = {
    New: "bg-purple-200 text-purple-800 border-purple-300 hover:bg-purple-200",
    Established: "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
    Lead: "bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100",
};

/**
 * A more visually engaging indicator for the strength of a relationship.
 * @param strength - A number from 0 to 4 representing strength.
 */
const StrengthIndicator = ({ strength }: { strength: number }) => (
    <div className="flex items-center gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
            <div
                key={i}
                className={`h-2 w-5 rounded-full transition-all ${i < strength ? 'bg-purple-500' : 'bg-gray-200'}`}
            />
        ))}
    </div>
);

/**
 * Generates initials from a name for use in an avatar fallback.
 * @param name - The full name of the contact.
 */
const getInitials = (name: string) => {
    const names = name.split(' ');
    if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return names[0].substring(0, 2);
};

/**
 * A more compact follow-up indicator that fits in the top-right area
 */
const FollowUpIndicator = ({ followUp }: { followUp: FollowUp }) => {
    const priorityColors = {
        high: 'bg-red-50 text-red-700 border-red-200',
        medium: 'bg-amber-50 text-amber-700 border-amber-200',
        low: 'bg-blue-50 text-blue-700 border-blue-200'
    };

    // Truncate reason to ~25 chars while keeping whole words
    const truncateReason = (reason: string) => {
        if (reason.length <= 25) return reason;
        const truncated = reason.substring(0, 25).split(' ').slice(0, -1).join(' ');
        return `${truncated}...`;
    };

    return (
        <div 
            className={`inline-flex items-center gap-2 px-2 py-1 rounded-md text-xs ${priorityColors[followUp.priority]}`}
            title={followUp.reason} // Show full reason on hover
        >
            <Bell className="h-3.5 w-3.5 flex-shrink-0" />
            <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-medium truncate max-w-[120px]">{truncateReason(followUp.reason)}</span>
                <span className="whitespace-nowrap flex-shrink-0">· {new Date(followUp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
        </div>
    );
};

/**
 * Component to display the most recent interaction and a button to add new ones
 */
const InteractionSection = ({ interactions = [], onAddInteraction }: { 
    interactions: Interaction[], 
    onAddInteraction?: () => void 
}) => {
    const lastInteraction = interactions[0];
    
    return (
        <div>
            <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Contact</div>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1.5 border-purple-100 hover:border-purple-200 hover:bg-purple-50 text-purple-600 text-xs font-medium transition-colors"
                    onClick={onAddInteraction}
                >
                    <MessageSquare className="h-3.5 w-3.5" />
                    Log
                </Button>
            </div>
            <div className="flex items-center gap-1.5">
                {lastInteraction ? (
                    <span className="text-sm text-gray-600">
                        {new Date(lastInteraction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                ) : (
                    <span className="text-sm text-gray-400">None</span>
                )}
            </div>
        </div>
    );
};

/**
 * A redesigned "Contact Card" inspired by modern UI from Basecamp and Linear.
 * This component moves away from a dense table to a more scannable card layout.
 * Each card is a self-contained summary, making the list feel lighter and more manageable.
 * @param contact - The contact data to display.
 */
const ContactCard = ({ contact }: { contact: Contact }) => {
    const handleAddInteraction = () => {
        // In a real implementation, this would open a modal or form to add interaction details
        console.log(`Adding interaction for ${contact.name}`);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 group">
            <div className="p-4">
                {/* Top section with contact info */}
                <div className="relative mb-4">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 text-lg flex-shrink-0">
                            <AvatarFallback className="bg-purple-100 text-purple-700 font-semibold">
                                {getInitials(contact.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-gray-900 text-lg truncate">{contact.name}</h3>
                            <p className="text-gray-600 mt-0.5 truncate">{contact.company.title} at <span className="font-medium">{contact.company.name}</span></p>
                        </div>
                    </div>
                    
                    {/* Follow-up indicator and actions - Responsive positioning */}
                    <div className="mt-4 sm:mt-0 sm:absolute sm:top-0 sm:right-0 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        {contact.followUp && (
                            <FollowUpIndicator followUp={contact.followUp} />
                        )}
                        {/* Action buttons with hover opacity - Hidden on mobile */}
                        <div className="hidden sm:flex items-center gap-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:bg-purple-50 hover:text-purple-600"
                            >
                                <Info className="h-5 w-5" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className={`h-8 w-8 hover:bg-red-50 hover:text-red-600 ${
                                    contact.flagged ? 'bg-red-50 text-red-500' : ''
                                }`}
                            >
                                <Flag className="h-5 w-5" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 hover:bg-red-50 hover:text-red-600"
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Metadata grid - Responsive layout */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 text-left pt-4 border-t border-gray-100">
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Relationship</div>
                        <Badge variant="outline" className={`text-sm ${relationshipColors[contact.relationship]}`}>
                            {contact.relationship}
                        </Badge>
                    </div>
                    <div>
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Status</div>
                        <Badge variant="outline" className={`text-sm ${statusColors[contact.status]}`}>
                            {contact.status}
                        </Badge>
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Strength</div>
                        <StrengthIndicator strength={contact.strength} />
                    </div>
                    <div className="col-span-2 lg:col-span-1">
                        <InteractionSection 
                            interactions={contact.interactions || []}
                            onAddInteraction={handleAddInteraction}
                        />
                    </div>
                </div>

                {/* Show introducer in a separate row if present */}
                {contact.via && (
                    <div className="flex flex-wrap items-center gap-2 text-gray-600 mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-gray-100">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Introduced by</div>
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400"/>
                            <span className="font-medium">{contact.via}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

/**
 * A component to display a preview of the contacts management UI.
 * This version uses the redesigned "ContactCard" for a cleaner, more modern aesthetic.
 */
export const ContactsPreview = () => {
    return (
        <div className="bg-gray-50/70 rounded-2xl shadow-2xl shadow-purple-200/30 p-4 sm:p-6 md:p-8 mx-auto max-w-7xl -mt-8 mb-16 border border-purple-100">
            {/* Header section with title, search, filters, and CTA. Clean and functional. */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Contacts</h2>
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 sm:gap-4">
                    <div className="relative flex-1 xs:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input placeholder="Search contacts..." className="pl-10 w-full xs:w-48 sm:w-64 bg-white" />
                    </div>
                    {/*
                     * We're using a purple-to-violet gradient for this button.
                     * This keeps it within the brand's color scheme while visually distinguishing it
                     * from the main, solid-purple "Sign Up" or "Get Started" call-to-action buttons.
                     * Using a subtle gradient for secondary actions within a component is a good way
                     * to create visual hierarchy without introducing jarring new colors.
                    */}
                    <Button className="bg-gradient-to-br from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-500/30 hover:from-purple-700 hover:to-violet-600 w-full xs:w-auto">
                        + Add Contact
                    </Button>
                </div>
            </div>

            {/* Sub-header with pagination and counts */}
            <div className="flex flex-col xs:flex-row xs:items-center justify-between text-sm text-gray-500 mb-6 px-2 gap-4">
                <p>Showing <span className="font-medium text-gray-700">1 - {contacts.length}</span> of <span className="font-medium text-gray-700">64</span> active contacts</p>
                <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 bg-white">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* A vertical stack of the new ContactCard components */}
            <div className="space-y-4">
                {contacts.slice(0, 4).map((contact, index) => (
                    <ContactCard key={index} contact={contact} />
                ))}
            </div>
        </div>
    );
}; 