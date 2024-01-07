import React, { useState, useEffect } from "react";
import Select from "react-select";

export default function Countrydetails({ formData, setFormData }) {
  const { country_id, state_id, country_name, state_name } = formData;

  const [selectedCountry, setSelectedCountry] = useState(
    country_id ? { value: country_id, label: country_name } : null
  );
  const [selectedState, setSelectedState] = useState(
    state_id ? { value: state_id, label: state_name } : null
  );

  const country = [
    { value: "1", label: "India" },
    { value: "2", label: "Afghanistan" },
    { value: "3", label: "Albania" },
  ];
  const state = [
    { value: "1", label: "Maharashtra" },
    { value: "2", label: "Gujarat" },
    { value: "3", label: "Kerala" },
  ];

  // Update local state when formData changes externally
  useEffect(() => {
    setSelectedCountry(country_id ? { value: country_id, label: country_name } : null);
    setSelectedState(state_id ? { value: state_id, label: state_name } : null);
  }, [country_id, state_id, country_name, state_name]);

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      selectedCountry: selectedOption,
    }));
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      selectedState: selectedOption,
    }));
  };

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
            Details
          </h1>
          <form action="/" method="post">
            <div className="grid gap-2 md:grid-cols-2">
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="country"
                >
                  Select Country
                </label>
                <Select
                  id="country"
                  className="basic-single text-left text-sm text-gray-700 rounded border border-gray-200"
                  classNamePrefix="select"
                  options={country}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-700 text-left"
                  htmlFor="state"
                >
                  Select State
                </label>
                <Select
                  id="state"
                  className="basic-single text-left text-sm rounded text-gray-700 border border-gray-200"
                  classNamePrefix="select"
                  value={selectedState}
                  onChange={handleStateChange}
                  options={state}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
