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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ProjectsTable = () => {
    const [data, setData] = (0, react_1.useState)([]);
    const [categories, setCategories] = (0, react_1.useState)([]);
    const [editID, setEditID] = (0, react_1.useState)(null);
    const [editCategoryID, setEditCategoryID] = (0, react_1.useState)(-1);
    const [editProjectName, setEditProjectName] = (0, react_1.useState)("");
    const [editProjectDescription, setEditProjectDescription] = (0, react_1.useState)("");
    const [editStartDate, setEditStartDate] = (0, react_1.useState)("");
    const [editEndDate, setEditEndDate] = (0, react_1.useState)("");
    const [editFundGoal, setEditFundGoal] = (0, react_1.useState)(0);
    (0, react_1.useEffect)(() => {
        fetch("http://localhost:8081/projects")
            .then((res) => res.json())
            .then((data) => {
            setData(data);
        })
            .catch((err) => console.log(err));
        fetch("http://localhost:8081/categories")
            .then((res) => res.json())
            .then((data) => {
            setCategories(data);
        })
            .catch((err) => console.log(err));
    }, []);
    const getCategoryName = (categoryID) => {
        const category = categories.find((cat) => cat.categoryID === categoryID);
        return category ? category.categoryName : "Unknown";
    };
    const handleEdit = (item) => {
        setEditID(item.projectID);
        setEditProjectName(item.projectName);
        setEditProjectDescription(item.projectDescription);
        setEditStartDate(item.startDate);
        setEditEndDate(item.endDate);
        setEditFundGoal(item.fundGoal);
    };
    const handleUpdate = () => {
        if (editID === null)
            return;
        const projectData = {
            projectID: editID,
            categoryID: editCategoryID,
            projectName: editProjectName,
            projectDescription: editProjectDescription,
            startDate: editStartDate,
            endDate: editEndDate,
            fundGoal: editFundGoal,
        };
        fetch("http://localhost:8081/update_project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(projectData),
        })
            .then((response) => response.json())
            .then((data) => {
            console.log("Project updated successfully:", data);
            location.reload();
            setEditID(null);
        })
            .catch((error) => {
            console.error("Error updating project:", error);
        });
    };
    const handleDelete = (projectID) => {
        // Confirm the deletion
        if (window.confirm("Are you sure you want to delete this project?")) {
            const projectData = {
                projectID: projectID,
            };
            fetch("http://localhost:8081/delete_projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(projectData),
            })
                .then((response) => response.json())
                .then((data) => {
                console.log("Project deleted successfully:", data);
                // Refresh or update the data in your component
                // For example, you can refetch the project list or update the state
                setData((prevData) => prevData.filter((project) => project.projectID !== projectID));
            })
                .catch((error) => {
                console.error("Error deleting project:", error);
            });
        }
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };
    return (<>
      {data.length > 0 ? (<table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Funding Goal</th>
              <th>Funding Amount</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => editID !== item.projectID ? (<tr key={item.projectID}>
                  <td>{item.projectID}</td>
                  <td>{item.projectName}</td>
                  <td>{item.projectDescription}</td>
                  <td>{formatDate(item.startDate)}</td>
                  <td>{formatDate(item.endDate)}</td>
                  <td>{item.fundGoal}</td>
                  <td>{item.fundAmount}</td>
                  <td>{getCategoryName(item.categoryID)}</td>{" "}
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.projectID)}>
                      Delete
                    </button>
                  </td>
                </tr>) : (<tr key={item.projectID}>
                  <td>{item.projectID}</td>
                  <td>
                    <input type="text" value={editProjectName} onChange={(e) => setEditProjectName(e.target.value)}/>
                  </td>
                  <td>
                    <input type="text" value={editProjectDescription} onChange={(e) => setEditProjectDescription(e.target.value)}/>
                  </td>
                  <td>
                    <input type="date" value={editStartDate} onChange={(e) => setEditStartDate(e.target.value)}/>
                  </td>
                  <td>
                    <input type="date" value={editEndDate} onChange={(e) => setEditEndDate(e.target.value)}/>
                  </td>
                  <td>
                    <input type="number" value={editFundGoal} onChange={(e) => setEditFundGoal(Number(e.target.value))}/>
                  </td>
                  <td>{item.fundAmount}</td>
                  <td>
                    <select value={editCategoryID || ""} onChange={(e) => {
                    setEditCategoryID(Number(e.target.value));
                }}>
                      <option value="">Select Category</option>
                      {categories.map((category) => (<option key={category.categoryID} value={category.categoryID}>
                          {category.categoryName}
                        </option>))}
                    </select>
                  </td>
                  <td>
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => handleDelete(item.projectID)}>
                      Delete
                    </button>
                  </td>
                </tr>))}
          </tbody>
        </table>) : (<p>No data available</p>)}
    </>);
};
exports.default = ProjectsTable;
