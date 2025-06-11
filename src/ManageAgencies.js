// the real ne

// import React, { useEffect, useState } from "react";
// import './ManageAgencies.css';
// import Aganceman from './Aganceman.jpg';

// const API_BASE = "https://your-api-url.com/api/agencies"; // ضع هنا رابط API الخاص بالباك

// const ManageAgencies = () => {
//   const [agencies, setAgencies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [newAgency, setNewAgency] = useState({ name: "", email: "", address: "", password: "" });
//   const [formError, setFormError] = useState("");

//   useEffect(() => {
//     fetchAgencies();
//   }, []);

//   const fetchAgencies = async () => {
//     try {
//       const response = await fetch(API_BASE);
//       const data = await response.json();
//       setAgencies(data);
//     } catch (err) {
//       setError("Failed to fetch agencies");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (id, action) => {
//     const url = `${API_BASE}/${id}`;
//     const method = action === "delete" ? "DELETE" : "PUT";

//     try {
//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: action !== "delete" ? JSON.stringify({ status: action }) : null,
//       });

//       if (!response.ok) {
//         throw new Error();
//       }

//       if (action === "delete") {
//         setAgencies(agencies.filter((agency) => agency.id !== id));
//       } else {
//         const updated = agencies.map((agency) =>
//           agency.id === id ? { ...agency, status: action } : agency
//         );
//         setAgencies(updated);
//       }
//     } catch {
//       setError("Failed to update agency");
//     }
//   };

//   const handleCreateAgency = async () => {
//     if (!newAgency.name || !newAgency.email || !newAgency.address || !newAgency.password) {
//       setFormError("Please fill all fields");
//       return;
//     }

//     try {
//       const response = await fetch(API_BASE, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newAgency),
//       });

//       if (!response.ok) {
//         throw new Error();
//       }

//       const created = await response.json();
//       setAgencies([...agencies, created]);
//       setNewAgency({ name: "", email: "", address: "", password: "" });
//       setFormError("");
//     } catch {
//       setFormError("Failed to create agency");
//     }
//   };

//   return (
//     <div className="manage-agencies-container" style={{ backgroundImage: `url(${Aganceman})` }}>
//       <h2 style={{ color: "white" }}>Manage Agencies</h2>

//       <div className="create-agency-form">
//         <h3 style={{ color: "white" }}>Create New Agency</h3>
//         {formError && <p className="error-message">{formError}</p>}
//         <input
//           type="text"
//           placeholder="Agency Name"
//           value={newAgency.name}
//           onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Agency Email"
//           value={newAgency.email}
//           onChange={(e) => setNewAgency({ ...newAgency, email: e.target.value })}
//         />
//         <input
//           type="password"
//           placeholder="Agency Password"
//           value={newAgency.password}
//           onChange={(e) => setNewAgency({ ...newAgency, password: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Agency Address"
//           value={newAgency.address}
//           onChange={(e) => setNewAgency({ ...newAgency, address: e.target.value })}
//         />
//         <button onClick={handleCreateAgency}>Create Agency</button>
//       </div>

//       {loading ? (
//         <p>Loading agencies...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <table className="agencies-table">
//           <thead>
//             <tr>
//               <th>Agency Name</th>
//               <th>Email</th>
//               <th>Address</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {agencies.map((agency) => (
//               <tr key={agency.id}>
//                 <td>{agency.name}</td>
//                 <td>{agency.email}</td>
//                 <td>{agency.address || "No address"}</td>
//                 <td>{agency.status || "pending"}</td>
//                 <td>
//                   <button
//                     onClick={() => handleAction(agency.id, "approved")}
//                     disabled={agency.status === "approved"}
//                   >
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleAction(agency.id, "rejected")}
//                     disabled={agency.status === "rejected"}
//                   >
//                     Reject
//                   </button>
//                   <button onClick={() => handleAction(agency.id, "delete")}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ManageAgencies;



//test

import React, { useEffect, useState } from "react";
import './ManageAgencies.css';
import Aganceman from './Aganceman.jpg';
import BackiconAdmin from './BackiconAdmin.jpg';

const ManageAgencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newAgency, setNewAgency] = useState({ name: "", email: "", address: "" , password:""});
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await response.json();
        setAgencies(data);
      } catch (err) {
        setError("Failed to fetch agencies.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAgencies();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const url = `https://jsonplaceholder.typicode.com/users/${id}`;
      const method = action === "delete" ? "DELETE" : "PUT";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: action !== "delete" ? JSON.stringify({ status: action }) : null,
      });

      if (response.ok) {
        if (action === "delete") {
          setAgencies(agencies.filter((agency) => agency.id !== id));
        } else {
          const updatedAgencies = agencies.map((agency) =>
            agency.id === id ? { ...agency, status: action } : agency
          );
          setAgencies(updatedAgencies);
        }
      } else {
        setError("Failed to update agency status.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error(err);
    }
  };

  const handleCreateAgency = async () => {
    if (!newAgency.name || !newAgency.email || !newAgency.address) {
      setFormError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAgency),
      });

      if (response.ok) {
        const createdAgency = await response.json();
        setAgencies([...agencies, createdAgency]);
        setNewAgency({ name: "", email: "", address: "" ,password:""});
        setFormError("");
      } else {
        setFormError("Failed to create agency.");
      }
    } catch (err) {
      setFormError("Network error. Please try again.");
      console.error(err);
    }
  };

  
  const formatAddress = (address) => {
    if (address && address.street && address.city) {
      return `${address.street}, ${address.city}, ${address.zipcode}`;
    }
    return "No address";
  };

  return (
    <div className="manage-agencies-container" style={{ backgroundImage: `url(${Aganceman})` }} >
      <h2 style={{color:"white"}}>Manage Agencies</h2>

      <div className="create-agency-form">
        <h3 style={{color:"white"}}>Create New Agency</h3>
        {formError && <p className="error-message">{formError}</p>}
        <input
          type="text"
          placeholder="Agency Name"
          value={newAgency.name}
          onChange={(e) => setNewAgency({ ...newAgency, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Agency Email"
          value={newAgency.email}
          onChange={(e) => setNewAgency({ ...newAgency, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Agency password"
          value={newAgency.password}
          onChange={(e) => setNewAgency({ ...newAgency, password: e.target.value })}
        />
        
        <input
          type="text"
          placeholder="Agency Address"
          value={newAgency.address}
          onChange={(e) => setNewAgency({ ...newAgency, address: e.target.value })}
        />
        <button onClick={handleCreateAgency}>Create Agency</button>
      </div>

      {loading ? (
        <p>Loading agencies...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="agencies-table">
          <thead>
            <tr>
              <th>Agency Name</th>
              <th>Email</th>
              <th>Address</th> 
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agencies.map((agency) => (
              <tr key={agency.id}>
                <td>{agency.name}</td>
                <td>{agency.email}</td>
                <td>{formatAddress(agency.address) || "No address"}</td>
                <td>{agency.status || "pending"}</td>
                <td>
                  <button
                    onClick={() => handleAction(agency.id, "approved")}
                    disabled={agency.status === "approved"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(agency.id, "rejected")}
                    disabled={agency.status === "rejected"}
                  >
                    Reject
                  </button>
                  <button onClick={() => handleAction(agency.id, "delete")}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default ManageAgencies;

