import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import StudentDetails from "../Components/StudentDetails";
import { createMemoryHistory } from "history";
import { useParams } from "react-router-dom";
import { MemoryRouter, Router, useNavigate } from 'react-router';
import { getStudentDetails } from "../Service/FrontEndService";

jest.mock("react-router", () => ({
    ...jest.requireActual("react-router"),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
}));

jest.mock('../Service/FrontEndService', () => ({
    getStudentDetails: jest.fn(),
}));

const API_URL = 'http://localhost:4000/students';

global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(API_URL)
}));

describe("StudentDetails Component", () => {
    beforeEach(() => {
        getStudentDetails.mockClear();
    });

    it("should render and give student details", () => {
        const mockStudentDetails = { name: 'Ram', age: 20, rollNo: "123" };
        getStudentDetails.mockResolvedValue(mockStudentDetails);

        useParams.mockReturnValue({ rollNo: "123" });

        const { asFragment } = render(
            <MemoryRouter>
                <StudentDetails />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();

        expect(screen.getByTestId('student-details')).toBeInTheDocument();
        expect(screen.getByTestId('name')).toBeDefined();
        expect(screen.getByTestId('age')).toBeDefined();
        expect(screen.getByTestId('rollNo')).toBeDefined();
    });
});








// it("should render the component", () => {
//     useParams.mockReturnValue({ rollNo: "123" });

//     const { getByText } = render(
//         <MemoryRouter>
//             <StudentDetails />
//         </MemoryRouter>
//     );

//     expect(getByText("Student Details:")).toBeInTheDocument();
//     expect(getByText("Name")).toBeInTheDocument();
//     expect(getByText("Age")).toBeInTheDocument();
//     expect(getByText("RollNo")).toBeInTheDocument();
// });

// it("should render without any errors", () => {
//     useParams.mockReturnValue({ rollNo: "123" });

//     expect(() => {
//         render(
//             <MemoryRouter>
//                 <StudentDetails />
//             </MemoryRouter>
//         );
//     }).not.toThrow();
// });

// it("should display 'Loading...' text initially", () => {
//     useParams.mockReturnValue({ rollNo: "123" });

//     const { queryByTestId } = render(
//         <MemoryRouter>
//             <StudentDetails />
//         </MemoryRouter>
//     );

//     expect(queryByTestId("loader-text")).toBeNull();
// });

// it("should show student details", () => {
//     useParams.mockReturnValue({ rollNo: "123" });

//     const navigate = jest.fn();
//     const useNavigateMock = jest.fn(() => navigate);
//     jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(useNavigateMock);

//     const { getByText } = render(
//         <MemoryRouter>
//             <StudentDetails />
//         </MemoryRouter>
//     );

//     expect(getByText("Student Details:")).toBeInTheDocument();
//     expect(getByText("Name")).toBeInTheDocument();
//     expect(getByText("Age")).toBeInTheDocument();
//     expect(getByText("RollNo")).toBeInTheDocument();
// });

// it("should navigate back to home page when GoBack button is clicked", () => {
//     const navigate = jest.fn();
//     useNavigate.mockReturnValue(navigate);
//     useParams.mockReturnValue({ rollNo: "123" });

//     const history = createMemoryHistory();
//     console.log("history:::", history);

//     render(
//         <Router history={history}>
//             <StudentDetails />
//         </Router>
//     );

//     const goBackButton = screen.getByTestId("student-details-go-back-btn");
//     fireEvent.click(goBackButton);

//     expect(navigate).toHaveBeenCalledWith("/");
//     expect(history.location.pathname).toBe("/");
// });
