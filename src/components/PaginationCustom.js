import React from "react";
import Pagination from 'react-bootstrap/Pagination'

const PaginationCustom = (props) => {
  let pages = [];
  for (let number = props.pageNumber; number <= props.pageNumber + 4; number++) {
    if (number >= props.data.total_pages + 1) {break}
    pages.push(
      // <Pagination.Item key={number} active={number === pageNumber} onClick={handlePagination}>
      <Pagination.Item key={number} onClick={e => props.setPageNumber(Number(e.target.textContent))}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>        
      { props.pageNumber === 1 ? '' :
        <>
          <Pagination.First onClick={() => props.setPageNumber(1)} />
          <Pagination.Prev onClick={() => props.setPageNumber(props.pageNumber - 1)} />
        </>
      }
        {pages}
      { props.pageNumber >= props.data.total_pages ? '' :
        <>
          <Pagination.Next onClick={() => props.setPageNumber(props.pageNumber + 1)} />
          <Pagination.Last onClick={() => props.setPageNumber(props.data.total_pages)}/>
        </>
      }
    </Pagination>
)}

export default PaginationCustom