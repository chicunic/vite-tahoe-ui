import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils";

/**
 * Scrollbar - Custom scrollbar component
 * Based on Figma: Scrollbar - Vertical (497:6481), Scrollbar - Horizontal (497:6567)
 */

const scrollbarVariants = cva("relative flex shrink-0", {
  variants: {
    orientation: {
      vertical: "h-full w-3 flex-col", // 12px width
      horizontal: "h-3 w-full flex-row", // 12px height
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface ScrollbarProps extends VariantProps<typeof scrollbarVariants> {
  /** Scroll position (0-1) */
  position?: number;
  /** Visible ratio (0-1), determines thumb size */
  visibleRatio?: number;
  /** Called when user drags the thumb */
  onPositionChange?: (position: number) => void;
  /** Additional class name */
  className?: string;
}

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(
  ({ orientation = "vertical", position = 0, visibleRatio = 0.5, onPositionChange, className }, ref) => {
    const trackRef = React.useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = React.useState(false);

    // Calculate thumb size based on visible ratio (minimum 20%)
    const thumbSize = Math.max(visibleRatio, 0.2) * 100;

    // Calculate thumb position
    const thumbPosition = position * (100 - thumbSize);

    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleMouseMove = React.useCallback(
      (e: MouseEvent) => {
        if (!isDragging || !trackRef.current || !onPositionChange) return;

        const track = trackRef.current;
        const rect = track.getBoundingClientRect();

        let newPosition: number;
        if (orientation === "vertical") {
          const trackHeight = rect.height;
          const thumbHeight = (thumbSize / 100) * trackHeight;
          const availableSpace = trackHeight - thumbHeight;
          const relativeY = e.clientY - rect.top - thumbHeight / 2;
          newPosition = Math.max(0, Math.min(1, relativeY / availableSpace));
        } else {
          const trackWidth = rect.width;
          const thumbWidth = (thumbSize / 100) * trackWidth;
          const availableSpace = trackWidth - thumbWidth;
          const relativeX = e.clientX - rect.left - thumbWidth / 2;
          newPosition = Math.max(0, Math.min(1, relativeX / availableSpace));
        }

        onPositionChange(newPosition);
      },
      [isDragging, orientation, thumbSize, onPositionChange],
    );

    const handleMouseUp = React.useCallback(() => {
      setIsDragging(false);
    }, []);

    React.useEffect(() => {
      if (isDragging) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("mouseup", handleMouseUp);
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    const handleTrackClick = (e: React.MouseEvent) => {
      if (!trackRef.current || !onPositionChange) return;

      const track = trackRef.current;
      const rect = track.getBoundingClientRect();

      let newPosition: number;
      if (orientation === "vertical") {
        const trackHeight = rect.height;
        const thumbHeight = (thumbSize / 100) * trackHeight;
        const availableSpace = trackHeight - thumbHeight;
        const relativeY = e.clientY - rect.top - thumbHeight / 2;
        newPosition = Math.max(0, Math.min(1, relativeY / availableSpace));
      } else {
        const trackWidth = rect.width;
        const thumbWidth = (thumbSize / 100) * trackWidth;
        const availableSpace = trackWidth - thumbWidth;
        const relativeX = e.clientX - rect.left - thumbWidth / 2;
        newPosition = Math.max(0, Math.min(1, relativeX / availableSpace));
      }

      onPositionChange(newPosition);
    };

    return (
      <div ref={ref} className={cn(scrollbarVariants({ orientation }), "select-none", className)}>
        {/* biome-ignore lint/a11y/noStaticElementInteractions: Scrollbar track is mouse-only interaction */}
        <div ref={trackRef} className="relative h-full w-full" role="presentation" onClick={handleTrackClick}>
          <div
            role="slider"
            tabIndex={0}
            aria-valuenow={Math.round(position * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-orientation={orientation ?? undefined}
            aria-label={`${orientation === "vertical" ? "Vertical" : "Horizontal"} scrollbar`}
            className={cn(
              "absolute rounded-full bg-black/15 transition-colors hover:bg-black/25 dark:bg-white/20 dark:hover:bg-white/30",
              isDragging && "bg-black/30 dark:bg-white/40",
              "cursor-pointer",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
            )}
            style={
              orientation === "vertical"
                ? {
                    width: 6,
                    height: `${thumbSize}%`,
                    top: `${thumbPosition}%`,
                    left: "50%",
                    marginLeft: -3,
                  }
                : {
                    height: 6,
                    width: `${thumbSize}%`,
                    left: `${thumbPosition}%`,
                    top: "50%",
                    marginTop: -3,
                  }
            }
            onMouseDown={handleMouseDown}
            onKeyDown={(e) => {
              if (!onPositionChange) return;
              const step = 0.1;
              if (orientation === "vertical") {
                if (e.key === "ArrowUp") onPositionChange(Math.max(0, position - step));
                if (e.key === "ArrowDown") onPositionChange(Math.min(1, position + step));
              } else {
                if (e.key === "ArrowLeft") onPositionChange(Math.max(0, position - step));
                if (e.key === "ArrowRight") onPositionChange(Math.min(1, position + step));
              }
              if (e.key === "Home") onPositionChange(0);
              if (e.key === "End") onPositionChange(1);
            }}
          />
        </div>
      </div>
    );
  },
);

Scrollbar.displayName = "Scrollbar";

export { scrollbarVariants };
