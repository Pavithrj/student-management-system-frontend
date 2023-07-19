import React from "react";
import { render } from "@testing-library/react";
import StudentList from "../Components/StudentList";
import { useParams } from "react-router-dom";
import { MemoryRouter, useNavigate } from 'react-router';

jest.mock("react-router-dom", () => ({
    useParams: jest.fn(),
    useNavigate: jest.fn(),
}));

describe("StudentList Component", () => {
    it("should match the snapshot", () => {
        const { asFragment } = render(
            <MemoryRouter>
                <StudentList />
            </MemoryRouter>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});