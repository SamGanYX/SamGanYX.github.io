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
require("./CreateAccount.css");
const CreateAccount = () => {
    const [Data, setData] = (0, react_1.useState)([]);
    const [Username, setUsername] = (0, react_1.useState)("");
    const [Email, setEmail] = (0, react_1.useState)("");
    const [Password, setPassword] = (0, react_1.useState)("");
    const [Error, setError] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        fetch("http://localhost:8081/users")
            .then((res) => res.json())
            .then((data) => {
            setData(data);
        })
            .catch((err) => console.log(err));
    }, []);
    console.log(Data ? Data : "No_data");
    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            username: Username,
            email: Email,
            password: Password,
        };
        fetch("http://localhost:8081/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
            response.json();
            if (response.status === 201) {
            }
            else {
                setError('Failed to create account, username taken');
                throw new Error('Error creating account:' + response.statusText);
            }
            console.log("Full response:", response);
        })
            .then((data) => {
            console.log("User added successfully:", data);
            fetch("http://localhost:8081/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            })
                .then((response) => {
                return response.json();
            })
                .then((data) => {
                console.log(data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userID", data.userID);
                // location.reload();
                window.location.href = "/calculator";
            })
                .catch((error) => {
                console.error("Error logging in:", error);
            });
        })
            .catch((error) => {
            console.error("Error adding user:", error);
        });
    };
    return (<div className="container">
      <div className="left-section">
        <h1>
          Teen<span className="green-text">FitX</span>
        </h1>
      </div>
      <div className="form-div">
        <h2>Create an Account</h2>
        {Error && <p>{Error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter Username" onChange={(e) => setUsername(e.target.value)}/>
          <input type="text" placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}/>
          <input type="password" // Change type to "password"
     name="Password" id="Password" placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}/>
          <button type="submit" className="btn btn-primary">
            Create account
          </button>
        </form>
        <div className="already-have-account">
          <p>Already Have An Account? <a href="/login">Log In</a></p>
        </div>
      </div>
    </div>);
};
exports.default = CreateAccount;
