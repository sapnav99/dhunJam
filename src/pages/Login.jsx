import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { IoIosEye } from "react-icons/io";
export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const loginUser = async () => {
    try {
      if (isLoading) {
        return;
      }
      if (name.length === 0 || password.length === 0) {
        alert("Please enter username and password");
      }
      if (password.length < 8) {
        alert("password must be atleast 8 character");
      }
      setIsLoading(true);

      const response = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          username: name,
          password: password,
        }
      );

      if (response.data && response.data.response === "Success") {
        console.log("Logged in successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error in login", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mainpage">
      <h3 style={{ fontSize: "32px", color: "white" }}>Venue Admin Login</h3>
      <div className="inputs">
        <div className="input1">
          <input
            placeholder="Username"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }} className="input2">
      <input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {showPassword ? (
        <IoIosEye className="icon" onClick={togglePasswordVisibility} />
      ) : (
        <IoIosEye className="icon" onClick={togglePasswordVisibility} />
      )}
    </div>
      </div>
      <div>
        <button onClick={loginUser} disabled={isLoading} className="logbutton">
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </div>
      <div className="reg">
        <p>New Registration?</p>
      </div>
    </div>
  );
}
