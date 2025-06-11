
// test
import React, { useState } from "react";
import BookingList from "./BookingList";
import Touristhome from "./Touristhome.jpg";
import "./TouristHome.css";
import Bookingform from "./Bookingform";
import { Link } from "react-router-dom";

const TouristHome = () => {
  const [trips, setTrips] = useState([
    {
      name: "Nile Cruise Adventure",
      Destination: "Luxor & Aswan",
      Price: "7500 EGP",
      category: "Cruise",
      AvailableSeats: 15,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK96cLynN8kVTcjhYV16M9RTaZtZvKAjJFlA&s",
      FullDestination: "A 3-night cruise from Luxor to Aswan with stops at temples and historical sites.",
      itinerary: [
        "Day 1: Arrival in Luxor and embark on the cruise.",
        "Day 2: Visit the Karnak Temple and Luxor Temple.",
        "Day 3: Visit the Valley of the Kings and Hatshepsut Temple.",
        "Day 4: Disembark in Aswan and visit the Philae Temple and High Dam.",
      ],
      accommodations: "Luxury cabin with en-suite bathroom and air conditioning.",
      difficulty: "Easy to moderate",
      reviews: [
        {
          text: "Great trip!",
          date: "4/19/2025, 10:30:00 AM",
          rating: 4
        }
      ]
    },
    {
      name: "Pyramids of Giza Tour",
      Destination: "Giza",
      Price: "1200 EGP",
      category: "Historical",
      AvailableSeats: 10,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk82SupbRZJyU-GjQnsblWANhfT6izoyM2wA&s",
      FullDestination: "Explore the wonders of the pyramids, the Sphinx, and the Egyptian Museum.",
      itinerary: [
        "Day 1: Visit the Great Pyramid of Giza, Sphinx, and Egyptian Museum.",
        "Day 2: Optional camel ride around the pyramids and visit to local markets.",
      ],
      accommodations: "Hotel near Giza with breakfast included.",
      difficulty: "Moderate (walking involved)",
      reviews: [
        {
          text: "Good trip!",
          date: "4/10/2025, :30:00 AM",
          rating: 3
        }
      ]
    },
    {
      name: "Red Sea Diving Expedition",
      Destination: "Sharm El Sheikh",
      Price: "3800 EGP",
      category: "Adventure",
      AvailableSeats: 12,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeNN72ZxZ9Vbd1dHF2l8Cid5kbtMe5NnC-Qg&s",
      FullDestination: "Explore the crystal-clear waters of the Red Sea with guided diving tours.",
      itinerary: [
        "Day 1: Arrival in Sharm El Sheikh and check-in at the resort.",
        "Day 2: Morning and afternoon diving sessions at popular diving spots.",
        "Day 3: Visit Ras Mohamed National Park for more diving and snorkeling.",
        "Day 4: Free day for relaxing at the beach.",
      ],
      accommodations: "5-star resort with pool and beach access.",
      difficulty: "Moderate to advanced (diving experience required)",
     reviews:[],
    },
  ]);
   const [bookings, setBookings] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showBookingList, setShowBookingList] = useState(false);


  const filteredTrips = trips
    .filter((trip) => {
      const priceValue = parseFloat(trip.Price.replace(/[^\d.]/g, ""));
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return priceValue >= min && priceValue <= max;
    })
    .filter((trip) =>
        categoryFilter
          ? trip.category.toLowerCase().includes(categoryFilter.toLowerCase())
          : true
      )
      
    .filter((trip) => {
      const query = searchQuery.toLowerCase();
      return (
        trip.name.toLowerCase().includes(query) ||
        trip.Destination.toLowerCase().includes(query) ||
        trip.category.toLowerCase().includes(query) ||
        trip.Price.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") {
        const priceA = parseFloat(a.Price.replace(/[^\d.]/g, ""));
        const priceB = parseFloat(b.Price.replace(/[^\d.]/g, ""));
        return priceA - priceB;
      }
      if (sortBy === "seats") return b.AvailableSeats - a.AvailableSeats;
      return 0;
    });

  const handleViewDetails = (trip) => {
    setSelectedTrip(trip);
    setShowDetails(true);
    setShowReviews(false);
  };

  const handleViewReviews = (trip) => {
    setSelectedTrip(trip);
    setShowReviews(true);
    setShowDetails(false);
  };

  const handleBack = () => {
    setSelectedTrip(null);
    setShowDetails(false);
    setShowReviews(false);
  };

  const handleAddReview = () => {
    if (!reviewText.trim()) {
      alert("Please write a review before submitting.");
      return;
    }
    if (rating === 0) {
      alert("Please give a rating before submitting.");
      return;
    }
  
    const updatedTrips = trips.map((trip) =>
      trip.name === selectedTrip.name
        ? {
            ...trip,
            reviews: [
              ...trip.reviews,
              { text: reviewText, date: new Date().toLocaleString(), rating },
            ],
          }
        : trip
    );
  
    setTrips(updatedTrips);
    alert("Review added successfully!");
    setReviewText("");
    setRating(0);
    setShowReviews(false);
    setSelectedTrip(null);
  };
  const handleReviewAfterConfirm = (booking) => {
    const trip = trips.find((t) => t.name === booking.tripName);
    if (trip) {
      setSelectedTrip(trip);
      setShowReviews(true);
      setShowDetails(false);
    }
  };
  

  return (
    <div className="fulltouristhome-container">
      <div className="touristhome-container" style={{ backgroundImage: `url(${Touristhome})` }}></div>
        
      <div style={{
  position: 'sticky',
  top: '0',
  left: '0',
  zIndex: '1000',
  backgroundColor: 'transparent' 
}}>
  <Link 
    to="/triplocations" 
    style={{
      padding: '10px 30px',
      backgroundColor: '#4CAF50',
      marginTop: '15px', 
     marginLeft: '10px',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
      textDecoration: 'none',
      display: 'inline-block',
      transition: 'background-color 0.3s',
      fontWeight: 'bold',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#388E3C'}
    onMouseLeave={(e) => e.target.style.backgroundColor = '#4CAF50'}
  >
    Locations📍
  </Link>
</div>

      <div className="tourdetail">
        <h1 style={{ textAlign: "center", margin: "20px", color: "#007bff" }}>Available Trips</h1>
        <div className="filters" style={{ margin: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          <input
  type="text"
  placeholder="Search Category"
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
/>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="seats">Available Seats</option>
          </select>
        </div>

        <div className="trip-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {filteredTrips.map((trip) => (
            <div key={trip.name} className="tourist-card">
              <h3>{trip.name}</h3>
              <p><strong>Destination:</strong> {trip.Destination}</p>
              <p><strong>Price:</strong> {trip.Price}</p>
              <p><strong>Available Seats:</strong> {trip.AvailableSeats}</p>
              <img src={trip.image} alt={trip.name} />
              <div className="button-container">
                <button onClick={() => handleViewDetails(trip)}>View Details</button>
                <button
  onClick={() => handleViewReviews(trip)}
  style={{ backgroundColor: "#FADA5E" }}
>
  See Reviews
</button>

              </div>
            </div>
          ))}
        </div>

        {showDetails && selectedTrip && (
          <div className="trip-details">
            <h2>Trip Details: {selectedTrip.Name}</h2>
            <p><strong>Destination:</strong> {selectedTrip.Destination}</p>
            <p><strong>Price:</strong> {selectedTrip.Price}</p>
            <p><strong>Category:</strong> {selectedTrip.category}</p>
            <p><strong>Accommodations:</strong> {selectedTrip.accommodations}</p>
            <p><strong>Difficulty:</strong> {selectedTrip.difficulty}</p>
            <p><strong>Full Description:</strong> {selectedTrip.FullDestination}</p>
            <h3>Itinerary:</h3>
            <ul>
              {selectedTrip.itinerary.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
         

            <button 
  onClick={() => setShowBookingForm(true)} 
  style={{
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginRight: '10px',
  }}
>
  Book
</button>

{showBookingForm && (
  <div>
    <button  className="back-button"
      onClick={() => setShowBookingForm(false)} 
      style={{
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Back
    </button>
    <Bookingform
      trip={selectedTrip}
      addBooking={(booking) => {
        setBookings([...bookings, booking]);
        alert(`Trip "${booking.tripName}" booked successfully!`);
        setShowBookingForm(false);
        setShowDetails(false);
        setSelectedTrip(null);
      }}
    />
  </div>
)}
            <button onClick={handleBack}     style={{
        padding: '10px 20px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}>
              Back
            </button>
          </div>
        )}
       
       
{showReviews && (
  <div className="review-section">
    <h3 className="review-title">Reviews</h3>
    {selectedTrip && selectedTrip.reviews && selectedTrip.reviews.length > 0 ? (
      selectedTrip.reviews.map((review, idx) => (
        <div key={idx} className="review-box">
          <h4 className="review-heading">Review {idx + 1}</h4>
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={star <= review.rating ? "star-filled" : "star-empty"}>
                ★
              </span>
            ))}
          </div>
          <p className="review-text">{review.text}</p>
          <p className="review-date"><small>{review.date}</small></p>
        </div>
      ))
    ) : (
      <p className="no-reviews">No reviews yet for this trip.</p>
    )}
    <div className="add-review-form">
  <h4>Add Your Review</h4>
  <textarea
    value={reviewText}
    onChange={(e) => setReviewText(e.target.value)}
    placeholder="Write your review..."
    rows={4}
    cols={50}
  />
  <div>
    <label>Rating: </label>
    {[1, 2, 3, 4, 5].map((star) => (
      <button key={star} onClick={() => setRating(star)}>
        {star <= rating ? "★" : "☆"}
      </button>
    ))}
  </div>
  <button 
   onClick={handleAddReview}

    style={{
      padding: '8px 15px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      marginTop: '10px',
      cursor: 'pointer'
    }}
  >
    Submit Review
  </button>
</div>


    <button className="back-button" onClick={handleBack}>
      Back
    </button>
  </div>
)}
<button
  onClick={() => setShowBookingList(!showBookingList)}
  style={{
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '20px',
     marginLeft:"630px"
  }}
>
  See Booking List
</button>



        {showBookingList && (
          <div>
            <BookingList
  bookings={bookings}
  cancelBooking={(id) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    );
    setBookings(updated);
  }}
  confirmBooking={(id) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "Confirmed" } : b
    );
    setBookings(updated);

    const confirmedBooking = bookings.find((b) => b.id === id);
    if (confirmedBooking) {
      handleReviewAfterConfirm(confirmedBooking); 
    }
  }}
  trips={trips}
  setTrips={setTrips}
/>


            <button
              onClick={() => setShowBookingList(false)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '20px',
                marginLeft:'1200px'
              }}
            >
              Back
            </button>
          </div>
        )}
      </div>
      
      <div>
        <Link to="/login" className="logouttourist">LOGOUT</Link>
      </div>
    </div>
  );
};

