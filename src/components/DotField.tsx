import { memo, useEffect, useId, useRef, type HTMLAttributes } from "react";

const TWO_PI = Math.PI * 2;

interface Dot {
  ax: number;
  ay: number;
  sx: number;
  sy: number;
  vx: number;
  vy: number;
  x: number;
  y: number;
}

interface DotFieldProps extends HTMLAttributes<HTMLDivElement> {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

// Adapted from React Bits' Dot Field background.
const DotField = memo(
  ({
    dotRadius = 1.5,
    dotSpacing = 14,
    cursorRadius = 500,
    cursorForce = 0.1,
    bulgeOnly = true,
    bulgeStrength = 67,
    glowRadius = 160,
    sparkle = false,
    waveAmplitude = 0,
    gradientFrom = "rgba(37, 99, 235, 0.34)",
    gradientTo = "rgba(14, 165, 233, 0.18)",
    glowColor = "rgba(239, 246, 255, 0.78)",
    className,
    ...rest
  }: DotFieldProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const glowRef = useRef<SVGCircleElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const mouseRef = useRef({ x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 });
    const rafRef = useRef<number | null>(null);
    const sizeRef = useRef({ w: 0, h: 0, offsetX: 0, offsetY: 0 });
    const glowOpacityRef = useRef(0);
    const engagementRef = useRef(0);
    const rebuildRef = useRef<(() => void) | null>(null);
    const propsRef = useRef({
      dotRadius,
      dotSpacing,
      cursorRadius,
      cursorForce,
      bulgeOnly,
      bulgeStrength,
      sparkle,
      waveAmplitude,
      gradientFrom,
      gradientTo,
    });
    const glowId = `dot-field-glow-${useId().replace(/:/g, "")}`;

    propsRef.current = {
      dotRadius,
      dotSpacing,
      cursorRadius,
      cursorForce,
      bulgeOnly,
      bulgeStrength,
      sparkle,
      waveAmplitude,
      gradientFrom,
      gradientTo,
    };

    useEffect(() => {
      const canvas = canvasRef.current;
      const glow = glowRef.current;
      if (!canvas) return;

      const context = canvas.getContext("2d", { alpha: true });
      if (!context) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let resizeTimer: ReturnType<typeof setTimeout>;
      let frameCount = 0;
      let isVisible = true;

      const buildDots = (width: number, height: number) => {
        const { dotRadius: radius, dotSpacing: spacing } = propsRef.current;
        const step = radius + spacing;
        const columns = Math.floor(width / step);
        const rows = Math.floor(height / step);
        const paddingX = (width % step) / 2;
        const paddingY = (height % step) / 2;
        const dots: Dot[] = new Array(rows * columns);
        let index = 0;

        for (let row = 0; row < rows; row += 1) {
          for (let column = 0; column < columns; column += 1) {
            const ax = paddingX + column * step + step / 2;
            const ay = paddingY + row * step + step / 2;
            dots[index] = { ax, ay, sx: ax, sy: ay, vx: 0, vy: 0, x: ax, y: ay };
            index += 1;
          }
        }

        dotsRef.current = dots;
      };

      const draw = () => {
        frameCount += 1;
        const dots = dotsRef.current;
        const mouse = mouseRef.current;
        const { w, h } = sizeRef.current;
        const props = propsRef.current;
        const time = frameCount * 0.02;

        const targetEngagement = reducedMotion ? 0 : Math.min(mouse.speed / 5, 1);
        engagementRef.current += (targetEngagement - engagementRef.current) * 0.06;
        if (engagementRef.current < 0.001) engagementRef.current = 0;

        const engagement = engagementRef.current;
        glowOpacityRef.current += (engagement - glowOpacityRef.current) * 0.08;

        if (glow) {
          glow.setAttribute("cx", String(mouse.x));
          glow.setAttribute("cy", String(mouse.y));
          glow.style.opacity = String(glowOpacityRef.current);
        }

        context.clearRect(0, 0, w, h);
        const gradient = context.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, props.gradientFrom);
        gradient.addColorStop(1, props.gradientTo);
        context.fillStyle = gradient;
        context.beginPath();

        const cursorRadiusSquared = props.cursorRadius * props.cursorRadius;
        const radius = props.dotRadius / 2;

        for (let index = 0; index < dots.length; index += 1) {
          const dot = dots[index];
          const deltaX = mouse.x - dot.ax;
          const deltaY = mouse.y - dot.ay;
          const distanceSquared = deltaX * deltaX + deltaY * deltaY;

          if (distanceSquared < cursorRadiusSquared && engagement > 0.01) {
            const distance = Math.max(Math.sqrt(distanceSquared), 0.01);
            const angle = Math.atan2(deltaY, deltaX);

            if (props.bulgeOnly) {
              const proximity = 1 - distance / props.cursorRadius;
              const push = proximity * proximity * props.bulgeStrength * engagement;
              dot.sx += (dot.ax - Math.cos(angle) * push - dot.sx) * 0.15;
              dot.sy += (dot.ay - Math.sin(angle) * push - dot.sy) * 0.15;
            } else {
              const move = (500 / distance) * (mouse.speed * props.cursorForce);
              dot.vx -= Math.cos(angle) * move;
              dot.vy -= Math.sin(angle) * move;
            }
          } else if (props.bulgeOnly) {
            dot.sx += (dot.ax - dot.sx) * 0.1;
            dot.sy += (dot.ay - dot.sy) * 0.1;
          }

          if (!props.bulgeOnly) {
            dot.vx *= 0.9;
            dot.vy *= 0.9;
            dot.x = dot.ax + dot.vx;
            dot.y = dot.ay + dot.vy;
            dot.sx += (dot.x - dot.sx) * 0.1;
            dot.sy += (dot.y - dot.sy) * 0.1;
          }

          let drawX = dot.sx;
          let drawY = dot.sy;
          if (props.waveAmplitude > 0) {
            drawY += Math.sin(dot.ax * 0.03 + time) * props.waveAmplitude;
            drawX += Math.cos(dot.ay * 0.03 + time * 0.7) * props.waveAmplitude * 0.5;
          }

          const sparkles = props.sparkle && (((index * 2654435761) ^ (frameCount >> 3)) >>> 0) % 100 < 3;
          const renderedRadius = sparkles ? radius * 1.8 : radius;
          context.moveTo(drawX + renderedRadius, drawY);
          context.arc(drawX, drawY, renderedRadius, 0, TWO_PI);
        }

        context.fill();

        if (!reducedMotion && isVisible) {
          rafRef.current = requestAnimationFrame(draw);
        }
      };

      const resize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          const parent = canvas.parentElement;
          if (!parent) return;

          const rect = parent.getBoundingClientRect();
          canvas.width = rect.width * dpr;
          canvas.height = rect.height * dpr;
          canvas.style.width = `${rect.width}px`;
          canvas.style.height = `${rect.height}px`;
          context.setTransform(dpr, 0, 0, dpr, 0, 0);
          sizeRef.current = {
            w: rect.width,
            h: rect.height,
            offsetX: rect.left + window.scrollX,
            offsetY: rect.top + window.scrollY,
          };
          buildDots(rect.width, rect.height);

          if (reducedMotion) draw();
        }, 100);
      };

