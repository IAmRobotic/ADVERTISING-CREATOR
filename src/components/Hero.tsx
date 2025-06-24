/**
 * Hero Component with Auto-Playing Carousel
 * 
 * IMPORTANT: This component contains a carefully debugged autoplay carousel implementation.
 * Before modifying the carousel configuration, please read the extensive documentation 
 * in this file and in HOVER_SHAKING_DEBUG.md to avoid breaking the autoplay functionality.
 * 
 * Key points:
 * - Always use play() to restart autoplay, never reset()
 * - stopOnInteraction: false allows manual control
 * - Comprehensive event listeners ensure autoplay resumes after user interactions
 */

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Hero = () => {
  /**
   * CAROUSEL AUTOPLAY CONFIGURATION - CRITICAL IMPLEMENTATION NOTES
   * 
   * This autoplay setup solves a common but tricky bug where the carousel
   * stops playing and never restarts. The key issue was using reset() instead of play().
   * 
   * EMBLA CAROUSEL AUTOPLAY METHOD BEHAVIOR:
   * - stop(): Stops autoplay completely
   * - play(): Starts autoplay (works whether stopped or already playing)
   * - reset(): ONLY works if autoplay is currently active! If stopped, does nothing.
   * 
   * PROBLEM WE SOLVED:
   * - Mouse enters → stop() stops autoplay ✅
   * - Mouse leaves → reset() tries to restart but fails because autoplay is stopped ❌
   * - Carousel remains frozen until manual interaction
   * 
   * SOLUTION:
   * - Mouse enters → stop() stops autoplay ✅
   * - Mouse leaves → play() restarts autoplay regardless of current state ✅
   * - stopOnInteraction: false prevents automatic permanent stopping
   * - stopOnMouseEnter: false lets us handle mouse events manually
   */
  const plugin = React.useRef(
    Autoplay({ 
      delay: 3000, 
      stopOnInteraction: false, // CRITICAL: Let us handle stop/start manually to avoid conflicts
      stopOnMouseEnter: false // CRITICAL: We handle this manually for better control
    })
  );

  // State for the carousel API - needed to add custom event listeners
  const [api, setApi] = React.useState<any>();

  /**
   * Add custom event listeners to restart autoplay after user interactions
   * These events ensure autoplay resumes after drag/touch interactions
   */
  React.useEffect(() => {
    if (!api) {
      return;
    }

    // When user stops dragging/touching, restart autoplay
    api.on("pointerUp", () => {
      plugin.current.play(); // Use play() not reset() - see notes above
    });
    
    // When carousel advances (manually or automatically), ensure autoplay continues
    api.on("select", () => {
      plugin.current.play(); // Use play() not reset() - see notes above
    });
  }, [api]);

  return (
    <section className="relative py-6 sm:py-8 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/*
          This container holds the main heading, subheading, and CTA button.
          The 'mb-12' class adds space between this text block and the image collage below.
          The bottom margin is now responsive: 'mb-8' on mobile and 'sm:mb-12' on larger screens.
        */}
        <div className="text-center mb-4 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Networking
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-teal-600">
              {" "}doesn't have to suck.
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-700 mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed">
            {/* Project standard: Periods at end of sentences should always be inside highlighted spans, right next to the last letter */}
            <span className="block mb-2">
              Stop juggling messages, spreadsheets, post-it notes and{" "}
              <span className="inline-block bg-yellow-400 font-bold px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
                forgotten follow-ups.
              </span>
            </span>
            
            <span className="block mt-4 mb-2">
              Chumzee helps you{" "}
              <span className="inline-block bg-yellow-400 font-bold px-1.5 sm:px-2 py-0.5 rounded whitespace-nowrap">
                build momentum
              </span>
              {" "}and nurture
            </span>
            
            <span className="block mt-1">
              <span className="inline-block bg-yellow-400 font-bold px-1.5 sm:px-2 py-0.5 rounded rotate-[-2deg] relative whitespace-nowrap">
                meaningful relationships.
              </span>
            </span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="animate-gradient-slide text-white px-6 sm:px-8 py-6 sm:py-7 text-xl sm:text-2xl rounded-lg shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 hover:scale-105 transition-all duration-300"
              onClick={() => {
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                  pricingSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Start building momentum
              <ArrowRight className="ml-2 h-6 w-6 sm:h-8 sm:w-8" />
            </Button>
          </div>
        </div>

        {/* 
          This section creates a dynamic, layered hero image collage from screenshots of the application.
          It is now positioned below the main hero content and is fully responsive.
          This has been updated to be an auto-playing carousel to tell a short story.
        */}
        <div className="relative mt-4 sm:mt-6 flex items-center justify-center">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current as any]}
            className="w-[100vw] sm:w-full sm:max-w-5xl px-1 sm:px-8"
            onMouseEnter={() => plugin.current.stop()} // Pause autoplay when user hovers
            onMouseLeave={() => plugin.current.play()} // CRITICAL: Use play() not reset() to restart autoplay
            opts={{
              loop: true,
              align: "center",
            }}
          >
            <CarouselContent className="-ml-2 sm:-ml-2">
              {/* Slide 1: Main contacts page */}
              <CarouselItem className="pl-2 basis-full sm:basis-4/5 md:basis-2/3 lg:basis-3/5">
                <div className="p-2 flex justify-center">
                  <img
                    src="/contacts-page.png"
                    alt="Chumzee main contacts page"
                    className="rounded-lg shadow-xl mx-auto border-4 border-gray-200 w-full"
                  />
                </div>
              </CarouselItem>
              {/* Slide 2: Momentum sidebar */}
              <CarouselItem className="pl-2 basis-full sm:basis-4/5 md:basis-2/3 lg:basis-3/5">
                <div className="p-2 flex justify-center">
                  <img
                    src="/momentum-sidebar.png"
                    alt="Momentum Panel to track follow-ups"
                    className="rounded-lg shadow-xl h-auto w-full sm:w-80 border-2 border-gray-200"
                  />
                </div>
              </CarouselItem>
              {/* Slide 3: Follow-up wall */}
              <CarouselItem className="pl-2 basis-full sm:basis-4/5 md:basis-2/3 lg:basis-3/5">
                <div className="p-2 flex justify-center">
                  <img
                    src="/follow-up-wall.png"
                    alt="Follow-up Wall for reminders"
                    className="rounded-lg shadow-xl h-auto w-full sm:w-80 border-2 border-gray-200"
                  />
                </div>
              </CarouselItem>
              {/* Slide 4: Interaction hub */}
              <CarouselItem className="pl-2 basis-full sm:basis-4/5 md:basis-2/3 lg:basis-3/5">
                <div className="p-2 flex justify-center">
                  <img
                    src="/interaction-hub.png"
                    alt="Interaction Hub for managing conversations"
                    className="rounded-lg shadow-xl h-auto w-full sm:w-80 border-2 border-gray-200"
                  />
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Hero;
