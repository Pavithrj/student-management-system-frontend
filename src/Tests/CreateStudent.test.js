import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../Service/FrontEndService';
import CreateStudent from '../Components/CreateStudent';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../Service/FrontEndService', () => ({
    createStudent: jest.fn(),
}));

describe('CreateStudent Component', () => {
    beforeEach(() => {
        useNavigate.mockClear();
        createStudent.mockClear();
    });

    it('should render the component', () => {
        const { asFragment } = render(<CreateStudent />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should navigate back to home page when GoBack button is clicked', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);

        render(<CreateStudent />);

        const goBackButton = screen.getByTestId('goBackButton');
        fireEvent.click(goBackButton);

        expect(navigate).toHaveBeenCalledWith('/');
    });

    it('should submit the created student when Done button is clicked', async () => {
        const navigate = jest.fn();
        useNavigate.mockImplementation(() => navigate);

        render(<CreateStudent />);

        const nameInput = screen.getByLabelText('Name:');
        const ageInput = screen.getByLabelText('Age:');
        const rollNoInput = screen.getByLabelText('RollNo:');

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(ageInput, { target: { value: '25' } });
        fireEvent.change(rollNoInput, { target: { value: '123' } });

        const doneButton = screen.getByTestId('doneButton');
        fireEvent.click(doneButton);

        expect(createStudent).toHaveBeenCalledWith({
            name: 'John Doe',
            age: '25',
            rollNo: '123',
        });

        await screen.findByText('Create Student:');

        expect(navigate).toHaveBeenCalledWith('/', { state: { isSuccessful: true } });
    });

    it('should display error message when createStudent function throws an error', async () => {
        const errorMessage = 'Failed to create student';
        createStudent.mockRejectedValueOnce(new Error(errorMessage));

        render(<CreateStudent />);

        const doneButton = screen.getByTestId('doneButton');
        fireEvent.click(doneButton);

        await screen.findByText(errorMessage, {}, { timeout: 3000 });

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
});