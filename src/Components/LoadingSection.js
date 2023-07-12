import React, { useState, useEffect } from "react";
import './LoadingSection.css'

function LoadingSection() {
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoadingData(false);
        }, 3000);
    }, []);

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