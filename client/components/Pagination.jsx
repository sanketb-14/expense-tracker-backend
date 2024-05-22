import React, { useState, useEffect } from "react";
import { useTrans } from "../contexts/TransactionsContext";
import Loader from "./Loader";

const Pagination = () => {
  const { isLoading, fetchTransactions, paginationData } = useTrans();
  const { currentPage, totalPages } = paginationData;
  const [page, setPage] = useState(currentPage);

  if (isLoading) return <Loader />;

  useEffect(() => {
    if (page !== currentPage) {
      fetchTransactions(page);
    }
  }, [page, fetchTransactions, currentPage]);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleClick = (pageNum) => {
    setPage(pageNum);
  };
  return (
    <div className="join">
      {pages.map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => handleClick(pageNum)}
          className="join-item btn "
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
