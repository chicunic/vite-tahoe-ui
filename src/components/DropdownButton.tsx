import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ChevronsUpDown, type LucideIcon } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils";

type ButtonSize = "sm" | "default" | "lg";

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-5 text-[12px]",
  default: "h-6 text-[13px]",
  lg: "h-7 text-[14px]",
};

const DROPDOWN_BUTTON_BASE_CLASSES = cn(
  "relative inline-flex min-w-25 items-center pl-3",
  "cursor-default select-none rounded-md font-medium",
  "bg-black/5 text-[rgba(0,0,0,0.85)]",
  "hover:bg-black/15 active:bg-black/20",
  "focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  "data-state-open:bg-black/15",
  "dark:bg-white/10 dark:text-[rgba(255,255,255,0.85)]",
  "dark:hover:bg-white/20 dark:active:bg-white/25 dark:data-state-open:bg-white/20",
);

interface DropdownButtonBaseProps {
  label: string;
  icon: LucideIcon;
  disabled?: boolean;
  className?: string;
  size?: ButtonSize;
}

const DropdownButtonBase = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownButtonBaseProps
>(function DropdownButtonBase({ label, icon: Icon, disabled, className, size = "default" }, ref) {
  return (
    <DropdownMenuPrimitive.Trigger
      ref={ref}
      disabled={disabled}
      className={cn(DROPDOWN_BUTTON_BASE_CLASSES, SIZE_CLASSES[size], className)}
    >
      <span className="flex-1 truncate text-left">{label}</span>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        <Icon className="h-3.5 w-3.5 opacity-85" strokeWidth={2} />
      </span>
    </DropdownMenuPrimitive.Trigger>
  );
});

interface PopUpButtonProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  size?: ButtonSize;
}

const PopUpButton = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>, PopUpButtonProps>(
  function PopUpButton({ value, placeholder = "Select...", disabled, className, size }, ref) {
    return (
      <DropdownButtonBase
        ref={ref}
        label={value || placeholder}
        icon={ChevronsUpDown}
        disabled={disabled}
        className={className}
        size={size}
      />
    );
  },
);

interface PulldownButtonProps {
  label?: string;
  disabled?: boolean;
  className?: string;
  size?: ButtonSize;
}

const PulldownButton = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Trigger>, PulldownButtonProps>(
  function PulldownButton({ label = "Actions", disabled, className, size }, ref) {
    return (
      <DropdownButtonBase
        ref={ref}
        label={label}
        icon={ChevronDown}
        disabled={disabled}
        className={className}
        size={size}
      />
    );
  },
);

export { PopUpButton, PulldownButton };
