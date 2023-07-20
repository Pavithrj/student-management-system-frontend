import React from "react";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from 'react-redux';
import { setPageSize, setCurrentPage } from '../redux/actions/studentsActions';

function PaginationSection() {
    const { pageSize, currentPage, totalPages, pageNumbers } = useSelector((state) => state.students);
    const dispatch = useDispatch();

    const goToPreviousPage = () => {
        goToPage(currentPage - 1);
    };

    const goToNextPage = () => {
        goToPage(currentPage + 1);
    };

    const goToPage = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
    };

    const handlePageSizeChange = (event) => {
        const selectedPageSize = parseInt(event.target.value);
        dispatch(setPageSize(selectedPageSize));
        dispatch(setCurrentPage(1));
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