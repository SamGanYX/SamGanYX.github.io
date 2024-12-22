"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AuthContext_1 = require("../AuthContext");
require("./CreateAccount.css");
const Login = () => {
    // interface DataItem {
    //   Username: string;
    //   Email: string;
    //   Password: string;
    // }
    // const [LoggedIn, setLoggedIn] = useState(false);
    const [Username, setUsername] = (0, react_1.useState)("");
    const [Password, setPassword] = (0, react_1.useState)("");
    const [Error, setError] = (0, react_1.useState)("");
    // const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            username: Username,
            password: Password,
        };
        fetch("http://localhost:8081/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
            // console.log(response);
            if (response.status === 200) {
                return response.json();
            }
            else {
                setError('Failed to log in, username not found');
                throw new Error('Error logging in:' + response.statusText);
            }
        })
            .then((data) => {
            console.log(data);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userID", data.userID);
            // location.reload();
            window.location.href = "/home";
            // navigate("/home/");
        })
            .catch((error) => {
            console.error("Error logging in:", error);
        });
    };
    const { isAuthenticated } = (0, AuthContext_1.useAuth)();
    if (isAuthenticated) {
        window.location.href = "/home";
    }
    return (<div className="container">
      <div className="left-section">
        <h1>
          Teen<span>FitX</span>
        </h1>
      </div>
      <div className="form-div">
        <h2>Login</h2>
        {Error && <p>{Error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="Username" id="Username" placeholder="Username" value={Username} onChange={(e) => setUsername(e.target.value)}/>
          <input type="password" // Change type to "password"
     name="Password" id="Password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} autoComplete="off" // Prevent autofill
    />
          <button type="submit">Login</button>
        </form>
        <div className="already-have-account">
          <p>Don't have an account yet? <a href="/create_account">Create one</a></p>
        </div>
      </div>
    </div>);
};
exports.default = Login;
