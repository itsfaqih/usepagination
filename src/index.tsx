import { useEffect, useState } from 'react';

export interface PaginationResult<T> {
  page: {
    data: T[];
    numbers: (string | number)[];
    current: number | null;
    next: number | null;
    previous: number | null;
    last: number;
  };
  action: {
    next: () => void;
    previous: () => void;
    goTo: (pageNumber: number) => void;
  };
}

/**
 * Returns page and action object for pagination.
 * @param {Array} initialData - The array of the data to be paginated.
 * @param {number} perPage - Number of data to be shown.
 * @param {number} shownPageNumber - Amount of number to be shown in pagination button.
 */
export default function usePagination<T>(
  initialData: T[] = [],
  perPage: number = 6,
  shownPageNumber: number = 5
): PaginationResult<T> {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);

  const maxPageNumber = Math.ceil(initialData.length / perPage);
  const nextPageNumber = currentPage === maxPageNumber ? null : currentPage + 1;
  const previousPageNumber = currentPage <= 1 ? null : currentPage - 1;

  const pageNumbers: (number | string)[] = [];

  if (maxPageNumber <= shownPageNumber) {
    pageNumbers.push(...Array.from({ length: maxPageNumber }, (_, i) => i + 1));
  } else {
    let startNumber = currentPage - Math.floor(shownPageNumber / 2);
    if (maxPageNumber - Math.floor(shownPageNumber / 2) <= currentPage) {
      startNumber = maxPageNumber - shownPageNumber + 1;
    }

    if (currentPage - Math.floor(shownPageNumber / 2) > 1) {
      pageNumbers.push('...');
      pageNumbers.push(...Array.from({ length: shownPageNumber }, () => startNumber++));
    } else {
      pageNumbers.push(...Array.from({ length: shownPageNumber }, (_, i) => i + 1));
    }
    if (maxPageNumber - currentPage > Math.floor(shownPageNumber / 2)) {
      pageNumbers.push('...');
    }
  }

  useEffect(() => {
    setData(initialData.slice((currentPage - 1) * perPage, currentPage * perPage));
  }, [initialData, perPage, currentPage]);

  const nextPage = () => {
    if (currentPage !== maxPageNumber) {
      setCurrentPage(current => current + 1);
    }
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(current => current - 1);
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber !== currentPage && typeof pageNumber === 'number') {
      setCurrentPage(pageNumber);
    }
  };

  return {
    page: {
      data,
      numbers: pageNumbers,
      current: initialData.length === 0 ? null : currentPage,
      next: initialData.length === 0 ? null : nextPageNumber,
      previous: initialData.length === 0 ? null : previousPageNumber,
      last: maxPageNumber,
    },
    action: {
      next: nextPage,
      previous: previousPage,
      goTo: goToPage,
    },
  };
}
