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
const AuthContext_1 = require("../AuthContext"); // Assuming you have this context for authentication
const react_router_dom_1 = require("react-router-dom");
require("./GenerateWorkout.css");
const GenerateWorkout = () => {
    const [place, setPlace] = (0, react_1.useState)('');
    const [userStats, setUserStats] = (0, react_1.useState)(null); // Will store the user's stats like ENDURANCE, MUSCLE, etc.
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
        // Fetch user stats when the component mounts
        const fetchUserStats = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:8081/userstats/${userID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = yield response.json();
                console.log("User stats fetched:", data);
                setUserStats(data);
            }
            catch (error) {
                console.error('Error fetching user stats:', error);
            }
        });
        fetchUserStats();
    }, [isAuthenticated, navigate, loading, userID]);
    // Function to fetch workouts based on user stats
    const getWorkouts = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!userStats) {
            console.error('User stats not available');
            return;
        }
        const { ENDURANCE, MUSCLE, BMI, EATING, DAILY, UNKNOWN } = userStats;
        const formattedString = `UserID: ${userID}, Place: ${place}, Endurance: ${ENDURANCE}, Muscle: ${MUSCLE}, BMI: ${BMI}, Eating: ${EATING}, Daily: ${DAILY}, Unknown: ${UNKNOWN}`;
        console.log(formattedString);
        try {
            const response = yield fetch(`http://localhost:8081/api/workouts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: formattedString }),
            });
            const data = yield response.json();
            console.log(data);
            if (data.message === 'Workout inserted successfully.') {
                navigate('/workout');
            }
            else {
                console.error('Failed to insert workout into the database');
            }
        }
        catch (error) {
            console.error('Error fetching workout:', error);
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page
        getWorkouts(); // Call the getWorkouts function
    };
    return (<div className="generate-workout">
            <h1>Find Workouts by Location & Preferences</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Location:
                    <select value={place} onChange={(e) => setPlace(e.target.value)} required>
                        <option value="" disabled>Select Location</option>
                        <option value="Classic Gym">Classic Gym</option>
                        <option value="Calisthenics Gym/playground">Calisthenics Gym/playground</option>
                        <option value="MMA Gym">MMA Gym</option>
                        {/* <option value="Home Gym">Home</option> */}
                    </select>
                </label>

                <br />

                <button type="submit" className="workoutbutton">Get Workouts</button>
            </form>
        </div>);
};
exports.default = GenerateWorkout;
