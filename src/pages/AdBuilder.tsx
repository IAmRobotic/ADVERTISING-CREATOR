/**
 * Ad Builder - Landing Page Content to Marketing Materials Converter
 * 
 * This component creates an interface for converting landing page sections (Hero, Problem, Solution)
 * into marketing materials of various sizes. It preserves all original styling (gradients, animations,
 * typography) while making text content editable and adapting layouts for different ad formats.
 * 
 * Key Features:
 * - Split-screen interface: controls on left, live preview on right
 * - Section selector: choose between Hero, Problem, and Solution sections
 * - Size presets: 7 different ad formats optimized for social media and web
 * - Click-to-edit text: all text content is editable in real-time
 * - Font size controls: adjustable headline and subtext sizing
 * - Export mode: clean view for screenshots without editing controls
 * - Responsive design: adapts content to fit each ad format perfectly
 * 
 * @author AI Assistant
 * @version 1.0
 */

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

/**
 * Ad size presets with dimensions optimized for different platforms
 * Each preset includes:
 * - id: unique identifier for the preset
 * - name: display name showing actual pixel dimensions
 * - width/height: CSS dimensions for preview (scaled down from actual)
 * - description: platforms and use cases for this size
 */
const adSizes = [
  { id: 'square', name: 'Square (1080x1080)', width: '500px', height: '500px', description: 'Instagram posts, Facebook posts' },
  { id: 'square-large', name: 'Large Square (1200x1200)', width: '550px', height: '550px', description: 'High-res Instagram, premium social posts' },
  { id: 'landscape', name: 'Landscape (1200x630)', width: '600px', height: '315px', description: 'Facebook cover, LinkedIn posts' },
  { id: 'linkedin-sponsored', name: 'LinkedIn Sponsored (1200x627)', width: '600px', height: '313px', description: 'LinkedIn sponsored content' },
  { id: 'portrait', name: 'Portrait (1080x1920)', width: '300px', height: '533px', description: 'Instagram Stories, TikTok' },
  { id: 'mobile', name: 'Mobile (720x900)', width: '360px', height: '450px', description: 'Mobile-optimized ads, app banners' },
  { id: 'banner', name: 'Banner (728x90)', width: '728px', height: '90px', description: 'Web banners, headers' },
];

/**
 * Section types that can be edited
 * Each section corresponds to a component from the original landing page:
 * - hero: Main value proposition with call-to-action button
 * - problem: Pain points and challenges the product solves
 * - solution: Features and benefits of the product
 */
const sections = [
  { id: 'hero', name: 'Hero Section', description: 'Main headline with call-to-action' },
  { id: 'problem', name: 'Problem Section', description: 'Pain points and challenges' },
  { id: 'solution', name: 'Solution Section', description: 'Features and benefits' },
];

/**
 * AdBuilder Component
 * 
 * Main component that orchestrates the ad building interface. Manages all state for
 * section selection, content editing, size selection, and export functionality.
 * 
 * @returns {JSX.Element} The complete ad builder interface
 */
