import React, { useMemo } from "react";
import "./pagination.scss";

interface usePaginationProps {
  totalCount: number,
  pageSize: number,
  currentPage: number,
  siblingCount?: number,
}

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}: usePaginationProps): (number | "DOTS")[] | undefined => {
  const paginationRange: (number | "DOTS")[] | undefined = useMemo(() => {
    const range = (start: number, end: number) => {
      let length = end - start + 1;
      return Array.from({ length }, (_, index) => index + start);
    };

    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 3;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 3;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, "DOTS", totalPageCount];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {

      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, "DOTS", ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
    }

  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}

interface PaginationProps extends usePaginationProps {
  onPageChange: (numberPage: number) => void,
  className?: string,
}
export const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  siblingCount = 1,
  onPageChange,
  className,
}: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  })

  const onNext = () => {
    onPageChange(currentPage + 1);
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  }

  let lastPage = paginationRange !== undefined && paginationRange[paginationRange.length - 1];

  return (
    <div key={"pagination"} className={"pagination " + className}>
      <ul key={"buttonsList"} className="pagination__buttonsBlock">
        <li className="pagination__button pagination__button_prevButton" key="prevButton">
          {
            currentPage !== 1 && (
              <button key={"button"} type="button" onClick={onPrevious}>
                <svg key={"icon"} width="17" height="18" viewBox="0 0 17 18" fill="#000" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.1755 8.01562V9.98438H3.98801L9.56613 15.6094L8.15988 17.0156L0.144258 9L8.15988 0.984375L9.56613 2.39062L3.98801 8.01562H16.1755Z" fill="#fff" />
                </svg>
              </button>
            )
          }
        </li>
        {paginationRange && paginationRange.map((pageNumber, index) => {
          if (pageNumber === "DOTS") {
            return <li className="pagination__dots" key={index}>
              <span>
                &#8230;
              </span>
            </li>;
          }
          return (
            <li className="pagination__button" key={index}>
              <button type="button" onClick={() => onPageChange(pageNumber)} disabled={pageNumber === currentPage}>
                {pageNumber}
              </button>
            </li>
          );
        })}
        <li className="pagination__button pagination__button_nextButton" key="nextButton">
          {
            currentPage !== lastPage && (
              <button key={"button"} type="button" onClick={onNext}>
                <svg key={"icon"} width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.36301 0.984375L16.3786 9L8.36301 17.0156L6.95676 15.6094L12.5349 9.98438H0.347383V8.01562H12.5349L6.95676 2.39062L8.36301 0.984375Z" fill="#BC9CFF" />
                </svg>
              </button>
            )
          }
        </li>
      </ul>
      <div key={"explanations"} className="pagination__explanations">
        {(currentPage - 1) * pageSize + 1} - {Math.min((currentPage - 1) * pageSize + pageSize, totalCount)} из {totalCount} вариантов аренды
      </div>
    </div>
  )
}