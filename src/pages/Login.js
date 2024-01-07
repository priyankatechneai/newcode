import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://codetentacles-006-site36.htempurl.com/api/api/login",
        { email, password }
      );
  
      const { token, roleId } = response.data;
  
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRoleId", roleId);

    
  
      if (roleId === 1) {
        // Admin
        navigate("List");
        alert("Admin logged in successfully!");
      } else {
        // Seller/User
        alert("User logged in successfully!");
        navigate("Product");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Handle token expiration, redirect to login
        navigate("/login");
      } else {
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <section className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img" style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}>
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-96 flex">
            <div className="w-full bg-login p-6  rounded-lg">
              <div className="heading-1 pt-10 m-auto ">
                <img src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg" alt="login-img" className="rounded-full m-auto p-1 border" width="100px" height="100px" />
                <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">Login</h3>
              </div>
              <form className=" pt-8  rounded">
                <div className="mb-4">
                  <input
                    className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a]  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4 md:mr-2 ">
                  <input
                    className="w-full px-3 py-3  text-sm  leading-normal  text-gray-50 border-0  bg-[#ffffff1a]  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                  />
                </div>
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-3 font-bold tracking-wider text-[#000] rounded-lg bg-white focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                    <div className="fill-one"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
