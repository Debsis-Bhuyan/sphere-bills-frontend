import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import axios from "axios";
import { uploadFile } from "../utils";
import useStore from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
const SignUp = () => {
  const userData = useSelector((state) => state.user).user;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [fileURL, setFileUrl] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    file && uploadFile(setFileUrl, file);
  }, [file]);
  useEffect(() => {
    setTimeout(() => {
      setErr("");
    }, 3000);
  }, [err]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(password, conformPassword);
    if (password !== conformPassword) {
      setErr("Password and Conform Password are not matched");
      return;
    }
    console.log(email, password, name, conformPassword,fileURL);
    const url = `${APP_URL}/user/register`;
    try {
      const response = await axios.post(url, {
        fullName: name,
        email,
        password,
        profileUrl: fileURL,
      });
      console.log("User registered successfully:", response.data);
      setFile(null);
      alert(response.data.message)
      if (response.data.success) {
        console.log(response.data.user);
        dispatch(setUser(response.data));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
      return response.data; // Return any data you want to use in your component
    } catch (error) {
      // Handle error, e.g., show an error message to the user
      console.error("Error registering user:", error);
      throw error; // Throw the error for further handling in the component
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <div className="flex items-center justify-center my-6">
          <Logo />
        </div>
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Sign Up
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="conformPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Conform Password
            </label>
            <input
              type="password"
              id="conformPassword"
              name="conformPassword"
              value={conformPassword}
              onChange={(e) => {
                setConformPassword(e.target.value);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Conform your password"
              required
            />
            {err && <p className="  text-red-700">{err}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="file"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Business Logo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
              className="mt-1 p-2 w-full border rounded-md focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
