import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronRight } from "lucide-react";
import * as React from "react";
import { cn } from "@/utils";

/* =============================================================================
   MENU ITEM
   Tahoe style menu item with icon, label, and keyboard shortcut
   ============================================================================= */

const menuItemVariants = cva(
  [
    "relative flex h-6 items-center gap-1.5 pl-3",
    "cursor-default select-none font-medium text-[13px]",
    "rounded-lg outline-none",
    "transition-colors duration-75",
  ],
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface MenuItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>,
    VariantProps<typeof menuItemVariants> {
  /** Leading icon/symbol */
  icon?: React.ReactNode;
  /** Keyboard shortcut display */
  shortcut?: string;
  /** Show checkmark for selected items */
  checked?: boolean;
}

const MenuItem = React.forwardRef<React.ComponentRef<typeof DropdownMenuPrimitive.Item>, MenuItemProps>(
  ({ className, icon, shortcut, checked, children, variant, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
      ref={ref}
      className={cn(
        menuItemVariants({ variant }),
        // Extend background to edges with negative margin
        "-mx-1.75 px-1.75",
        // Idle state
        "text-gray-text dark:text-gray-text-light",
        // Hover state - blue background with white text
        "focus:bg-apple-blue-light focus:text-white",
        // Disabled state
        "data-disabled:pointer-events-none data-disabled:text-gray-text-disabled",
        className,
      )}
      {...props}
    >
      {/* Checkmark / Icon area */}
      <span className="flex h-full w-3 shrink-0 items-center justify-center">
        {checked ? (
          <Check className="h-3 w-3" strokeWidth={2.5} />
        ) : icon ? (
          <span className="text-[13px]">{icon}</span>
        ) : null}
      </span>

      {/* Label */}
      <span className="flex-1 truncate">{children}</span>

      {/* Keyboard shortcut */}
      {shortcut && (
        <span className="ml-4 text-[13px] text-gray-text-disabled group-focus:text-white/80">{shortcut}</span>
      )}
    </DropdownMenuPrimitive.Item>
  ),
);
MenuItem.displayName = "MenuItem";

/* =============================================================================
   MENU SEPARATOR
   Horizontal divider between menu items
   ============================================================================= */

const MenuSeparator = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator ref={ref} className={cn("flex h-2.75 items-center px-1.75", className)} {...props}>
    <div className="h-px w-full bg-gray-bg-400 dark:bg-dark-bg-100" />
  </DropdownMenuPrimitive.Separator>
));
MenuSeparator.displayName = "MenuSeparator";

/* =============================================================================
   MENU HEADER
   Section header within a menu
   ============================================================================= */

const MenuHeader = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "flex h-5.25 items-center px-1.75",
      "font-semibold text-[11px] text-gray-text-secondary dark:text-gray-text-secondary",
      "uppercase tracking-wide",
      className,
    )}
    {...props}
  />
));
MenuHeader.displayName = "MenuHeader";

/* =============================================================================
   MENU CONTENT
   The dropdown menu container with glass effect
   ============================================================================= */

const MenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 5, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-45 overflow-hidden px-3 py-1.25",
        "rounded-[13px]",
        // Gradient background from left to right
        "bg-linear-to-r from-gray-bg-300 to-gray-bg-100",
        "dark:bg-linear-to-r dark:from-dark-bg-400 dark:to-dark-bg-100",
        "shadow-[0_0_2px_rgba(0,0,0,0.1),0_0_25px_rgba(0,0,0,0.16)]",
        // Animation
        "data-state-closed:animate-out data-state-open:animate-in",
        "data-state-closed:fade-out-0 data-state-open:fade-in-0",
        "data-state-closed:zoom-out-95 data-state-open:zoom-in-95",
        "data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2",
        "data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
MenuContent.displayName = "MenuContent";

/* =============================================================================
   SUBMENU
   Nested menu with arrow indicator
   ============================================================================= */

const SubMenuTrigger = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    icon?: React.ReactNode;
  }
>(({ className, icon, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "relative flex h-6 items-center gap-1.5 pl-3",
      "cursor-default select-none font-medium text-[13px]",
      "rounded-lg outline-none",
      // Extend background to edges with negative margin
      "-mx-1.75 px-1.75",
      "text-gray-text dark:text-gray-text-light",
      "focus:bg-apple-blue-light focus:text-white",
      "data-state-open:bg-apple-blue-light data-state-open:text-white",
      className,
    )}
    {...props}
  >
    <span className="flex h-full w-3 shrink-0 items-center justify-center">
      {icon && <span className="text-[13px]">{icon}</span>}
    </span>
    <span className="flex-1 truncate">{children}</span>
    <ChevronRight className="ml-auto h-3.5 w-3.5" strokeWidth={2.5} />
  </DropdownMenuPrimitive.SubTrigger>
));
SubMenuTrigger.displayName = "SubMenuTrigger";

const SubMenuContent = React.forwardRef<
  React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        "z-50 min-w-45 overflow-hidden px-3 py-1.25",
        "rounded-[13px]",
        // Gradient background from left to right
        "bg-linear-to-r from-gray-bg-300 to-gray-bg-100",
        "dark:bg-linear-to-r dark:from-dark-bg-400 dark:to-dark-bg-100",
        "shadow-[0_0_2px_rgba(0,0,0,0.1),0_0_25px_rgba(0,0,0,0.16)]",
        "data-state-closed:animate-out data-state-open:animate-in",
        "data-state-closed:fade-out-0 data-state-open:fade-in-0",
        "data-state-closed:zoom-out-95 data-state-open:zoom-in-95",
        "data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2",
        "data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2",
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
SubMenuContent.displayName = "SubMenuContent";

/* =============================================================================
   POPOVER
   Tahoe style popover with arrow pointing to anchor
   ============================================================================= */

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;

interface PopoverContentProps extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  /** Show arrow pointing to trigger */
  showArrow?: boolean;
}

const PopoverContent = React.forwardRef<React.ComponentRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
  ({ className, align = "center", sideOffset = 8, showArrow = true, children, ...props }, ref) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 w-50 p-4",
          "rounded-xl",
          // Glass effect background
          "bg-gray-bg-100/95 dark:bg-dark-bg-300/95",
          "backdrop-blur-[25px]",
          "border border-black/10 dark:border-white/10",
          "shadow-[0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)]",
          // Animation
          "data-state-closed:animate-out data-state-open:animate-in",
          "data-state-closed:fade-out-0 data-state-open:fade-in-0",
          "data-state-closed:zoom-out-95 data-state-open:zoom-in-95",
          "data-side-bottom:slide-in-from-top-2 data-side-left:slide-in-from-right-2",
          "data-side-right:slide-in-from-left-2 data-side-top:slide-in-from-bottom-2",
          className,
        )}
        {...props}
      >
        {children}
        {showArrow && (
          <PopoverPrimitive.Arrow className="fill-gray-bg-100/95 dark:fill-dark-bg-300/95" width={12} height={6} />
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  ),
);
PopoverContent.displayName = "PopoverContent";

/* =============================================================================
   DROPDOWN MENU (Full Re-export with Tahoe styling)
   ============================================================================= */

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuSub = DropdownMenuPrimitive.Sub;
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export {
  // Dropdown Menu
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuRadioGroup,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuHeader,
  SubMenuTrigger,
  SubMenuContent,
  // Popover
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
};
