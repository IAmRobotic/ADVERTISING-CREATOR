import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Download } from "lucide-react";
import EditableHero from "@/components/ads/EditableHero";
import EditableProblem from "@/components/ads/EditableProblem";
import EditableSolution from "@/components/ads/EditableSolution";

// Ad size presets with dimensions optimized for different platforms
const adSizes = [
  { id: 'square', name: 'Square (1080x1080)', width: '500px', height: '500px', description: 'Instagram posts, Facebook posts' },
  { id: 'square-large', name: 'Large Square (1200x1200)', width: '550px', height: '550px', description: 'High-res Instagram, premium social posts' },
  { id: 'landscape', name: 'Landscape (1200x630)', width: '600px', height: '315px', description: 'Facebook cover, LinkedIn posts' },
  { id: 'linkedin-sponsored', name: 'LinkedIn Sponsored (1200x627)', width: '600px', height: '313px', description: 'LinkedIn sponsored content' },
  { id: 'portrait', name: 'Portrait (1080x1920)', width: '300px', height: '533px', description: 'Instagram Stories, TikTok' },
  { id: 'mobile', name: 'Mobile (720x900)', width: '360px', height: '450px', description: 'Mobile-optimized ads, app banners' },
  { id: 'banner', name: 'Banner (728x90)', width: '728px', height: '90px', description: 'Web banners, headers' },
];

// Section types that can be edited
const sections = [
  { id: 'hero', name: 'Hero Section', description: 'Main headline with call-to-action' },
  { id: 'problem', name: 'Problem Section', description: 'Pain points and challenges' },
  { id: 'solution', name: 'Solution Section', description: 'Features and benefits' },
];

const AdBuilder = () => {
  // State for controlling the interface
  const [selectedSection, setSelectedSection] = useState('hero');
  const [selectedSize, setSelectedSize] = useState('square');
  const [isExportMode, setIsExportMode] = useState(false);

  // State for editable content - Hero section
  const [heroContent, setHeroContent] = useState({
    mainHeadline: 'Networking',
    highlightedText: "doesn't have to suck.",
    subHeadline1: 'Stop juggling messages, spreadsheets, post-it notes and',
    highlight1: 'forgotten follow-ups.',
    subHeadline2: 'Chumzee helps you',
    highlight2: 'build momentum',
    subHeadline3: 'and nurture',
    highlight3: 'meaningful relationships.',
    ctaText: 'Start building momentum'
  });

  // State for editable content - Problem section
  const [problemContent, setProblemContent] = useState({
    mainHeadline: 'Just applying to jobs',
    highlightedText: 'is a dead end.',
    subText1: 'You know you should be networking more.',
    subText2: 'Building meaningful relationships shouldn\'t feel so',
    highlight1: 'overwhelming and draining.',
    transitionalText: 'Without structure and a plan, it\'s all just busywork.'
  });

  // State for editable content - Solution section
  const [solutionContent, setSolutionContent] = useState({
    mainHeadline: 'From networking chaos to career momentum.',
    description: 'One organized system. Every interaction, note, and meeting',
    highlight1: 'syncs automatically.',
    highlight2: 'AI suggestions',
    description2: 'and visual progress tracking turn networking from a daunting task into',
    highlight3: 'simple daily wins',
    description3: 'you can see and feel.'
  });

  // Get current ad size configuration
  const currentSize = adSizes.find(size => size.id === selectedSize) || adSizes[0];

  // Handle export mode for clean screenshots
  const handleExportMode = () => {
    setIsExportMode(!isExportMode);
  };

  // Render the selected section component
  const renderSection = () => {
    const commonProps = {
      isExportMode,
      adSize: currentSize
    };

    switch (selectedSection) {
      case 'hero':
        return (
          <EditableHero 
            content={heroContent}
            onChange={setHeroContent}
            {...commonProps}
          />
        );
      case 'problem':
        return (
          <EditableProblem 
            content={problemContent}
            onChange={setProblemContent}
            {...commonProps}
          />
        );
      case 'solution':
        return (
          <EditableSolution 
            content={solutionContent}
            onChange={setSolutionContent}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ad Builder</h1>
            <p className="text-gray-600">Create marketing materials from your landing page sections</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleExportMode}
              variant={isExportMode ? "default" : "outline"}
              className="flex items-center space-x-2"
            >
              <Camera className="h-4 w-4" />
              <span>{isExportMode ? 'Exit Export' : 'Export Mode'}</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Panel - Controls */}
          {!isExportMode && (
            <div className="lg:col-span-1 space-y-6">
              {/* Section Selector */}
              <Card>
                <CardHeader>
                  <CardTitle>Section</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {sections.map(section => (
                        <SelectItem key={section.id} value={section.id}>
                          <div>
                            <div className="font-medium">{section.name}</div>
                            <div className="text-sm text-gray-500">{section.description}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Size Selector */}
              <Card>
                <CardHeader>
                  <CardTitle>Ad Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                    {adSizes.map(size => (
                      <div key={size.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={size.id} id={size.id} />
                        <Label htmlFor={size.id} className="flex-1 cursor-pointer">
                          <div className="font-medium">{size.name}</div>
                          <div className="text-sm text-gray-500">{size.description}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>1. Select a section and ad size</p>
                  <p>2. Click text in the preview to edit</p>
                  <p>3. Use "Export Mode" for clean screenshots</p>
                  <p>4. Take screenshot with your preferred tool</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Right Panel - Preview */}
          <div className={`${isExportMode ? 'col-span-1' : 'lg:col-span-3'} flex items-center justify-center`}>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
              <div 
                className="relative bg-white"
                style={{
                  width: currentSize.width,
                  height: currentSize.height,
                  minHeight: currentSize.height,
                  overflow: 'hidden'
                }}
              >
                {renderSection()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBuilder; 