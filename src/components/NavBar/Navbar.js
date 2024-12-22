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
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("../../AuthContext");
require("./Navbar.css");
const Navbar = () => {
    const [menuOpen, setMenuOpen] = (0, react_1.useState)(false);
    const { isAuthenticated, login, logout, token } = (0, AuthContext_1.useAuth)();
    console.log((0, AuthContext_1.useAuth)());
    // const [Data, setData] = useState<DataItem[]>([]);
    const userID = localStorage.getItem("userID");
    // console.log(userID);
    // useEffect(() => {
    //   fetch("http://localhost:8081/categories")
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setData(data);
    //       console.log(data);
    //     })
    //     .catch((err) => console.log(err));
    // }, []);
    return (<>
      <nav className="navbar_nav">
        <react_router_dom_1.Link to="/" className="title">
          Teen<span className="green-text">FitX</span>
        </react_router_dom_1.Link>
        <div className="menu" onClick={() => {
            setMenuOpen(!menuOpen);
        }}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>
          {/* <li className="navbar-li">
          <NavLink to="/about">About</NavLink>
        </li> */}
          {!isAuthenticated ? (<>
              <li className="navbar-li">
                <react_router_dom_1.NavLink to="/login">Log in</react_router_dom_1.NavLink>
              </li>
              <li className="navbar-li">
                <react_router_dom_1.NavLink to="/create_account">Create Account</react_router_dom_1.NavLink>
              </li>
            </>) : (<>
              <li className="navbar-li">
                <react_router_dom_1.NavLink to="/plan">Plan</react_router_dom_1.NavLink> {/* New Tab */}
              </li>
              <li className="navbar-li">
                <react_router_dom_1.NavLink to="/logger">Food Logger</react_router_dom_1.NavLink> {/* New Tab */}
              </li>
              <li className="navbar-li">
                <react_router_dom_1.NavLink to="/chat">Chat Bot</react_router_dom_1.NavLink> {/* New Tab */}
              </li>
              <li className="navbar-li">
                <react_router_dom_1.NavLink to="/recipes">Recipes</react_router_dom_1.NavLink> {/* New Tab */}
              </li>
              <li className="navbar-li">
                <react_router_dom_1.NavLink to="/Workout">Workouts</react_router_dom_1.NavLink> {/* New Tab */}
              </li>
              <li className="navbar-li">
                <react_router_dom_1.NavLink to="/ingredientsList">Ingredients</react_router_dom_1.NavLink> {/* New Tab */}
              </li>
              <li className="navbar-li">
                <a onClick={logout} className="log_out">
                  Log out
                </a>
              </li>
            </>)}
        </ul>
      </nav>
      {/* <div className="category-navbar">
          <ul className={`categories ${categoriesOpen ? "categories-open" : ""}`}>
            {Data.map((item, index) => (
              <li key={index}>
                <NavLink to={`/category/${item.categoryName}`}>
                  {item.categoryName}
                </NavLink>
              </li>
            ))}
          </ul>
        </div> */}
    </>);
};
exports.default = Navbar;
