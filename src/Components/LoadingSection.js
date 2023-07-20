import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './LoadingSection.css';
import { setIsLoadingData } from "../redux/actions/studentsActions";

function LoadingSection() {
    const { isLoadingData } = useSelector((state) => state.students);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(setIsLoadingData(false));
        }, 3000);
    }, [dispatch]);

    return (
        <div>
            {isLoadingData ? (
                <div className="student-list-loader-section">
                    <span className="student-list-loading-text">Loading...</span>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default LoadingSection;