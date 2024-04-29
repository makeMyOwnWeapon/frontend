import React from 'react';
import { PageItem, PaginationContainer } from '../../styles/WorkBook';


type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

// 페이지네이션 컴포넌트
const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map(number => (
        <PageItem key={number} isActive={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </PageItem>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
