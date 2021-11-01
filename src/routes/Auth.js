import React, {useState} from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) => {
        const {target : {name, value}} = event;
        if(name==="email"){
            setEmail(value)
        }
        else if (name==="password"){
            setPassword(value);
        }
        console.log(event.target.name);
    }
    const onSubmit = (event) => {
        event.preventDefault(); // default event 실행막음. 내가 처리할거야
    }
    return (<div>
        <form onSunmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email}
            onChange={onChange}/>
            <input
                name="password"
                type="password" placeholder="Password" required value={password} 
                onChange={onChange}/>
            <input type="submit" value="Log In" required />
    
        </form>
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>);
}
export default Auth;