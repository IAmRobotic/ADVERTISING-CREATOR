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

interface EditableHeroProps {
  content: HeroContent;
  onChange: (content: HeroContent) => void;
  isExportMode: boolean;
  adSize: AdSize;
}

const EditableHero: React.FC<EditableHeroProps> = ({ content, onChange, isExportMode, adSize }) => {
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

  // Dynamic sizing based on ad format
  const getResponsiveClasses = () => {
    const isSquare = adSize.id === 'square';
    const isLandscape = adSize.id === 'landscape';
    const isPortrait = adSize.id === 'portrait';
    const isBanner = adSize.id === 'banner';

    if (isBanner) {
      return {
        container: 'p-2',
        heading: 'text-lg font-bold leading-tight',
        subtext: 'text-xs leading-tight',
        button: 'px-2 py-1 text-xs',
        spacing: 'mb-1'
      };
    }

    if (isPortrait) {
      return {
        container: 'p-4',
        heading: 'text-xl font-bold leading-tight',
        subtext: 'text-sm leading-relaxed',
        button: 'px-4 py-2 text-sm',
        spacing: 'mb-2'
      };
    }

    if (isLandscape) {
      return {
        container: 'p-4',
        heading: 'text-2xl font-bold leading-tight',
        subtext: 'text-base leading-relaxed',
        button: 'px-4 py-2 text-base',
        spacing: 'mb-3'
      };
    }

    // Square (default)
    return {
      container: 'p-6',
      heading: 'text-3xl font-bold leading-tight',
      subtext: 'text-lg leading-relaxed',
      button: 'px-6 py-3 text-lg',
      spacing: 'mb-4'
    };
  };

  const classes = getResponsiveClasses();

  return (
    <div className={`relative ${classes.container} overflow-hidden h-full flex flex-col justify-center`}>
      <div className="text-center">
        {/* Main Headline */}
        <h1 className={`${classes.heading} text-gray-900 ${classes.spacing}`}>
          {renderEditableText('mainHeadline', 'inline-block')}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
            {" "}{renderEditableText('highlightedText', 'inline-block')}
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