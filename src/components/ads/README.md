# Ad Builder System Documentation

## Overview

The Ad Builder system converts landing page sections into marketing materials of various sizes while preserving all original styling, gradients, and visual elements. It provides a split-screen interface for real-time editing and preview of marketing content.

## Architecture

### Main Components

1. **AdBuilder** (`/src/pages/AdBuilder.tsx`)
   - Main orchestrator component
   - Manages state for all sections and UI controls
   - Handles routing between different sections
   - Controls export mode for clean screenshots

2. **EditableHero** (`/src/components/ads/EditableHero.tsx`)
   - Hero section with click-to-edit functionality
   - Font size controls for headlines and subtext
   - Purple-to-teal gradient background
   - Responsive CTA button

3. **EditableProblem** (`/src/components/ads/EditableProblem.tsx`)
   - Problem section focusing on pain points
   - Gray-to-purple gradient background
   - Responsive text sizing based on ad format

4. **EditableSolution** (`/src/components/ads/EditableSolution.tsx`)
   - Solution section with feature highlights
   - Multiple colored text highlights (yellow, green, purple)
   - Feature icons (Bell, MessageSquare, Lightbulb, TrendingUp)
   - Teal-to-purple gradient background

## Ad Size Formats

The system supports 7 different ad formats:

1. **Square (1080x1080)** - Instagram posts, Facebook posts
2. **Large Square (1200x1200)** - High-res social media
3. **Landscape (1200x630)** - Facebook covers, LinkedIn posts
4. **LinkedIn Sponsored (1200x627)** - LinkedIn sponsored content
5. **Portrait (1080x1920)** - Instagram Stories, TikTok
6. **Mobile (720x900)** - Mobile-optimized ads
7. **Banner (728x90)** - Web banners, headers

## State Management

### Content State Structure

Each section maintains its own content state:

```typescript
// Hero Section
interface HeroContent {
  mainHeadline: string;      // "Networking"
  highlightedText: string;   // "doesn't have to suck."
  subHeadline1: string;      // First subtitle line
  highlight1: string;        // First yellow highlight
  subHeadline2: string;      // Second subtitle line
  highlight2: string;        // Second yellow highlight
  subHeadline3: string;      // Third subtitle line
  highlight3: string;        // Third yellow highlight (rotated)
  ctaText: string;          // CTA button text
}

// Problem Section
interface ProblemContent {
  mainHeadline: string;      // "Just applying to jobs"
  highlightedText: string;   // "is a dead end."
  subText1: string;          // First supporting statement
  subText2: string;          // Second supporting statement
  highlight1: string;        // Yellow highlighted pain point
  transitionalText: string;  // Bridge to solution
}

// Solution Section
interface SolutionContent {
  mainHeadline: string;      // "From networking chaos to career momentum."
  description: string;       // First description part
  highlight1: string;        // Yellow highlight (automation)
  highlight2: string;        // Green highlight (AI features)
  description2: string;      // Middle description part
  highlight3: string;        // Purple highlight (outcomes)
  description3: string;      // Final description part
}
```

## Responsive Design Logic

Each component implements responsive sizing through `getResponsiveClasses()`:

- **Banner**: Minimal padding, small fonts, essential content only
- **Portrait**: Mobile-optimized, finger-friendly buttons
- **Landscape**: Horizontal layout optimization
- **Square**: Maximum impact, full feature set

## Click-to-Edit System

All components use a consistent editing pattern:

1. **State Management**: `editingField` tracks which field is being edited
2. **Event Handling**: Click to edit, blur/Enter to save
3. **Visual Feedback**: Blue border when editing, hover effects when not
4. **Export Mode**: Disables editing for clean screenshots

## Usage Examples

### Adding a New Ad Size

```typescript
// Add to adSizes array in AdBuilder.tsx
{ 
  id: 'new-format', 
  name: 'New Format (800x600)', 
  width: '400px', 
  height: '300px', 
  description: 'Custom format description' 
}

// Update responsive logic in each component
const getResponsiveClasses = () => {
  if (adSize.id === 'new-format') {
    return {
      container: 'p-4',
      heading: 'text-lg font-bold',
      // ... other styling
    };
  }
  // ... existing logic
};
```

### Adding New Editable Fields

```typescript
// 1. Update content interface
interface HeroContent {
  // ... existing fields
  newField: string;
}

// 2. Update default state
const [heroContent, setHeroContent] = useState({
  // ... existing fields
  newField: 'Default text'
});

// 3. Add to render method
{renderEditableText('newField', 'css-classes', 'Placeholder text')}
```

## Visual Design Elements

### Gradients
- **Hero**: `bg-gradient-to-br from-purple-600 to-teal-600`
- **Problem**: `bg-gradient-to-br from-gray-900 to-purple-800`
- **Solution**: `bg-gradient-to-br from-teal-600 to-purple-600`

### Decorative Elements
- Low-opacity colored dots for visual interest
- Handwritten-style underlines
- Gradient text effects

### Typography Hierarchy
- Headlines: Responsive from `text-2xl` to `text-7xl`
- Subtext: Responsive from `text-xs` to `text-2xl`
- Highlights: Colored spans with `bg-yellow-200`, `bg-green-200`, etc.

## Export Functionality

Export mode provides a clean view for screenshots:
- Hides all editing controls and hover effects
- Removes blue borders and click indicators
- Maintains all visual styling and gradients
- Preserves exact ad dimensions for capture

## Best Practices

1. **Content Editing**: Always validate content length for smaller formats
2. **Visual Consistency**: Maintain gradient and color schemes across sections
3. **Responsive Testing**: Test all ad sizes when making layout changes
4. **Export Quality**: Use export mode for all final screenshots
5. **Performance**: Minimize re-renders by properly managing state updates

## Future Enhancements

- Add more ad size formats
- Implement undo/redo functionality
- Add image upload capabilities
- Create template library
- Add export to various file formats
- Implement collaborative editing 