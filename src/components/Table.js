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
const Table = ({ TableName }) => {
    const [Data, setData] = (0, react_1.useState)([]);
    const [EditID, setEditID] = (0, react_1.useState)(-1);
    const [EditUsername, setEditUsername] = (0, react_1.useState)("");
    const [EditEmail, setEditEmail] = (0, react_1.useState)("");
    const [EditPassword, setEditPassword] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        fetch("http://localhost:8081/" + TableName)
            .then((res) => res.json())
            .then((data) => {
            setData(data);
        })
            .catch((err) => console.log(err));
    }, []);
    const handleEdit = (index, item) => {
        console.log(index);
        setEditID(index);
        setEditUsername(item.Username);
        setEditEmail(item.Email);
        setEditPassword(item.Password);
    };
    const handleUpdate = () => {
        const userData = {
            username: EditUsername,
            email: EditEmail,
            password: EditPassword,
            id: EditID,
        };
        fetch("http://localhost:8081/update_users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
            response.json();
            console.log("Full response:", response);
        })
            .then((data) => {
            console.log("User updated successfully:", data);
            location.reload();
        })
            .catch((error) => {
            console.error("Error updating user:", error);
        });
    };
    const handleDelete = (TableName, index) => {
        const userData = {
            id: index,
        };
        fetch("http://localhost:8081/delete_users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
            response.json();
            console.log("Full response:", response);
        })
            .then((data) => {
            console.log("User Deleted successfully:", data);
            location.reload();
        })
            .catch((error) => {
            console.error("Error Deleting user:", error);
        });
    };
    return (<>
      {Data && Data.length > 0 ? (<table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => EditID != index ? (<tr key={index}>
                  <td>{index}</td>
                  <td>{item.Username}</td>
                  <td>{item.Email}</td>
                  <td>{item.Password}</td>
                  <td>
                    <button onClick={() => handleEdit(index, item)}>
                      edit
                    </button>
                    <button onClick={() => handleDelete(TableName, index)}>
                      delete
                    </button>
                  </td>
                </tr>) : (<tr key={index}>
                  <td>{index}</td>
                  <td>
                    <input type="text" value={EditUsername} onChange={(e) => setEditUsername(e.target.value)}/>
                  </td>
                  <td>
                    <input type="text" value={EditEmail} onChange={(e) => setEditEmail(e.target.value)}/>
                  </td>
                  <td>
                    <input type="text" value={EditPassword} onChange={(e) => setEditPassword(e.target.value)}/>
                  </td>
                  <td>
                    <button onClick={handleUpdate}>Update</button>
                  </td>
                </tr>))}
          </tbody>
        </table>) : (<p>No data available</p>)}
    </>);
};
exports.default = Table;
