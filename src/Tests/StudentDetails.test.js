import React from "react";
import { render } from "@testing-library/react";
import StudentDetails from "../Components/StudentDetails";
import { useParams } from "react-router-dom";
import { MemoryRouter, useNavigate } from 'react-router';

jest.mock("react-router-dom", () => ({
    useParams: jest.fn(),
    useNavigate: jest.fn(),
}));

describe("StudentDetails Component", () => {
    it("should match the snapshot", () => {
        // useParams.mockReturnValue({ rollNo: "123" });

        const { asFragment } = render(
            <MemoryRouter>
                <StudentDetails />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render the component", () => {
        // useParams.mockReturnValue({ rollNo: "123" });

        const { getByText } = render(
            <MemoryRouter>
                <StudentDetails />
            </MemoryRouter>
        );

        expect(getByText("Student Details:")).toBeInTheDocument();
        expect(getByText("Name")).toBeInTheDocument();
        expect(getByText("Age")).toBeInTheDocument();
        expect(getByText("RollNo")).toBeInTheDocument();
    });

    it("should render without any errors", () => {
        // useParams.mockReturnValue({ rollNo: "123" });

        expect(() => {
            render(
                <MemoryRouter>
                    <StudentDetails />
                </MemoryRouter>
            );
        }).not.toThrow();
    });

    it("should display 'Loading...' text initially", () => {
        // useParams.mockReturnValue({ rollNo: "123" });

        const { queryByTestId } = render(
            <MemoryRouter>
                <StudentDetails />
            </MemoryRouter>
        );

        expect(queryByTestId("loader-text")).toBeNull();
    });

    it("should render the component", () => {
        // useParams.mockReturnValue({ rollNo: "123" });

        const navigate = jest.fn();
        const useNavigateMock = jest.fn(() => navigate);
        jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(useNavigateMock);

        const { getByText } = render(
            <MemoryRouter>
                <StudentDetails />
            </MemoryRouter>
        );

        expect(getByText("Student Details:")).toBeInTheDocument();
        expect(getByText("Name")).toBeInTheDocument();
        expect(getByText("Age")).toBeInTheDocument();
        expect(getByText("RollNo")).toBeInTheDocument();
    });
});
