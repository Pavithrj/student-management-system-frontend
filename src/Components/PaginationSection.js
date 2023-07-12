import React, { useState } from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function PaginationSection({ currentPage, totalPages, pageNumbers, goToPage }) {
    const [pageSize, setPageSize] = useState(5);

    const handlePageSizeChange = (event) => {
        const selectedPageSize = parseInt(event.target.value);
        setPageSize(selectedPageSize);
        goToPage(1);
    };

    const goToPreviousPage = () => {
        goToPage(currentPage - 1);
    };

    const goToNextPage = () => {
        goToPage(currentPage + 1);
    };

    return (
        <div className="pagination-section">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                <NavigateBeforeIcon />
            </button>
            {pageNumbers.map((page) => (
                <div
                    key={page}
                    className={`page-number ${currentPage === page ? "active" : ""}`}
                    onClick={() => goToPage(page)}
                >
                    {page}
                </div>
            ))}
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                <NavigateNextIcon />
            </button>
            <select value={pageSize} onChange={handlePageSizeChange}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
                <option value="30">30</option>
            </select>
        </div>
    );
}

export default PaginationSection;
