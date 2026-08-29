type DesktopCarouselLayout = {
  offset: number;
  runway: number;
};

type DesktopCarouselLayoutInput = {
  rowTop: number;
  rowHeight: number;
  trackTop: number;
  trackHeight: number;
  carouselHeight: number;
  navbarBottom: number;
  viewportHeight: number;
  lastRowHeight: number;
  isLastRowActive: boolean;
  boundaryBottom: number;
  margin?: number;
};

export const calculateDesktopCarouselLayout = ({
  rowTop,
  rowHeight,
  trackTop,
  trackHeight,
  carouselHeight,
  navbarBottom,
  viewportHeight,
  lastRowHeight,
  isLastRowActive,
  boundaryBottom,
  margin = 16,
}: DesktopCarouselLayoutInput): DesktopCarouselLayout => {
  const desiredTop = rowTop + rowHeight / 2 - carouselHeight / 2;
  const minimumTop = Math.max(navbarBottom, trackTop) + margin;
  const maximumTop =
    Math.min(viewportHeight, trackTop + trackHeight, boundaryBottom) -
    carouselHeight -
    margin;
  const alignedTop =
    maximumTop < minimumTop
      ? maximumTop
      : Math.min(maximumTop, Math.max(minimumTop, desiredTop));

  return {
    offset: Math.round(alignedTop - trackTop),
    runway: isLastRowActive
      ? Math.max(
          0,
          Math.ceil((carouselHeight - lastRowHeight) / 2 + margin)
        )
      : 0,
  };
};
