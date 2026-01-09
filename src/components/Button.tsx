import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex select-none items-center justify-center font-medium text-[13px] transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Default/Preferred - blue filled button
        primary: "bg-apple-blue-primary text-white hover:bg-apple-blue-primary/85 active:bg-apple-blue-primary/70",
        // Bordered Neutral - 5% black background
        secondary:
          "bg-black/5 text-gray-text hover:bg-black/15 active:bg-black/20 dark:bg-white/10 dark:text-gray-text-light dark:active:bg-white/25 dark:hover:bg-white/20",
        // Bordered Destructive - red tinted
        destructive: "bg-apple-red/25 text-apple-red hover:bg-apple-red/35 active:bg-apple-red/45",
        // Borderless - transparent with blue text
        ghost:
          "bg-transparent text-apple-blue-light hover:bg-black/5 active:bg-black/15 dark:active:bg-white/20 dark:hover:bg-white/10",
      },
      size: {
        default: "h-8 rounded-md px-4", // 32px standard (Tahoe)
        sm: "h-7 rounded-md px-3 text-[12px]", // 28px small
        lg: "h-9 rounded-md px-5", // 36px large
        icon: "h-8 w-8 rounded-full", // Icon/Arrow button - circular
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => {
  return <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
