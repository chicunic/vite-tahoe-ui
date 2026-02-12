import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils";

const scrollbarVariants = cva("relative flex shrink-0", {
  variants: {
    orientation: {
      vertical: "h-full w-3 flex-col",
      horizontal: "h-3 w-full flex-row",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

export interface ScrollbarProps extends VariantProps<typeof scrollbarVariants> {
  position?: number;
  visibleRatio?: number;
  onPositionChange?: (position: number) => void;
  className?: string;
}

const KEYBOARD_STEP = 0.1;

export const Scrollbar = React.forwardRef<HTMLDivElement, ScrollbarProps>(function Scrollbar(
  { orientation = "vertical", position = 0, visibleRatio = 0.5, onPositionChange, className },
  ref,
) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const isVertical = orientation === "vertical";

  // Calculate thumb size based on visible ratio (minimum 20%)
  const thumbSize = Math.max(visibleRatio, 0.2) * 100;
  const thumbPosition = position * (100 - thumbSize);

  const calculatePosition = React.useCallback(
    (clientX: number, clientY: number): number => {
      if (!trackRef.current) return 0;

      const rect = trackRef.current.getBoundingClientRect();
      const trackSize = isVertical ? rect.height : rect.width;
      const thumbPixelSize = (thumbSize / 100) * trackSize;
      const availableSpace = trackSize - thumbPixelSize;
      const relativePos = isVertical
        ? clientY - rect.top - thumbPixelSize / 2
        : clientX - rect.left - thumbPixelSize / 2;

      return Math.max(0, Math.min(1, relativePos / availableSpace));
    },
    [isVertical, thumbSize],
  );

  const handleMouseDown = (e: React.MouseEvent): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseMove = React.useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !onPositionChange) return;
      onPositionChange(calculatePosition(e.clientX, e.clientY));
    },
    [isDragging, onPositionChange, calculatePosition],
  );

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleTrackClick = (e: React.MouseEvent): void => {
    onPositionChange?.(calculatePosition(e.clientX, e.clientY));
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (!onPositionChange) return;

    const decreaseKey = isVertical ? "ArrowUp" : "ArrowLeft";
    const increaseKey = isVertical ? "ArrowDown" : "ArrowRight";

    switch (e.key) {
      case decreaseKey:
        onPositionChange(Math.max(0, position - KEYBOARD_STEP));
        break;
      case increaseKey:
        onPositionChange(Math.min(1, position + KEYBOARD_STEP));
        break;
      case "Home":
        onPositionChange(0);
        break;
      case "End":
        onPositionChange(1);
        break;
    }
  };

  const thumbStyle = isVertical
    ? { width: 6, height: `${thumbSize}%`, top: `${thumbPosition}%`, left: "50%", marginLeft: -3 }
    : { height: 6, width: `${thumbSize}%`, left: `${thumbPosition}%`, top: "50%", marginTop: -3 };

  return (
    <div ref={ref} className={cn(scrollbarVariants({ orientation }), "hidden select-none md:flex", className)}>
      {/* biome-ignore lint/a11y/noStaticElementInteractions: Scrollbar track is mouse-only interaction */}
      <div ref={trackRef} className="relative h-full w-full" role="presentation" onClick={handleTrackClick}>
        <div
          role="slider"
          tabIndex={0}
          aria-valuenow={Math.round(position * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-orientation={orientation ?? undefined}
          aria-label={`${isVertical ? "Vertical" : "Horizontal"} scrollbar`}
          className={cn(
            "scrollbar-thumb absolute rounded-full transition-colors duration-75",
            isDragging && "scrollbar-thumb-active",
            "cursor-pointer",
            "focus-visible-ring",
          )}
          style={thumbStyle}
          onMouseDown={handleMouseDown}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
});

export { scrollbarVariants };
