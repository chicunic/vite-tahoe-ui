import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/utils";

const typographyVariants = cva("text-gray-900 dark:text-gray-100", {
  variants: {
    variant: {
      "large-title": "font-normal text-[26px] leading-tight",
      "title-1": "font-normal text-[22px] leading-snug",
      "title-2": "font-normal text-[20px] leading-snug",
      "title-3": "font-normal text-[17px] leading-snug",
      headline: "font-bold text-[13px] leading-snug",
      body: "font-normal text-[13px] leading-snug",
      callout: "font-normal text-[12px] leading-snug",
      subheadline: "font-normal text-[11px] leading-snug",
      footnote: "font-normal text-[10px] leading-snug",
      "caption-1": "font-normal text-[10px] leading-snug",
      "caption-2": "font-normal text-[10px] leading-snug",
    },
    emphasis: {
      true: "font-bold",
      false: "font-normal",
    },
  },
  defaultVariants: {
    variant: "body",
    emphasis: false,
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement>,
    VariantProps<typeof typographyVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";

function TypographyInner(
  { className, variant, emphasis, as, ...props }: TypographyProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  // Determine default element based on variant if not specified
  const defaultTags: Record<string, TypographyTag> = {
    "large-title": "h1",
    "title-1": "h1",
    "title-2": "h2",
    "title-3": "h3",
    headline: "h4",
  };

  const tag: TypographyTag = as || defaultTags[variant || "body"] || "p";

  return React.createElement(tag, {
    ref,
    className: cn(typographyVariants({ variant, emphasis, className })),
    ...props,
  });
}

const Typography = React.forwardRef(TypographyInner);
Typography.displayName = "Typography";

export { Typography, typographyVariants };
