/**
 * Ad Builder - Landing Page Content to Marketing Materials Converter
 * 
 * This component creates an interface for converting landing page sections into marketing materials
 * of various sizes. Instead of click-to-edit, it uses simple text input boxes above the preview
 * for easy content editing.
 * 
 * Key Features:
 * - Split-screen interface: controls on left, live preview on right
 * - Text input boxes: Simple headline, subtext, and CTA editing above preview
 * - Size presets: 7 different ad formats optimized for social media and web
 * - Font size controls: Adjustable sizing for headline, subtext, and button text
 * - Gradient saturation & brightness sliders: Control the vividness and lightness of the gradient background
 * - Markdown-style highlighting: **text** for gradient (headline) or highlight (subtext)
 * - Manual line breaks: Use Enter in subtext field to control line layout
 * - Export mode: clean view for screenshots without editing controls
 * - Responsive design: adapts content to fit each ad format perfectly
 * 
 * @author AI Assistant
 * @version 2.7
 */

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Camera, ArrowRight } from "lucide-react";

/**
 * Ad size presets with dimensions optimized for different platforms
 */
const adSizes = [
  { id: 'square', name: 'Square (1080x1080)', width: '500px', height: '500px', description: 'Instagram posts, Facebook posts' },
  { id: 'square-large', name: 'Large Square (1200x1200)', width: '550px', height: '550px', description: 'High-res Instagram, premium social posts' },
  { id: 'landscape', name: 'Landscape (1200x630)', width: '600px', height: '315px', description: 'Facebook cover, LinkedIn posts' },
  { id: 'linkedin-sponsored', name: 'LinkedIn Sponsored (1200x627)', width: '600px', height: '313px', description: 'LinkedIn sponsored content' },
  { id: 'portrait', name: 'Portrait (1080x1920)', width: '300px', height: '533px', description: 'Instagram Stories, TikTok' },
  { id: 'mobile', name: 'Mobile (720x900)', width: '360px', height: '450px', description: 'Mobile-optimized ads, app banners' },
  { id: 'banner', name: 'Banner (728x90)', width: '728px', height: '90px', description: 'Web banners, headers' },
  { id: 'large-landscape', name: 'Large Landscape (1440x1080)', width: '720px', height: '540px', description: 'High-res landscape, YouTube, premium web ads' },
];

/**
 * Helper function to parse text for gradient effect in headline
 * - Text wrapped in **text** gets the gradient
 */
