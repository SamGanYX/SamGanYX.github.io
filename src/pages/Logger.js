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
// Logger.tsx
const react_1 = __importStar(require("react"));
const react_calendar_1 = __importDefault(require("react-calendar")); // Import the Calendar
require("react-calendar/dist/Calendar.css"); // Import default styles for the Calendar
require("./Logger.css"); // Update to your preferred CSS file
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("../AuthContext");
const Logger = () => {
    const [meal, setMeal] = (0, react_1.useState)('');
    const [calories, setCalories] = (0, react_1.useState)('');
    const [calorieEntries, setCalorieEntries] = (0, react_1.useState)({});
    const [calorieGoal, setCalorieGoal] = (0, react_1.useState)(2000); // Default calorie goal
    const [weight, setWeight] = (0, react_1.useState)(165); // Default weight
    const [selectedDate, setSelectedDate] = (0, react_1.useState)(new Date());
    const [isModalOpen, setIsModalOpen] = (0, react_1.useState)(false);
    const [isMealLogged, setIsMealLogged] = (0, react_1.useState)(false); // New state to track submission
    const [loading, setLoading] = (0, react_1.useState)(true);
    const userID = localStorage.getItem("userID");
    const { isAuthenticated } = (0, AuthContext_1.useAuth)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [protein, setProtein] = (0, react_1.useState)('');
    const [carbs, setCarbs] = (0, react_1.useState)('');
    const [fats, setFats] = (0, react_1.useState)('');
    (0, react_1.useEffect)(() => {
        setLoading(false);
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, loading]);
    // Fetch user stats
    const fetchUserStats = () => __awaiter(void 0, void 0, void 0, function* () {
        if (userID) {
            try {
                const response = yield fetch('http://localhost:8081/userstats/' + userID);
                if (!response.ok) {
                    throw new Error('Failed to fetch user stats');
                }
                const stats = yield response.json();
                // console.log(stats);
                setCalorieGoal(stats.CaloriesGoal);
                // Assuming the first user stat is for the logged-in user
                // setWeight(stats.Weight);
                if (stats.Weight) {
                    setWeight(stats.Weight);
                    // console.log(weight);
                    // You can also get other stats if needed (height, age, etc.)
                }
            }
            catch (error) {
                console.error('Error fetching user stats:', error);
            }
        }
    });
    // Fetch daily records
    const fetchDailyRecords = () => __awaiter(void 0, void 0, void 0, function* () {
        isMealLogged;
        if (userID) {
            try {
                const response = yield fetch(`http://localhost:8081/api/dailyrecords/${userID}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch daily records');
                }
                const records = yield response.json();
                // Assuming records is an array of entries
                setCalorieEntries((prevEntries) => {
                    const newEntries = Object.assign({}, prevEntries); // Create a copy of the previous entries
                    records.forEach((record) => {
                        const dateKey = formatDate(new Date(record.date)); // Extract and format date
                        // Initialize if dateKey doesn't exist
                        if (!newEntries[dateKey]) {
                            newEntries[dateKey] = [];
                        }
                        // Check if the record already exists to avoid duplicates
                        const exists = newEntries[dateKey].some((entry) => entry.meal === record.mealName && entry.calories === record.caloriesEaten);
                        // Only add if it doesn't exist
                        if (!exists) {
                            newEntries[dateKey].push({
                                meal: record.mealName,
                                calories: record.caloriesEaten,
                                protein: record.protein || undefined,
                                carbs: record.carbs || undefined,
                                fats: record.fats || undefined
                            });
                        }
                    });
                    return newEntries; // Return updated entries
                });
            }
            catch (error) {
                console.error('Error fetching daily records:', error);
            }
        }
    });
    (0, react_1.useEffect)(() => {
        fetchUserStats(); // Fetch user stats on component mount
        fetchDailyRecords(); // Fetch daily records on component mount
    }, [userID]);
    const formatDate = (date) => {
        return date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    };
    const getTileClassName = ({ date }) => {
        const dateKey = formatDate(date);
        const totalCalories = getTotalCalories(dateKey);
        if (totalCalories === 0) {
            return 'tile-no-calories'; // Class for no calories logged
        }
        else if (totalCalories < calorieGoal * 0.5) {
            return 'tile-under-goal'; // Class for under 50% of the goal{
        }
        else if (totalCalories < calorieGoal * 0.95) {
            return 'tile-under-100';
        }
        else if (totalCalories < calorieGoal * 1.05) {
            return 'tile-over-goal'; // Class for under the goal
        }
        else if (totalCalories < 1.2 * calorieGoal) {
            return 'tile-under-100';
        }
        else {
            return 'tile-under-goal'; // Class for over the goal
        }
    };
    const handleCalendarChange = (date) => {
        setSelectedDate(date); // Set selected date
        setIsModalOpen(true); // Open modal when a date is selected
        setIsMealLogged(false); // Reset meal logged state
    };
    const setDailyRecord = () => __awaiter(void 0, void 0, void 0, function* () {
        if (userID) {
            try {
                const dateKey = formatDate(selectedDate);
                const totalCalories = getTotalCalories(dateKey);
                const response = yield fetch('http://localhost:8081/api/dailyrecords', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userID,
                        date: formatDate(selectedDate),
                        caloriesEaten: parseInt(calories),
                        mealName: meal,
                        weight: weight,
                        protein: protein ? parseFloat(protein) : null,
                        carbs: carbs ? parseFloat(carbs) : null,
                        fats: fats ? parseFloat(fats) : null,
                        calorieGoal,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to log daily record');
                }
                const result = yield response.json();
                console.log(result); // Log success message
            }
            catch (error) {
                console.error('Error logging daily record:', error);
            }
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!meal || !calories)
            return;
        // Log the daily record to the database
        setDailyRecord();
        // Add the meal and calories to the selected date
        const dateKey = formatDate(selectedDate);
        setCalorieEntries((prevEntries) => (Object.assign(Object.assign({}, prevEntries), { [dateKey]: [
                ...(prevEntries[dateKey] || []),
                {
                    meal,
                    calories: parseInt(calories),
                    protein: protein ? parseFloat(protein) : undefined,
                    carbs: carbs ? parseFloat(carbs) : undefined,
                    fats: fats ? parseFloat(fats) : undefined,
                },
            ] })));
        // Clear form fields but keep the modal open
        setMeal('');
        setCalories('');
        setProtein('');
        setCarbs('');
        setFats('');
        setIsMealLogged(true);
    };
    const getTotalCalories = (dateKey) => {
        if (!calorieEntries[dateKey])
            return 0;
        return calorieEntries[dateKey].reduce((total, entry) => total + entry.calories, 0);
    };
    const getProgressPercentage = () => {
        const dateKey = formatDate(selectedDate); // Get the key for the selected date
        const totalCalories = getTotalCalories(dateKey); // Get total calories for that date
        if (totalCalories > calorieGoal) {
            return Math.max(0, (calorieGoal / totalCalories) * 100);
        }
        return Math.min((totalCalories / calorieGoal) * 100, 100); // Calculate percentage
    };
    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + days); // Increment/Decrement date
        setSelectedDate(newDate);
    };
    const closeModal = () => {
        setIsModalOpen(false); // Close modal
    };
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateKey = formatDate(date);
            const totalCalories = getTotalCalories(dateKey);
            return (<div className="calendar-day-content">
          <span>{totalCalories} calories</span>
        </div>);
        }
        return null;
    };
    return (<div className="logger">
      {/* Full-Screen Calendar Display */}
      <div className="calendar-container">
      <react_calendar_1.default onChange={handleCalendarChange} value={selectedDate} tileContent={tileContent} tileClassName={getTileClassName} // Set class name dynamically for each tile
     maxDate={new Date()} // Optional: prevent future dates
    />
      </div>

      {/* Popup Modal for Meal Input Form */}
      {isModalOpen && (<div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              ×
            </button>
            <div className="date-navigator">
              <button onClick={() => changeDate(-1)}>←</button>
              <span>{formatDate(selectedDate)}</span>
              <button onClick={() => changeDate(1)}>→</button>
            </div>
            <div className="calorie-goal">
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${getProgressPercentage()}%` }}></div>
              </div>
              <h2>Total Calories: {getTotalCalories(formatDate(selectedDate))} / {calorieGoal} kcal</h2>
            </div>

            {/* Meal Input Form */}
            <form onSubmit={handleSubmit} className="meal-form">
              <div className="form-group-logger">
                <label>Meal Name: </label>
                <input type="text" value={meal} onChange={(e) => setMeal(e.target.value)} placeholder="Enter meal"/>
              </div>
              <div className="form-group-logger">
                <label>Calories: </label>
                <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Enter calories"/>
              </div>
              <div className="form-group-logger">
                <label>Protein (g): </label>
                <input type="number" value={protein} onChange={(e) => setProtein(e.target.value)} placeholder="Enter protein" step="0.1"/>
              </div>
              <div className="form-group-logger">
                <label>Carbs (g): </label>
                <input type="number" value={carbs} onChange={(e) => setCarbs(e.target.value)} placeholder="Enter carbs" step="0.1"/>
              </div>
              <div className="form-group-logger">
                <label>Fats (g): </label>
                <input type="number" value={fats} onChange={(e) => setFats(e.target.value)} placeholder="Enter fats" step="0.1"/>
              </div>
              <div className="form-group-logger">
                <label>Weight: </label>
                <input type="number" value={weight} onChange={(e) => setWeight(parseFloat(e.target.value))}/>
              </div>
              <button type="submit" className="btn-add-meal">Add Meal</button>
            </form>


            {/* Display Meals for Selected Date */}
            <div className="meal-list">
              <h4>Meals for {formatDate(selectedDate)}</h4>
              <ul>
                {calorieEntries[formatDate(selectedDate)] &&
                calorieEntries[formatDate(selectedDate)].map((entry, index) => (<li key={index}>
                      {entry.meal} - {entry.calories} kcal
                      {entry.protein && ` | P: ${entry.protein}g`}
                      {entry.carbs && ` | C: ${entry.carbs}g`}
                      {entry.fats && ` | F: ${entry.fats}g`}
                    </li>))}
              </ul>
            </div>
          </div>
        </div>)}
    </div>);
};
exports.default = Logger;
