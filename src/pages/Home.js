"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom"); // Import useNavigate
const AuthContext_1 = require("../AuthContext");
require("./Home.css");
function App() {
    const navigate = (0, react_router_dom_1.useNavigate)(); // Initialize useNavigate
    const { isAuthenticated, login, logout, token } = (0, AuthContext_1.useAuth)();
    return (<div className="app">
      <div className="title-section">
        <h1 className="eatvolution-title">
          Teen<span className="green-text">FitX</span>
        </h1>
        <div className="welcome-section">
        <h1>Welcome to Your Personal Fitness Assistant</h1>
      </div>
      </div>
      {(!isAuthenticated) && <div className="button-section">
        <button className="login-button" onClick={() => navigate('/login')}>Login</button>
        <button className="signup-button" onClick={() => navigate('/create_account')}>Sign-up</button>
      </div>}
    </div>);
}
exports.default = App;