export default TouristHome;


// ===================================================

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "./TouristHome.css";
// import Touristhome from "./Touristhome.jpg";

// const TouristHome = () => {
//   const [trips, setTrips] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categorySearch, setCategorySearch] = useState("");
//   const [sortBy, setSortBy] = useState("");
//   const [selectedTrip, setSelectedTrip] = useState(null);
//   const [showDetails, setShowDetails] = useState(false);
//   const [showReviews, setShowReviews] = useState(false);
//   const [showBookingForm, setShowBookingForm] = useState(false);
//   const [bookingData, setBookingData] = useState({
//     tripId: "",
//     customerName: "",
//     email: "",
//     phoneNumber: "",
//     numberOfSeats: 1
//   });

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate(-1);
//   };
// const categoryImages = {
//     "Eco Tours": "https://images.unsplash.com/photo-1433086966358-54859d0ed716",
//     "Water Sports": "https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "Wellness Retreats": "https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "River Cruises": "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "Mountain Adventures": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "Desert Tours": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "Historical Tours": "https://images.unsplash.com/photo-1528181304800-259b08848526",
//     "Adventure Tours": "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "Beach Holidays": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
//     "Cultural Tours": "https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
//   };

//   useEffect(() => {
//     fetch("https://localhost:7050/api/TripPackage", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         const tripsWithReviews = data.map(trip => ({
//           ...trip,
//           reviews: [
//             {
//               text: "Great experience! Highly recommended.",
//               rating: 5,
//               date: "2023-05-15"
//             },
//             {
//               text: "Had a wonderful time with my family.",
//               rating: 4,
//               date: "2023-06-20"
//             }
//           ]
//         }));
//         setTrips(tripsWithReviews);
//       })
//       .catch((error) => console.error("Error fetching trips:", error));

