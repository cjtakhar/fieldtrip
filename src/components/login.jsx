import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/login.css";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = (event) => {
       
        event.preventDefault();
        if (name.trim() !== "" && password.trim() !== "") {
            setIsAuthenticated(true);
            navigate("/lfg");
        }
    };

    if (isAuthenticated) {
        return null; // Since you want to redirect, no need to render anything here
    }

    return (
        <div>
            <div className="login-header">
                <h1 className="login-title">Field Trip</h1>
                <p className="login-text">Life is short. Plan it now.</p>
            </div>
            <div className="form-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    <input
                        className="login-input"
                        type="text"
                        name="email"
                        placeholder="email"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="off"
                    />
                </label>
                <label>
                    <input
                        className="login-input"
                        type="password"
                        name="password"
                        placeholder="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="off"
                    />
                </label>
                <button className="login-btn" type="submit">Login</button>
            </form>
            </div>
        </div>
    )
}

export default Login;
