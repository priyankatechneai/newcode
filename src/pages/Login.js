import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../servises/apiServises";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await loginUser(email, password);
      const { token, roleId } = response;

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
        setError("Invalid email or password.");
        navigate("/login");
      } else {
        console.error("Login failed:", error);
        setError("Invalid Credential");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img"
      style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}
    >
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">
          <div className="w-96 flex">
            <div className="w-full bg-login p-6  rounded-lg">
              <div className="heading-1 pt-10 m-auto ">
                <img
                  src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg"
                  alt="login-img"
                  className="rounded-full m-auto p-1 border"
                  width="100px"
                  height="100px"
                />
                <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">
                  Login
                </h3>
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
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
                        <span className="ml-2">Logging in...</span>
                      </div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
                <div className="text-red-500 text-sm mb-4 text-center">
                  {error}
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
