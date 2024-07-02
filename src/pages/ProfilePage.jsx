import React, { useState } from "react";
import image from "../assets/Logo.png";
import { states, state } from "../utils/state";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const user = useSelector((state) => state.user).user.user;
  const [formValues, setFormValues] = useState(user);
  const [userData, setUserData] = useState(user || null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };
  // List of states

  // console.log(state.st)
  // state.forEach(sta=>{
  //   console.log(sta.districts)
  // })
  return (
    <div className="w-full justify-between shadow-md p-4 rounded-lg bg-white">
      <h1 className="text-4xl font-bold mb-2 relative">
        <span
          style={{
            backgroundImage: "linear-gradient(to right, #FFA500, #FF6347)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Profile Page
        </span>
      </h1>
      <div className="flex flex-wrap">
        <div className="w-1/2 pr-4   flex items-center justify-center   ">
          <img src={user?.profileUrl || image} alt="Sample Image" className="w-full h-auto rounded-full" />
          <section className="text-center font-bold mt-4"></section>
        </div>
        <div className="w-1/2 pl-4">
          <form className="w-full">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="businessName"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Business Name*
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={user?.fullName || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="gstin"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  GSTIN *
                </label>
                <input
                  type="text"
                  id="gstin"
                  name="gstin"
                  value={user?.gstin || ""}
                  placeholder="Edit your profile"
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="phoneNo"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Phone No*
                </label>
                <input
                  type="text"
                  id="phoneNo"
                  name="phoneNo"
                  value={formValues.phoneNo || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Edit your Profile"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="email"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Email*
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={user?.email || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  placeholder="xyz@gmail.com"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                {/* Other input fields */}
                <label
                  htmlFor="state"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  State*
                </label>
                <input
                  id="state"
                  name="state"
                  value={user?.state || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  placeholder="Edit your profile"
                  type="text"
                  readOnly
                />
                {/* <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))} */}
                {/* </select> */}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="businessAddress"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Business Address*
                </label>
                <input
                  type="text"
                  id="businessAddress"
                  name="businessAddress"
                  value={user?.businessAddress || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="pincode"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Pincode*
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={user?.pincode || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  readOnly
                />
              </div>
              <div className="w-full md:w-1/2 px-3 mb-2">
                <label
                  htmlFor="businessDetails"
                  className="block uppercase tracking-wide text-gray-700 text-xs font-medium mb-2"
                >
                  Business Details*
                </label>
                <textarea
                  id="businessDetails"
                  name="businessDetails"
                  value={user?.desc || ""}
                  // onChange={handleInputChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                  rows="5"
                  readOnly
                ></textarea>
              </div>
            </div>
            <div className="mt-2">
              
              <Link to={"/profile/edit"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
                Edit Profile
              </Link>
            </div>
          </form>
        </div>
        <div className="text-center mt-4 font-bold">
          &copy; 2024 SphereCode Private Limited
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
