"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function Message() {
    const name = "Sam";
    if (name) {
        return <h1>Hello {name}</h1>;
    }
    return <h1>Hello World</h1>;
}
exports.default = Message;
