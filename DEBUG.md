# Chumzee Landing Page - Debug Documentation

This document tracks significant bugs, their investigation process, and resolutions in the Chumzee landing page project. Each section represents a separate issue with its complete debugging journey.

---

# 🔄 Table of Contents

1. [Hover Shaking in Solution Section](#-hover-shaking-in-solution-section---investigating) (Status: Investigating)
2. [Carousel Autoplay Issue](#-carousel-autoplay-issue---resolved) (Status: ✅ Resolved)

---

# 🔄 Hover Shaking in Solution Section - INVESTIGATING

## 🐛 **Problem Description**
- **Component**: `SolutionSection.tsx` desktop view
- **Issue**: Rapid image switching causing "shaking" effect
- **Status**: Under Investigation
- **Location**: Between solutions index 1 and 2 (MessageSquare and Lightbulb icons)
- **Expected**: Smooth hover transitions, normal auto-cycling

## 🔍 **Current Investigation Status**

### Fix Attempts Summary
1. ❌ Container-Level Mouse Leave
2. ❌ Debounced Hover with Delays
3. ❌ Simplified State Management

### Active Theories
1. CSS Transition Conflicts
2. Browser-Specific Mouse Events
3. Image Loading/Sizing Issues
4. Auto-Cycling Timer Interference
5. Z-Index/Element Overlap

### Debug Tests in Progress
1. Auto-Cycling Disabled Test
2. CSS Transitions Removal Test

[See detailed investigation log below](#detailed-investigation-log)

---

# 🎠 Carousel Autoplay Issue - RESOLVED ✅

## 🐛 **Problem Description**
- **Component**: `Hero.tsx` carousel section
- **Issue**: Carousel autoplay stops permanently after user interaction
- **Status**: Fixed and Documented
- **Resolution Date**: [Current Date]

## 🔍 **Root Cause & Solution**

### The Bug
Using `reset()` instead of `play()` to restart autoplay after mouse leave

### Key Method Behaviors
```tsx
// Method Behaviors:
stop()  // Stops autoplay completely
play()  // Starts autoplay (always works) ✅
reset() // Only works if already playing ❌
```

### Solution Implementation
```tsx
// Configuration
const plugin = React.useRef(
  Autoplay({ 
    delay: 3000, 
    stopOnInteraction: false,  // Manual control
    stopOnMouseEnter: false    // Manual control
  })
);

// Event Handlers
onMouseEnter={() => plugin.current.stop()}
onMouseLeave={() => plugin.current.play()}  // NOT reset()!
```

### Verification
✅ Mouse hover works correctly
✅ Window/tab switching maintains state
✅ Manual interaction restarts properly
✅ No more permanent stopping

[See detailed resolution below](#detailed-carousel-resolution)

---

# Detailed Investigation Log

## 🔄 Hover Shaking Issue

### Fix Attempt #1: Container-Level Mouse Leave
**Date**: First attempt
```tsx
// Before
<div onMouseEnter={...} onMouseLeave={handleDesktopLeave}>

// After  
<div className="space-y-8" onMouseLeave={handleDesktopLeave}>
  <div onMouseEnter={...}>  // No onMouseLeave on items
```
**Result**: ❌ Failed - Shaking continued

### Fix Attempt #2: Debounced Hover
**Date**: Second attempt
```tsx
const timeout = setTimeout(() => {
  interval = setInterval(() => {
    setActiveDesktopSolution((prev) => (prev + 1) % solutions.length);
  }, 4000);
}, 500);
```
**Result**: ❌ Failed - Shaking continued

### Fix Attempt #3: State Management
**Date**: Third attempt
```tsx
const [hoveredSolution, setHoveredSolution] = useState<number | null>(null);

useEffect(() => {
  if (hoveredSolution === null) {
    const interval = setInterval(() => {
      setActiveDesktopSolution((prev) => (prev + 1) % solutions.length);
    }, 4000);
    return () => clearInterval(interval);
  }
}, [hoveredSolution]);
```
**Result**: ❌ Failed - Shaking continued

### Next Steps
1. **Disable Auto-Cycling Test**
   - Test if shaking persists without auto-cycling
   - Isolate whether it's hover-only or timer-related

2. **CSS Investigation**
   - Remove all transitions temporarily
   - Test with static styling

3. **Event Debugging**
   - Add comprehensive event logging
   - Track exact sequence during shaking

---

# Detailed Carousel Resolution

## 🎠 Carousel Autoplay Fix Details

### Problem Flow
1. Mouse enters → `stop()` stops autoplay ✅
2. Mouse leaves → `reset()` fails to restart ❌
3. Carousel freezes until manual interaction

### Complete Solution
```tsx
/**
 * CRITICAL CONFIGURATION
 */
const plugin = React.useRef(
  Autoplay({ 
    delay: 3000, 
    stopOnInteraction: false, // Manual control
    stopOnMouseEnter: false   // Manual control
  })
);

/**
 * EVENT HANDLERS
 */
// Mouse events
onMouseEnter={() => plugin.current.stop()}
onMouseLeave={() => plugin.current.play()}

// Safety net for other interactions
api.on("pointerUp", () => plugin.current.play());
api.on("select", () => plugin.current.play());
```

### Key Learnings
1. Always use `play()` to restart autoplay
2. Set `stopOnInteraction: false` for manual control
3. Set `stopOnMouseEnter: false` for custom mouse behavior
4. Wrap plugin methods in arrow functions
5. Test all interaction scenarios thoroughly

---

# Contributing to This Document

When adding new issues:

1. Add to Table of Contents
2. Use consistent emoji markers:
   - 🐛 Problem Description
   - 🔍 Investigation/Root Cause
   - 🔧 Fix Attempts/Solution
   - ✅ Resolution/Testing
3. Mark status clearly (INVESTIGATING/RESOLVED)
4. Include both the problem and solution when resolved
5. Add detailed code examples
6. Document all test scenarios 