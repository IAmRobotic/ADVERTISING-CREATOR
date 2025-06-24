import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Bell, MessageSquare, Lightbulb, TrendingUp } from "lucide-react";

// Type definitions for props
interface SolutionContent {
  mainHeadline: string;
  description: string;
  highlight1: string;
  highlight2: string;
  description2: string;
  highlight3: string;
  description3: string;
}

interface AdSize {
  id: string;
  name: string;
  width: string;
  height: string;
}

interface EditableSolutionProps {
  content: SolutionContent;
  onChange: (content: SolutionContent) => void;
  isExportMode: boolean;
  adSize: AdSize;
}

const EditableSolution: React.FC<EditableSolutionProps> = ({ content, onChange, isExportMode, adSize }) => {
  // State for tracking which field is being edited
  const [editingField, setEditingField] = useState<string | null>(null);

  // Handle text updates
  const updateContent = (field: keyof SolutionContent, value: string) => {
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
        showFeatures: false,
        showFullDescription: false
      };
    }

    if (isPortrait) {
      return {
        container: 'p-4',
        heading: 'text-lg font-bold leading-tight',
        subtext: 'text-sm leading-relaxed',
        spacing: 'mb-2',
        showFeatures: true,
        showFullDescription: false
      };
    }

    if (isLandscape) {
      return {
        container: 'p-4',
        heading: 'text-xl font-bold leading-tight',
        subtext: 'text-sm leading-relaxed',
        spacing: 'mb-2',
        showFeatures: false,
        showFullDescription: true
      };
    }

    // Square (default)
    return {
      container: 'p-6',
      heading: 'text-2xl font-bold leading-tight',
      subtext: 'text-base leading-relaxed',
      spacing: 'mb-3',
      showFeatures: true,
      showFullDescription: true
    };
  };

  const classes = getResponsiveClasses();

  // Solution features for icons
  const solutions = [
    { icon: Bell, title: "Follow-ups", iconColor: "text-purple-600" },
    { icon: MessageSquare, title: "Centralize", iconColor: "text-teal-600" },
    { icon: Lightbulb, title: "AI Suggestions", iconColor: "text-orange-600" },
    { icon: TrendingUp, title: "Progress", iconColor: "text-green-600" }
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