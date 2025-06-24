/**
 * Editable Hero Component
 * 
 * This component renders an editable version of the original Hero landing page section.
 * It preserves all visual styling (gradients, animations, typography) while making
 * text content editable through click-to-edit functionality.
 * 
 * Key Features:
 * - Click-to-edit text: Any text can be clicked to edit inline
 * - Responsive sizing: Adapts typography and layout for different ad sizes
 * - Font size controls: User-controllable headline and subtext sizing
 * - Gradient preservation: Maintains original purple-to-teal gradient styling
 * - CTA button: Editable call-to-action with gradient animation
 * - Export mode: Hides editing indicators for clean screenshots
 * 
 * The component handles 7 different ad size formats, automatically adjusting:
 * - Font sizes and spacing
 * - Container padding
 * - Button sizing
 * - Content visibility (some elements hidden in banner format)
 * 
 * @author AI Assistant
 * @version 1.0
 */

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

// ========== TYPE DEFINITIONS ==========

/**
 * Content structure for the Hero section
 * All properties are editable text fields
 */
interface HeroContent {
  mainHeadline: string;      // "Networking" - first part of headline
  highlightedText: string;   // "doesn't have to suck." - gradient highlighted part
  subHeadline1: string;      // First line of subtitle
  highlight1: string;        // First yellow highlighted phrase
  subHeadline2: string;      // Second line of subtitle
  highlight2: string;        // Second yellow highlighted phrase  
  subHeadline3: string;      // Third line of subtitle
  highlight3: string;        // Third yellow highlighted phrase (rotated)
  ctaText: string;          // Call-to-action button text
}

/**
 * Ad size configuration object
 * Defines dimensions and metadata for each ad format
 */
interface AdSize {
  id: string;          // Unique identifier (e.g., 'square', 'landscape')
  name: string;        // Display name with dimensions
  width: string;       // CSS width for preview
  height: string;      // CSS height for preview
}

/**
 * Font size control settings
 * User-configurable size options for different text elements
 */
interface FontSizes {
  heroHeadline: string;  // 'small' | 'normal' | 'large' | 'xl'
  heroSubtext: string;   // 'small' | 'normal' | 'large'
}

/**
 * Props interface for EditableHero component
 */
interface EditableHeroProps {
  content: HeroContent;                           // Current text content
  onChange: (content: HeroContent) => void;       // Content update handler
  isExportMode: boolean;                          // Hide editing UI when true
  adSize: AdSize;                                // Current ad size configuration
  fontSizes: FontSizes;                          // User font size preferences
}

/**
 * EditableHero Component Implementation
 * 
 * @param props - Component props containing content, handlers, and configuration
 * @returns Rendered hero section with editable text functionality
 */
