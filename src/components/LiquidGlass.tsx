import { Environment, MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import * as React from "react";
import { cn } from "@/utils";

function checkWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

const SCALE_FACTOR = 100;

interface GlassPanelProps {
  width: number;
  height: number;
  radius?: number;
  thickness?: number;
  chromaticAberration?: number;
  distortion?: number;
  temporalDistortion?: number;
  transmission?: number;
  roughness?: number;
  ior?: number;
}

function GlassPanel({
  width,
  height,
  radius = 0.5,
  thickness = 0.15,
  chromaticAberration = 0.02,
  distortion = 0.1,
  temporalDistortion = 0.1,
  transmission = 0.95,
  roughness = 0.05,
  ior = 1.5,
}: GlassPanelProps): React.ReactElement {
  return (
    <RoundedBox args={[width, height, thickness]} radius={radius} smoothness={4}>
      <MeshTransmissionMaterial
        backside
        samples={16}
        resolution={512}
        transmission={transmission}
        roughness={roughness}
        thickness={thickness * 10}
        ior={ior}
        chromaticAberration={chromaticAberration}
        distortion={distortion}
        distortionScale={0.5}
        temporalDistortion={temporalDistortion}
        clearcoat={1}
        clearcoatRoughness={0.1}
        attenuationDistance={0.5}
        attenuationColor="#ffffff"
        color="#f5f5f5"
        toneMapped={false}
      />
    </RoundedBox>
  );
}

function BackgroundCapture(): React.ReactElement {
  const { viewport } = useThree();

  return (
    <mesh position={[0, 0, -2]}>
      <planeGeometry args={[viewport.width * 2, viewport.height * 2]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  );
}

export interface LiquidGlassProps {
  children?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  intensity?: number;
  fallback?: boolean;
}

export function LiquidGlass({
  children,
  className,
  width = 224,
  height = 400,
  intensity = 0.9,
  fallback = true,
}: LiquidGlassProps): React.ReactElement {
  const [webglSupported, setWebglSupported] = React.useState(true);

  React.useEffect(() => {
    setWebglSupported(checkWebGLSupport());
  }, []);

  const glassWidth = width / SCALE_FACTOR;
  const glassHeight = height / SCALE_FACTOR;

  // Fallback to CSS blur effect
  if (!webglSupported && fallback) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[18px]",
          "border border-white/30 shadow-[0_0_0_0.5px_rgba(0,0,0,0.1)]",
          className,
        )}
        style={{ width, height }}
      >
        <div className="absolute inset-0 bg-gray-bg-100/67 backdrop-blur-[25px]" />
        <div className="absolute inset-0 bg-dark-bg-500 mix-blend-color-dodge" />
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)} style={{ width, height }}>
      <Canvas
        className="pointer-events-none absolute inset-0"
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: "default" }}
        camera={{ position: [0, 0, 5], fov: 25 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={intensity} />
        <Environment preset="city" />
        <BackgroundCapture />
        <GlassPanel
          width={glassWidth}
          height={glassHeight}
          radius={0.18}
          thickness={0.08}
          transmission={0.97}
          roughness={0.03}
          chromaticAberration={0.01}
          distortion={0.05}
          temporalDistortion={0}
        />
      </Canvas>
      <div className="pointer-events-auto relative z-10 h-full">{children}</div>
    </div>
  );
}

export interface LiquidGlassPanelProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number | "auto";
  borderRadius?: number;
}

export function LiquidGlassPanel({
  children,
  className,
  style,
  width = 224,
  height = "auto",
  borderRadius = 18,
}: LiquidGlassPanelProps): React.ReactElement {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({ width, height: 584 });
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const updateDimensions = (): void => {
      const rect = container.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    };

    updateDimensions();
    setIsReady(true);

    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    });

    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  const glassWidth = dimensions.width / SCALE_FACTOR;
  const glassHeight = dimensions.height / SCALE_FACTOR;
  const glassRadius = borderRadius / SCALE_FACTOR;
  const radiusClass = `rounded-[${borderRadius}px]`;
  const edgeRadiusClass = `rounded-[${borderRadius + 8}px]`;

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full", radiusClass, className)}
      style={{
        width,
        ...(height !== "auto" && { height }),
        ...style,
      }}
    >
      {/* Blur edge effect */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-2",
          edgeRadiusClass,
          "bg-black/[0.03] mix-blend-hard-light blur-[12px]",
        )}
      />

      {/* Fill layers */}
      <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", radiusClass)}>
        <div className={cn("absolute inset-0 bg-dark-bg-500 mix-blend-color-dodge", radiusClass)} />
        <div className={cn("absolute inset-0 bg-gray-bg-100/67", radiusClass)} />
      </div>

      {/* 3D Glass Effect - Optimized */}
      {isReady && (
        <Canvas
          className={cn("pointer-events-none absolute inset-0 z-0", radiusClass)}
          frameloop="demand"
          gl={{ antialias: false, alpha: true, powerPreference: "default" }}
          camera={{ position: [0, 0, 5], fov: 25 }}
          dpr={[1, 1.5]}
        >
          <color attach="background" args={["transparent"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 4, 3]} intensity={0.8} />
          <Environment preset="apartment" />
          <RoundedBox args={[glassWidth, glassHeight, 0.06]} radius={glassRadius} smoothness={4}>
            <MeshTransmissionMaterial
              backside
              samples={4}
              resolution={256}
              transmission={0.92}
              roughness={0.03}
              thickness={0.4}
              ior={1.5}
              chromaticAberration={0.02}
              distortion={0.03}
              distortionScale={0.2}
              temporalDistortion={0}
              clearcoat={1}
              clearcoatRoughness={0.03}
              attenuationDistance={0.8}
              attenuationColor="#f0f0f0"
              color="#ffffff"
              toneMapped={false}
            />
          </RoundedBox>
        </Canvas>
      )}

      {/* Content */}
      <div className={cn("pointer-events-auto absolute inset-0 z-10 flex flex-col", radiusClass)}>{children}</div>
    </div>
  );
}
