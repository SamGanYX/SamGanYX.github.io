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
require("./IngredientsPage.css");
const IngredientsPage = () => {
    const [ingredients, setIngredients] = (0, react_1.useState)([]);
    const [ingredientName, setIngredientName] = (0, react_1.useState)('');
    const goal = localStorage.getItem("goal");
    const userID = localStorage.getItem("userID");
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { isAuthenticated, token } = (0, AuthContext_1.useAuth)();
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
    // Add a new ingredient
    const addIngredient = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!ingredientName)
            return;
        try {
            const response = yield fetch('http://localhost:8081/api/ingredients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userID, ingredientName }),
            });
            if (response.ok) {
                setIngredientName(''); // Clear input
                fetchIngredients(); // Refresh the ingredient list
            }
            else {
                const errorData = yield response.json();
                console.error('Error adding ingredient:', errorData);
            }
        }
        catch (error) {
            console.error('Error adding ingredient:', error);
        }
    });
    // Delete an ingredient
    const deleteIngredient = (ingredientID) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:8081/api/ingredients/${ingredientID}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchIngredients(); // Refresh the ingredient list
            }
            else {
                const errorData = yield response.json();
                console.error('Error deleting ingredient:', errorData);
            }
        }
        catch (error) {
            console.error('Error deleting ingredient:', error);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchIngredients(); // Fetch ingredients on component mount
    }, []);
    // Function to fetch recipes based on ingredients
    const getRecipes = () => __awaiter(void 0, void 0, void 0, function* () {
        const formattedString = `UserID: ${userID}, Ingredients: ${ingredients.map(ingredient => ingredient.ingredientName).join(',')}, goal: ${goal}`;
        console.log(formattedString);
        try {
            const response = yield fetch(`http://localhost:8081/api/getRecipes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: formattedString }),
            });
            const data = yield response.json();
            // Assuming the response contains a list of recipes
            console.log(data);
            if (data.message === 'Recipe inserted successfully.') {
                console.log(data);
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
        getRecipes(); // Call the getRecipes function
    };
    return (<div className="ingredients-page">
            <h1>Find Recipes by Ingredients</h1>
            <form onSubmit={handleSubmit}>
                <textarea value={ingredients.map(ingredient => ingredient.ingredientName).join(',')} onChange={(e) => setIngredients(e.target.value.split(',').map((name, index) => ({ id: index, ingredientName: name.trim() })))} placeholder="Enter ingredients separated by commas" rows={4} cols={50} required/>
                <br />
                <button type="submit" className="ingredientbutton">Get Recipes</button>
            </form>
        </div>);
};
exports.default = IngredientsPage;
