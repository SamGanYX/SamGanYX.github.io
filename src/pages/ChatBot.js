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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("../AuthContext");
const react_markdown_1 = __importDefault(require("react-markdown")); // Import react-markdown for parsing markdown
require("./ChatBot.css");
const ChatBot = () => {
    const [messages, setMessages] = (0, react_1.useState)([]);
    const [input, setInput] = (0, react_1.useState)('');
    const { isAuthenticated, token } = (0, AuthContext_1.useAuth)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        setLoading(false);
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, loading]);
    const handleSend = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!input.trim())
            return; // Prevent sending empty messages
        // Add user message to the chat
        setMessages((prev) => [...prev, { user: input, bot: '' }]);
        // Call your AI API here
        try {
            const response = yield axios_1.default.post('http://localhost:8081/api/query', {
                prompt: input,
            });
            const botResponse = response.data.answer; // Adjust this based on your API response structure
            // Update the messages state with the bot's response
            setMessages((prev) => [
                ...prev, // Remove the last user message
                { user: input, bot: botResponse } // Add the updated message with bot response
            ]);
        }
        catch (error) {
            console.error('Error fetching response from AI:', error);
            setMessages((prev) => [
                ...prev,
                { user: input, bot: 'Sorry, I could not fetch a response.' },
            ]);
        }
    });
    return (<div className="chatbot-container">
      <div className="sidebar">
        <h2>Fitness Trainer</h2>
        {/* <FaUserCircle size={50} /> */}
        <img src="../src/assets/img_1.png" alt="Bot Profile" className="profile-pic-lg"/>
      </div>
      <div className="chat-area">
        <div className="messages">
          {messages.map((msg, index) => (<div key={index} className={`message ${msg.bot ? 'bot-message' : 'user-message'}`}>
              {msg.bot ? (<react_markdown_1.default className="bot-text">
                  {msg.bot}
                </react_markdown_1.default>) : (<div className="user-text">{msg.user}</div>)}

            </div>))}
        </div>
        <div className="input-area">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." onKeyPress={(e) => {
            if (e.key === 'Enter') {
                handleSend();
                setInput('');
            }
        }}/>
          <button className="inputChat" onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>);
};
exports.default = ChatBot;