//     // Fetch bookings
//     fetch("https://localhost:7050/api/Booking", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     })
//       .then((response) => response.json())
//       .then((data) => setBookings(data))
//       .catch((error) => console.error("Error fetching bookings:", error));
//   }, []);

//   const filteredTrips = trips
//     .filter((trip) => {
//       const priceValue = parseFloat(trip.price);
//       const min = minPrice ? parseFloat(minPrice) : 0;
//       const max = maxPrice ? parseFloat(maxPrice) : Infinity;
//       return priceValue >= min && priceValue <= max;
//     })
//     .filter((trip) => {
//       if (!searchQuery) return true;
//       return (
//         trip.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         trip.destination?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         trip.price?.toString().includes(searchQuery)
//       );
//     })
//     .filter((trip) => {
//       if (!categorySearch) return true;
//       return trip.category?.toLowerCase().includes(categorySearch.toLowerCase());
//     })
//     .sort((a, b) => {
//       if (sortBy === "name") return a.title.localeCompare(b.title);
//       if (sortBy === "price") return parseFloat(a.price) - parseFloat(b.price);
//       if (sortBy === "seats") return b.availableSeats - a.availableSeats;
//       return 0;
//     });

//   const handleViewDetails = (trip) => {
//     setSelectedTrip(trip);
//     setShowDetails(true);
//     setShowReviews(false);
//     setShowBookingForm(false);
//   };

