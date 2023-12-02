import React, { useState, useEffect } from "react";

import axios from "axios";
import './Dashboardvalue1.css'

export default function DashboardValues1() {
  const [isLoading, setIsLoading] = useState(false);
  const [customSongRequestAmount, setCustomSongRequestAmount] = useState();
  const [regularAmounts, setRegularAmounts] = useState([0, 0, 0, 0]);

  const handleSaveClick = () => {
    if (customSongRequestAmount < 99 && customSongRequestAmount !== undefined) {
      alert("Minimum custom song request value should be 99");
    } else {
      alert("data saved successfully");
    }
  };
  const data = [
    { name: "Custom", value: parseInt(customSongRequestAmount, 10) || 0 },
    { name: "Category1", value: regularAmounts[0] },
    { name: "Category2", value: regularAmounts[1] },
    { name: "Category3", value: regularAmounts[2] },
    { name: "Category4", value: regularAmounts[3] },
  ];

  const handleRegularAmountChange = (index, value) => {
    const newRegularAmounts = [...regularAmounts];
    newRegularAmounts[index] = parseInt(value, 10) || 0;
    setRegularAmounts(newRegularAmounts);
  };
  

  useEffect(() => {
    const putPriceData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.put(
          "https://stg.dhunjam.in/account/admin/4"
        );

        if (response.data && response.data.response === "Success") {
        //   setUserData(response.data.data);
          setCustomSongRequestAmount(
            response.data.data.customSongRequestAmount
          );
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      } finally {
        setIsLoading(false);
      }
    };

    putPriceData();
  }, []);
  return (
    <div className="dashboardValue1">
      <div className="dashp1">
        <p>Custom song request amount-</p>
        <input
        disabled
          placeholder="Enter value"
          type="number"
          value={customSongRequestAmount}
          onChange={(e) => setCustomSongRequestAmount(e.target.value)}
        />
      </div>
      <div className="category1">
        <p>Regular song request amounts,<br/> from high to low-</p>
        <input
        style={{marginLeft:"50px"}}
        disabled
          placeholder="0"
          type="number"
          value={regularAmounts[0]}
          onChange={(e) => handleRegularAmountChange(0, e.target.value)}
        />
        <input
        disabled
          placeholder="0"
          type="number"
          value={regularAmounts[1]}
          onChange={(e) => handleRegularAmountChange(1, e.target.value)}
        />
        <input
        disabled
          placeholder="0"
          type="number"
          value={regularAmounts[2]}
          onChange={(e) => handleRegularAmountChange(2, e.target.value)}
        />
        <input
        disabled
          placeholder="0"
          type="number"
          value={regularAmounts[3]}
          onChange={(e) => handleRegularAmountChange(3, e.target.value)}
        />
      </div>
    
      <div>
        <button onClick={handleSaveClick} className="saveButton" disabled>Save</button>
      </div>
    </div>
  );
}