const AdBuilder = () => {
  // ========== INTERFACE CONTROL STATE ==========
  
  /** Currently selected section (hero, problem, or solution) */
  const [selectedSection, setSelectedSection] = useState('hero');
  
  /** Currently selected ad size preset */
  const [selectedSize, setSelectedSize] = useState('square');
  
  /** Whether export mode is active (hides controls for clean screenshots) */
  const [isExportMode, setIsExportMode] = useState(false);

  // ========== CONTENT STATE ==========
  
  /**
   * Hero section content state
   * Contains all editable text fields for the hero section including:
   * - Main headline and highlighted text
   * - Subheadings with highlight words
   * - Call-to-action button text
   */
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

  /**
   * Font size controls for hero section
   * Allows users to adjust headline and subtext sizes independently
   */
  const [fontSizes, setFontSizes] = useState({
    heroHeadline: 'normal', // Options: small, normal, large, xl
    heroSubtext: 'normal'   // Options: small, normal, large
  });

  /**
   * Problem section content state
   * Contains all editable text for problem section including main headline,
   * highlighted text, sub-descriptions, and transitional text
   */
  const [problemContent, setProblemContent] = useState({
    mainHeadline: 'Just applying to jobs',
    highlightedText: 'is a dead end.',
    subText1: 'You know you should be networking more.',
    subText2: 'Building meaningful relationships shouldn\'t feel so',
    highlight1: 'overwhelming and draining.',
    transitionalText: 'Without structure and a plan, it\'s all just busywork.'
  });

  /**
   * Solution section content state
   * Contains all editable text for solution section including descriptions
   * and multiple highlighted phrases
   */
  const [solutionContent, setSolutionContent] = useState({
    mainHeadline: 'From networking chaos to career momentum.',
    description: 'One organized system. Every interaction, note, and meeting',
    highlight1: 'syncs automatically.',
    highlight2: 'AI suggestions',
    description2: 'and visual progress tracking turn networking from a daunting task into',
    highlight3: 'simple daily wins',
    description3: 'you can see and feel.'
  });

  // ========== COMPUTED VALUES ==========
  
  /** 
   * Get the current ad size configuration object
   * Defaults to first size if selectedSize not found
   */
  const currentSize = adSizes.find(size => size.id === selectedSize) || adSizes[0];

  // ========== EVENT HANDLERS ==========
  
  /**
   * Toggle export mode on/off
   * Export mode hides all controls for clean screenshot capture
   */
  const handleExportMode = () => {
    setIsExportMode(!isExportMode);
  };

  /**
   * Render the appropriate editable section component based on current selection
   * 
   * @returns {JSX.Element|null} The selected section component with proper props
   */
  const renderSection = () => {
    // Common props passed to all section components
    const commonProps = {
      isExportMode,    // Hide editing UI when in export mode
      adSize: currentSize  // Current size configuration for responsive styling
    };

    switch (selectedSection) {
      case 'hero':
        return (
          <EditableHero 
            content={heroContent}
            onChange={setHeroContent}
            fontSizes={fontSizes}
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

  // ========== MAIN RENDER ==========

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Application Header with Title and Export Toggle */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ad Builder</h1>
            <p className="text-gray-600">Create marketing materials from your landing page sections</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Export Mode Toggle - hides controls for clean screenshots */}
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

      {/* Main Content Area with Split Layout */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Panel - Controls (hidden in export mode) */}
          {!isExportMode && (
            <div className="lg:col-span-1 space-y-6">
              
              {/* Section Selection Card */}
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

              {/* Ad Size Selection Card */}
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

              {/* Font Size Controls - Only show for Hero section */}
              {selectedSection === 'hero' && (
                <Card>
                  <CardHeader>
                    <CardTitle>Font Sizes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="headline-size" className="text-sm font-medium">Headline Size</Label>
                      <Select value={fontSizes.heroHeadline} onValueChange={(value) => setFontSizes(prev => ({ ...prev, heroHeadline: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="xl">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="subtext-size" className="text-sm font-medium">Subtext Size</Label>
                      <Select value={fontSizes.heroSubtext} onValueChange={(value) => setFontSizes(prev => ({ ...prev, heroSubtext: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              )}

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

          {/* Right Panel - Live Preview Area */}
          <div className={`${isExportMode ? 'col-span-1' : 'lg:col-span-3'} flex items-center justify-center`}>
            
            {/* Preview Container with Ad Dimensions */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
              <div 
                className="relative bg-white"
                style={{
                  width: currentSize.width,      // CSS width from ad size preset
                  height: currentSize.height,    // CSS height from ad size preset
                  minHeight: currentSize.height, // Ensure minimum height is maintained
                  overflow: 'hidden'             // Prevent content overflow
                }}
              >
                {/* Render the selected section component with current content */}
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