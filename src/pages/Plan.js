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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const AuthContext_1 = require("../AuthContext");
const ProgressChart_1 = __importDefault(require("../components/Graph/ProgressChart"));
require("./Plan.css");
const react_router_dom_1 = require("react-router-dom");
require("./CalorieForm.css");
const Plan = () => {
    const [dietPlan, setDietPlan] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(true);
    // const [quote, setQuote] = useState('');
    // const [error, setError] = useState('');
    const [userData, setUserData] = (0, react_1.useState)(null); // State to hold user data
    // const [caloriesGoal, setCalGoal] = useState<number>();
    const userID = localStorage.getItem("userID");
    const { isAuthenticated, token } = (0, AuthContext_1.useAuth)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        setLoading(false);
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, loading]);
    // const fetchQuote = async () => {
    //     setLoading(true);
    //     setError('');
    //     try {
    //         const response = await fetch('http://localhost:8081/getquote');
    //         const data = await response.json();
    //         if (response.ok) {
    //             setQuote(data.quote);
    //         } else {
    //             setError(data.error || 'Failed to fetch quote.');
    //         }
    //     } catch (err) {
    //         setError('An error occurred while fetching the quote.');
    //     }
    // };
    // useEffect(() => {
    //     fetchQuote();
    // }, []);
    const fetchDietPlan = () => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const response = yield fetch('http://localhost:8081/api/calculate-diet-with-bmr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userID }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch diet plan');
            }
            const data = yield response.json();
            setDietPlan(data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    });
    // Fetch user data (daily records, calorie goal, etc.)
    const fetchUserData = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://localhost:8081/api/dailyrecords/${userID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const userData = yield response.json();
            setUserData(userData);
        }
        catch (err) {
            console.log(err);
        }
    });
    (0, react_1.useEffect)(() => {
        fetchDietPlan();
        fetchUserData();
    }, [token]);
    const handleEditClick = () => {
        window.location.href = '/calculator'; // Redirect to /calculator with a page refresh
    };
    return (<div className="plan-container">
            {userData && (<div className="user-data">
                    <h3>Your Daily Records</h3>
                    <p>Caloric Goal: {userData.calorieGoal} kcal</p>
                    <p>Calories Eaten Today: {userData.caloriesEaten} kcal</p>
                    <p>Your Current Weight: {userData.weight} kg</p>
                </div>)}
            <button onClick={handleEditClick} className="btn-edit-info">Edit Personal Information</button>
            <h2>Your Diet Plan</h2>
            {dietPlan && (<div className="diet-results">
                    <h3>Expected Metabolic Rate: {dietPlan.bmr} kcal</h3>
                    <h3>Target Daily Caloric Intake: {dietPlan.dietResult} kcal</h3>
                    <div>{dietPlan.caloriesGoal != dietPlan.dietResult && dietPlan.caloriesGoal != dietPlan.bmr && (<h3>Adjusted Target Goal: {dietPlan.caloriesGoal}</h3>)}
                        </div>
                        {dietPlan.warning && <p className="warning">{dietPlan.warning}</p>}
                </div>)}
            <ProgressChart_1.default />

            {/* {error && <p className="error">{error}</p>} */}
            {/* {quote && <blockquote className="centered_bq">{quote}</blockquote>} */}
        </div>);
};
exports.default = Plan;