//   const handleViewReviews = (trip) => {
//     setSelectedTrip(trip);
//     setShowReviews(true);
//     setShowDetails(false);
//     setShowBookingForm(false);
//   };

//   const handleBookingForm = (trip) => {
//     setSelectedTrip(trip);
//     setBookingData({
//       ...bookingData,
//       tripId: trip.tripId
//     });
//     setShowBookingForm(true);
//     setShowDetails(false);
//     setShowReviews(false);
//   };

//   const handleBack = () => {
//     setSelectedTrip(null);
//     setShowDetails(false);
//     setShowReviews(false);
//     setShowBookingForm(false);
//   };

//   const handleBookingChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData({
//       ...bookingData,
//       [name]: value
//     });
//   };

// const handleBookingSubmit = (e) => {
//   e.preventDefault();
  
//   // Prepare the booking data according to the API structure
//   const bookingPayload = {
//     touristId: 0, // You'll need to replace this with actual tourist ID
//     tourPackageId: selectedTrip.tripId,
//     bookingDate: new Date().toISOString(),
//     status: "Pending",
//     userName: bookingData.customerName,
//     emailAddress: bookingData.email,
//     phoneNumber: bookingData.phoneNumber
//   };

//   fetch("https://localhost:7050/api/Booking", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${localStorage.getItem("token")}`
//     },
//     body: JSON.stringify(bookingPayload)
//   })
//   .then(async (response) => {
//     const text = await response.text();
//     if (!response.ok) {
//       // Try to parse the error message if it's JSON
//       try {
//         const errorData = JSON.parse(text);
//         throw new Error(errorData.message || errorData.title || "Booking failed");
//       } catch {
//         // If not JSON, use the raw text as error message
//         throw new Error(text || "Booking failed");
//       }
//     }
//     return text ? JSON.parse(text) : {};
//   })
//   .then(data => {
//     alert("Booking successful!");
//     setShowBookingForm(false);
//     // Refresh bookings list
//     return fetch("https://localhost:7050/api/Booking", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     });
//   })
//   .then(response => response.json())
//   .then(data => setBookings(data))
//   .catch(error => {
//     console.error("Error making booking:", error);
//     alert(`Booking failed: ${error.message}`);
//   });
// };
//   const handleCancelBooking = (bookingId) => {
//     fetch(`https://localhost:7050/api/Booking/${bookingId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`
//       }
//     })
//       .then(response => {
//         if (response.ok) {
//           setBookings(bookings.filter(booking => booking.bookingId !== bookingId));
//           alert("Booking cancelled successfully");
//         } else {
//           throw new Error("Failed to cancel booking");
//         }
//       })
//       .catch(error => {
//         console.error("Error cancelling booking:", error);
//         alert("Failed to cancel booking");
//       });
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <span key={i} className={i <= rating ? "star-filled" : "star-empty"}>
//           {i <= rating ? "★" : "☆"}
//         </span>
//       );
//     }
//     return stars;
//   };

