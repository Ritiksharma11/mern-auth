import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils'

const Signup = () => {
    const [signUpInfo, setSignUpInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copysignupInInfo = { ...signUpInfo };
        copysignupInInfo[name] = value;
        setSignUpInfo(copysignupInInfo);
    }

    console.log(signUpInfo);

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, email, password } = signUpInfo;
        if (!name || !email || !password) {
            return handleError("All fields are required");
        }

        try {
            const url = "http://localhost:8080/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(signUpInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 5000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }


        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className='container'>
            <h1>SignUp</h1>
            <form onSubmit={handleSignUp}>
                <div>
                    <label htmlFor="name">Name </label>
                    <input type="text" name='name'
                        placeholder='Enter your name...'
                        onChange={handleChange} value={signUpInfo.name}
                    />
                </div> <br />

                <div>
                    <label htmlFor="email">Email </label>
                    <input type="email" name='email'
                        placeholder='Enter your Email...'
                        onChange={handleChange} value={signUpInfo.email}
                    />
                </div> <br />

                <div>
                    <label htmlFor="password">Password </label>
                    <input type="password" name='password'
                        placeholder='Enter your password...'
                        onChange={handleChange} value={signUpInfo.password}
                    />
                </div> <br /> <br />

                <button type='submit'>Signup</button> <br /> <br />
                <span>Already have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>

            <ToastContainer />
        </div>
    )
}

export default Signup