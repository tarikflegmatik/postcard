import { useEffect, useState, RefObject } from "react";

/**
 * Manages carousel index and scrolling behavior for desktop and thumbnail lists.
 * @param length Number of items in the carousel
 * @param carouselRef Ref to the main carousel container
 * @param listRef Ref to the thumbnail list container
 * @param resetTrigger Optional value (e.g. location ID) that also resets the index when it changes
 */
export const useCarousel = (
  length: number,
  carouselRef: RefObject<HTMLDivElement | null>,
  listRef: RefObject<HTMLDivElement | null>,
  resetTrigger?: unknown,
) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Reset to first slide when resetTrigger changes (e.g., on location change)
  useEffect(() => {
    setActiveIndex(0);
  }, [resetTrigger]);

  // Update active index on user scroll
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const updateIndex = () => {
      const scrollLeft = container.scrollLeft;
      // dynamically read CSS gap between items
      const style = window.getComputedStyle(container);
      const gapValue =
        style.getPropertyValue("gap") || style.getPropertyValue("column-gap");
      const gap = parseFloat(gapValue) || 0;
      const item = container.children[0] as HTMLElement;
      const itemWidth = item.clientWidth + gap;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.max(0, Math.min(length - 1, newIndex)));
    };

    const onScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateIndex, 100);
    };

    container.addEventListener("scroll", onScroll);
    return () => {
      clearTimeout(scrollTimeout);
      container.removeEventListener("scroll", onScroll);
    };
  }, [length, carouselRef]);

  // Scroll carousel and thumbnail into view when index changes
  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      container.scrollTo({
        left: container.clientWidth * activeIndex,
        behavior: "smooth",
      });
    }
    const list = listRef.current;
    if (list) {
      const items = list.children;
      if (items[activeIndex]) {
        (items[activeIndex] as HTMLElement).scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }
  }, [activeIndex, carouselRef, listRef]);

  // Setter that clamps between 0 and length-1
  const setIndex = (index: number) => {
    setActiveIndex(Math.max(0, Math.min(length - 1, index)));
  };

  return { activeIndex, setActiveIndex: setIndex };
};
