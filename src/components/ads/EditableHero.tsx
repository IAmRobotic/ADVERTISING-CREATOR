import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

// Type definitions for props
interface HeroContent {
  mainHeadline: string;
  highlightedText: string;
  subHeadline1: string;
  highlight1: string;
  subHeadline2: string;
  highlight2: string;
  subHeadline3: string;
  highlight3: string;
  ctaText: string;
}

interface AdSize {
  id: string;
  name: string;
  width: string;
  height: string;
}

interface FontSizes {
  heroHeadline: string;
  heroSubtext: string;
}

interface EditableHeroProps {
  content: HeroContent;
  onChange: (content: HeroContent) => void;
  isExportMode: boolean;
  adSize: AdSize;
  fontSizes: FontSizes;
}

const EditableHero: React.FC<EditableHeroProps> = ({ content, onChange, isExportMode, adSize, fontSizes }) => {
  // State for tracking which field is being edited
  const [editingField, setEditingField] = useState<string | null>(null);

  // Handle text updates
  const updateContent = (field: keyof HeroContent, value: string) => {
    onChange({
      ...content,
      [field]: value
    });
  };

  // Handle click to edit
  const handleEdit = (field: string) => {
    if (!isExportMode) {
      setEditingField(field);
    }
  };

  // Handle save (when user clicks away or presses Enter)
  const handleSave = () => {
    setEditingField(null);
  };

  // Handle Enter key press to save
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  // Render editable text element
  const renderEditableText = (
    field: keyof HeroContent, 
    className: string, 
    placeholder?: string
  ) => {
    const isEditing = editingField === field;
    const value = content[field];

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

  // Get font size classes based on user selection
  const getFontSizeClasses = (type: 'headline' | 'subtext', baseSize: string) => {
    const sizeMap = {
      headline: {
        small: 'text-2xl sm:text-3xl md:text-4xl',
        normal: 'text-3xl sm:text-4xl md:text-5xl',
        large: 'text-4xl sm:text-5xl md:text-6xl',
        xl: 'text-5xl sm:text-6xl md:text-7xl'
      },
      subtext: {
        small: 'text-sm sm:text-base',
        normal: 'text-base sm:text-lg md:text-xl',
        large: 'text-lg sm:text-xl md:text-2xl'
      }
    };

    const userSize = type === 'headline' ? fontSizes.heroHeadline : fontSizes.heroSubtext;
    return sizeMap[type][userSize as keyof typeof sizeMap[typeof type]] || baseSize;
  };

  // Dynamic sizing based on ad format
  const getResponsiveClasses = () => {
    const isSquare = adSize.id === 'square';
    const isLandscape = adSize.id === 'landscape';
    const isPortrait = adSize.id === 'portrait';
    const isBanner = adSize.id === 'banner';

    if (isBanner) {
      return {
        container: 'p-2',
        heading: getFontSizeClasses('headline', 'text-lg leading-tight'),
        subtext: getFontSizeClasses('subtext', 'text-xs leading-tight'),
        button: 'px-2 py-1 text-xs',
        spacing: 'mb-1'
      };
    }

    if (isPortrait) {
      return {
        container: 'p-4',
        heading: getFontSizeClasses('headline', 'text-2xl sm:text-3xl leading-tight'),
        subtext: getFontSizeClasses('subtext', 'text-sm sm:text-base leading-relaxed'),
        button: 'px-4 py-2 text-sm',
        spacing: 'mb-3'
      };
    }

    if (isLandscape || adSize.id === 'linkedin-sponsored') {
      return {
        container: 'p-4',
        heading: getFontSizeClasses('headline', 'text-3xl sm:text-4xl md:text-5xl leading-tight'),
        subtext: getFontSizeClasses('subtext', 'text-base sm:text-lg leading-relaxed'),
        button: 'px-4 py-2 text-base',
        spacing: 'mb-4'
      };
    }

    // Square and other formats (default) - match original landing page proportions
    return {
      container: 'p-6',
      heading: getFontSizeClasses('headline', 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight'),
      subtext: getFontSizeClasses('subtext', 'text-base sm:text-lg md:text-xl leading-relaxed'),
      button: 'px-6 py-3 text-lg',
      spacing: 'mb-6'
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