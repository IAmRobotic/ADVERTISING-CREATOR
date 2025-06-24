import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Type definitions for props
interface ProblemContent {
  mainHeadline: string;
  highlightedText: string;
  subText1: string;
  subText2: string;
  highlight1: string;
  transitionalText: string;
}

interface AdSize {
  id: string;
  name: string;
  width: string;
  height: string;
}

interface EditableProblemProps {
  content: ProblemContent;
  onChange: (content: ProblemContent) => void;
  isExportMode: boolean;
  adSize: AdSize;
}

const EditableProblem: React.FC<EditableProblemProps> = ({ content, onChange, isExportMode, adSize }) => {
  // State for tracking which field is being edited
  const [editingField, setEditingField] = useState<string | null>(null);

  // Handle text updates
  const updateContent = (field: keyof ProblemContent, value: string) => {
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
    field: keyof ProblemContent, 
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

  // Dynamic sizing based on ad format
  const getResponsiveClasses = () => {
    const isSquare = adSize.id === 'square';
    const isLandscape = adSize.id === 'landscape';
    const isPortrait = adSize.id === 'portrait';
    const isBanner = adSize.id === 'banner';

    if (isBanner) {
      return {
        container: 'p-2',
        heading: 'text-sm font-bold leading-tight',
        subtext: 'text-xs leading-tight',
        spacing: 'mb-1',
        showIcons: false,
        showTransition: false
      };
    }

    if (isPortrait) {
      return {
        container: 'p-4',
        heading: 'text-lg font-bold leading-tight',
        subtext: 'text-sm leading-relaxed',
        spacing: 'mb-2',
        showIcons: false,
        showTransition: true
      };
    }

    if (isLandscape) {
      return {
        container: 'p-4',
        heading: 'text-xl font-bold leading-tight',
        subtext: 'text-sm leading-relaxed',
        spacing: 'mb-2',
        showIcons: false,
        showTransition: true
      };
    }

    // Square (default)
    return {
      container: 'p-6',
      heading: 'text-2xl font-bold leading-tight',
      subtext: 'text-base leading-relaxed',
      spacing: 'mb-3',
      showIcons: true,
      showTransition: true
    };
  };

  const classes = getResponsiveClasses();

  return (
    <div className={`relative ${classes.container} overflow-hidden h-full flex flex-col justify-center`}>
      <div className="text-center">
        {/* Main Headline */}
        <h2 className={`${classes.heading} text-gray-900 ${classes.spacing}`}>
          {renderEditableText('mainHeadline', 'inline-block')}{" "}
          <span className="relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
              {renderEditableText('highlightedText', 'inline-block')}
            </span>
            {/* Handwritten underline effect - only show in larger formats */}
            {classes.showIcons && (
              <svg 
                className="absolute -bottom-1 left-0 w-full h-2" 
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
            )}
          </span>
        </h2>

        {/* Subtitle */}
        <div className={`${classes.subtext} text-gray-700 ${classes.spacing} max-w-full mx-auto`}>
          {renderEditableText('subText1', 'block')}{" "}
          {adSize.id !== 'banner' && <br />}
          {renderEditableText('subText2', 'inline')}{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-yellow-200 to-yellow-300 px-1 py-0.5 rounded-sm transform -rotate-1 inline-block">
              {renderEditableText('highlight1', 'inline')}
            </span>
          </span>
        </div>

        {/* Transitional Text - only show in larger formats */}
        {classes.showTransition && (
          <div className="mt-4">
            <h3 className={`${classes.subtext} font-semibold text-gray-800 max-w-full mx-auto leading-relaxed`}>
              {renderEditableText('transitionalText', 'inline', 'Transitional message...', true)}
            </h3>
          </div>
        )}

        {/* Problem Icons Grid - only show in square format */}
        {classes.showIcons && (
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="rounded-full p-2 bg-gradient-to-r from-purple-100 to-teal-100 shadow-lg">
                  <img
                    src="/scattered.svg"
                    alt="Scattered"
                    className="h-12 w-12"
                  />
                </div>
              </div>
              <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                Scattered
              </h3>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="rounded-full p-2 bg-gradient-to-r from-purple-100 to-teal-100 shadow-lg">
                  <img
                    src="/maze.svg"
                    alt="Overwhelming"
                    className="h-12 w-12"
                  />
                </div>
              </div>
              <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                Overwhelming
              </h3>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <div className="rounded-full p-2 bg-gradient-to-r from-purple-100 to-teal-100 shadow-lg">
                  <img
                    src="/no-plan.svg"
                    alt="No Clear System"
                    className="h-12 w-12"
                  />
                </div>
              </div>
              <h3 className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
                No System
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableProblem; 