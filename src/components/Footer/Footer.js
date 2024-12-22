"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./Footer.css");
function Footer() {
    return (<div className="footer">
      <ul>
        <li>
          <react_router_dom_1.NavLink to="/about">About</react_router_dom_1.NavLink>
        </li>
        <li>
          <react_router_dom_1.NavLink to="/contact">Contact</react_router_dom_1.NavLink>
        </li>
      </ul>
    </div>);
}
exports.default = Footer;
