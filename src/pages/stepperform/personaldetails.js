import React, { useState } from "react";

export default function Personaldetails({ formData, setFormData }) {
  const [localFormData, setLocalFormData] = useState({
    profileImage: formData?.profileImage || "",
    name: formData?.name || "",
    gender: formData?.gender || 0,
    phoneNumber: formData?.phoneNumber || "",
  });

  const handleChange = (e) => {
    setLocalFormData({
      ...localFormData,
      [e.target.name]: e.target.value,
    });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const uploadedImage = reader.result;
        setLocalFormData({ ...localFormData, profileImage: uploadedImage });
      };

      reader.readAsDataURL(file);
    }
  };


  React.useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      ...localFormData,
    }));
  }, [localFormData, setFormData]);

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-500 text-2xl font-bold mb-6">
            Personal Details
          </h1>
          <form action="/" method="post">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                htmlFor="profile"
              >
                Profile Image
              </label>
              <div className="mt-1 flex flex-col items-start">
                <span className="inline-block w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={localFormData.profileImage}
                    alt="profilepic"
                    className="w-100 h-100 m-auto rounded-full shadow"
                  />
                </span>
                <div className="flex items-center justify-center bg-grey-lighter">
                  <label className="w-50 flex flex-col items-center px-4 py-2 mt-5 bg-blue-300 text-gray-700 rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
                    <span className="text-base leading-normal">
                      Upload Image
                    </span>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid gap-x-7 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="firstName"
                >
                  Name
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={localFormData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <div className="flex space-x-7">

                <div className="flex items-center">
                    <input
                      id="male"
                      type="radio"
                      value="1"
                      name="gender"
                      checked={localFormData.gender === 1}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="male"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Male
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="female"
                      type="radio"
                      value="2"
                      name="gender"
                      checked={localFormData.gender === 2}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="female"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Female
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="others"
                      type="radio"
                      value="3"
                      name="gender"
                      checked={localFormData.gender === 3}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="others"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Others
                    </label>
                  </div>
                 
                </div>
              </div>
            </div>

            <div className="grid gap-x-7 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="phoneNumber"
                >
                  Phone Numbers
                </label>
                <input
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                  id="number"
                  name="phoneNumber"
                
                  value={localFormData.phoneNumber}
                  onChange={handleChange}
                  type="number"
                  placeholder="Phone Number"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
