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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const AuthContext_1 = require("../AuthContext");
require("./CalorieForm.css");
const heavyman_upscaled_png_1 = __importDefault(require("../assets/heavyman_upscaled.png")); // Adjust path based on your structure
const CalorieForm = () => {
    // Form state for user inputs
    const [age, setAge] = (0, react_1.useState)("");
    const [height, setHeight] = (0, react_1.useState)(170); // Default height
    const [weight, setWeight] = (0, react_1.useState)(70); // Default weight
    const [goal, setGoal] = (0, react_1.useState)("gain muscle easy");
    const [activity, setActivity] = (0, react_1.useState)("1.2");
    const [gender, setGender] = (0, react_1.useState)(1);
    const [endurance, setEndurance] = (0, react_1.useState)(0);
    const [muscle, setMuscle] = (0, react_1.useState)(0);
    const [bmi, setBmi] = (0, react_1.useState)(0);
    const [eating, setEating] = (0, react_1.useState)(0);
    const [daily, setDaily] = (0, react_1.useState)(0);
    const [unknown, setUnknown] = (0, react_1.useState)(0);
    const [error, setError] = (0, react_1.useState)("");
    const [successMessage, setSuccessMessage] = (0, react_1.useState)("");
    const [selectedImages, setSelectedImages] = (0, react_1.useState)([]); // Store multiple selected images
    const toggleImageSelection = (index) => {
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.includes(index)) {
                // If image is already selected, remove it from the array
                return prevSelectedImages.filter((i) => i !== index);
            }
            else {
                // Otherwise, add it to the array
                return [...prevSelectedImages, index];
            }
        });
    };
    const setTrue = (image_title) => {
        switch (image_title) {
            case "Endurance":
                setEndurance(1 - endurance);
                break;
            case "Gain Muscle":
                setMuscle(1 - muscle);
                break;
            case "Stabilize BMI":
                setBmi(1 - bmi);
                break;
            case "Healthy Eating":
                setEating(1 - eating);
                break;
            case "Daily Activity":
                setDaily(1 - daily);
                break;
            case "Undecided":
                setUnknown(1 - unknown);
                break;
        }
    };
    const images = [
        { src: './src/assets/endurance.png', alt: "Endurance", title: "Endurance" },
        { src: './src/assets/gainmuscle.png', alt: "Gain Muscle", title: "Gain Muscle" },
        { src: './src/assets/stabilizebmi.png', alt: "Stabilize BMI", title: "Stabilize BMI" },
        { src: './src/assets/healthyeating.png', alt: "Healthy Eating", title: "Healthy Eating" },
        { src: './src/assets/dailyactivity.png', alt: "Daily Activity", title: "Daily Activity" },
        { src: './src/assets/undecided.png', alt: "Undecided", title: "Undecided" },
    ];
    const { isAuthenticated, token } = (0, AuthContext_1.useAuth)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [loading, setLoading] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        setLoading(false);
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, loading]);
    const userID = localStorage.getItem("userID");
    (0, react_1.useEffect)(() => {
        setLoading(false);
        if (!loading && !isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate, loading]);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault(); // Prevent page reload on form submit
        if (!userID) {
            setError("User is not logged in");
            console.log(error);
            return;
        }
        // Construct the data to be sent in the request
        const formData = {
            userID,
            age,
            height,
            weight,
            gender,
            goal,
            activity,
            endurance,
            muscle,
            bmi,
            eating,
            daily,
            unknown
        };
        try {
            const response = yield fetch("http://localhost:8081/userstats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include token for authenticated request
                },
                body: JSON.stringify(formData), // Convert the data to JSON
            });
            if (response.ok) {
                setSuccessMessage("Stats added successfully!");
                console.log(successMessage);
                localStorage.setItem("goal", goal);
                setGoal("");
                setAge("");
                setWeight("");
                setHeight("");
                window.location.href = "/plan";
            }
            else {
                const errorData = yield response.json();
                setError(`Error: ${errorData.error}`);
            }
        }
        catch (err) {
            setError("Failed to submit the data. Please try again.");
            console.error(err);
        }
    });
    return (<div className="form-card col-md-12">
      <h2>Tell Us About Yourself</h2>
      <form onSubmit={handleSubmit}>
        {/* Age input */}
        <div className="form-group-calorie-form">
          <label htmlFor="age">Age:</label>
          <input type="number" id="age" value={age} onChange={(e) => setAge(Number(e.target.value))} className="form-control" required/>
        </div>

        {/* Gender input */}
        <div className="form-group-calorie-form">
          <label htmlFor="gender">Gender:</label>
          <select id="gender" value={gender} onChange={(e) => setGender(parseInt(e.target.value))} className="form-control" required>
            <option value="0">Male</option>
            <option value="1">Female</option>
          </select>
        </div>
        {/* Height input and slider */}
        <div className="form-group-calorie-form">
            <label htmlFor="height">Height (cm):</label>
            <div className="icon-container">
                <img src={heavyman_upscaled_png_1.default} alt="left" className="icon-left"/>
                <img src={heavyman_upscaled_png_1.default} alt="right" className="icon-right" width="20px"/>
            </div>
            <div className="slider-container">
                <input type="range" min="100" max="250" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="slider"/>
                <span className="slider-value">{height || 0}cm</span> {/* Display slider value */}
            </div>
        </div>
        {/* Weight input and slider */}
        <div className="form-group-calorie-form">
            <label htmlFor="weight">Weight (kg):</label>
            <div className="icon-container">
                <img src={heavyman_upscaled_png_1.default} alt="left" className="icon-left-light"/>
                <img src={heavyman_upscaled_png_1.default} alt="right" className="icon-right-heavy"/>
            </div>
            <div className="slider-container">
                <input type="range" min="30" max="250" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="slider"/>
                <span className="slider-value">{weight || 0}kg</span> {/* Display slider value */}
            </div>
        </div>
        {/* Goal dropdown */}
        <div className="form-group-calorie-form">
          <label htmlFor="goal">Goal:</label>
          <select id="goal" value={goal} onChange={(e) => setGoal(e.target.value)} className="form-control" required>
            <option value="gain muscle easy">Gain Muscle (0.1 kg/week)</option>
            <option value="gain muscle hard">Gain Muscle (0.2 kg/week)</option>
            <option value="lose fat easy">Lose Fat (0.5 kg/week)</option>
            <option value="lose fat hard">Lose Fat (1.0 kg/week)</option>
            <option value="gain weight easy">Gain Weight (0.5 kg/week)</option>
            <option value="gain weight hard">Gain Weight (1.0 kg/week)</option>
            <option value="maintain weight">Maintain Weight (0.0 kg/week)</option>
          </select>
        </div>

        {/* Activity dropdown */}
        <div className="form-group-calorie-form">
          <label htmlFor="activity">Activity Level:</label>
          <select id="activity" value={activity} onChange={(e) => setActivity(e.target.value)} className="form-control" required>
            <option value="1.2">Little or no exercise</option>
            <option value="1.375">Light exercise/sports 1-3 days/week</option>
            <option value="1.55">Moderate exercise/sports 3-5 days/week</option>
            <option value="1.725">Hard exercise/sports 6-7 days a week</option>
            <option value="1.9">Very hard exercise/sports & a physical job</option>
          </select>
        </div>

        {/* Toggleable images */}
        <label htmlFor="activity">Interests:</label>
        <div className="image-grid">
          {images.map((image, index) => (<div key={index} className="image-container">
              <img src={image.src} alt={image.alt} className={`grid-image ${selectedImages.includes(index) ? "selected" : ""}`} onClick={() => {
                toggleImageSelection(index);
                setTrue(image.title);
            }}/>
              <div className="image-title">{image.title}</div> {/* Display title below the image */}
            </div>))}
        </div>
        {/* Submit button */}
        <div className="form-group-calorie-form">
          <button type="submit" className="btn btn-primary button-calorie-form">
            Continue
          </button>
        </div>
      </form>
    </div>);
};
exports.default = CalorieForm;
