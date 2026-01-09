import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils";

/* =============================================================================
   POP-UP BUTTON
   Tahoe style popup button that shows current selection with up/down chevrons
   ============================================================================= */

interface PopUpButtonProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "default" | "lg";
}

const PopUpButton = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>, PopUpButtonProps>(
  ({ value, placeholder = "Select...", disabled, className, size = "default" }, ref) => {
    const sizeClasses = {
      sm: "h-5 text-[12px]",
      default: "h-6 text-[13px]",
      lg: "h-7 text-[14px]",
    };

    return (
      <DropdownMenuPrimitive.Trigger
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative inline-flex min-w-25 items-center pl-3",
          "cursor-default select-none rounded-md",
          sizeClasses[size],
          // Background - 5% black fill, no border
          "bg-black/5 dark:bg-white/10",
          // Text
          "text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]",
          "font-medium",
          // States
          "hover:bg-black/15 dark:hover:bg-white/20",
          "focus:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          // Active/pressed state
          "active:bg-black/20 dark:active:bg-white/25",
          "data-state-open:bg-black/15 dark:data-state-open:bg-white/20",
          className,
        )}
      >
        {/* Label */}
        <span className="flex-1 truncate text-left">{value || placeholder}</span>

        {/* Up/Down chevron - 24x24 area */}
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          <ChevronsUpDown className="h-3.5 w-3.5 opacity-85" strokeWidth={2} />
        </span>
      </DropdownMenuPrimitive.Trigger>
    );
  },
);
PopUpButton.displayName = "PopUpButton";

/* =============================================================================
   PULLDOWN BUTTON
   Tahoe style pulldown button that shows a menu of actions
   ============================================================================= */

interface PulldownButtonProps {
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "default" | "lg";
}

const PulldownButton = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>, PulldownButtonProps>(
  ({ label = "Actions", disabled, className, size = "default" }, ref) => {
    const sizeClasses = {
      sm: "h-5 text-[12px]",
      default: "h-6 text-[13px]",
      lg: "h-7 text-[14px]",
    };

    return (
      <DropdownMenuPrimitive.Trigger
        ref={ref}
        disabled={disabled}
        className={cn(
          "relative inline-flex min-w-25 items-center pl-3",
          "cursor-default select-none rounded-md",
          sizeClasses[size],
          // Background - 5% black fill, no border
          "bg-black/5 dark:bg-white/10",
          // Text
          "text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]",
          "font-medium",
          // States
          "hover:bg-black/15 dark:hover:bg-white/20",
          "focus:outline-none",
          "disabled:pointer-events-none disabled:opacity-50",
          // Active/pressed state
          "active:bg-black/20 dark:active:bg-white/25",
          "data-state-open:bg-black/15 dark:data-state-open:bg-white/20",
          className,
        )}
      >
        {/* Label */}
        <span className="flex-1 truncate text-left">{label}</span>

        {/* Down chevron - 24x24 area */}
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          <ChevronDown className="h-3.5 w-3.5 opacity-85" strokeWidth={2} />
        </span>
      </DropdownMenuPrimitive.Trigger>
    );
  },
);
PulldownButton.displayName = "PulldownButton";

export { PopUpButton, PulldownButton };
