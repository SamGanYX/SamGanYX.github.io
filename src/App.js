"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
require("./App.css");
const Home_1 = __importDefault(require("./pages/Home"));
const About_1 = __importDefault(require("./pages/About"));
const NoPage_1 = __importDefault(require("./pages/NoPage"));
const Users_1 = __importDefault(require("./pages/Users"));
const Plan_1 = __importDefault(require("./pages/Plan"));
const Login_1 = __importDefault(require("./pages/Login"));
const Logger_1 = __importDefault(require("./pages/Logger"));
const CalorieForm_1 = __importDefault(require("./pages/CalorieForm"));
const CuisinesPage_1 = __importDefault(require("./pages/CuisinesPage"));
const CreateAccount_1 = __importDefault(require("./pages/CreateAccount"));
const Navbar_1 = __importDefault(require("./components/NavBar/Navbar"));
const ChatBot_1 = __importDefault(require("./pages/ChatBot"));
const Recipes_1 = __importDefault(require("./pages/Recipes"));
const IngredientsPage_1 = __importDefault(require("./pages/IngredientsPage"));
const Workout_1 = __importDefault(require("./pages/Workout"));
const GenerateWorkout_1 = __importDefault(require("./pages/GenerateWorkout"));
const IngredientsList_1 = __importDefault(require("./pages/IngredientsList"));
const App = () => {
    return (<div>
      <react_router_dom_1.BrowserRouter>
        <Navbar_1.default></Navbar_1.default>
        <div className="padded-div">
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route index element={<Home_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/home" element={<Home_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/about" element={<About_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/logger" element={<Logger_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/users" element={<Users_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/calculator" element={<CalorieForm_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/login" element={<Login_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/plan" element={<Plan_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/recipes" element={<Recipes_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/ingredients" element={<IngredientsPage_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/cuisines" element={<CuisinesPage_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/ingredientsList" element={<IngredientsList_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/workout" element={<Workout_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/generateWorkout" element={<GenerateWorkout_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/create_account" element={<CreateAccount_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="*" element={<NoPage_1.default />}></react_router_dom_1.Route>
            <react_router_dom_1.Route path="/chat" element={<ChatBot_1.default />}></react_router_dom_1.Route>
          </react_router_dom_1.Routes>
        </div>
      </react_router_dom_1.BrowserRouter>
    </div>);
};
exports.default = App;
