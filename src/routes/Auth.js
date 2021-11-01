/* eslint-disable */
import React, {useState} from "react";
import { authService, firebaseInstance } from "../fbase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub
} from "@fortawesome/free-brands-svg-icons";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    // setInterval(()=>{
    //     console.log(authService.currentUser);
    // },2000);
    const auth = authService;

    const onChange = (event) => {
        const {
            target : {name, value},
            } = event;
        if(name==="email"){
            setEmail(value);
        }
        else if (name==="password"){
            setPassword(value);
        }
        console.log(event.target.name);
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
                // create account
                data = await createUserWithEmailAndPassword(auth, email, password);
            }
            else {
                data = await signInWithEmailAndPassword(auth, email, password);
            }
            console.log(data);
        }
        catch(error){
            setError(error.message);
        }
    };

const toggleAccount = () => setNewAccount((prev)=> !prev);
const onSocialClick = async(event) => {
    console.log(event.target.name);
    const {
        target: {name},
    } = event;
    let provider;

    if(name === "google"){
        provider = new GoogleAuthProvider();
    }
    else if(name==="github"){
        provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
};

    return (<div calssName="container">
        <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
            style={{marginBottom:30}}
        />
        <form onSubmit={onSubmit}>
            <input name="email" type="text" placeholder="Email" required value={email}
            onChange={onChange}/>
            <input
                name="password"
                type="password" placeholder="Password" required value={password} 
                onChange={onChange}/>
            <input type="submit" value={newAccount? "Create Account":"Log In"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign In":"Create Account"}</span>
        <div>
            <button name="google" onClick={onSocialClick}>Continue with Google</button>
            <button name="github" onClick={onSocialClick}>Continue with Github</button>
        </div>
    </div>);
}
export default Auth;