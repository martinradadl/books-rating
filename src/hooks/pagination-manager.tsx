import { useCallback, useEffect, useState } from "react";
import { sequentialRange } from "../helpers/utils";
import { useIsDesktop } from "./is-desktop";

export const usePaginationManager = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isRequestingNextPage, setIsRequestingNextPage] = useState(false);
  const [loadSkeleton, setLoadSkeleton] = useState(false);
  const [isViewportSwitching, setIsViewportSwitching] = useState(false);
  const isDesktop = useIsDesktop();

  const pagesShown = useCallback(
    ({
      basePagesCount = 6,
      middlePagesCountBySide = 2,
      totalPages,
    }: {
      basePagesCount?: number;
      middlePagesCountBySide?: number;
      totalPages: number;
    }) => {
      if (totalPages <= basePagesCount + 2) {
        return sequentialRange(1, totalPages);
      }

      // Near the start
      if (currentPage < basePagesCount) {
        return [
          ...sequentialRange(1, basePagesCount),
          totalPages - 1,
          totalPages,
        ];
      }

      // Near the end
      if (currentPage > totalPages - basePagesCount + 1) {
        return [
          1,
          2,
          ...sequentialRange(totalPages - basePagesCount + 1, totalPages),
        ];
      }

      // Middle
      const pages = [
        1,
        2,
        ...sequentialRange(
          currentPage - middlePagesCountBySide,
          currentPage + middlePagesCountBySide
        ),
        totalPages - 1,
        totalPages,
      ];

      // Remove duplicates
      return [...new Set(pages)];
    },
    [currentPage]
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
      if (isDesktop) {
        setLoadSkeleton(true);
      }
    }
  };

  const handleNextPage = (totalPages: number) => {
    if (currentPage < totalPages) {
      setIsRequestingNextPage(true);
      setCurrentPage((prev) => prev + 1);
      if (isDesktop) {
        setLoadSkeleton(true);
      }
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
    if (isDesktop) {
      setLoadSkeleton(true);
    }
  };

  useEffect(() => {
    setIsViewportSwitching(true);
    setCurrentPage(1);
  }, [isDesktop]);

  return {
    currentPage,
    isRequestingNextPage,
    setIsRequestingNextPage,
    loadSkeleton,
    setLoadSkeleton,
    isViewportSwitching,
    setIsViewportSwitching,
    pagesShown,
    handlePreviousPage,
    handleNextPage,
    handleChangePage,
    isDesktop,
  };
};
