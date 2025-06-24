# Welcome to Chumzee landing page

## Troubleshooting

### Carousel Not Auto-Playing

If the Hero section carousel stops playing and won't restart:

**Quick Fix**: Check `src/components/Hero.tsx` - ensure you're using `play()` not `reset()` in the `onMouseLeave` handler.

**Root Cause**: Embla Carousel's `reset()` method only works when autoplay is active. Once stopped, it does nothing.

**Solution**: Always use `plugin.current.play()` to restart autoplay.

For detailed debugging info, see [DEBUG.md](DEBUG.md#-carousel-autoplay-issue---resolved)
