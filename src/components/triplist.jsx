import React, { useState, useEffect } from "react";
import { BiHotel } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { FiDelete } from "react-icons/fi";
import { AiOutlineDollar } from "react-icons/ai";
import { BsHouseAdd } from "react-icons/bs";
import "./styles/triplist.css";

const TripList = () => {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState("");
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedCost, setSelectedCost] = useState("");
  const [costInputVisible, setCostInputVisible] = useState(false);

  useEffect(() => {
    // Retrieve trips from localStorage
    const storedTrips = localStorage.getItem("trips");
    if (storedTrips) {
      setTrips(JSON.parse(storedTrips));
    }
  }, []);

  useEffect(() => {
    // Store trips in localStorage whenever it changes
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTrip.trim() !== "") {
      const trip = {
        id: Date.now(),
        name: newTrip.trim(),
        hotelOptions: [],
      };
      setTrips([...trips, trip]);
      setNewTrip("");
    }
  };

  const handleDeleteTrip = (tripId) => {
    const updatedTrips = trips.filter((trip) => trip.id !== tripId);
    setTrips(updatedTrips);
    setSelectedTrip(null);
  };

  const handleDeleteHotelOption = (tripId, hotelId) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        const updatedHotelOptions = trip.hotelOptions.filter(
          (option) => option.id !== hotelId
        );
        return {
          ...trip,
          hotelOptions: updatedHotelOptions,
        };
      }
      return trip;
    });
    setTrips(updatedTrips);
  };

  const handleTripClick = (id) => {
    setSelectedTrip(id);
  };

  const handleHotelOptionChange = (event, tripId, hotelId) => {
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        const updatedHotelOptions = trip.hotelOptions.map((option) => {
          if (option.id === hotelId) {
            return {
              ...option,
              hotelWebsite: event.target.value.trim(),
            };
          }
          return option;
        });
        return {
          ...trip,
          hotelOptions: updatedHotelOptions,
        };
      }
      return trip;
    });
    setTrips(updatedTrips);
  };

  const handleHotelOptionSubmit = (event, tripId) => {
    event.preventDefault();
    const updatedTrips = trips.map((trip) => {
      if (trip.id === tripId) {
        const newHotelOption = {
          id: Date.now(),
          hotelWebsite: "",
        };
        return {
          ...trip,
          hotelOptions: [...trip.hotelOptions, newHotelOption],
        };
      }
      return trip;
    });
    setTrips(updatedTrips);
    setSelectedTrip(null); // Deselect the trip after adding the hotel option
  };

  const isTripSelected = (id) => {
    return id === selectedTrip;
  };

// ...

return (
  <div className="container-fluid">
    <div className="trip-container">
      <h1 className="trip-title">Where to?</h1>
      <form className="trip-form" onSubmit={handleSubmit}>
        <label>
          <input
            className="trip-input"
            type="text"
            name="trip"
            placeholder="Name a place."
            autoComplete="off"
            value={newTrip}
            onChange={(event) => setNewTrip(event.target.value)}
          />
        </label>
        <input className="trip-btn" type="submit" value="List it" />
      </form>
    </div>
    {trips.length > 0 && (
      <div className="trip-list">
        <h1 className="trip-list-title">LFG.</h1>
        <ul className="trip-list-ul">
          {trips.map((trip) => (
            <li
              className={`trip-list-li ${
                isTripSelected(trip.id) ? "selected" : ""
              }`}
              key={trip.id}
              onClick={() => handleTripClick(trip.id)}
            >
              {isTripSelected(trip.id) ? (
                <>
                  <span className="trip-name">{trip.name}</span>
                  <div className="hotel-options">
                    {trip.hotelOptions.map((option) => (
                      <form
                        key={option.id}
                        className="hotel-form"
                        onSubmit={(event) =>
                          handleHotelOptionSubmit(event, trip.id)
                        }
                      >
                        <input
                          className="hotel-input"
                          type="text"
                          name="hotel"
                          placeholder="Enter hotel website"
                          value={option.hotelWebsite}
                          onChange={(event) =>
                            handleHotelOptionChange(
                              event,
                              trip.id,
                              option.id
                            )
                          }
                        />
                        <button className="hotel-btn" type="submit">
                          <AiOutlineCheck />
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteHotelOption(trip.id, option.id)
                          }
                        >
                          <FiDelete />
                        </button>
                      </form>
                    ))}
                    <button
                      className="add-hotel-btn"
                      onClick={(event) =>
                        handleHotelOptionSubmit(event, trip.id)
                      }
                    >
                      <BsHouseAdd />
                    </button>
                    <button
                      className={`cost-btn ${
                        isTripSelected(trip.id) && costInputVisible
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedTrip(trip.id);
                        setCostInputVisible(true);
                      }}
                    >
                      <span className="cost-btn-icon">
                        <AiOutlineDollar />
                      </span>
                      {isTripSelected(trip.id) && costInputVisible ? (
                        <input
                          className="cost-input"
                          type="text"
                          placeholder="cost"
                          value={selectedCost}
                          onChange={(event) =>
                            setSelectedCost(event.target.value)
                          }
                          onBlur={() => setCostInputVisible(false)}
                          autoFocus
                        />
                      ) : (
                        <span className="cost-value">{selectedCost}</span>
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="trip-name">
                    {trip.name}
                    {trip.hotelOptions.length > 0 && (
                      <a
                        className="hotel-icon-link"
                        href={trip.hotelOptions[0].hotelWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <BiHotel className="hotel-icon" />
                      </a>
                    )}
                    {trip.hotelOptions.length > 0 && (
                      <span className="cost-value">
                          <AiOutlineDollar className="cost-icon" />
                        {selectedCost}
                      
                      </span>
                    )}
                  </span>
                </>
              )}
              {isTripSelected(trip.id) && (
                <div className="trip-options">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTrip(trip.id)}
                  >
                    delete trip
                    <FiDelete />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

};

export default TripList;
