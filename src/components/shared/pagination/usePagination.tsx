import { useMemo } from 'react';
import { getArrayOfNumbers } from '../../../utils/get-array-of-numbers';

type usePaginationRangeParamsType = {
  numberOfPages: number;
  numOfVisibleButtons: number;
  currentPage: number;
};

export const NUMBERS_PLACEHOLDER = '...';

export const usePaginationRange = ({
  numberOfPages,
  numOfVisibleButtons,
  currentPage,
}: usePaginationRangeParamsType) => {
  const paginationRange = useMemo(() => {
    if (numberOfPages <= numOfVisibleButtons) {
      return getArrayOfNumbers(1, numberOfPages);
    }

    const firstPageNumber = 1;
    const lastPageNumber = numberOfPages;
    const maxMiddleRangeLength = numOfVisibleButtons - 4;
    const maxSideRangeLength = numOfVisibleButtons - 3;

    const leftSideIsWithoutDots = currentPage <= firstPageNumber + 2;
    const rightSideIsWithoutDots = currentPage >= lastPageNumber - 2;
    const dotsOnBothSides = !leftSideIsWithoutDots && !rightSideIsWithoutDots;

    if (leftSideIsWithoutDots) {
      const leftRange = getArrayOfNumbers(firstPageNumber, firstPageNumber + maxSideRangeLength);
      return [...leftRange, NUMBERS_PLACEHOLDER, lastPageNumber];
    }

    if (rightSideIsWithoutDots) {
      const rightRange = getArrayOfNumbers(lastPageNumber - maxSideRangeLength, lastPageNumber);
      return [firstPageNumber, NUMBERS_PLACEHOLDER, ...rightRange];
    }

    if (dotsOnBothSides) {
      const quantityOfLeftNumbers = Math.floor((maxMiddleRangeLength - 1) / 2);
      const quantityOfRightNumbers = maxMiddleRangeLength - 1 - quantityOfLeftNumbers;

      const middleRange = getArrayOfNumbers(
        currentPage - quantityOfLeftNumbers,
        currentPage + quantityOfRightNumbers
      );
      return [
        firstPageNumber,
        NUMBERS_PLACEHOLDER,
        ...middleRange,
        NUMBERS_PLACEHOLDER,
        lastPageNumber,
      ];
    }
  }, [numberOfPages, numOfVisibleButtons, currentPage]);

  return paginationRange;
};