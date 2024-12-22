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
exports.useAuth = exports.AuthProvider = void 0;
// src/context/auth-context.tsx
const react_1 = __importStar(require("react"));
// Create the AuthContext with default values
const AuthContext = (0, react_1.createContext)(undefined);
// Create a provider component
const AuthProvider = ({ children, }) => {
    const [isAuthenticated, setIsAuthenticated] = (0, react_1.useState)(false);
    const [token, setToken] = (0, react_1.useState)(null);
    // Check if there's a token in localStorage when the app starts
    (0, react_1.useEffect)(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setIsAuthenticated(true);
            setToken(storedToken);
        }
    }, []);
    // Function to login (save token)
    const login = (newToken) => {
        setIsAuthenticated(true);
        setToken(newToken);
        localStorage.setItem("token", newToken); // Save the token in localStorage
    };
    // Function to logout (clear token)
    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("userID");
        localStorage.removeItem("goal");
        window.location.href = "/";
    };
    // Provide authentication state and functions to children
    return (<AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>);
};
exports.AuthProvider = AuthProvider;
// Create a hook to use the AuthContext in components
const useAuth = () => {
    const context = (0, react_1.useContext)(AuthContext);
    // console.log(context);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
exports.useAuth = useAuth;
