// the real one

// import React, { useEffect, useState } from 'react';
// import './MonitorBookings.css';
// import Bookingman from './Bookingman.jpg';
// import BackiconAdmin from './BackiconAdmin.jpg';
// import { useNavigate } from 'react-router-dom';

// const MonitorBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const [filters, setFilters] = useState({
//     Date: '',
//     status: '',
//   });

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('https://your-backend-api.com/api/bookings');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();

//         // افترض إن البيانات اللي راجعة بالفعل فيها الحقول دي
//         // id, touristName, tripName, date, status
//         setBookings(data);
//       } catch (err) {
//         setError('Failed to fetch bookings.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const filteredBookings = bookings.filter((booking) => {
//     const matchesDate = filters.Date
//       ? new Date(booking.date) >= new Date(filters.Date)
//       : true;

//     const matchesStatus = filters.status
//       ? booking.status === filters.status
//       : true;

//     return matchesDate && matchesStatus;
//   });

//   return (
//     <div className="monitor-bookings-container" style={{ backgroundImage: `url(${Bookingman})` }}>
//       <h2 style={{ color: "white" }}>Monitor All Bookings and Transactions</h2>

//       <div className="filters">
//         <input
//           type="date"
//           value={filters.Date}
//           onChange={(e) => setFilters({ ...filters, Date: e.target.value })}
//         />

//         <select
//           value={filters.status}
//           onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//         >
//           <option value="">All Statuses</option>
//           <option value="pending">Pending</option>
//           <option value="approved">Approved</option>
//           <option value="cancelled">Cancelled</option>
//         </select>
//       </div>

//       {loading ? (
//         <p>Loading bookings...</p>
//       ) : error ? (
//         <p className="error-message">{error}</p>
//       ) : (
//         <table className="bookings-table">
//           <thead>
//             <tr>
//               <th>Booking ID</th>
//               <th>Tourist Name</th>
//               <th>Trip</th>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredBookings.map((booking) => (
//               <tr key={booking.id}>
//                 <td>{booking.id}</td>
//                 <td>{booking.touristName}</td>
//                 <td>{booking.tripName}</td>
//                 <td>{new Date(booking.date).toLocaleDateString()}</td>
//                 <td>{booking.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default MonitorBookings;



// -------------------------
// test

import React, { useEffect, useState } from 'react';
import './MonitorBookings.css';
import Bookingman from './Bookingman.jpg';
import BackiconAdmin from './BackiconAdmin.jpg';
import { useNavigate } from 'react-router-dom';

const MonitorBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    Date: '',
    status: '',
  });


  // محاكاة API وهمي
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // استخدام API وهمي
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // API وهمي لاختبار الكود
        const data = await response.json();
        const mockBookings = data.slice(0, 10).map((post, index) => ({
          id: index + 1,
          touristName: `Tourist ${index + 1}`,
          tripName: `Trip ${index + 1}`,
          date: '2025-04-08',
          status: index % 2 === 0 ? 'approved' : 'pending',
        }));
        setBookings(mockBookings);
      } catch (err) {
        setError('Failed to fetch bookings.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);


  // تصفية البيانات بناءً على الفلاتر
  const filteredBookings = bookings.filter((booking) => {
    const matchesDate = filters.Date
      ? new Date(booking.date) >= new Date(filters.Date)
      : true;
    
    const matchesStatus = filters.status ? booking.status === filters.status : true;

    return matchesDate && matchesStatus;
  });

  return (
    <div className="monitor-bookings-container" style={{ backgroundImage: `url(${Bookingman})` }}>
      <h2 style={{color:"white"}}>Monitor All Bookings and Transactions</h2>

      {/* فلاتر البيانات */}
      <div className="filters">
        <input
          type="date"
          value={filters.Date}
          onChange={(e) => setFilters({ ...filters, Date: e.target.value })}
        />
        
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* عرض بيانات الحجوزات */}
      {loading ? (
        <p>Loading bookings...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="bookings-table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Tourist Name</th>
              <th>Trip</th>
              <th>Date</th>
              <th>Status</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.touristName}</td>
                <td>{booking.tripName}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.status}</td>
              
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
    </div>
  );
};

export default MonitorBookings;
