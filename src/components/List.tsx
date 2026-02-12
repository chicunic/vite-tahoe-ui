import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Typography } from "@/components/Typography";
import { cn } from "@/utils";

const sidebarItemVariants = cva(
  "group flex cursor-pointer select-none items-center gap-2 rounded-[5px] px-1.5 transition-colors",
  {
    variants: {
      state: {
        default: "text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5",
        selected: "bg-apple-blue text-white",
        disabled: "pointer-events-none opacity-50",
      },
      size: {
        sm: "h-6 text-[12px]",
        md: "h-8 text-[13px]",
        lg: "h-10 text-[14px]",
      },
    },
    defaultVariants: {
      state: "default",
      size: "sm",
    },
  },
);

export interface SidebarItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarItemVariants> {
  icon?: React.ReactNode;
}

export const SidebarItem = React.forwardRef<HTMLDivElement, SidebarItemProps>(function SidebarItem(
  { className, state, size, icon, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(sidebarItemVariants({ state, size, className }))} {...props}>
      {icon && <div className={cn("shrink-0", state === "selected" ? "text-white" : "text-blue-500")}>{icon}</div>}
      <span className="flex-1 truncate">{children}</span>
    </div>
  );
});

export function SidebarSection({ title, children }: { title: string; children: React.ReactNode }): React.ReactElement {
  return (
    <div className="mb-4">
      <Typography variant="caption-1" className="mb-1 px-3 font-bold text-gray-500 uppercase tracking-tight">
        {title}
      </Typography>
      <div className="space-y-px">{children}</div>
    </div>
  );
}

const listItemVariants = cva(
  "flex h-5 cursor-default select-none items-center border-transparent border-b px-4 text-[12px]",
  {
    variants: {
      variant: {
        default: "bg-transparent text-gray-800 dark:text-gray-200",
        zebra: "bg-black/[0.03] text-gray-800 dark:bg-white/[0.03] dark:text-gray-200",
        selected: "bg-apple-blue text-white [&_*]:text-white",
        selectedInactive: "bg-gray-border text-gray-800 dark:bg-dark-bg-200 dark:text-gray-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof listItemVariants> {
  level?: number;
}

const LEVEL_PADDING: Record<number, string> = {
  0: "pl-4",
  1: "pl-8",
  2: "pl-12",
  3: "pl-16",
};

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(function ListItem(
  { className, variant, level = 0, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cn(listItemVariants({ variant }), LEVEL_PADDING[level] ?? "pl-4", className)} {...props}>
      {children}
    </div>
  );
});
