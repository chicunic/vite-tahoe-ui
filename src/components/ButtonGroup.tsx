import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils";

const buttonGroupVariants = cva("relative inline-flex items-center overflow-hidden rounded-full", {
  variants: {
    size: {
      xl: "h-9 gap-[3px] p-1",
      medium: "h-6 gap-[3px] p-0.5",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

const buttonItemVariants = cva(
  "inline-flex select-none items-center justify-center rounded-full transition-all focus:outline-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        xl: "h-7 min-w-[30px] px-[5px] [&_svg]:h-4 [&_svg]:w-4",
        medium: "h-5 min-w-9 px-1.5 [&_svg]:h-3.5 [&_svg]:w-3.5",
      },
      selected: {
        true: "bg-gray-bg-400 dark:bg-white/20",
        false: "bg-transparent hover:bg-black/5 dark:hover:bg-white/10",
      },
    },
    defaultVariants: {
      size: "xl",
      selected: false,
    },
  },
);

function Separator({ size }: { size: "xl" | "medium" }): React.ReactElement {
  return (
    <div className={cn("flex items-center justify-center", size === "xl" ? "h-5 w-0.75" : "h-4 w-0.75")}>
      <div className="h-full w-px bg-black/10 dark:bg-white/15" />
    </div>
  );
}

export interface ButtonGroupItem {
  icon: React.ReactNode;
  value: string;
  "aria-label"?: string;
  disabled?: boolean;
}

export interface ButtonGroupProps extends VariantProps<typeof buttonGroupVariants> {
  items: ButtonGroupItem[];
  value?: string | string[];
  selectionMode?: "single" | "multiple" | "none";
  onValueChange?: (value: string | string[]) => void;
  className?: string;
  showSeparators?: boolean;
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ items, value, selectionMode = "single", onValueChange, size = "xl", className, showSeparators = true }, ref) => {
    const selectedValues = React.useMemo(() => {
      if (!value) return new Set<string>();
      return new Set(Array.isArray(value) ? value : [value]);
    }, [value]);

    const handleItemClick = (itemValue: string) => {
      if (selectionMode === "none") return;

      if (selectionMode === "single") {
        onValueChange?.(itemValue);
      } else {
        // Multiple selection
        const newSelected = new Set(selectedValues);
        if (newSelected.has(itemValue)) {
          newSelected.delete(itemValue);
        } else {
          newSelected.add(itemValue);
        }
        onValueChange?.(Array.from(newSelected));
      }
    };

    const resolvedSize = size ?? "xl";

    return (
      <div
        ref={ref}
        className={cn(buttonGroupVariants({ size }), "shadow-glass", className)}
        role="toolbar"
        aria-label="Button group"
      >
        <div className="absolute inset-0 rounded-full bg-white/70 dark:bg-white/15" />
        <div className="relative z-10 flex items-center">
          {items.map((item, index) => {
            const isSelected = selectedValues.has(item.value);
            const showSeparator = showSeparators && index < items.length - 1 && !isSelected;
            const nextSelected = items[index + 1] && selectedValues.has(items[index + 1].value);

            return (
              <React.Fragment key={item.value}>
                <button
                  type="button"
                  className={cn(
                    buttonItemVariants({ size: resolvedSize, selected: isSelected }),
                    item.disabled && "pointer-events-none opacity-50",
                  )}
                  onClick={() => handleItemClick(item.value)}
                  aria-label={item["aria-label"]}
                  aria-pressed={selectionMode !== "none" ? isSelected : undefined}
                  disabled={item.disabled}
                >
                  {item.icon}
                </button>
                {showSeparator && !nextSelected && <Separator size={resolvedSize} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  },
);

ButtonGroup.displayName = "ButtonGroup";

export { buttonGroupVariants, buttonItemVariants };
