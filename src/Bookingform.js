
import React, { useState } from "react";

const Bookingform = ({ trip, addBooking }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [seats, setSeats] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !email || !phone) {
      alert("Please fill out all fields.");
      return;
    }

    if (seats < 1 || seats > trip.AvailableSeats) {
      alert("Invalid number of seats.");
      return;
    }

    const booking = {
      id: new Date().getTime(), // unique ID for each booking
      tripName: trip.name,
      userName: name,
      userEmail: email,
      userPhone: phone,
      seatsBooked: seats,
      status: "Pending", // New booking status
    };

    addBooking(booking); // Add the booking to the parent component

    // Reset the form
    setName("");
    setEmail("");
    setPhone("");
    setSeats(1);
  };

  return (
    <div className="booking-form">
      <h2>Booking Form for {trip.Name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default Bookingform;



// 

// import React, { useState } from "react";
// import api from "./api"; // تأكد من أن api.js يحتوي على إعدادات Axios

// const Bookingform = ({ trip, addBooking }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [seats, setSeats] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate inputs
//     if (!name || !email || !phone) {
//       alert("Please fill out all fields.");
//       return;
//     }

//     if (seats < 1 || seats > trip.AvailableSeats) {
//       alert("Invalid number of seats.");
//       return;
//     }

//     const booking = {
//       tripId: trip.id, // Use trip ID from the trip object
//       userName: name,
//       userEmail: email,
//       userPhone: phone,
//       seatsBooked: seats,
//       status: "Pending", // New booking status
//     };

//     try {
//       setLoading(true);
//       // Send the booking request to the API
//       const response = await api.post("/bookings", booking);
//       addBooking(response.data); // Assuming the response contains the new booking data
//       setName("");
//       setEmail("");
//       setPhone("");
//       setSeats(1);
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to create booking");
//       console.error("Booking error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="booking-form">
//       <h2>Booking Form for {trip.name}</h2>

//       {error && <div style={{ color: "red" }}>{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Full Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your full name"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email Address</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email address"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="phone">Phone Number</label>
//           <input
//             type="tel"
//             id="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Enter your phone number"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="seats">Seats</label>
//           <input
//             type="number"
//             id="seats"
//             value={seats}
//             onChange={(e) => setSeats(Number(e.target.value))}
//             min="1"
//             max={trip.AvailableSeats}
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Submit Booking"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Bookingform;
