import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useRef,
} from "react";
import Lenis from "lenis";
import "./ScrollStack.css";

interface ScrollStackItemProps {
  children: ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem = ({
  children,
  itemClassName = "",
}: ScrollStackItemProps) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

interface ScrollStackProps {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string | number;
  scaleEndPosition?: string | number;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
  disabled?: boolean;
}

type CardTransform = {
  translateY: number;
  scale: number;
  rotation: number;
  blur: number;
};

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 170,
  itemScale = 0.05,
  itemStackDistance = 30,
  stackPosition = "12%",
  scaleEndPosition = "4%",
  baseScale = 0.95,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = false,
  onStackComplete,
  disabled = false,
}: ScrollStackProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stackCompletedRef = useRef(false);
  const animationFrameRef = useRef<number>();
  const lenisRef = useRef<Lenis>();
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, CardTransform>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback(
    (scrollTop: number, start: number, end: number) => {
      if (scrollTop < start) return 0;
      if (scrollTop > end) return 1;
      if (start === end) return 1;
      return (scrollTop - start) / (end - start);
    },
    [],
  );

  const parsePercentage = useCallback(
    (value: string | number, containerHeight: number) => {
      if (typeof value === "string" && value.includes("%")) {
        return (Number.parseFloat(value) / 100) * containerHeight;
      }
      return Number.parseFloat(String(value));
    },
    [],
  );

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    }

    const scroller = scrollerRef.current;
    return {
      scrollTop: scroller?.scrollTop ?? 0,
      containerHeight: scroller?.clientHeight ?? 0,
    };
  }, [useWindowScroll]);

  const getElementOffset = useCallback(
    (element: HTMLElement) => {
      if (!useWindowScroll) return element.offsetTop;

      let offset = 0;
      let current: HTMLElement | null = element;
      while (current) {
        offset += current.offsetTop;
        current = current.offsetParent as HTMLElement | null;
      }
      return offset;
    },
    [useWindowScroll],
  );

  const updateCardTransforms = useCallback(() => {
    if (disabled || !cardsRef.current.length || isUpdatingRef.current) return;

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(
      scaleEndPosition,
      containerHeight,
    );
    const endElement = scrollerRef.current?.querySelector<HTMLElement>(
      ".scroll-stack-end",
    );
    const endElementTop = endElement ? getElementOffset(endElement) : 0;

    let topCardIndex = 0;
    if (blurAmount) {
      cardsRef.current.forEach((card, index) => {
        const cardTop = getElementOffset(card);
        const triggerStart =
          cardTop - stackPositionPx - itemStackDistance * index;
        if (scrollTop >= triggerStart) topCardIndex = index;
      });
    }

    cardsRef.current.forEach((card, index) => {
      const cardTop = getElementOffset(card);
      const triggerStart =
        cardTop - stackPositionPx - itemStackDistance * index;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinEnd = endElementTop - containerHeight / 2;
      const scaleProgress = calculateProgress(
        scrollTop,
        triggerStart,
        triggerEnd,
      );
      const targetScale = baseScale + index * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount
        ? index * rotationAmount * scaleProgress
        : 0;
      const blur =
        blurAmount && index < topCardIndex
          ? Math.max(0, (topCardIndex - index) * blurAmount)
          : 0;

      let translateY = 0;
      const isPinned = scrollTop >= triggerStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY =
          scrollTop - cardTop + stackPositionPx + itemStackDistance * index;
      } else if (scrollTop > pinEnd) {
        translateY =
          pinEnd - cardTop + stackPositionPx + itemStackDistance * index;
      }

      const nextTransform: CardTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100,
      };
      const previousTransform = lastTransformsRef.current.get(index);
      const hasChanged =
        !previousTransform ||
        Math.abs(previousTransform.translateY - nextTransform.translateY) >
          0.1 ||
        Math.abs(previousTransform.scale - nextTransform.scale) > 0.001 ||
        Math.abs(previousTransform.rotation - nextTransform.rotation) > 0.1 ||
        Math.abs(previousTransform.blur - nextTransform.blur) > 0.1;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`;
        card.style.filter =
          nextTransform.blur > 0 ? `blur(${nextTransform.blur}px)` : "";
        lastTransformsRef.current.set(index, nextTransform);
      }

      if (index === cardsRef.current.length - 1) {
        if (isPinned && !stackCompletedRef.current) {
          stackCompletedRef.current = true;
          onStackComplete?.();
        } else if (!isPinned && stackCompletedRef.current) {
          stackCompletedRef.current = false;
        }
      }
    });

    isUpdatingRef.current = false;
  }, [
    baseScale,
    blurAmount,
    calculateProgress,
    disabled,
    getElementOffset,
    getScrollData,
    itemScale,
    itemStackDistance,
    onStackComplete,
    parsePercentage,
    rotationAmount,
    scaleEndPosition,
    stackPosition,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller || disabled) return;

    const lenis = new Lenis({
      ...(useWindowScroll
        ? {}
        : {
            wrapper: scroller,
            content: scroller.querySelector<HTMLElement>(
              ".scroll-stack-inner",
            ) ?? undefined,
          }),
      duration: 1.2,
      easing: (time) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
      syncTouch: true,
      syncTouchLerp: 0.075,
    });

    lenis.on("scroll", handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
  }, [disabled, handleScroll, useWindowScroll]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(
      scroller.querySelectorAll<HTMLElement>(".scroll-stack-card"),
    );
    const transformsCache = lastTransformsRef.current;
    cardsRef.current = cards;

    cards.forEach((card, index) => {
      card.style.marginBottom =
        index < cards.length - 1 ? `${disabled ? 20 : itemDistance}px` : "0";
      card.style.willChange = disabled ? "auto" : "transform, filter";
      card.style.transformOrigin = "top center";
      card.style.backfaceVisibility = "hidden";
      card.style.transform = disabled ? "none" : "translateZ(0)";
      card.style.filter = "none";
      card.style.perspective = "1000px";
      card.style.zIndex = String(index + 1);
    });

    setupLenis();
    updateCardTransforms();
    window.addEventListener("resize", updateCardTransforms);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lenisRef.current?.destroy();
      window.removeEventListener("resize", updateCardTransforms);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [
    disabled,
    itemDistance,
    setupLenis,
    updateCardTransforms,
  ]);

  return (
    <div
      className={`scroll-stack-scroller ${className}`.trim()}
      data-window-scroll={useWindowScroll}
      data-disabled={disabled}
      ref={scrollerRef}
      style={{
        "--scroll-stack-scale-duration": `${scaleDuration}s`,
      } as CSSProperties}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  );
};

export default ScrollStack;
