/**
 * Editable Solution Section Component
 * 
 * This component renders an editable version of the original Solution landing page section.
 * It presents the product's features and benefits as solutions to previously stated problems,
 * with dynamic content highlighting and feature icons that adapt to different ad formats.
 * 
 * Key Features:
 * - Click-to-edit text: All solution descriptions and highlights are editable
 * - Multi-highlight system: Different colored highlights for different benefit types
 * - Feature icons: Visual representation of key solution features (follow-ups, centralization, AI, progress)
 * - Responsive content: Shows/hides elements based on available space in ad format
 * - Export mode: Clean view without editing indicators
 * 
 * Layout Variations by Ad Size:
 * - Square: Full layout with feature icons and complete description highlighting
 * - Portrait: Feature icons with simplified description
 * - Landscape: Full description highlighting without feature icons
 * - Banner: Minimal single-highlight description only
 * 
 * @author AI Assistant
 * @version 1.0
 */

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, MessageSquare, Lightbulb, TrendingUp } from "lucide-react";

// ========== TYPE DEFINITIONS ==========

/**
 * Content structure for the Solution section
 * Contains segmented description with multiple highlight opportunities
 */
interface SolutionContent {
  mainHeadline: string;    // "From networking chaos to career momentum." - main value proposition
  description: string;     // First part of solution description
  highlight1: string;      // First benefit highlight (typically yellow - automation)
  highlight2: string;      // Second benefit highlight (typically green - AI features)
  description2: string;    // Middle part of solution description
  highlight3: string;      // Third benefit highlight (typically purple - outcomes)
  description3: string;    // Final part of solution description
}

/**
 * Ad size configuration object
 * Determines which UI elements and content to show/hide
 */
interface AdSize {
  id: string;          // Unique identifier for the ad size
  name: string;        // Display name with actual pixel dimensions
  width: string;       // CSS width for preview rendering
  height: string;      // CSS height for preview rendering
}

/**
 * Props interface for EditableSolution component
 */
interface EditableSolutionProps {
  content: SolutionContent;                           // Current solution text content
  onChange: (content: SolutionContent) => void;       // Content update handler
  isExportMode: boolean;                              // Hide editing UI when true
  adSize: AdSize;                                    // Current ad size configuration
}

/**
 * EditableSolution Component Implementation
 * 
 * @param props - Component props containing content, handlers, and configuration
 * @returns Rendered solution section with editable text and feature icons
 */