//   return (
//     <div className="fulltouristhome-container">
//       <div className="header-actions">
//         <button className="logouttourist button" onClick={handleLogout}>
//           LOGOUT
//         </button>
//         {/* <button 
//           className="booking-list-button button"
//           onClick={() => {
//             setShowBookingForm(false);
//             setShowDetails(false);
//             setShowReviews(false);
//           }}
//         >
//           See Booking List
//         </button> */}
//       </div>

//       <div className="touristhome-container" style={{ backgroundImage: `url(${Touristhome})` }}></div>
//       <div className="tourdetail">
//         <h1 style={{ textAlign: "center", margin: "20px", color: "#007bff" }}>Available Trips</h1>
        
//         <div className="filters">
//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="price-filter">
//             <input
//               type="number"
//               placeholder="Min Price"
//               value={minPrice}
//               onChange={(e) => setMinPrice(e.target.value)}
//             />
//             <input
//               type="number"
//               placeholder="Max Price"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//             />
//           </div>
//           <div className="category-filter">
//             <input
//               type="text"
//               placeholder="Search by Category"
//               value={categorySearch}
//               onChange={(e) => setCategorySearch(e.target.value)}
//             />
//           </div>
//           <div className="sort-section">
//             <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//               <option value="">Sort By</option>
//               <option value="name">Name</option>
//               <option value="price">Price</option>
//               <option value="seats">Available Seats</option>
//             </select>
//           </div>
//         </div>

//         {!showDetails && !showReviews && !showBookingForm && (
//           <div className="trip-container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
//             {filteredTrips.map((trip) => (
//               <div key={trip.tripId} className="tourist-card">
//                 <img src={categoryImages[trip.category] || ""} alt={trip.title} />
//                 <h3>{trip.title}</h3>
//                 <p>destination: {trip.destination}</p>
//                 <p>Price: {trip.price}</p>
//                 <p>Available Seats: {trip.availableSeats}</p>
//                 <div className="button-container">
//                   <button 
//                      style={{ backgroundColor: "#007bff48" }}
//                     onClick={() => handleViewDetails(trip)}
//                   >
//                     View Details
//                   </button>
//                   {/* <button 
                    
