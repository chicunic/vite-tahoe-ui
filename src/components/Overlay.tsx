import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";
import { Typography } from "@/components/Typography";
import { cn } from "@/utils";

/**
 * Dialog / Alert Components
 */
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogPortal = DialogPrimitive.Portal;

export const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "data-state-closed:fade-out-0 data-state-open:fade-in-0 fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] data-state-closed:animate-out data-state-open:animate-in",
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

export const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed top-[45%] left-[50%] z-50 w-full max-w-65 translate-x-[-50%] translate-y-[-50%] transition-all duration-200",
        "rounded-[26px] bg-gray-bg-200 dark:bg-dark-bg-300",
        "shadow-[0_17px_45px_rgba(0,0,0,0.5),0_0_1px_rgba(0,0,0,0.2)]",
        "data-state-closed:fade-out-0 data-state-open:fade-in-0 data-state-closed:zoom-out-95 data-state-open:zoom-in-95 data-state-closed:animate-out data-state-open:animate-in",
        className,
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * AlertButton Component
 * Figma: _Buttons (node-id 121:11170)
 * Pill-shaped buttons specifically for Alert dialogs
 * Variants: Primary, Secondary, Destructive
 */
export interface AlertButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive";
}

export const AlertButton = React.forwardRef<HTMLButtonElement, AlertButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    const baseStyles = "h-7 w-full rounded-full px-4 text-[13px] font-medium transition-colors";

    const variantStyles = {
      primary: "bg-apple-blue-light text-white hover:bg-apple-blue-light/90",
      secondary:
        "bg-gray-bg-400 dark:bg-dark-bg-100 text-black/85 dark:text-white/85 hover:bg-gray-border dark:hover:bg-dark-bg-400",
      destructive: "bg-apple-red/23 text-apple-red hover:bg-apple-red/30",
    };

    return (
      <button ref={ref} type="button" className={cn(baseStyles, variantStyles[variant], className)} {...props}>
        {children}
      </button>
    );
  },
);
AlertButton.displayName = "AlertButton";

export const Alert: React.FC<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  primaryAction: { label: string; onClick: () => void; variant?: "primary" | "destructive" };
  secondaryAction?: { label: string; onClick: () => void; variant?: "primary" | "destructive" };
  cancelAction?: { label: string; onClick: () => void };
}> = ({ open, onOpenChange, title, description, icon, primaryAction, secondaryAction, cancelAction }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="flex flex-col gap-2.5 p-4">
      {/* Icon */}
      {icon && (
        <div className="flex items-center px-1.5">
          <div className="flex size-16 items-center justify-center">{icon}</div>
        </div>
      )}

      {/* Title + Description */}
      <div className="flex flex-col gap-2.5 px-1.5">
        <Typography variant="headline" className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]">
          {title}
        </Typography>
        {description && (
          <Typography variant="subheadline" className="text-[rgba(0,0,0,0.85)] dark:text-[rgba(255,255,255,0.85)]">
            {description}
          </Typography>
        )}
      </div>

      {/* Buttons */}
      <div className="flex w-full flex-col gap-1.5">
        <AlertButton variant={primaryAction.variant || "primary"} onClick={primaryAction.onClick}>
          {primaryAction.label}
        </AlertButton>
        {secondaryAction && (
          <AlertButton variant={secondaryAction.variant || "destructive"} onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </AlertButton>
        )}
        {cancelAction && (
          <AlertButton variant="secondary" onClick={cancelAction.onClick}>
            {cancelAction.label}
          </AlertButton>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

/**
 * Tooltip Components
 */
export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "fade-in-0 zoom-in-95 z-50 animate-in overflow-hidden rounded-sm bg-black/80 px-2 py-1 text-[11px] text-white shadow-md dark:bg-white/90 dark:text-black",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;
