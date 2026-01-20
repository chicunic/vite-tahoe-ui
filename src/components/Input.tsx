import * as React from "react";
import { cn } from "@/utils";

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  variant?: "default" | "search";
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { className, label, error, icon, variant = "default", id, ...props },
  ref,
) {
  const isSearch = variant === "search";
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="px-1 font-medium text-[11px] text-gray-500">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className={cn("absolute top-1/2 z-10 -translate-y-1/2 text-gray-400", isSearch ? "left-3" : "left-2")}>
            {icon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-6 w-full px-2 text-[13px] transition-all duration-100",
            "border border-gray-border bg-white dark:border-none dark:bg-dark-bg-200",
            "focus-ring-inset focus:border-blue-500/50",
            "disabled:bg-gray-50 disabled:opacity-50 dark:disabled:bg-white/5",
            isSearch ? "rounded-full pr-3 pl-8" : "rounded-[5px]",
            icon && !isSearch && "pl-7",
            className,
          )}
          {...props}
        />
      </div>
      {error && <span className="px-1 text-[10px] text-red-500">{error}</span>}
    </div>
  );
});

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, checked, onCheckedChange, ...props },
  ref,
) {
  return (
    <label className={cn("relative inline-flex cursor-pointer items-center", className)}>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "h-5.5 w-9.5 rounded-full bg-gray-bg-500 transition-colors dark:bg-dark-bg-200",
          "peer-checked:bg-apple-green dark:peer-checked:bg-apple-green-dark",
          "after:absolute after:top-0.5 after:left-0.5 after:h-4.5 after:w-4.5 after:rounded-full after:bg-white after:transition-all after:content-['']",
          "peer-checked:after:translate-x-4",
        )}
      />
    </label>
  );
});

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, ...props },
  ref,
) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2">
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          "h-4 w-4 appearance-none rounded border border-gray-border transition-all dark:border-white/20",
          "bg-white dark:bg-white/5",
          "checked:border-transparent checked:bg-apple-blue",
          'relative after:hidden after:content-[""] checked:after:block',
          "after:absolute after:top-0.5 after:left-1.25 after:h-2 after:w-1 after:rotate-45 after:border-white after:border-r-2 after:border-b-2",
          "focus-ring",
          className,
        )}
        {...props}
      />
      {label && <span className="text-[13px] text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  );
});

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, label, ...props },
  ref,
) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2">
      <input
        type="radio"
        ref={ref}
        className={cn(
          "h-4 w-4 appearance-none rounded-full border border-gray-border transition-all dark:border-white/20",
          "bg-white dark:bg-white/5",
          "checked:border-[5px] checked:border-apple-blue checked:bg-white",
          "focus-ring",
          className,
        )}
        {...props}
      />
      {label && <span className="text-[13px] text-gray-700 dark:text-gray-300">{label}</span>}
    </label>
  );
});