const EditableSolution: React.FC<EditableSolutionProps> = ({ content, onChange, isExportMode, adSize }) => {
  
  // ========== COMPONENT STATE ==========
  
  /** Track which text field is currently being edited (null = none, string = field key) */
  const [editingField, setEditingField] = useState<string | null>(null);

  // ========== EVENT HANDLERS ==========

  /**
   * Update content for a specific field
   * @param field - The content field to update  
   * @param value - New value for the field
   */
  const updateContent = (field: keyof SolutionContent, value: string) => {
    onChange({
      ...content,
      [field]: value
    });
  };

  /**
   * Start editing a specific field (only when not in export mode)
   * @param field - The field to start editing
   */
  const handleEdit = (field: string) => {
    if (!isExportMode) {
      setEditingField(field);
    }
  };

  /**
   * Stop editing current field (called on blur or Enter key)
   */
  const handleSave = () => {
    setEditingField(null);
  };

  /**
   * Handle keyboard shortcuts while editing (Enter to save)
   * @param e - Keyboard event
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  // Render editable text element
  const renderEditableText = (
    field: keyof SolutionContent, 
    className: string, 
    placeholder?: string,
    multiline: boolean = false
  ) => {
    const isEditing = editingField === field;
    const value = content[field];

    if (isEditing) {
      const Component = multiline ? Textarea : Input;
      return (
        <Component
          value={value}
          onChange={(e) => updateContent(field, e.target.value)}
          onBlur={handleSave}
          onKeyPress={multiline ? undefined : handleKeyPress}
          className={`${className} border-2 border-blue-500 bg-white`}
          placeholder={placeholder}
          autoFocus
        />
      );
    }

    return (
      <span
        className={`${className} ${!isExportMode ? 'cursor-pointer hover:bg-blue-50 rounded px-1' : ''}`}
        onClick={() => handleEdit(field)}
        title={!isExportMode ? 'Click to edit' : ''}
      >
        {value || placeholder}
      </span>
    );
  };

  // ========== LAYOUT CALCULATIONS ==========

  /**
   * Calculate responsive styling based on current ad format
   * Determines which UI elements to show/hide and how to size them
   * 
   * @returns Object with styling classes and visibility flags
   */
  const getResponsiveClasses = () => {
    const isBanner = adSize.id === 'banner';
    const isPortrait = adSize.id === 'portrait';
    const isLandscape = adSize.id === 'landscape' || adSize.id === 'linkedin-sponsored';

    // Banner: Minimal space, text-only approach
    if (isBanner) {
      return {
        container: 'p-2',
        heading: 'text-sm font-bold leading-tight',
        subtext: 'text-xs leading-tight',
        spacing: 'mb-1',
        showFeatures: false,        // No space for icons
        showFullDescription: false  // Simplified text only
      };
    }

    // Portrait: Mobile-optimized with key features shown
    if (isPortrait) {
      return {
        container: 'p-4',
        heading: 'text-lg font-bold leading-tight',
        subtext: 'text-sm leading-relaxed',
        spacing: 'mb-2',
        showFeatures: true,         // Show feature icons for engagement
        showFullDescription: false  // Simplified description for space
      };
    }

    // Landscape: Wide format optimized for description highlighting
    if (isLandscape) {
      return {
        container: 'p-4',
        heading: 'text-xl font-bold leading-tight',
        subtext: 'text-sm leading-relaxed',
        spacing: 'mb-2',
        showFeatures: false,        // Focus on text content
        showFullDescription: true   // Full highlighted description
      };
    }

    // Square and other formats: Maximum impact with all elements
    return {
      container: 'p-6',
      heading: 'text-2xl font-bold leading-tight',
      subtext: 'text-base leading-relaxed',
      spacing: 'mb-3',
      showFeatures: true,         // Show all feature icons
      showFullDescription: true   // Complete description with all highlights
    };
  };

  const classes = getResponsiveClasses();

  // ========== STATIC DATA ==========

  /**
   * Solution feature icons and metadata
   * Each represents a key product capability with visual branding
   */
  const solutions = [
    { icon: Bell, title: "Follow-ups", iconColor: "text-purple-600" },      // Notification/reminder features
    { icon: MessageSquare, title: "Centralize", iconColor: "text-teal-600" }, // Communication consolidation
    { icon: Lightbulb, title: "AI Suggestions", iconColor: "text-orange-600" }, // AI-powered insights
    { icon: TrendingUp, title: "Progress", iconColor: "text-green-600" }    // Analytics and tracking
  ];

  return (
    <div className={`relative ${classes.container} overflow-hidden h-full flex flex-col justify-center bg-gradient-to-br from-teal-50 via-white to-purple-50`}>
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-10 h-10 bg-green-200 rounded-full"></div>
        <div className="absolute bottom-6 left-4 w-6 h-6 bg-blue-200 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-purple-200 rounded-full"></div>
      </div>
      <div className="text-center">
        {/* Main Headline */}
        <h2 className={`${classes.heading} text-gray-900 ${classes.spacing}`}>
          {renderEditableText('mainHeadline', 'inline-block', 'Main headline...', true)}
        </h2>

        {/* Description with highlights */}
        {classes.showFullDescription && (
          <div className={`${classes.subtext} text-gray-600 max-w-full mx-auto ${classes.spacing}`}>
            {renderEditableText('description', 'inline')}{" "}
            <span className="inline-block bg-yellow-400 font-bold px-1 py-0.5 rounded whitespace-nowrap">
              {renderEditableText('highlight1', 'inline')}
            </span>{" "}
            <br />
            <span className="inline-block bg-green-500 text-white font-bold px-1 py-0.5 rounded whitespace-nowrap">
              {renderEditableText('highlight2', 'inline')}
            </span>{" "}
            {renderEditableText('description2', 'inline')}{" "}
            <span className="inline-block bg-purple-500 text-white font-bold px-1 py-0.5 rounded whitespace-nowrap">
              {renderEditableText('highlight3', 'inline')}
            </span>{" "}
            {renderEditableText('description3', 'inline')}
          </div>
        )}

        {/* Simplified description for smaller formats */}
        {!classes.showFullDescription && (
          <div className={`${classes.subtext} text-gray-600 max-w-full mx-auto ${classes.spacing}`}>
            {renderEditableText('description', 'inline')}{" "}
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 px-1 py-0.5 rounded-sm">
              {renderEditableText('highlight1', 'inline')}
            </span>
          </div>
        )}

        {/* Feature Icons - only show in appropriate formats */}
        {classes.showFeatures && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {solutions.map((solution, index) => {
              const IconComponent = solution.icon;
              
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-1">
                    <div className="rounded-full p-2 bg-gradient-to-r from-purple-100 to-teal-100 shadow-lg">
                      <IconComponent className={`h-6 w-6 ${solution.iconColor}`} />
                    </div>
                  </div>
                  <h3 className="text-xs font-semibold text-gray-900">
                    {solution.title}
                  </h3>
                </div>
              );
            })}
          </div>
        )}
      </div>


    </div>
  );
};

export default EditableSolution; 