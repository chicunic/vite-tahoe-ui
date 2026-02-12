import * as React from "react";
import { LiquidGlassPanel } from "@/components/LiquidGlass";
import { cn } from "@/utils";

interface WindowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: string;
  width?: number | string;
  height?: number | string;
  sidebar?: React.ReactNode;
  toolbar?: React.ReactNode;
  /** Enable 3D liquid glass effect for sidebar (requires WebGL) */
  liquidGlass?: boolean;
}

/** CSS-based glass sidebar (fallback) */
function CssSidebar({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="relative flex h-full w-56 flex-col overflow-hidden rounded-[18px]">
      <div className="absolute inset-0 bg-gray-bg-100/67 backdrop-blur-[25px] dark:bg-dark-bg-300/67" />
      <div className="absolute inset-0 bg-dark-bg-500 opacity-100 mix-blend-color-dodge dark:opacity-50" />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
}

/** Window Control Button */
type ControlColor = "close" | "minimize" | "zoom";

const CONTROL_COLORS: Record<ControlColor, string> = {
  close: "bg-control-close",
  minimize: "bg-control-minimize",
  zoom: "bg-control-zoom",
};

const CONTROL_ICONS: Record<ControlColor, string> = {
  close: "\u00D7",
  minimize: "\u2212",
  zoom: "+",
};

function WindowControlButton({ color, onClick }: { color: ControlColor; onClick?: () => void }): React.ReactElement {
  return (
    <button
      type="button"
      className={cn(
        "group flex size-3.5 items-center justify-center rounded-full",
        "cursor-default transition-all duration-100",
        "shadow-control-inset",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50",
        CONTROL_COLORS[color],
      )}
      onClick={onClick}
    >
      <span className="hidden font-bold text-[9px] text-black/40 leading-none group-hover:inline">
        {CONTROL_ICONS[color]}
      </span>
    </button>
  );
}

/** Window Controls (traffic lights) */
interface WindowControlsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
}

function WindowControls({ onClose, onMinimize, onZoom }: WindowControlsProps): React.ReactElement {
  return (
    <div className="flex gap-2">
      <WindowControlButton color="close" onClick={onClose} />
      <WindowControlButton color="minimize" onClick={onMinimize} />
      <WindowControlButton color="zoom" onClick={onZoom} />
    </div>
  );
}

export const Window = React.forwardRef<HTMLDivElement, WindowProps>(function Window(
  { className, children, title, width, height, sidebar, toolbar, liquidGlass = false, ...props },
  ref,
) {
  const SidebarWrapper = liquidGlass ? LiquidGlassPanel : CssSidebar;
  const sidebarProps = liquidGlass ? { width: 224, borderRadius: 18 } : {};

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex overflow-hidden",
        "rounded-[26px]",
        "shadow-[0_16px_48px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.23)]",
        "bg-white dark:bg-dark-bg-600",
        className,
      )}
      style={{ width, height }}
      {...props}
    >
      {/* Sidebar */}
      {sidebar && (
        <div className="hidden w-60 shrink-0 flex-col p-2 md:flex">
          <SidebarWrapper {...sidebarProps}>
            <div className="relative flex h-10.5 shrink-0 items-center px-2.5" data-tauri-drag-region>
              <WindowControls />
            </div>
            <div className="relative flex flex-1 flex-col overflow-y-auto px-2 pb-2">{sidebar}</div>
          </SidebarWrapper>
        </div>
      )}

      {/* Main Content */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-white dark:bg-dark-bg-600">
        {/* Toolbar */}
        <div
          className={cn(
            "flex h-13 shrink-0 items-center border-black/5 border-b px-4 dark:border-white/5",
            "pl-20",
            sidebar && "md:pl-4",
          )}
          data-tauri-drag-region
        >
          {/* Mobile controls (always shown if sidebar is hidden on mobile) */}
          <div className={cn("absolute left-4 flex gap-2", sidebar && "md:hidden")}>
            <WindowControls />
          </div>

          <div className="flex flex-1 items-center justify-between gap-4">
            {title && !toolbar && (
              <div className="flex flex-1 justify-center">
                <span className="font-medium font-sans text-[13px] text-black/80 tracking-wide dark:text-white/80">
                  {title}
                </span>
              </div>
            )}
            {toolbar}
          </div>
        </div>

        {/* Content */}
        <div className="min-h-0 flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
});
