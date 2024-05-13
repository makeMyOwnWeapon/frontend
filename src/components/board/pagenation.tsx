import React from 'react';
import { PageItem, PaginationContainer } from '../../styles/WorkBook';

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map(number => (
        <PageItem key={number} isactive={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </PageItem>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
