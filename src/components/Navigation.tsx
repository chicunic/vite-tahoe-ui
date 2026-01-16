import { ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils";

/* =============================================================================
   SEGMENTED CONTROL
   Tahoe style segmented control with multiple selectable segments
   ============================================================================= */

interface SegmentProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
}

interface SegmentedControlProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  /** Show glass-style background */
  glass?: boolean;
}

interface SegmentedControlContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

const SegmentedControlContext = React.createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControl(): SegmentedControlContextValue {
  const context = React.useContext(SegmentedControlContext);
  if (!context) {
    throw new Error("Segment must be used within a SegmentedControl");
  }
  return context;
}

/** Individual segment button */
const Segment = React.forwardRef<HTMLButtonElement, SegmentProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  function Segment({ children, value, disabled, className, ...props }, ref) {
    const { value: selectedValue, onValueChange } = useSegmentedControl();
    const isSelected = selectedValue === value;

    return (
      <button
        ref={ref}
        type="button"
        aria-pressed={isSelected}
        disabled={disabled}
        className={cn(
          "relative flex flex-1 items-center justify-center",
          "h-full min-w-0 px-2.5",
          "font-medium text-[13px] leading-4",
          "transition-colors duration-100",
          "focus-visible-ring",
          "disabled-cursor",
          isSelected
            ? "z-10 text-white"
            : "text-gray-text hover:text-gray-text-dark dark:text-gray-text-tertiary dark:hover:text-white",
          className,
        )}
        onClick={() => !disabled && onValueChange(value)}
        {...props}
      >
        {/* Selected background */}
        {isSelected && <div className="absolute inset-0 overflow-hidden rounded-md bg-apple-blue-primary" />}
        {/* Label */}
        <span className="relative z-10 truncate">{children}</span>
      </button>
    );
  },
);

/** Separator between segments */
function SegmentSeparator({ visible }: { visible: boolean }): React.ReactElement {
  return (
    <div
      className={cn(
        "-mx-[0.5px] h-3.5 w-px shrink-0",
        "transition-colors duration-100",
        visible ? "bg-gray-bg-400 dark:bg-dark-bg-100" : "bg-transparent",
      )}
    />
  );
}

/** Segmented Control container */
const SegmentedControl = React.forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
  { children, value: controlledValue, defaultValue, onValueChange, className, glass = false },
  ref,
) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const handleValueChange = React.useCallback(
    (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange],
  );

  // Get segment values to determine separator visibility
  const segments = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<SegmentProps> => React.isValidElement(child) && child.type === Segment,
  );

  const contextValue = React.useMemo(() => ({ value, onValueChange: handleValueChange }), [value, handleValueChange]);

  return (
    <SegmentedControlContext.Provider value={contextValue}>
      <div
        ref={ref}
        role="radiogroup"
        className={cn(
          "relative inline-flex h-6 items-center",
          "overflow-hidden rounded-lg",
          glass ? "bg-black/5 dark:bg-white/10" : "bg-gray-bg-300 dark:bg-dark-bg-100",
          "border border-black/5 dark:border-white/10",
          className,
        )}
      >
        {/* Black overlay for depth */}
        <div className="pointer-events-none absolute inset-0 bg-black/5" />

        {/* Segments with separators */}
        {segments.map((segment, index) => {
          const segmentValue = segment.props.value;
          const nextSegmentValue = segments[index + 1]?.props.value;

          // Hide separator if current or next segment is selected
          const showSeparator = index < segments.length - 1 && value !== segmentValue && value !== nextSegmentValue;

          return (
            <React.Fragment key={segmentValue}>
              {segment}
              {index < segments.length - 1 && <SegmentSeparator visible={showSeparator} />}
            </React.Fragment>
          );
        })}
      </div>
    </SegmentedControlContext.Provider>
  );
});

/* =============================================================================
   DISCLOSURE BUTTON
   Expand/collapse triangle button for hierarchical content
   ============================================================================= */

interface DisclosureButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

const DisclosureButton = React.forwardRef<HTMLButtonElement, DisclosureButtonProps>(function DisclosureButton(
  { expanded = false, onExpandedChange, className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={expanded}
      className={cn(
        "inline-flex items-center gap-1.5",
        "font-semibold text-[11px] uppercase tracking-wide",
        "text-gray-text-secondary dark:text-gray-text-secondary",
        "hover:text-gray-text-secondary-hover dark:hover:text-gray-text-tertiary",
        "focus-visible-ring",
        "disabled-cursor",
        "transition-colors duration-100",
        className,
      )}
      onClick={() => onExpandedChange?.(!expanded)}
      {...props}
    >
      {/* Disclosure triangle */}
      <ChevronRight
        aria-hidden="true"
        className={cn("h-2.5 w-2.5 transition-transform duration-150", expanded ? "rotate-90" : "rotate-0")}
      />
      {children}
    </button>
  );
});

export { SegmentedControl, Segment, DisclosureButton };
