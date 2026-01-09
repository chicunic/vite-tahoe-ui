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
const CssSidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative flex h-full w-56 flex-col overflow-hidden rounded-[18px]">
    {/* Glass background layers */}
    <div className="absolute inset-0 bg-gray-bg-100/67 backdrop-blur-[25px] dark:bg-dark-bg-300/67" />
    <div className="absolute inset-0 bg-dark-bg-500 opacity-100 mix-blend-color-dodge dark:opacity-50" />
    <div className="relative z-10 flex h-full flex-col">{children}</div>
  </div>
);

/** Window Control Button */
interface WindowControlButtonProps {
  color: "close" | "minimize" | "zoom";
  onClick?: () => void;
}

const WindowControlButton: React.FC<WindowControlButtonProps> = ({ color, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const colors = {
    close: {
      bg: "#FF736A",
      icon: "×",
    },
    minimize: {
      bg: "#FEBC2E",
      icon: "−",
    },
    zoom: {
      bg: "#19C332",
      icon: "+",
    },
  };

  const { bg, icon } = colors[color];

  return (
    <button
      type="button"
      className={cn(
        "flex size-3.5 items-center justify-center rounded-full",
        "cursor-default transition-all duration-100",
        "shadow-control-inset",
        "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50",
      )}
      style={{ backgroundColor: bg }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {isHovered && <span className="font-bold text-[9px] text-black/40 leading-none">{icon}</span>}
    </button>
  );
};

/** Window Controls (traffic lights) */
interface WindowControlsProps {
  onClose?: () => void;
  onMinimize?: () => void;
  onZoom?: () => void;
}

const WindowControls: React.FC<WindowControlsProps> = ({ onClose, onMinimize, onZoom }) => (
  <div className="flex gap-2">
    <WindowControlButton color="close" onClick={onClose} />
    <WindowControlButton color="minimize" onClick={onMinimize} />
    <WindowControlButton color="zoom" onClick={onZoom} />
  </div>
);

export const Window = React.forwardRef<HTMLDivElement, WindowProps>(
  ({ className, children, title, width, height, sidebar, toolbar, liquidGlass = false, ...props }, ref) => {
    const sidebarContent = (
      <>
        {/* Window Controls Area */}
        <div className="relative flex h-10.5 shrink-0 items-center px-2.5" data-tauri-drag-region={true}>
          <WindowControls />
        </div>
        <div className="relative flex flex-1 flex-col overflow-y-auto px-2 pb-2">{sidebar}</div>
      </>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex overflow-hidden",
          "rounded-[26px]", // Tahoe radius
          "shadow-[0_16px_48px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.23)]",
          "bg-white dark:bg-dark-bg-600",
          className,
        )}
        style={{ width, height }}
        {...props}
      >
        {/* Sidebar Container - Tahoe floating style */}
        {sidebar && (
          <div className="flex w-60 shrink-0 flex-col p-2">
            {liquidGlass ? (
              <LiquidGlassPanel width={224} borderRadius={18}>
                {sidebarContent}
              </LiquidGlassPanel>
            ) : (
              <CssSidebar>{sidebarContent}</CssSidebar>
            )}
          </div>
        )}

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col bg-white dark:bg-dark-bg-600">
          {/* Toolbar */}
          <div
            className={cn(
              "flex h-13 shrink-0 items-center border-black/5 border-b px-4 dark:border-white/5",
              !sidebar && "pl-20",
            )}
            data-tauri-drag-region={true}
          >
            {!sidebar && (
              <div className="absolute left-4 flex gap-2">
                <WindowControls />
              </div>
            )}

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

          {/* Content Area */}
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    );
  },
);
Window.displayName = "Window";
