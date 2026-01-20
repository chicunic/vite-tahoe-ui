import { cva, type VariantProps } from "class-variance-authority";
import { Search } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils";

const windowSearchVariants = cva("relative inline-flex items-center rounded-full", {
  variants: {
    size: {
      xl: "h-9 gap-1.5 px-2.5",
      medium: "h-6 gap-1 px-1.5",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

export interface WindowSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof windowSearchVariants> {
  onValueChange?: (value: string) => void;
}

export const WindowSearch = React.forwardRef<HTMLInputElement, WindowSearchProps>(
  (
    {
      size = "xl",
      className,
      placeholder = "Search",
      value,
      defaultValue,
      onValueChange,
      onChange,
      onFocus,
      onBlur,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <div className={cn(windowSearchVariants({ size }), "shadow-glass", disabled && "opacity-50", className)}>
        {/* Liquid Glass Background */}
        <div className="absolute inset-0 rounded-full bg-white/70 dark:bg-white/15" />

        {/* Focus Ring */}
        {isFocused && !disabled && (
          <div className="absolute inset-0 rounded-full shadow-[0_0_0_3.5px_rgba(0,122,255,0.25),0_0_0_1px_rgba(0,122,255,0.15)]" />
        )}

        {/* Search Icon */}
        <Search
          className={cn(
            "relative z-10 h-4 w-4 shrink-0",
            disabled ? "text-black/30 dark:text-white/30" : "text-black/50 dark:text-white/50",
          )}
          strokeWidth={2}
        />

        {/* Input */}
        <input
          ref={ref}
          type="text"
          value={currentValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "relative z-10 min-w-0 flex-1 bg-transparent font-medium text-[13px] leading-4 outline-none",
            "placeholder:text-black/50 dark:placeholder:text-white/50",
            disabled ? "text-black/30 dark:text-white/30" : "text-gray-text dark:text-white/90",
          )}
          {...props}
        />
      </div>
    );
  },
);

WindowSearch.displayName = "WindowSearch";

export { windowSearchVariants };