const EditableHero: React.FC<EditableHeroProps> = ({ content, onChange, isExportMode, adSize, fontSizes }) => {
  
  // ========== COMPONENT STATE ==========
  
  /** 
   * Track which text field is currently being edited
   * null = no field being edited, string = field key being edited
   */
  const [editingField, setEditingField] = useState<string | null>(null);

  // ========== EVENT HANDLERS ==========

  /**
   * Update content for a specific field
   * 
   * @param field - The content field to update
   * @param value - New value for the field
   */
  const updateContent = (field: keyof HeroContent, value: string) => {
    onChange({
      ...content,
      [field]: value
    });
  };

  /**
   * Start editing a specific field
   * Only works when not in export mode
   * 
   * @param field - The field to start editing
   */
  const handleEdit = (field: string) => {
    if (!isExportMode) {
      setEditingField(field);
    }
  };

  /**
   * Stop editing current field
   * Called when user clicks away or presses Enter
   */
  const handleSave = () => {
    setEditingField(null);
  };

  /**
   * Handle keyboard shortcuts while editing
   * Enter key saves the current edit
   * 
   * @param e - Keyboard event
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  // ========== RENDERING HELPERS ==========

  /**
   * Render an editable text element that switches between display and edit modes
   * 
   * @param field - Content field key to render
   * @param className - CSS classes to apply
   * @param placeholder - Placeholder text when field is empty
   * @returns JSX element that's either editable input or clickable text
   */
  const renderEditableText = (
    field: keyof HeroContent, 
    className: string, 
    placeholder?: string
  ) => {
    const isEditing = editingField === field;
    const value = content[field];

    // Render input field when editing
    if (isEditing) {
      return (
        <Input
          value={value}
          onChange={(e) => updateContent(field, e.target.value)}
          onBlur={handleSave}
          onKeyPress={handleKeyPress}
          className={`${className} border-2 border-blue-500 bg-white`}
          placeholder={placeholder}
          autoFocus
        />
      );
    }

    // Render clickable text when not editing
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

  /**
   * Get font size classes based on user selection and text type
   * 
   * Maps user-friendly size names to Tailwind responsive font classes.
   * Falls back to baseSize if user selection is invalid.
   * 
   * @param type - Whether this is for headline or subtext
   * @param baseSize - Default size classes to use as fallback
   * @returns Tailwind CSS classes for the specified font size
   */
  const getFontSizeClasses = (type: 'headline' | 'subtext', baseSize: string) => {
    /** Mapping of user size preferences to Tailwind responsive classes */
    const sizeMap = {
      headline: {
        small: 'text-2xl sm:text-3xl md:text-4xl',           // Compact but readable
        normal: 'text-3xl sm:text-4xl md:text-5xl',          // Standard size
        large: 'text-4xl sm:text-5xl md:text-6xl',           // Bold impact
        xl: 'text-5xl sm:text-6xl md:text-7xl'               // Maximum impact
      },
      subtext: {
        small: 'text-sm sm:text-base',                       // Minimal space usage
        normal: 'text-base sm:text-lg md:text-xl',           // Good readability
        large: 'text-lg sm:text-xl md:text-2xl'              // High emphasis
      }
    };

    const userSize = type === 'headline' ? fontSizes.heroHeadline : fontSizes.heroSubtext;
    return sizeMap[type][userSize as keyof typeof sizeMap[typeof type]] || baseSize;
  };

  /**
   * Calculate responsive classes based on the current ad format
   * 
   * Each ad size gets different typography, spacing, and button sizing
   * to optimize readability and visual impact for that format.
   * 
   * @returns Object containing CSS classes for different UI elements
   */
  const getResponsiveClasses = () => {
    const isBanner = adSize.id === 'banner';
    const isPortrait = adSize.id === 'portrait';
    const isLandscape = adSize.id === 'landscape' || adSize.id === 'linkedin-sponsored';

    // Banner format: Minimal height, compact everything
    if (isBanner) {
      return {
        container: 'p-2',                                              // Minimal padding
        heading: getFontSizeClasses('headline', 'text-lg leading-tight'),  // Small but readable
        subtext: getFontSizeClasses('subtext', 'text-xs leading-tight'),   // Minimal subtext
        button: 'px-2 py-1 text-xs',                                   // Tiny button
        spacing: 'mb-1'                                                // Minimal spacing
      };
    }

    // Portrait format: Tall and narrow, optimized for mobile viewing
    if (isPortrait) {
      return {
        container: 'p-4',                                                        // Moderate padding
        heading: getFontSizeClasses('headline', 'text-2xl sm:text-3xl leading-tight'),  // Mobile-friendly size
        subtext: getFontSizeClasses('subtext', 'text-sm sm:text-base leading-relaxed'), // Readable on mobile
        button: 'px-4 py-2 text-sm',                                             // Finger-friendly button
        spacing: 'mb-3'                                                          // Tight vertical spacing
      };
    }

    // Landscape formats: Wide social media headers and covers
    if (isLandscape) {
      return {
        container: 'p-4',                                                               // Moderate padding
        heading: getFontSizeClasses('headline', 'text-3xl sm:text-4xl md:text-5xl leading-tight'), // Good impact
        subtext: getFontSizeClasses('subtext', 'text-base sm:text-lg leading-relaxed'),            // Readable
        button: 'px-4 py-2 text-base',                                                  // Standard button
        spacing: 'mb-4'                                                                 // Good spacing
      };
    }

    // Square and other formats (default): Maximum impact like original landing page
    return {
      container: 'p-6',                                                                        // Generous padding
      heading: getFontSizeClasses('headline', 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight'), // Maximum impact
      subtext: getFontSizeClasses('subtext', 'text-base sm:text-lg md:text-xl leading-relaxed'),             // Excellent readability
      button: 'px-6 py-3 text-lg',                                                             // Large, prominent button
      spacing: 'mb-6'                                                                          // Generous spacing
    };
  };

  const classes = getResponsiveClasses();

  return (
    <div className={`relative ${classes.container} overflow-hidden h-full flex flex-col justify-center bg-gradient-to-br from-purple-50 via-white to-teal-50`}>
      {/* Subtle decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-8 h-8 bg-purple-200 rounded-full"></div>
        <div className="absolute bottom-6 right-6 w-6 h-6 bg-teal-200 rounded-full"></div>
        <div className="absolute top-1/3 right-8 w-4 h-4 bg-yellow-200 rounded-full"></div>
      </div>
      <div className="text-center">
        {/* Main Headline */}
        <h1 className={`${classes.heading} font-bold text-gray-900 ${classes.spacing} leading-tight`}>
          <span className="block">
            {renderEditableText('mainHeadline', 'inline-block')}
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
            {renderEditableText('highlightedText', 'inline-block')}
          </span>
        </h1>
        
        {/* Subtitle sections - only show in larger formats */}
        {adSize.id !== 'banner' && (
          <div className={`${classes.subtext} text-gray-700 ${classes.spacing} max-w-full mx-auto`}>
            <span className="block">
              {renderEditableText('subHeadline1', 'inline')}
              {" "}
              <span className="inline-block bg-yellow-400 font-bold px-1 py-0.5 rounded whitespace-nowrap">
                {renderEditableText('highlight1', 'inline')}
              </span>
            </span>
            
            <span className="block mt-2">
              {renderEditableText('subHeadline2', 'inline')}
              {" "}
              <span className="inline-block bg-yellow-400 font-bold px-1 py-0.5 rounded whitespace-nowrap">
                {renderEditableText('highlight2', 'inline')}
              </span>
              {" "}{renderEditableText('subHeadline3', 'inline')}
            </span>
            
            <span className="block mt-1">
              <span className="inline-block bg-yellow-400 font-bold px-1 py-0.5 rounded rotate-[-2deg] relative whitespace-nowrap">
                {renderEditableText('highlight3', 'inline')}
              </span>
            </span>
          </div>
        )}
        
        {/* CTA Button - adapt size based on format */}
        <div className="flex justify-center">
          <Button
            size="lg"
            className={`animate-gradient-slide text-white ${classes.button} rounded-lg shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:scale-105 transition-all duration-300`}
          >
            {editingField === 'ctaText' ? (
              <Input
                value={content.ctaText}
                onChange={(e) => updateContent('ctaText', e.target.value)}
                onBlur={handleSave}
                onKeyPress={handleKeyPress}
                className="bg-transparent border-white text-white placeholder-white/80"
                autoFocus
              />
            ) : (
              <span 
                className={!isExportMode ? 'cursor-pointer' : ''}
                onClick={() => handleEdit('ctaText')}
              >
                {content.ctaText}
              </span>
            )}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditableHero; 