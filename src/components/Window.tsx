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

const CONTROL_BUTTON_CONFIG: Record<ControlColor, { bg: string; icon: string }> = {
  close: { bg: "#FF736A", icon: "\u00D7" },
  minimize: { bg: "#FEBC2E", icon: "\u2212" },
  zoom: { bg: "#19C332", icon: "+" },
};

function WindowControlButton({ color, onClick }: { color: ControlColor; onClick?: () => void }): React.ReactElement {
  const [isHovered, setIsHovered] = React.useState(false);
  const { bg, icon } = CONTROL_BUTTON_CONFIG[color];

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
  const sidebarContent = (
    <>
      <div className="relative flex h-10.5 shrink-0 items-center px-2.5" data-tauri-drag-region={true}>
        <WindowControls />
      </div>
      <div className="relative flex flex-1 flex-col overflow-y-auto px-2 pb-2">{sidebar}</div>
    </>
  );

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
        <div className="flex w-60 shrink-0 flex-col p-2">
          <SidebarWrapper {...sidebarProps}>{sidebarContent}</SidebarWrapper>
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

        {/* Content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
});
