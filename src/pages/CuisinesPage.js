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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const AuthContext_1 = require("../AuthContext"); // Assuming you have this context for authentication
const react_router_dom_1 = require("react-router-dom");
require("./CuisinesPage.css"); // Create a new CSS file for styling
const CuisinesPage = () => {
    const [ingredients, setIngredients] = (0, react_1.useState)([]);
    const [cuisine, setCuisine] = (0, react_1.useState)('');
    const userID = localStorage.getItem("userID");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { isAuthenticated } = (0, AuthContext_1.useAuth)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        setLoading(false);
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, loading]);
    // Fetch ingredients from the backend
    const fetchIngredients = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:8081/api/ingredients/${userID}`);
            const data = yield response.json();
            setIngredients(data);
        }
        catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    });
    // Function to fetch recipes based on cuisine and ingredients
    const getRecipesByCuisine = () => __awaiter(void 0, void 0, void 0, function* () {
        const formattedString = `UserID: ${userID}, Cuisine: ${cuisine}, Ingredients: ${ingredients.map(ingredient => ingredient.IngredientName).join(',')}`;
        console.log(formattedString);
        try {
            const response = yield fetch(`http://localhost:8081/api/getRecipesByCuisine`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: formattedString }),
            });
            const data = yield response.json();
            console.log(data);
            if (data.message === 'Recipe inserted successfully.') {
                navigate('/recipes');
            }
            else {
                console.error('Mission failed, did not add to database');
            }
        }
        catch (error) {
            console.error('Error fetching recipes:', error);
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        getRecipesByCuisine(); // Call the getRecipesByCuisine function
    };
    (0, react_1.useEffect)(() => {
        fetchIngredients(); // Fetch ingredients on component mount
    }, []);
    return (<div className="cuisines-page">
            <h1>Find Recipes by Cuisine</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="Enter cuisine" required/>
                <br />
                <button type="submit" className="cuisinebutton">Get Recipes</button>
            </form>
        </div>);
};
exports.default = CuisinesPage;
