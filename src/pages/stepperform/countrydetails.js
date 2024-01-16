import React, { useState, useEffect } from "react";
import Select from "react-select";
import {
  fetchCountryData,
  fetchStateDataByCountry,
} from "../../servises/apiServises";

export default function Countrydetails({ formData, setFormData }) {
  const { country_id, state_id, country_name, state_name } = formData;

  const [selectedCountry, setSelectedCountry] = useState(
    country_id ? { value: country_id, label: country_name } : null
  );
  const [selectedState, setSelectedState] = useState(
    state_id ? { value: state_id, label: state_name } : null
  );

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  // Update local state when formData changes externally

  useEffect(() => {
    // Fetch country data when the component mounts
    fetchCountryData()
      .then((response) => {
        const data = response?.data;
        console.log("Country data received:", data);

        if (Array.isArray(data)) {
          setCountries(
            data.map((country) => ({
              value: country.countryId,
              label: country.countryName,
            }))
          );
        } else {
          console.error("Country data is not in the expected format (array).");
        }
      })
      .catch((error) => console.error("Error fetching country data:", error));

    // Fetch state data based on the selected country
    if (selectedCountry) {
      fetchStateDataByCountry(selectedCountry.value)
        .then((response) => {
          const data = response?.data;
          console.log("State data received:", data);

          if (Array.isArray(data)) {
            setStates(
              data.map((state) => ({
                value: state.stateId,
                label: state.stateName,
              }))
            );
          } else {
            console.error("State data is not in the expected format (array).");
          }
        })
        .catch((error) => console.error("Error fetching state data:", error));
    }
  }, [selectedCountry]);

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
                  options={countries}
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
                  options={states && states}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
