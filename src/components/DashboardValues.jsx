import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import axios from "axios";
import './Dashboard.css'

export default function DashboardValues() {
  const [isLoading, setIsLoading] = useState(false);
  const [customSongRequestAmount, setCustomSongRequestAmount] = useState();
  const [regularAmounts, setRegularAmounts] = useState([0, 0, 0, 0]);
  const minValues = [79, 59, 39, 19];

 
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
  

 
    const putPriceData = async () => {
      try {
        setIsLoading(true);
        console.log('amount');
        console.log(customSongRequestAmount);
        const response = await axios.put(
          "https://stg.dhunjam.in/account/admin/4",{
            amount:{
              category_6:customSongRequestAmount
            }
              
            
          }
        );
        console.log(response);

        if (response.data && response.data.response === "Success") {
        //   setUserData(response.data.data);
          setCustomSongRequestAmount(
            response.data.data.customSongRequestAmount
          );
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setIsLoading(false);
      }
    };

    
 

  const handleSaveClick = () => {
    if (customSongRequestAmount < 99 && customSongRequestAmount !== undefined) {
      alert("Minimum custom song request value should be 99");
      return;
    }
    for (let i = 0; i < minValues.length; i++) {
      if(regularAmounts[i] < minValues[i]){
        alert("Minimum values must be 79, 59, 39, 19");
        return;
      }
    } 
    alert("data saved successfully");
    putPriceData();
    setCustomSongRequestAmount();
    setRegularAmounts([0,0,0,0])
  };
  return (
    <div className="dashboardValue">
      <div className="dashp">
        <p>Custom song request amount-</p>
        <input
          placeholder="Enter number"
          type="tex"
          value={customSongRequestAmount}
          onChange={(e) => setCustomSongRequestAmount(e.target.value)}
          
        />
      </div>
      <div className="category">
        <p>Regular song request amounts,<br/> from high to low-</p>
        <input
        style={{marginLeft:"50px"}}
          placeholder="0"
          type="text"
          value={regularAmounts[0]}
          onChange={(e) => handleRegularAmountChange(0, e.target.value)}
        />
        <input
          placeholder="0"
          type="text"
          value={regularAmounts[1]}
          onChange={(e) => handleRegularAmountChange(1, e.target.value)}
        />
        <input
          placeholder="0"
          type="text"
          value={regularAmounts[2]}
          onChange={(e) => handleRegularAmountChange(2, e.target.value)}
        />
        <input
          placeholder="0"
          type="text"
          value={regularAmounts[3]}
          onChange={(e) => handleRegularAmountChange(3, e.target.value)}
        />
      </div>
      <div style={{display:"flex", flexDirection:"row"}}>
        <p style={{color:"white", fontSize:"30px"}}>
        &#8377;
        </p>
      
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="name" style={{fontSize:"14px"}}/>
          <YAxis tick={false} />
          <Bar dataKey="value" fill="#F0C3F1 " barSize={23} />
        </BarChart>
      </div>
      <div>
        <button onClick={handleSaveClick} className="savebtn">Save</button>
      </div>
    </div>
  );
}
