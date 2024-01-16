import React, { useState, useEffect } from "react";
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { fetchUserList, submitSellerForm } from "../servises/apiServises";
const steps = [
  "Personal Information",
  "Details",
  "Skills Details",
  "Credentail Details",
];

export default function Stepperform() {
  const [activeStep, setActiveStep] = useState(0);
  const [createdUser, setCreatedUser] = useState(null);

  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [newUserData, setNewUserData] = useState([]);

  // ... rest of your List component code

  const [formData, setFormData] = useState({
    skills: [],
  });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Personaldetails formData={formData} setFormData={setFormData} />
          </>
        );
      case 1:
        return (
          <>
            <Countrydetails formData={formData} setFormData={setFormData} />
          </>
        );
      case 2:
        return (
          <>
            <Skillsdetails
              // onDataSubmit={handleDataSubmit}
              formData={formData}
              setFormData={setFormData}
            />
          </>
        );
      case 3:
        return (
          <>
            <Credentaildetails formData={formData} setFormData={setFormData} />
          </>
        );
      default:
        return "Unknown step";
    }
  };

  // Function to handle adding user to the list
  const handleAddUserToList = async () => {
    try {
      const userList = await fetchUserList();
      setNewUserData(userList);
    } catch (error) {
      // Handle errors if needed
      console.error("Error fetching updated user list:", error);
    }
  };
  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        const response = await submitSellerForm(formData, authToken);

        setCreatedUser(response.data);
        setNewUserData(response.data);
        handleAddUserToList();

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } catch (error) {
        console.error("Error submitting seller form:", error);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  useEffect(() => {
    localStorage.setItem("authToken", authToken);
  }, [authToken]);
  useEffect(() => {}, [activeStep]);

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
        <div>
          <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
            Stepper Form
          </h3>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700 mb-2">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <>
            {activeStep === steps.length ? (
              <div className="flex justify-center  w-full mt-5">
                <div className=" p-8 m-4">
                  <Typography variant="h5" className="mt-10 mb-10 pb-10">
                    Thank you for submitting the form!
                  </Typography>
                  <Link
                    to="/List"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    View List
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Typography variant="h5">
                  {getStepContent(activeStep)}
                </Typography>
                <div className="flex justify-center">
                  <div className="flex justify-between w-full mt-4">
                    <Button
                      className="bg-back "
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                    >
                      {activeStep === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        </div>
      </div>
    </Layout>
  );
}
