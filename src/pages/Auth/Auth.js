import React, { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {SignIn,SignUp} from '../../api/auth/auth'
const Login = () => {
    const [showSignup, setShowSignup] = useState(false)
    const [userSignupData, setUserSignupData] = useState({})
    const [userType, setUserType] = useState("CUSTOMER")
    const [message, setMessage] = useState("Welcome!")
    const [success,setSuccess]=useState("")
    const navigate = useNavigate();

    const redirectUrl = () => {
        if (localStorage.getItem("userType") === "CUSTOMER")
            navigate('/')
        else if (localStorage.getItem("userType") === "CLIENT")
            navigate('/client')
        else if (localStorage.getItem("userType") === "ADMIN")
            navigate('/admin')
    }

    const handleSelect = (e) => {
        setUserType(e)
    }

    const signupFn = async (e) => {
        e.preventDefault()

        const data = {
            name: userSignupData.username,
            userId: userSignupData.userId,
            email: userSignupData.email,
            userType: userType,
            password: userSignupData.password
        }

        console.log(e)
        SignUp(data).then(function (response) {
            console.log(response)
            setShowSignup(!showSignup)
            setSuccess("Sign Up successfully please Log In....")
        }).catch(function (error) {
            if (error.response.status === 400)
                setMessage(error.response.data)
            else
                setMessage(error.message.data)
        })
    }
    console.log(message)
    const loginFn = async (e) => {
        e.preventDefault()
        const data = {
            userId: userSignupData.userId,
            password: userSignupData.password
        }
        try {
            const result = await SignIn(data)
            console.log("Login result", result)
            if (result.status === 200)
                redirectUrl()
            else
                console.log("Something went wrong")
        } catch (error) {
            if (error.response && error.response.status === 401)
                setMessage(error.response.data)
            else
            console.log(error.response.data)
                setMessage(error.response.data)
        }
    }

    const updateSignupData = (e) => {
        userSignupData[e.target.id] = e.target.value;
    }

    const toggleSignup = () => {
        setShowSignup(!showSignup)
        if (showSignup) {
            setUserSignupData({})
        }
    }

    return (
        <div id='loginPage'>

            {/* Login Content */}
            <div id='loginContent' className='bg-dark d-flex justify-content-center align-items-center vh-100'>
                <div className="card m-5 p-5 " style={{background:"#04AA6D"}}>
                    <div className='row m-2'>
                        <h5 className='text-success'>{success}</h5><br/><br/>
                        <h4 className='text-center'>{showSignup ? 'Sign Up' : 'Login'}</h4>
                        
                        <form className='d-flex flex-column align-items-center' onSubmit={showSignup?signupFn:loginFn}>
                            <input type='text' className='form-control my-2' placeholder='User Id' id='userId' onChange={updateSignupData} autoFocus required></input>
                            <input type='password' className='form-control my-2' placeholder="Password" id="password" onChange={updateSignupData} required ></input>
                            {showSignup && <div className='w-100'>
                                <input type='text' className='form-control my-2' placeholder='Username' id='username' onChange={updateSignupData} required></input>
                                <input type='text' className='form-control my-2' placeholder='Email' id='email' onChange={updateSignupData} required></input>
                                <div className="row d-flex align-items-center justify-content-between w-100">
                                    <div className="col">
                                        <span>User Type</span>
                                    </div>
                                    <div className="col">
                                        <DropdownButton
                                            align="end"
                                            title={userType}
                                            id="userType"
                                            onSelect={handleSelect}
                                            variant="light"
                                        >
                                            <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
                                            <Dropdown.Item eventKey="CLIENT">CLIENT</Dropdown.Item>
                                        </DropdownButton>
                                    </div>
                                </div>
                            </div>}
                            <input type='submit' className='form-control btn btn-primary w-50' value={showSignup ? "Sign Up" : "Log In"}></input>
                            <div className="text-dark signup-btn text-center" onClick={toggleSignup}>{showSignup ? 'Already have an Account ? Login' : "Don't have an Account? Signup"}</div>
                            <div className='auth-error-msg  text-center' style={{color:"red"}}>{message}</div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div style={{
                position: "fixed",
                left: 0,
                bottom: 0,
                right: 0,
                backgroundColor:"#04AA6D",
                color:'white'
            }}>
                <footer className="page-footer" >
                    <div className="text-center py-3">© 2023 Copyright:
                        <a href="#" style={{textDecoration:"none"}}> Nitesh Kumar</a>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Login