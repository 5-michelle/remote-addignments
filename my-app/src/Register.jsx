import React, { useState } from "react";
//import { get } from "request";

// export const Register = (props) => {
function Register(){
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [result, setResult] = useState([]);


    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     //console.log(email);
    // }

    async function signUp(event){
        event.preventDefault();

        let item = {name, password, email}
        console.warn(item)
        let result = await fetch("http://localhost:3000/users",{
            method: 'POST',
            body:JSON.stringify(item),
            headers:{
                "Content-Type": "application/json",
                "Request-Date": new Date().toUTCString()
            }
        })
        result = await result.json()
        console.warn("result", result)

        const userData = result.data.user; // Extracting the user data from the result object
        const user = { // Creating a new object with only the desired user data
            id: userData.id,
            name: userData.name,
            email: userData.email
        };
        console.warn("user", user);
        
        setResult(user);
    }

    return (
        // <div className="auth-form-container" >
        <div className="form-center">
            {/* <h2>Register</h2> */}
            
        {/* <form  className="register-form"  onSubmit={handleSubmit} > */}
            <form  className="register-form" >

                <label htmlFor="name">name: </label>
                <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="name" />
                <br></br>
                <label htmlFor="email">email: </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="email@gmail.com" id="email" name="email" />
                <br></br>
                <label htmlFor="password">password: </label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" id="password" name="password" />
                <br></br>
                {/* <button type="submit" >Signup</button> */}
                <button onClick={signUp} >Signup</button>

            </form>

        {/* <button className="link-btn" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button> */}

        <div className="result-container">{!Object.keys(result).length ? "" : JSON.stringify(result)}</div>


    </div>
    )
}

export default Register