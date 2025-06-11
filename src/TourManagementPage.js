// the real one

// import AgenBackicon from './AgenBackicon.jpg';
// import React, { useState, useEffect } from 'react';
// import './TourManagement.css';
// import TourAgenMan from './TourAgenMan.jpg';

// export default function TourManagementPage() {
//   const [tours, setTours] = useState([]);
//   const [newTour, setNewTour] = useState({
//     title: '',
//     destination: '',
// description: '',
//     price: '',
//     tripCategory: '',
//     startDate: '',
//     endDate: '',
//    // itinerary: '',
//     duration: '',
//     availableSeats: '',
//     active: true,
//   });
//   const [editTour, setEditTour] = useState(null);

//   const apiUrl = "https://your-api-endpoint.com/tours"; // استبدل بـ URL الـ API الحقيقي

//   // جلب البيانات من الـ API الحقيقي
//   const fetchTours = async () => {
//     try {
//       const response = await fetch(apiUrl);
//       const data = await response.json();
//       setTours(data);
//     } catch (error) {
//       console.error("Error fetching tours:", error);
//     }
//   };

//   useEffect(() => {
//     fetchTours();
//   }, []);

//   const handleAddTour = async (e) => {
//     e.preventDefault();

//     const requestOptions = {
//       method: editTour ? 'PUT' : 'POST', // PUT لتعديل و POST لإضافة
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newTour),
//     };

//     try {
//       let response;
//       if (editTour) {
//         response = await fetch(`${apiUrl}/${editTour.id}`, requestOptions);
//       } else {
//         response = await fetch(apiUrl, requestOptions);
//       }
      
//       const result = await response.json();
//       if (editTour) {
//         const updatedTours = tours.map((tour) =>
//           tour.id === editTour.id ? { ...tour, ...newTour } : tour
//         );
//         setTours(updatedTours);
//         setEditTour(null);
//       } else {
//         setTours([...tours, result]);
//       }

//       setNewTour({
//         title: '',
//         destination: '',
//         price: '',
//         startDate: '',
//          endDate: '',
//         // itinerary: '',
//         description: '',
//         tripCategory:'',
//         duration: '',
//         availableSeats: '',
//         active: true,
//       });

//     } catch (error) {
//       console.error("Error adding/updating tour:", error);
//     }
//   };

//   const handleEditTour = (tour) => {
//     setEditTour(tour);
//     setNewTour({
//         title: tour.title,
//       destination: tour.destination,
//       price: tour.price,
//       description: tour.description,
//       tripCategory:tour.tripCategory,
//       startDate: tour.startDate,
//       endDate: tour.endDate,
//     //   itinerary: tour.itinerary,
//       duration: tour.duration,
//       availableSeats: tour.availableSeats,
//       active: tour.active,
//     });
//   };

//   const handleDeleteTour = async (id) => {
//     try {
//       const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
//       if (response.ok) {
//         setTours(tours.filter((tour) => tour.id !== id));
//       }
//     } catch (error) {
//       console.error("Error deleting tour:", error);
//     }
//   };

//   const toggleTourStatus = async (id, currentStatus) => {
//     try {
//       const updatedTour = { ...tours.find(tour => tour.id === id), active: !currentStatus };
//       const response = await fetch(`${apiUrl}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updatedTour),
//       });
//       const result = await response.json();

//       setTours(tours.map((tour) =>
//         tour.id === id ? result : tour
//       ));
//     } catch (error) {
//       console.error("Error updating tour status:", error);
//     }
//   };

//   return (
//     <div className="tour-management-container" style={{ backgroundImage: `url(${TourAgenMan})` }}>
//       <h2>Tour Management</h2>

//       {/* إضافة أو تعديل رحلة جديدة */}
//       <form onSubmit={handleAddTour}>
//         <h3>{editTour ? 'Edit Tour' : 'Add New Tour'}</h3>
//         <label>
//           Title:
//           <input
//             type="text"
//             value={newTour.title}
//             onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
//           />
//         </label>
//         <label>
//           Destination:
//           <input
//             type="text"
//             value={newTour.destination}
//             onChange={(e) => setNewTour({ ...newTour, destination: e.target.value })}
//           />
//         </label>
//         <label>
//           Price:
//           <input
//             type="number"
//             value={newTour.price}
//             onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
//           />
//         </label>
        
