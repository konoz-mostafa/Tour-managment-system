// import React, { useState, useEffect } from "react";
// import {
//   GoogleMap,
//   Marker,
//   InfoWindow,
//   useJsApiLoader,
// } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "500px",
// };

// const center = {
//   lat: 30.0544,
//   lng: 31.3468,
// };

// const TripsMap = () => {
//   const [currentDateTime, setCurrentDateTime] = useState(new Date());
//   const [selectedTrip, setSelectedTrip] = useState(null);
//   const [trips, setTrips] = useState([]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentDateTime(new Date());
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     // Fetch data from REST API
//     const fetchTripLocations = async () => {
//       try {
//         const response = await fetch(""); // Replace with your API URL
//         if (!response.ok) {
//           throw new Error("Failed to fetch Trip locations");
//         }
//         const data = await response.json();
//         setTrips(data); // Assuming API returns an array of trip objects
//       } catch (error) {
//         console.error("Error fetching trip locations:", error);
//       }
//     };

//     fetchTripLocations();
//   }, []);

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyBhTdEUux9PdxqrzxkO9xRUMltDWIFHkSs",
//   });

//   if (!isLoaded) {
//     return <div>Loading Map...</div>;
//   }

//   return (
//     <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
//       <h1 style={{ color: "#176b87" }}>Trips Location Map</h1>

//       <div style={{ marginBottom: "20px", fontSize: "18px", color: "#176b87" }}>
//         <strong>Date:</strong> {currentDateTime.toLocaleDateString()} <br />
//         <strong>Time:</strong> {currentDateTime.toLocaleTimeString()}
//       </div>

//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//         {trips.map((trip) => (
//           <Marker
//             key={trip.id}
//             position={trip.location}
//             onClick={() => setSelectedTrip(trip)}
//           />
//         ))}

//         {selectedTrip && (
//           <InfoWindow
//             position={selectedTrip.location}
//             onCloseClick={() => setSelectedTrip(null)}
//           >
//             <div>
//               <h4>{selectedTrip.title}</h4>
//             </div>
//           </InfoWindow>
//         )}
//       </GoogleMap>
//     </div>
//   );
// };

// export default TripsMap;

// // test
import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 30.0444,
  lng: 31.2357,
};

const TripsMap = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // بيانات متعددة
  useEffect(() => {
    const testTrips = [
      {
        id: 1,
        title: "Trip to Cairo",
        location: { lat: 30.0444, lng: 31.2357 },
      },
      {
        id: 2,
        title: "Trip to Alexandria",
        location: { lat: 31.2001, lng: 29.9187 },
      },
      {
        id: 3,
        title: "Trip to Aswan",
        location: { lat: 24.0889, lng: 32.8998 },
      },
      {
        id: 4,
        title: "Trip to Siwa Oasis",
        location: { lat: 29.2041, lng: 25.5196 },
      },
      {
        id: 5,
        title: "Trip to Dahab",
        location: { lat: 28.5006, lng: 34.5134 },
      },
      {
        id: 6,
        title: "Trip to Fayoum",
        location: { lat: 29.3084, lng: 30.8428 },
      },
      {
        id: 7,
        title: "Trip to El Gouna",
        location: { lat: 27.4023, lng: 33.6790 },
      },
      {
        id: 8,
        title: "Trip to Saint Catherine",
        location: { lat: 28.5567, lng: 33.9519 },
      }
      
    ];

    setTrips(testTrips);
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBhTdEUux9PdxqrzxkO9xRUMltDWIFHkSs",
  });

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#176b87" }}>Trips Location Map</h1>

      <div style={{ marginBottom: "20px", fontSize: "18px", color: "#176b87" }}>
        <strong>Date:</strong> {currentDateTime.toLocaleDateString()} <br />
        <strong>Time:</strong> {currentDateTime.toLocaleTimeString()}
      </div>

      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
        {trips.map((trip) => (
          <Marker
            key={trip.id}
            position={trip.location}
            onClick={() => setSelectedTrip(trip)}
          />
        ))}

        {selectedTrip && (
          <InfoWindow
            position={selectedTrip.location}
            onCloseClick={() => setSelectedTrip(null)}
          >
            <div>
              <h4>{selectedTrip.title}</h4>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default TripsMap;
