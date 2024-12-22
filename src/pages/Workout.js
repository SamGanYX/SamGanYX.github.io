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
const react_router_dom_1 = require("react-router-dom");
require("./Workout.css");
const Workouts = () => {
    const [workouts, setWorkouts] = (0, react_1.useState)([]);
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
        const fetchWorkouts = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield fetch(`http://localhost:8081/api/workouts/${userID}?page=${currentPage}`);
                const data = yield response.json();
                if (Array.isArray(data.workouts)) {
                    setWorkouts(data.workouts);
                    setTotalPages(data.totalPages); // Set total pages from the response
                }
                else {
                    console.error('Fetched data is not an array:', data.workouts);
                }
            }
            catch (error) {
                console.error('Error fetching workouts:', error);
            }
        });
        fetchWorkouts();
    }, [currentPage, userID]);
    return (<div className="workouts-container">
            <h1>Your Workouts</h1>
            {workouts.length > 0 ? (<ul className='workouts_ul'>
                    {workouts.map((workout) => (<li key={workout.ID} className="rec-container">
                            <h2 className="title-container">{workout.workoutName}</h2>
                            <p></p>
                            <p>Place: {workout.place}</p>
                            <p>Exercises: {workout.exercises}</p>
                            <p>Instructions: {workout.instructions}</p>
                            <p>Date Generated: {new Date(workout.dateGenerated).toLocaleDateString()}</p>
                        </li>))}
                </ul>) : (<p>No workouts found.</p>)}
            {/* Navigation Buttons */}
            <div className="navigation">
                {currentPage > 1 && (<button onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>)}
                {currentPage < totalPages && (<button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>)}
            </div>

            <button onClick={() => navigate('/generateWorkout/')} className="navigationbutton">
                Go to generate workout
            </button>
        </div>);
};
exports.default = Workouts;
