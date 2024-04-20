import './SignUpForm.css';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
axios.defaults.withCredentials = true;

export default function SignUpForm() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState('');

	const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
		setSubmitted(false);
	};

	const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		if (email === '' || password === '') {
			setError('Please enter all of the fields');
			return;
		}

		try {
			const response = await axios.post('http://localhost:2346/users', {
				email, username, password
			});

			console.log(response);
		} catch (error) {
			console.error(error);

			const axiosError = error as AxiosError;
			const responseData = axiosError.response?.data as any;
			let errorMessage = (error as AxiosError).message;
			
			if (responseData?.value) {
				errorMessage = responseData?.value;
			}

			setSubmitted(false);
			setError(errorMessage);

			return;
		}

		setSubmitted(true);
		setError('');
	}

    const successMessage = () => { 
        return ( 
            <div 
                className='success'
                style={{ 
                    display: submitted ? '' : 'none', 
                }} 
            > 
                <h1>Successfully registered!</h1> 
            </div> 
        ); 
    }; 
  
    const errorMessage = () => { 
        return ( 
            <div 
                className='error'
                style={{ 
                    display: error ? '' : 'none', 
                }} 
            > 
                <h1>{error}</h1> 
            </div> 
        ); 
    };

	return (
		<div id='SignUpForm'>
			<div>
				<h1>User Registration</h1>
			</div>

			<div className='messages'>
				{errorMessage()}
				{successMessage()}
			</div>

			<form action='POST'>
				<label className='label'>Email</label>
				<input onChange={handleEmail} className='input' value={email} type='email' />

				<label className='label'>Username</label>
				<input onChange={handleUsername} className='input' value={username} type='text' />

				<label className='label'>Password</label>
				<input onChange={handlePassword} className='input' value={password} type='password' />

				<button onClick={handleSubmit} className='button' type='submit'>Submit</button>
			</form>
		</div>
	);
}