"use strict";
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
const react_1 = require("react");
const AuthContext_1 = require("../AuthContext");
const react_router_dom_1 = require("react-router-dom"); // Import useNavigate
require("./recipes.css");
const Recipes = () => {
    const [recipes, setRecipes] = (0, react_1.useState)([]);
    const [currentPage, setCurrentPage] = (0, react_1.useState)(1);
    const [totalPages, setTotalPages] = (0, react_1.useState)(0); // State to track total pages
    const userID = localStorage.getItem("userID");
    const navigate = (0, react_router_dom_1.useNavigate)(); // Initialize useNavigate
    const { isAuthenticated } = (0, AuthContext_1.useAuth)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        setLoading(false);
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, loading]);
    (0, react_1.useEffect)(() => {
        const fetchRecipes = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:8081/api/recipes/${userID}?page=${currentPage}`);
                const data = yield response.json();
                // Ensure data.recipes is an array and handle total pages
                if (Array.isArray(data.recipes)) {
                    setRecipes(data.recipes);
                    setTotalPages(data.totalPages); // Set total pages from the response
                }
                else {
                    console.error('Fetched data is not an array:', data.recipes);
                }
            }
            catch (error) {
                console.error('Error fetching recipes:', error);
            }
        });
        fetchRecipes();
    }, [currentPage, userID]);
    return (<div className="recipes-container">
            <h1>Your Recipes</h1>
            {recipes.length > 0 ? (<ul className="recipes_ul">
                    {recipes.map((recipe) => (<li key={recipe.recipeID} className="rec-container">
                            <h2 className="title-container" color="white">{recipe.recipeName}</h2>
                            <p></p>
                            <p>Ingredients: {recipe.ingredients}</p>
                            <p>Instructions: {recipe.instructions}</p>
                            <p>Calories: {recipe.calories}</p>
                            <p>Date Generated: {new Date(recipe.dateGenerated).toLocaleDateString()}</p>
                        </li>))}
                </ul>) : (<p>No recipes found.</p>)}
            {/* Navigation Buttons */}
            <div className="navigation">
                {currentPage > 1 && (<button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>)}
                {currentPage < totalPages && (<button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>)}
            </div>
            {/* Button to navigate to Ingredients Page */}
            <button onClick={() => navigate('/ingredients/')} className="navigationbutton">
                Generate recipes by entering ingredients
            </button>
            <button onClick={() => navigate('/cuisines/')} className="navigationbutton">
                Generate recipes with existing ingredients
            </button>
        </div>);
};
exports.default = Recipes;
