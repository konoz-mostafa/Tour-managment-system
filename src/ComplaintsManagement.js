// import React, { useEffect, useState } from 'react';
// import './ComplaintsManagement.css';
// import Supportpic from './Supportpic.jpg';

// const API_BASE = "https://your-api-url.com/api/complaints"; // يبدله الباك لينك حقيقي

// const ComplaintsManagement = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [response, setResponse] = useState('');
//   const [error, setError] = useState('');
//   const [selectedComplaintId, setSelectedComplaintId] = useState(null);

//   useEffect(() => {
//     fetchComplaints();
//   }, []);

//   const fetchComplaints = async () => {
//     try {
//       const res = await fetch(API_BASE);
//       const data = await res.json();
//       setComplaints(data);
//     } catch {
//       setError('Failed to fetch complaints');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResponse = async () => {
//     if (!response || !selectedComplaintId) {
//       setError('Please select a complaint and enter a response');
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE}/${selectedComplaintId}/respond`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ response }),
//       });

//       if (!res.ok) throw new Error();

//       const updated = complaints.map((c) =>
//         c.id === selectedComplaintId ? { ...c, status: 'Responded' } : c
//       );
//       setComplaints(updated);
//       setResponse('');
//       setSelectedComplaintId(null);
//       setError('');
//     } catch {
//       setError('Failed to submit response');
//     }
//   };

//   return (
//     <div className="complaints-management-container" style={{ backgroundImage: `url(${Supportpic})` }}>
//       <h2 style={{ color: 'white' }}>Complaints Management</h2>

//       {loading ? (
//         <p>Loading complaints...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <table className="complaints-table">
//           <thead>
//             <tr>
//               <th>Complaint ID</th>
//               <th>User</th>
//               <th>Message</th>
//               <th>Status</th>
//               <th>Respond</th>
//             </tr>
//           </thead>
//           <tbody>
//             {complaints.map((complaint) => (
//               <tr key={complaint.id}>
//                 <td>{complaint.id}</td>
//                 <td>{complaint.user?.name || complaint.userId}</td>
//                 <td>{complaint.message || complaint.title}</td>
//                 <td>{complaint.status || 'Pending'}</td>
//                 <td>
//                   <button
//                     onClick={() => setSelectedComplaintId(complaint.id)}
//                     className="respond-btn"
//                   >
//                     Select
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       <div className="response-section">
//         <textarea
//           value={response}
//           onChange={(e) => setResponse(e.target.value)}
//           placeholder="Enter your response"
//         />
//         <button
//           className="submit-response"
//           onClick={handleResponse}
//         >
//           Submit Response
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ComplaintsManagement;





// test
import React, { useEffect, useState } from 'react';
import './ComplaintsManagement.css';
import Supportpic from './Supportpic.jpg';
import BackiconAdmin from './BackiconAdmin.jpg';

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setComplaints(data);
      } catch (err) {
        setError('Error fetching complaints.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleResponse = async (id) => {
    if (!response) {
      setError('Please enter a response.');
      return;
    }

    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response }),
      });

      if (res.ok) {
        setComplaints(complaints.map(complaint =>
          complaint.id === id ? { ...complaint, status: 'Responded' } : complaint
        ));
        setResponse('');
        setError('');
      } else {
        setError('Error submitting response.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="complaints-management-container" style={{ backgroundImage: `url(${Supportpic})` }}>
      <h2 style={{ color: 'white' }}>Complaints Management</h2>

      {loading ? (
        <p>Loading complaints...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>User</th>
              <th>Complaint Message</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.userId}</td>
                <td>{complaint.title}</td>
                <td>{complaint.status || 'Pending'}</td>
                <td>
                  <div className="button-group">
                    <button className="respond-btn" onClick={() => handleResponse(complaint.id)}>
                      Respond
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="response-section">
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Enter your response"
        />
        <button className="submit-response" onClick={() => {
          if (complaints.length > 0) handleResponse(complaints[0].id);
        }}>
          Submit Response
        </button>
      </div>
    </div>
  );
};

export default ComplaintsManagement;