//         <label>
//           Category:
//           <input
//             type="text"
//             value={newTour.tripCategory}
//             onChange={(e) => setNewTour({ ...newTour, tripCategory: e.target.value })}
//           />
//         </label>
//         <label>
//           Duration:
//           <input
//             type="text"
//             value={newTour.duration}
//             onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
//           />
//         </label>
//         <label>
//           Available Seats:
//           <input
//             type="number"
//             value={newTour.availableSeats}
//             onChange={(e) => setNewTour({ ...newTour, availableSeats: e.target.value })}
//           />
//         </label>
//         <label>
//           Start Date:
//           <input
//             type="date"
//             value={newTour.startDate}
//             onChange={(e) => setNewTour({ ...newTour, startDate: e.target.value })}
//           />
//         </label>
//         <label>
//           End Date:
//           <input
//             type="date"
//             value={newTour.endDate}
//             onChange={(e) => setNewTour({ ...newTour, endDate: e.target.value })}
//           />
//         </label>
//         <label>
//           Description:
//           <input
//             type="text"
//             value={newTour.description}
//             onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
//           />
//         </label>
//         <button type="submit">{editTour ? 'Update Tour' : 'Add Tour'}</button>
//       </form>

//       {/* عرض الرحلات */}
//       <div className="tour-list">
//         {tours.map((tour) => (
//           <div key={tour.id} className="tour-card">
//             {/* زر التبديل لتحديد الحالة */}
            // <label className="flex items-center cursor-pointer">
            //   <div className="relative">
            //     <input
            //       type="checkbox"
            //       className="sr-only"
            //       checked={tour.active}
            //       onChange={() => toggleTourStatus(tour.id, tour.active)}
            //     />
            //     <div className="block">
            //       <span className="status-text">
            //         {tour.active ? "On" : "Off"}
            //       </span>
            //     </div>
            //     <div
            //       className={`dot ${tour.active ? "translate-x-full bg-green-500" : ""}`}
            //     ></div>
            //   </div>
            // </label>

//             <h3>{tour.title}</h3>
//             <p>Destination: {tour.destination}</p>
//             <p>Price: ${tour.price}</p>
//             <p>Duration: {tour.duration} days</p>
//             <p>Available Seats: {tour.availableSeats}</p>
//             <p>Category: {tour.tripCategory} </p>
//             {/* <p>Description: {tour.description}</p> */}
//             <p>Status: {tour.active ? "Available" : "Unavailable"}</p>

//             <button className="edit-button" onClick={() => handleEditTour(tour)}>Edit</button>
//             <button className="delete-button" onClick={() => handleDeleteTour(tour.id)}>Delete</button>
//           </div>
//         ))}
//       </div>


//     </div>
//   );
// }



//test
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';
import './TourManagement.css';
import TourAgenMan from './TourAgenMan.jpg';
import AgenBackicon from './AgenBackicon.jpg';

