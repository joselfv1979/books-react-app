import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginForm from '../../components/LoginForm';

describe('login-form', () => {
    const login = jest.fn();

    const renderLogin = () => {
        render(
            <BrowserRouter>
                <LoginForm loginUser={login} />
            </BrowserRouter>,
        );
    };

    beforeEach(() => renderLogin());
    it('renders login form', () => {
        const loginForm = screen.getByTestId('login-form');

        expect(loginForm).toBeInTheDocument();
    });

    it('should display a blank login form', () => {
        const loginForm = screen.getByTestId('login-form');

        expect(loginForm).toHaveFormValues({
            username: '',
            password: '',
        });
    });

    it('renders empty inputs', () => {
        const inputUsername = screen.getByLabelText('Username') as HTMLInputElement;
        const inputPassword = screen.getByLabelText('Password') as HTMLInputElement;

        expect(inputUsername).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();

        expect(inputUsername.value).toBe('');
        expect(inputPassword.value).toBe('');
    });

    it('should allow entering username and password', () => {
        const inputUsername = screen.getByLabelText('Username') as HTMLInputElement;
        const inputPassword = screen.getByLabelText('Password') as HTMLInputElement;

        userEvent.type(inputUsername, 'jose');
        userEvent.type(inputPassword, '1234');

        expect(inputUsername.value).toBe('jose');
        expect(inputPassword.value).toBe('1234');
    });

    it('calls login function with typed values', () => {
        const inputUsername = screen.getByLabelText('Username') as HTMLInputElement;
        const inputPassword = screen.getByLabelText('Password') as HTMLInputElement;

        userEvent.type(inputUsername, 'jose');
        userEvent.type(inputPassword, '1234');

        const submitButton = screen.getByRole('button', { name: 'Submit' });
        // const loginButton = screen.getByText('Submit');
        userEvent.click(submitButton);

        expect(login).toHaveBeenCalledWith({ username: 'jose', password: '1234' });
    });
});
