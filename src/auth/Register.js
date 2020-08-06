import React, { useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"

import Modal from "../components/Modal"

import styles from "../config/Styles"
const { FormError, RegistrationInput, RegistrationTitles: Title } = styles

const Register = ({setRegister, setLoggedIn, setUsername, setLogin}) => {
    const { register, handleSubmit, errors, setError, clearErrors, reset } = useForm({ mode: "onBlur" })

    const [buttonText, setButtonText] = useState("Register")

    const handleRegister = async (data) => {
        if(!data.Accept) {
            setButtonText("Loading...")

            try {
                const post = await axios.post(
                    process.env.REACT_APP_URL + "/api/register", {
                        username: data.Username,
                        email: data.Email,
                        pass: data.Password,
                        name: data.Name,
                        code: data.Code,
                    })

                localStorage.setItem("Token", post.data.token)

                reset()
                setButtonText("Done!")
                setRegister(false)
                setLoggedIn(true)
                setUsername(data.Username)
            } catch (e) {
                if (e.response.data.code) {
                    switch (e.response.data.code) {
                        case "ES":
                            setError("Email",{
                                type: "required",
                                message: "This email is not registered for the MOOSE beta. Please sign up in the home page."
                            })
                            break
                        case "UE":
                            setError("Username",{
                                type: "manual",
                                message: "This username already exists."
                            })
                            setError("Email",{
                                type: "manual",
                                message: "This email is already registered. Please log in or reset your password."
                            })
                            break
                        case "E":
                            setError("Email",{
                                type: "manual",
                                message: "This email is already registered. Please log in or reset your password."
                            })
                            break
                        case "U":
                            setError("Username",{
                                type: "manual",
                                message: "This username already exists."
                            })
                            break
                        case "C":
                            setError("Code",{
                                type: "manual",
                                message: "This code is not valid."
                            })
                            break
                        default:
                            break
                    }
                    setButtonText("Register")
                } else {
                    setButtonText("Error")
                }
            }
        } else {
            reset()
            setButtonText("Done!")
            setRegister(false)
        }
    }

    return (
        <Modal setVisible={setRegister} width={"600px"}>
            <h1>Register</h1>

            <form onSubmit={handleSubmit(handleRegister)}>
                <div>
                    <Title>Email Address</Title>
                    <RegistrationInput
                        type="email"
                        name="Email"
                        placeholder="example@email.com"
                        onChange={() => clearErrors("Email")}
                        ref={register({
                            required: "A valid email address is required.",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "The email address is not formatted properly.",
                            },
                            maxLength: {
                                value: 128,
                                message: "The email can't exceed 128 characters."
                            }
                        })}
                        style={{borderColor: errors.Email && "#FA6B80", margin: "0"}} />
                    {errors.Email && <FormError>{errors.Email.message}</FormError>}
                </div>
                <div>
                    <Title>Username</Title>
                    <RegistrationInput
                        type="text"
                        name="Username"
                        placeholder="awesomeusername"
                        onChange={() => clearErrors("Username")}
                        ref={register({
                            required: "A valid username is required.",
                            pattern: {
                                value: /[a-zA-Z0-9._]{3,}/,
                                message: `The username can only contain letters, numbers, dots (.) and underscores (_).`
                            },
                            minLength: {
                                value: 3,
                                message: "The username has to be at least 3 characters long."
                            },
                            maxLength: {
                                value: 20,
                                message: "The username can't exceed 20 characters."
                            }
                        })}
                        style={{borderColor: errors.Username && "#FA6B80"}}/>
                    {errors.Username && <FormError>{errors.Username.message}</FormError>}
                </div>
                <div>
                    <Title>Password</Title>
                    <RegistrationInput
                        type= "password"
                        name="Password"
                        onChange={() => clearErrors("Password")}
                        placeholder="verysecurepassword"
                        ref={register({
                            required: "A valid password is required.",
                            pattern: {
                                value: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[ -~]{8,}$/,
                                message: "The password needs to contain at least one uppercase letter, one lowercase letter and one number."
                            },
                            minLength: {
                                value: 8,
                                message: "The password has to be at least 8 characters long."
                            },
                            maxLength: {
                                value: 128,
                                message: "The password can't exceed 128 characters."
                            }
                        })}
                        style={{borderColor: errors.Password && "#FA6B80"}}/>
                    {errors.Password && <FormError>{errors.Password.message}</FormError>}
                </div>
                <div>
                    <Title>Name</Title>
                    <RegistrationInput
                        type="text"
                        name="Name"
                        placeholder="Jenny Moose"
                        onChange={() => clearErrors("Name")}
                        ref={register({
                            pattern: {
                                value: /[a-zA-Z0-9 .]/,
                                message: "The name can only contain letters, numbers, dots (.) and spaces ( )."
                            },
                            maxLength: {
                                value: 64,
                                message: "The name can't exceed 64 characters."
                            }
                        })}
                        style={{borderColor: errors.Name && "#FA6B80"}}/>
                    {errors.Name && <FormError>{errors.Name.message}</FormError>}
                </div>
                <div>
                    <Title>Registration Code</Title>
                    <RegistrationInput
                        type="text"
                        name="Code"
                        placeholder="Code"
                        onChange={() => clearErrors("Code")}
                        ref={register({
                            required: "A valid registration code is required.",
                            //TODO: ADD PATTERN
                        })}
                        style={{borderColor: errors.Code && "#FA6B80"}}/>
                    {errors.Code && <FormError>{errors.Code.message}</FormError>}
                </div>
                <input
                    type="checkbox"
                    name="Accept"
                    style={{display: "none"}}
                    placeholder="I accept the Terms of Service."
                    ref={register}
                />
                <p>Only MOOSE beta users can register at this time.</p>
                <p>Sign up on the homepage to be the first to try MOOSE.</p>
                <div>
                    <button style={{margin: "10px"}} onClick={() => {
                        setLogin(true)
                        setRegister(false)
                    }}>Login</button>
                    <button style={{margin: "10px"}} type="submit">{buttonText}</button>
                </div>
            </form>
        </Modal>
    )
}

export default Register