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
const IngredientsList = () => {
    const [ingredients, setIngredients] = (0, react_1.useState)([]);
    const [ingredientName, setIngredientName] = (0, react_1.useState)('');
    const userID = 1; // Replace with actual user ID from context or props
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
    return (<div>
            <h1>Your Ingredients</h1>
            <form onSubmit={addIngredient}>
                <input type="text" value={ingredientName} onChange={(e) => setIngredientName(e.target.value)} placeholder="Enter ingredient name" required/>
                <button type="submit">Add Ingredient</button>
            </form>
            <ul>
                {ingredients.map((ingredient) => (<li key={ingredient.ID}>
                        {ingredient.IngredientName}
                        <button onClick={() => deleteIngredient(ingredient.ID)}>Delete</button>
                    </li>))}
            </ul>
        </div>);
};
exports.default = IngredientsList;