export default function TourManagementPage() {
  const [tours, setTours] = useState([]);
  const [newTour, setNewTour] = useState({
    title: '',
    destination: '',
    price: 0,
    tripCategory: '',
    startDate: '',
    endDate: '',
    description: '',
    duration: 0,
    availableSeats: 0,
    active: true,
  });
  const [editTour, setEditTour] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // جلب الرحلات من الباكند
  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await api.get('https://jsonplaceholder.typicode.com/posts');
      setTours(response.data.map(tour => ({
        title: tour.title || 'Default Title',
        destination: tour.body || 'Default Destination',
        price: 100, // قيمة افتراضية للسعر
        tripCategory: 'Default Category',
        startDate: '2025-01-01', // تاريخ افتراضي
        endDate: '2025-12-31', // تاريخ افتراضي
        description: 'Default Description',
        duration: 7, // مدة افتراضية
        availableSeats: 10, // عدد مقاعد افتراضي
        active: true,
        id: tour.id
      })));
      setError('');
    } catch (err) {
      setError('Failed to fetch tours. Please try again.');
      console.error('Error fetching tours:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // إضافة أو تعديل رحلة
  const handleSubmitTour = async (e) => {
    e.preventDefault();
    setError('');

    try {
      setLoading(true);

      if (editTour) {
        // تحديث الرحلة الموجودة
        await api.put(`/tours/${editTour.id}`, newTour);
      } else {
        // إضافة رحلة جديدة
        await api.post('/tours', newTour);
      }

      await fetchTours(); // إعادة جلب البيانات بعد التعديل
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed. Please try again.');
      console.error('Error saving tour:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // حذف رحلة
  const handleDeleteTour = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;

    try {
      setLoading(true);
      await api.delete(`/tours/${id}`);
      await fetchTours(); // إعادة جلب البيانات بعد الحذف
    } catch (err) {
      setError('Failed to delete tour. Please try again.');
      console.error('Error deleting tour:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // تغيير حالة الرحلة
  const toggleTourStatus = async (id, currentStatus) => {
    try {
      await api.patch(`/tours/${id}/status`, { active: !currentStatus });
      await fetchTours(); // إعادة جلب البيانات بعد التحديث
    } catch (err) {
      setError('Failed to update tour status.');
      console.error('Error updating status:', err.response?.data || err.message);
    }
  };

  // إعادة تعيين النموذج
  const resetForm = () => {
    setNewTour({
      title: '',
      destination: '',
      price: 0,
      tripCategory: '',
      startDate: '',
      endDate: '',
      description: '',
      duration: 0,
      availableSeats: 0,
      active: true,
    });
    setEditTour(null);
  };

  // تعبئة النموذج للتعديل
  const handleEditTour = (tour) => {
    setEditTour(tour);
    setNewTour({
      title: tour.title,
      destination: tour.destination,
      price: tour.price,
      tripCategory: tour.tripCategory,
      startDate: tour.startDate,
      endDate: tour.endDate,
      description: tour.description,
      duration: tour.duration,
      availableSeats: tour.availableSeats,
      active: tour.active,
    });
  };

  return (
    <div className="tour-management-container" style={{ backgroundImage: `url(${TourAgenMan})` }}>
      <h2>Tour Management</h2>

      {error && <div className="error-message">{error}</div>}

      {/* نموذج إضافة/تعديل رحلة */}
      <form className='formtm' onSubmit={handleSubmitTour}>
        <h3>{editTour ? 'Edit Tour' : 'Add New Tour'}</h3>

        <label>
          Title:
          <input
            type="text"
            value={newTour.title}
            onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
            required
          />
        </label>

        <label>
          Destination:
          <input
            type="text"
            value={newTour.destination}
            onChange={(e) => setNewTour({ ...newTour, destination: e.target.value })}
            required
          />
        </label>

        <label>
          Price ($):
          <input
            type="number"
            min="0"
            value={newTour.price}
            onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={newTour.tripCategory}
            onChange={(e) => setNewTour({ ...newTour, tripCategory: e.target.value })}
          />
        </label>

        <label>
          Duration (days):
          <input
            type="number"
            min="1"
            value={newTour.duration}
            onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
            required
          />
        </label>

        <label>
          Available Seats:
          <input
            type="number"
            min="0"
            value={newTour.availableSeats}
            onChange={(e) => setNewTour({ ...newTour, availableSeats: e.target.value })}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={newTour.startDate}
            onChange={(e) => setNewTour({ ...newTour, startDate: e.target.value })}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={newTour.endDate}
            onChange={(e) => setNewTour({ ...newTour, endDate: e.target.value })}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={newTour.description}
            onChange={(e) => setNewTour({ ...newTour, description: e.target.value })}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : (editTour ? 'Update Tour' : 'Add Tour')}
        </button>

        {editTour && (
          <button type="button" onClick={resetForm} className="cancel-button">
            Cancel
          </button>
        )}
      </form>

      {/* قائمة الرحلات */}
      <div className="tour-list">
        {loading && !tours.length ? (
          <div className="loading">Loading tours...</div>
        ) : tours.length === 0 ? (
          <div className="no-tours">No tours available</div>
        ) : (
          tours.map((tour) => (
            <div key={tour.id} className={`tour-card ${!tour.active ? 'inactive' : ''}`}>
              <div className="tour-status">
                <span>Status: {tour.active ? 'Active' : 'Inactive'}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={tour.active}
                    onChange={() => toggleTourStatus(tour.id, tour.active)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <h3>{tour.title}</h3>
              <p><strong>Destination:</strong> {tour.destination}</p>
              <p><strong>Price:</strong> ${tour.price}</p>
              <p><strong>Duration:</strong> {tour.duration} days</p>
              <p><strong>Available Seats:</strong> {tour.availableSeats}</p>

              <div className="tour-actions">
                <button
                  className="edit-button"
                  onClick={() => handleEditTour(tour)}
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTour(tour.id)}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
