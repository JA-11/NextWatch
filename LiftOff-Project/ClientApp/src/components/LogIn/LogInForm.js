import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Button from 'react-bootstrap/Button';
import css from './LogInForm.module.css';
import { useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email("Please enter your email address").required("Please enter your email address"),
    password: yup.string().required("Please enter your password"),
});

export function LogInForm() {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: "onBlur",
    });

    const navigate = useNavigate(); //For navigating to the user profile page.

    const [email, setEmail] = useState(""); //Setting the email entered in the textbox
    const [password, setPassword] = useState(""); //Setting the password entered in password textbox.

    const submitLogInForm = () => {

        fetch(`login/${email}`, {  //this is fetching from the Login API controller to pull a specific user for the email entered
            method: 'GET',
            headers: { 'Content-type': 'application/json' },

        }).then(r => r.json()).then(res => {

            if (res) {
                if (res.length > 0) {
                    //This checks if the password entered matches the password for that email in the database
                    if (res[0]['password'] === password) {
                        window.user = res[0]['userName'];  // If yes, store the username in a window variable to pass to user profile page.
                        window.userid = res[0]['id'];  //If yes, store the id in a window variable to pass to user profile page.
                        navigate('/user-profile');
                    } else {
                        alert("We couldn't log you in. Please check your email and password and try again.");
                    }
                } else {
                    alert("We couldn't log you in. Please check your email and password and try again.");
                }
            }
        })
    };

    return (
        <div>
            <form className={css.error} onSubmit={handleSubmit(submitLogInForm)}>
                <div>
                    <input className={css.input} type="email" name="email" placeholder="Email" {...register("email", { onChange: (e) => { setEmail(e.target.value) } })} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div>
                    <input className={css.input} type="password" name="password" placeholder="Password" {...register("password", { onChange: (e) => { setPassword(e.target.value) } })} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div className="text-center">
                    <Button variant="primary" type="submit" className={css.click}>Log In!</Button>{' '}
                </div>
            </form>
        </div>
    );
}