      const handlePointerMove = (event: PointerEvent) => {
        const size = sizeRef.current;
        mouseRef.current.x = event.pageX - size.offsetX;
        mouseRef.current.y = event.pageY - size.offsetY;
      };

      const updatePointerSpeed = () => {
        const mouse = mouseRef.current;
        const deltaX = mouse.prevX - mouse.x;
        const deltaY = mouse.prevY - mouse.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        mouse.speed += (distance - mouse.speed) * 0.5;
        if (mouse.speed < 0.001) mouse.speed = 0;
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
      };

      const speedInterval = reducedMotion ? undefined : window.setInterval(updatePointerSpeed, 20);
      const observer = new IntersectionObserver(([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !reducedMotion) {
          rafRef.current = requestAnimationFrame(draw);
        } else if (!isVisible && rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      });

      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        sizeRef.current = {
          w: rect.width,
          h: rect.height,
          offsetX: rect.left + window.scrollX,
          offsetY: rect.top + window.scrollY,
        };
        buildDots(rect.width, rect.height);
      }

      observer.observe(canvas);
      window.addEventListener("resize", resize);
      if (!reducedMotion) window.addEventListener("pointermove", handlePointerMove, { passive: true });
      draw();

      rebuildRef.current = () => {
        const { w, h } = sizeRef.current;
        if (w > 0 && h > 0) buildDots(w, h);
      };

      return () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        if (speedInterval !== undefined) clearInterval(speedInterval);
        clearTimeout(resizeTimer);
        observer.disconnect();
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", handlePointerMove);
      };
    }, []);

    useEffect(() => {
      rebuildRef.current?.();
    }, [dotRadius, dotSpacing]);

    return (
      <div
        aria-hidden="true"
        className={`h-full w-full ${className ?? "relative"}`}
        {...rest}
      >
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          <defs>
            <radialGradient id={glowId}>
              <stop offset="0%" stopColor={glowColor} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <circle
            ref={glowRef}
            cx="-9999"
            cy="-9999"
            r={glowRadius}
            fill={`url(#${glowId})`}
            style={{ opacity: 0, willChange: "opacity" }}
          />
        </svg>
      </div>
    );
  },
);

DotField.displayName = "DotField";

export default DotField;
