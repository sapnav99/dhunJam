import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import axios from "axios";
import DashboardValues from "./DashboardValues";
import DashboardValues1 from "./DashboardValues1";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [chargeOption, setChargeOption] = useState("Yes");
  const handleChargeOptionChange = (option) => {
    setChargeOption(option);
  };
  const location = useLocation(); 
  const userId = location.state?.userId; 
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://stg.dhunjam.in/account/admin/${userId}`
        );

        if (response.data && response.data.response === "Success") {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, [userId]);
  return (
    <div className="dashboard">
      <h3>
        {userData.name}, {userData.location} on Dhun Jam
      </h3>
      <div className="song1">
        <p>Do you want to charge your <br/>customers for requesting songs?</p>
        <div className="form-check form-check-inline" style={{ marginLeft: "120px" }}>
  <input
    className="form-check-input"
    type="radio"
    value="Yes"
    id="flexRadioDefault"
    name="chargeOption"
    checked={chargeOption === "Yes"}
    onChange={() => handleChargeOptionChange("Yes")}
  />
  <label className={`form-check-label ${chargeOption === 'Yes' ? 'selected' : ''}`} htmlFor="flexRadioDefault">
    Yes
  </label>
</div>

        <div className="form-radio" style={{marginLeft:"15px"}}>
          <input

            className="form-Radio-input"
            type="radio"
            value="No"
            id="flexRadioChecked"
            name="chargeOption"
            checked={chargeOption === "No"}
            onChange={() => handleChargeOptionChange("No")}
          />
          <label className="form-Radio-label" for="flexRadioChecked">
            No
          </label>
        </div>
      </div>
      {chargeOption === "Yes" && <DashboardValues />}

      {chargeOption === "No" && <DashboardValues1 />}
    </div>
  );
}