//                     onClick={() => handleBookingForm(trip)}
//                   >
//                     Book Now
//                   </button> */}
//                   <button 
//                     style={{ backgroundColor: "#FADA5E" }}
//                     onClick={() => handleViewReviews(trip)}
//                   >
//                     See Reviews
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {showDetails && selectedTrip && (
//           <div className="trip-details">
//             <h2>{selectedTrip.title}</h2>
//             <p><strong>Description:</strong> {selectedTrip.description}</p>
//             <p><strong>Destination:</strong> {selectedTrip.destination}</p>
//             <p><strong>Price:</strong> {selectedTrip.price} EGP</p>
//             <p><strong>duration Days:</strong> {selectedTrip.durationDays}</p>
//             <p><strong>Available Seats:</strong> {selectedTrip.availableSeats}</p>
//             <p><strong>Category:</strong> {selectedTrip.tripCategory}</p>
//             <p><strong>Start Date:</strong> {selectedTrip.startDate}</p>
//             <p><strong>End Date:</strong> {selectedTrip.endDate}</p>
//             <p><strong>Travel Agency:</strong> {selectedTrip.travelAgency}</p>
//             <div className="action-buttons">
//               <button className="back-button" onClick={handleBack} style={{
//                     padding: '10px 20px',
//                     backgroundColor: '#f44336',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                     fontSize: '16px',
//                    }}>
//                 Back
//               </button>
//               <button 
//                 style={{
//                 padding: '10px 20px',
//                 backgroundColor: '#007bff',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//                 fontSize: '16px',
//                 marginRight: '10px',
//               }}
//                 onClick={() => handleBookingForm(selectedTrip)}
//               >
//                 Book Now
//               </button>
//             </div>
//           </div>
//         )}

//         {showReviews && selectedTrip && (
//           <div className="review-section">
//             <h2 className="review-title">Reviews for {selectedTrip.title}</h2>
//             {selectedTrip.reviews && selectedTrip.reviews.length > 0 ? (
//               selectedTrip.reviews.map((review, index) => (
//                 <div key={index} className="review-box">
//                   <div className="review-heading">
//                     <div className="review-stars">
//                       {renderStars(review.rating)}
//                     </div>
//                   </div>
//                   <p className="review-text">{review.text}</p>
//                   <p className="review-date">{review.date}</p>
//                 </div>
//               ))
//             ) : (
//               <p className="no-reviews">No reviews yet.</p>
//             )}
//             <button className="back-button" onClick={handleBack}>
//               Back
//             </button>
//           </div>
//         )}

//         {showBookingForm && (
//           <div className="booking-form">
//             <h2>Booking Form</h2>
//             <form onSubmit={handleBookingSubmit}>
              
//                 <label>Trip:</label>
//                 <input 
//                   type="text" 
//                   value={selectedTrip?.title || ""} 
//                   readOnly 
//                 />
              
              
//                 <label>Your Name:</label>
//                 <input
//                   type="text"
//                   name="customerName"
//                   value={bookingData.customerName}
//                   onChange={handleBookingChange}
//                   required
//                 />
              
              
//                 <label>Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={bookingData.email}
//                   onChange={handleBookingChange}
//                   required
//                 />
              
              
//                 <label>Phone Number:</label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={bookingData.phoneNumber}
//                   onChange={handleBookingChange}
//                   required
//                 />
              
              
//                 <label>Number of Seats:</label>
//                 <input
//                   type="number"
//                   name="numberOfSeats"
//                   min="1"
//                   max={selectedTrip?.availableSeats || 10}
//                   value={bookingData.numberOfSeats}
//                   onChange={handleBookingChange}
//                   required
//                 />
              
              
//                 <button type="submit" className="button submit-button">
//                   Confirm Booking
//                 </button>

//                 <button 
//                   type="button" 
//                   className="back-button"
//                   onClick={handleBack}
//                 >
//                   Cancel
//                 </button>
              
//             </form>
//           </div>
//         )}

//         {!showDetails && !showReviews && !showBookingForm && (
//           <div style={{ padding: "20px", marginBottom: "40px" }}>
//   <h2 style={{ marginBottom: "16px", fontSize: "20px", color: "#007bffa4" }}>My Bookings</h2>
//   <table
//     style={{
//       width: "100%",
//       borderCollapse: "collapse",
//       backgroundColor: "#fffef5",
//       boxShadow: "0 0 6px rgba(0, 0, 0, 0.05)"
//     }}
//   >
//     <thead>
//       <tr>
//         <th style={{ textAlign: "left", padding: "12px", backgroundColor: "#007bffa4", color: "white" }}>
//           Trip Name
//         </th>
//         <th style={{ textAlign: "left", padding: "12px", backgroundColor: "#007bffa4", color: "white" }}>
//           Status
//         </th>
//         <th style={{ textAlign: "left", padding: "12px", backgroundColor: "#007bffa4", color: "white" }}>
//           Actions
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       {bookings.map((booking) => (
//         <tr key={booking.bookingId}>
//           <td style={{ padding: "12px", borderTop: "1px solid #eee" }}>
//             {booking.tripName || "N/A"}
//           </td>
//           <td style={{ padding: "12px", borderTop: "1px solid #eee" }}>
//             {booking.status || "Pending"}
//           </td>
//           <td style={{ padding: "12px", borderTop: "1px solid #eee" }}>
//             <button
//               style={{
//                 padding: "6px 12px",
//                 backgroundColor: "#ef4444",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer"
//               }}
//               onClick={() => handleCancelBooking(booking.bookingId)}
//             >
//               Cancel
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

//         )}
//       </div>
//     </div>
//   );
// };

// export default TouristHome;