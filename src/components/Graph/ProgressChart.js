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
exports.calculateTimeRange = exports.calculateWeightLossBetweenExtremes = void 0;
const react_1 = require("react");
const react_chartjs_2_1 = require("react-chartjs-2");
const chart_js_1 = require("chart.js"); // Import LinearScale
require("./ProgressChart.css");
const AuthContext_tsx_1 = require("../../AuthContext.tsx");
// Register the required components
chart_js_1.Chart.register(...chart_js_1.registerables, chart_js_1.LinearScale); // Register LinearScale
const calculateWeightLossBetweenExtremes = (records) => {
    if (records.length < 2)
        return 0; // Not enough data to calculate weight loss
    const oldestWeight = records[0].weight; // Weight of the oldest record
    const newestWeight = records[records.length - 1].weight; // Weight of the newest record
    return oldestWeight - newestWeight; // Calculate weight loss
};
exports.calculateWeightLossBetweenExtremes = calculateWeightLossBetweenExtremes;
const calculateTimeRange = (records) => {
    if (records.length === 0)
        return 0;
    const oldestDate = new Date(records[0].date);
    const newestDate = new Date(records[records.length - 1].date);
    const durationInDays = Math.abs((newestDate.getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24)); // Difference in days
    return durationInDays;
};
exports.calculateTimeRange = calculateTimeRange;
const ProgressChart = () => {
    const [chartData, setChartData] = (0, react_1.useState)(null);
    const [calorieGoal, setCalorieGoal] = (0, react_1.useState)(0); // State for calorie goal
    const [data, setData] = (0, react_1.useState)([]);
    const userID = localStorage.getItem("userID");
    const [averageWeightLoss, setAverageWeightLoss] = (0, react_1.useState)(0); // State for average weight loss
    const [weightMessage, setWeightMessage] = (0, react_1.useState)("");
    const [duration, setDuration] = (0, react_1.useState)(0);
    const [adjustedCals, setAdjCals] = (0, react_1.useState)(0);
    const { token } = (0, AuthContext_tsx_1.useAuth)();
    const [adjMessage] = (0, react_1.useState)("Your New Suggested Calorie Intake: ");
    const [averageCaloriePercentage, setAverageCaloriePercentage] = (0, react_1.useState)(0); // Store avg calorie %
    const groupByDate = (records) => {
        const grouped = {};
        records.forEach(record => {
            const splitDate = record.date.split("-");
            const noYear = splitDate[1] + "-" + splitDate[2];
            const date = noYear.split("T")[0];
            if (!grouped[date]) {
                grouped[date] = {
                    caloriesEaten: record.caloriesEaten,
                    weight: record.weight,
                    caloriesGoal: record.calorieGoal,
                };
            }
            else {
                grouped[date].caloriesEaten += record.caloriesEaten;
                grouped[date].weight = record.weight;
            }
        });
        return grouped;
    };
    const handleEditClick = () => {
        console.log(-(averageWeightLoss / (duration / 7)));
        fetchAdjPlan();
    };
    const handleUpdateClick = () => {
        updateGoal();
    };
    const updateGoal = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch('http://localhost:8081/api/updateGoal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ goal: (adjustedCals), userID: userID }),
            });
            if (!response.ok) {
                throw new Error('');
            }
        }
        catch (err) {
            console.log(err);
        }
        finally {
        }
    });
    const fetchAdjPlan = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("average " + -(averageWeightLoss / (duration / 7)));
            const response = yield fetch('http://localhost:8081/api/adjust-diet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ actualWeightChangeRate: -(averageWeightLoss / (duration / 7)), userID: userID }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch diet plan');
            }
            const data = yield response.json();
            setAdjCals(data);
        }
        catch (err) {
            console.log(err);
        }
        finally {
        }
    });
    (0, react_1.useEffect)(() => {
        fetch(`http://localhost:8081/api/dailyrecords/${userID}`)
            .then((res) => res.json())
            .then((data) => __awaiter(void 0, void 0, void 0, function* () {
            setData(data);
            setAverageWeightLoss(Math.round((0, exports.calculateWeightLossBetweenExtremes)(data) * 10) / 10); // Calculate average weight loss
            setDuration((0, exports.calculateTimeRange)(data));
            console.log(averageWeightLoss);
            if (averageWeightLoss < 0) {
                console.log("hi");
                setWeightMessage("Your Overall Weight Gain:");
                console.log(weightMessage);
            }
            else {
                setWeightMessage("Your Overall Weight Loss:");
                console.log("bye");
            }
        }))
            .catch((err) => console.log(err));
    }, [userID]);
    (0, react_1.useEffect)(() => {
        if (averageWeightLoss < 0) {
            setWeightMessage("Your Overall Weight Gain:");
        }
        else {
            setWeightMessage("Your Overall Weight Loss:");
        }
    }, [averageWeightLoss]);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const records = data;
                const groupedRecords = groupByDate(records);
                let avgPercent = 0;
                let counter = 0;
                for (const date in groupedRecords) {
                    avgPercent += (groupedRecords[date].caloriesEaten / groupedRecords[date].caloriesGoal) * 100;
                    counter++;
                }
                if (counter != 0) {
                    setAverageCaloriePercentage(Math.round(Math.min(avgPercent / counter, 200 - avgPercent / counter)));
                }
                const labels = Object.keys(groupedRecords);
                const weightData = labels.map(date => groupedRecords[date].weight);
                const calorieData = labels.map(date => groupedRecords[date].caloriesEaten);
                const calorieGoalData = labels.map(date => groupedRecords[date].caloriesGoal);
                const maxWeight = Math.max(...weightData);
                const weightAxisMax = maxWeight * 1.2;
                setCalorieGoal(((_a = records[records.length - 1]) === null || _a === void 0 ? void 0 : _a.calorieGoal) || 0);
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Weight (kg)',
                            data: weightData,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            yAxisID: 'y-axis-weight',
                        },
                        {
                            label: 'Calories Eaten',
                            data: calorieData,
                            borderColor: 'rgba(255, 99, 132, 1)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            yAxisID: 'y-axis-calories',
                        },
                        {
                            label: 'Calorie Goal',
                            data: (calorieGoalData),
                            borderColor: 'rgba(255, 215, 0, 1)',
                            backgroundColor: 'rgba(255, 215, 0, 0.2)',
                            borderDash: [5, 5],
                            yAxisID: 'y-axis-calories',
                        },
                    ],
                });
                setOptions({
                    scales: {
                        'y-axis-weight': {
                            type: 'linear',
                            position: 'left',
                            beginAtZero: true,
                            max: weightAxisMax,
                        },
                        'y-axis-calories': {
                            type: 'linear',
                            position: 'right',
                            beginAtZero: true,
                        },
                    },
                });
            }
            catch (error) {
                console.error('Error fetching daily records:', error);
            }
        });
        fetchData();
    }, [data, calorieGoal]);
    const [options, setOptions] = (0, react_1.useState)({
        scales: {
            'y-axis-weight': {
                type: 'linear',
                position: 'left',
                beginAtZero: true,
            },
            'y-axis-calories': {
                type: 'linear',
                position: 'right',
                beginAtZero: true,
            },
        },
    });
    return (<div>
            <div className="chart-container">
                <h2 className="chart-title">Progress Over Time</h2>
                {chartData ? (<react_chartjs_2_1.Line data={chartData} options={options}/>) : (<p className="loading-message">Loading chart...</p>)}
            </div>
            <div className="wl-results">{weightMessage} {Math.abs(averageWeightLoss)} kg in {duration} days!
                <div>Your accuraccy towards your calorie goal was {averageCaloriePercentage}%</div>
                <p></p>
                <p>
                    <button onClick={handleEditClick} className={"btn-recalibrate"}>
                        Recalibrate Diet
                    </button>
                </p>

                <div>{adjustedCals != 0 && (adjMessage + adjustedCals)}</div>
                <p></p>
                {adjustedCals != 0 && (<button onClick={handleUpdateClick} className={"btn-recalibrate"}>
                        Save New Goal
                    </button>)}
                <p></p>

            </div>

        </div>);
};
exports.default = ProgressChart;