const parseGradientText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const gradientText = part.slice(2, -2); // Remove ** markers
      return (
        <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
          {gradientText}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

/**
 * Helper function to parse text with markdown-style highlighting
 * - Text wrapped in **text** gets highlighted
 * - Text wrapped in **~text~** gets highlighted and tilted
 */
const parseHighlightedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      let highlightText = part.slice(2, -2); // Remove ** markers
      let isTilted = false;
      
      // Check for tilted marker (~)
      if (highlightText.startsWith('~') && highlightText.endsWith('~')) {
        highlightText = highlightText.slice(1, -1);
        isTilted = true;
      }
      
      const className = `bg-yellow-400 font-bold px-1 py-0.5 rounded ${isTilted ? 'inline-block rotate-[-2deg]' : ''}`;
      
      return (
        <span key={index} className={className}>
          {highlightText}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

/**
 * Simple Ad Preview Component
 * Renders the ad creative using the provided text content with user-controlled font sizes
 */
interface AdPreviewProps {
  headline: string;
  subtext: string;
  ctaText: string;
  adSize: { id: string; width: string; height: string };
  fontSizes: { headline: string; subtext: string; cta: string };
  gradientSaturation: number;
  gradientBrightness: number;
}

const AdPreview: React.FC<AdPreviewProps> = ({ headline, subtext, ctaText, adSize, fontSizes, gradientSaturation, gradientBrightness }) => {
  
  /**
   * Get font size classes based on user selection and text type
   * Maps user-friendly size names to Tailwind responsive font classes
   */
  const getFontSizeClasses = (type: 'headline' | 'subtext' | 'cta', baseSize: string) => {
    const sizeMap = {
      headline: {
        small: 'text-3xl sm:text-4xl md:text-5xl',
        normal: 'text-4xl sm:text-5xl md:text-6xl',
        large: 'text-5xl sm:text-6xl md:text-7xl',
        xl: 'text-6xl sm:text-7xl md:text-8xl'
      },
      subtext: {
        small: 'text-base sm:text-lg',
        normal: 'text-lg sm:text-xl md:text-2xl',
        large: 'text-xl sm:text-2xl md:text-3xl'
      },
      cta: {
        small: 'text-sm md:text-base',
        normal: 'text-base md:text-lg',
        large: 'text-lg md:text-xl'
      }
    };

    const userSize = fontSizes[type];
    return sizeMap[type][userSize as keyof typeof sizeMap[typeof type]] || baseSize;
  };

  // Calculate responsive classes based on ad size
  const getResponsiveClasses = () => {
    const isBanner = adSize.id === 'banner';
    const isPortrait = adSize.id === 'portrait';
    const isLandscape = adSize.id === 'landscape' || adSize.id === 'linkedin-sponsored';

    if (isBanner) {
      return {
        container: 'p-2',
        heading: getFontSizeClasses('headline', 'text-xl leading-tight') + ' font-bold leading-tight',
        subtext: getFontSizeClasses('subtext', 'text-xs leading-tight') + ' leading-tight',
        button: `px-2 py-1 ${getFontSizeClasses('cta', 'text-sm')}`,
        spacing: 'mb-1'
      };
    }

    if (isPortrait) {
      return {
        container: 'p-4',
        heading: getFontSizeClasses('headline', 'text-4xl leading-tight') + ' font-bold leading-tight',
        subtext: getFontSizeClasses('subtext', 'text-lg leading-snug') + ' leading-snug',
        button: `px-4 py-2 ${getFontSizeClasses('cta', 'text-base')}`,
        spacing: 'mb-3'
      };
    }

    if (isLandscape) {
      return {
        container: 'p-4',
        heading: getFontSizeClasses('headline', 'text-5xl leading-tight') + ' font-bold leading-tight',
        subtext: getFontSizeClasses('subtext', 'text-xl leading-snug') + ' leading-snug',
        button: `px-4 py-2 ${getFontSizeClasses('cta', 'text-lg')}`,
        spacing: 'mb-4'
      };
    }

    // Square and other formats (default)
    return {
      container: 'p-6',
      heading: getFontSizeClasses('headline', 'text-6xl leading-tight') + ' font-bold leading-tight',
      subtext: getFontSizeClasses('subtext', 'text-2xl leading-snug') + ' leading-snug',
      button: `px-6 py-3 ${getFontSizeClasses('cta', 'text-xl')}`,
      spacing: 'mb-6'
    };
  };

  const classes = getResponsiveClasses();

  return (
    <div className={`relative ${classes.container} overflow-hidden h-full flex flex-col justify-center`}>
      {/* Gradient background with adjustable saturation and brightness */}
      <div
        className="absolute inset-0 z-0 bg-gradient-to-br from-purple-50 via-white to-teal-50"
        style={{
          filter: `saturate(${gradientSaturation}%) brightness(${gradientBrightness}%)`,
          pointerEvents: 'none',
        }}
      />
      <div className="text-center relative z-10">
        {/* Main Headline */}
        <h1 className={`${classes.heading} text-indigo-800 ${classes.spacing}`}>
          {parseGradientText(headline)}
        </h1>
        
        {/* Subtext - only show in larger formats */}
        {adSize.id !== 'banner' && subtext && (
          <div className={`${classes.subtext} text-gray-700 ${classes.spacing} max-w-full mx-auto`}>
            {subtext.split('\n').map((line, i) => (
              <div key={i} className={i > 0 ? 'mt-2' : ''}>
                {parseHighlightedText(line)}
              </div>
            ))}
          </div>
        )}
        
        {/* CTA Button */}
        {ctaText && (
          <div className="flex justify-center">
            <Button
              size="lg"
              className={`bg-gradient-to-r from-purple-600 to-teal-600 hover:from-purple-700 hover:to-teal-700 text-white ${classes.button} rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Main AdBuilder Component
 */
const AdBuilder = () => {
  // ========== STATE ==========
  
  /** Currently selected ad size preset */
  const [selectedSize, setSelectedSize] = useState('square');
  
  /** Whether export mode is active (hides controls for clean screenshots) */
  const [isExportMode, setIsExportMode] = useState(false);

  /** Ad content that user can edit */
  const [adContent, setAdContent] = useState({
    headline: "Networking **doesn't have to suck.**",
    subtext: `Stop juggling messages, spreadsheets, and **forgotten follow-ups**.
Chumzee helps you **build momentum** and nurture
**~meaningful relationships~**.`,
    ctaText: "Start building momentum"
  });

  /** Font size controls for headline, subtext, and CTA */
  const [fontSizes, setFontSizes] = useState({
    headline: 'normal',  // Options: small, normal, large, xl
    subtext: 'normal',   // Options: small, normal, large
    cta: 'normal'        // Options: small, normal, large
  });

  /** Controls the gradient background's saturation and brightness */
  const [gradientSaturation, setGradientSaturation] = useState(100);
  const [gradientBrightness, setGradientBrightness] = useState(100);

  // ========== COMPUTED VALUES ==========
  
  /** Get the current ad size configuration object */
  const currentSize = adSizes.find(size => size.id === selectedSize) || adSizes[0];

  // ========== EVENT HANDLERS ==========
  
  /** Toggle export mode on/off */
  const handleExportMode = () => {
    setIsExportMode(!isExportMode);
  };

  /** Update ad content field */
  const updateContent = (field: keyof typeof adContent, value: string) => {
    setAdContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /** Update font size setting */
  const updateFontSize = (type: keyof typeof fontSizes, size: string) => {
    setFontSizes(prev => ({
      ...prev,
      [type]: size
    }));
  };

  // ========== MAIN RENDER ==========

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Application Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Ad Builder</h1>
            <p className="text-gray-600">Create marketing materials with simple text editing</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Export Mode Toggle */}
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

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Panel - Controls (hidden in export mode) */}
          {!isExportMode && (
            <div className="lg:col-span-1 space-y-6">
              
              {/* Ad Size Selection */}
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

              {/* Content Editing */}
              <Card>
                <CardHeader>
                  <CardTitle>Content</CardTitle>
                  <p className="text-sm text-gray-600">
                    Use **text** for styling. See placeholders for examples.
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="headline">Headline</Label>
                    <Input
                      id="headline"
                      value={adContent.headline}
                      onChange={(e) => updateContent('headline', e.target.value)}
                      placeholder="e.g. Networking **doesn't suck.**"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subtext">Subtext</Label>
                    <Textarea
                      id="subtext"
                      value={adContent.subtext}
                      onChange={(e) => updateContent('subtext', e.target.value)}
                      placeholder="Enter supporting text... Use Enter for new lines"
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cta">Call-to-Action Button</Label>
                    <Input
                      id="cta"
                      value={adContent.ctaText}
                      onChange={(e) => updateContent('ctaText', e.target.value)}
                      placeholder="Enter button text..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Font Size Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Font Sizes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="headline-size" className="text-sm font-medium">Headline Size</Label>
                    <Select value={fontSizes.headline} onValueChange={(value) => updateFontSize('headline', value)}>
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
                    <Select value={fontSizes.subtext} onValueChange={(value) => updateFontSize('subtext', value)}>
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
                  <div>
                    <Label htmlFor="cta-size" className="text-sm font-medium">Button Text Size</Label>
                    <Select value={fontSizes.cta} onValueChange={(value) => updateFontSize('cta', value)}>
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

              {/* Background Controls */}
              <Card>
                <CardHeader>
                  <CardTitle>Background</CardTitle>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="bg-saturation" className="text-sm font-medium">Gradient Saturation</Label>
                  <Slider
                    id="bg-saturation"
                    min={0}
                    max={200}
                    step={5}
                    value={[gradientSaturation]}
                    onValueChange={(value) => setGradientSaturation(value[0])}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 text-center mt-1">{gradientSaturation}%</p>
                  <Label htmlFor="bg-brightness" className="text-sm font-medium mt-4 block">Gradient Brightness</Label>
                  <Slider
                    id="bg-brightness"
                    min={0}
                    max={200}
                    step={5}
                    value={[gradientBrightness]}
                    onValueChange={(value) => setGradientBrightness(value[0])}
                    className="mt-2"
                  />
                  <p className="text-sm text-gray-500 text-center mt-1">{gradientBrightness}%</p>
                </CardContent>
              </Card>

              {/* Instructions */}
              <Card>
                <CardHeader>
                  <CardTitle>Instructions</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-2">
                  <p>1. Select an ad size format</p>
                  <p>2. Edit headline, subtext, and CTA text above</p>
                  <p>3. Adjust font sizes and gradient background</p>
                  <p>4. Use **text** for gradient/highlight, **~text~** to tilt</p>
                  <p>5. Use Enter in subtext for line breaks</p>
                  <p>6. Click "Export Mode" for clean screenshots</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Right Panel - Live Preview */}
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
                <AdPreview
                  headline={adContent.headline}
                  subtext={adContent.subtext}
                  ctaText={adContent.ctaText}
                  adSize={currentSize}
                  fontSizes={fontSizes}
                  gradientSaturation={gradientSaturation}
                  gradientBrightness={gradientBrightness}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdBuilder; 