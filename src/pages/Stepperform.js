import React, { useState, useEffect } from "react";
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import axios from "axios";
const steps = [
  "Personal Information",
  "Details",
  "Skills Details",
  "Credentail Details",
];

export default function Stepperform() {
  const [activeStep, setActiveStep] = useState(0);
  const [createdUser, setCreatedUser] = useState(null);
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
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "http://codetentacles-006-site36.htempurl.com/api/api/seller-list",
        {
          headers: {
            token: token,
          },
        }
      );
      setNewUserData(response.data);
    
    } catch (error) {
     
    }
  };

  const handleNext = async () => {
    const allSkills = formData.skills.map((skill) => skill.trim());

    if (activeStep === steps.length - 1) {
      try {
        const response = await axios.post(
          "http://codetentacles-006-site36.htempurl.com/api/api/seller-create",
          {
            name: formData.name,
            profileImage:
              "http://codetentacles-006-site36.htempurl.com/api/public/Image/202312150649download (14).jfif",
            gender: formData.gender,
            phone: formData.phoneNumber,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            countryId: formData.selectedCountry?.value,
            stateId: formData.selectedState?.value,
            email: formData.email,
            skills: allSkills,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: authToken,
            },
          }
        );

        // Handle the API response as needed

        setCreatedUser(response.data);
        setNewUserData(response.data);
        handleAddUserToList();

        // Assuming you want to navigate to the next step after a successful API call
        setActiveStep((prevActiveStep) => {
       
          return prevActiveStep + 1;
        });

       
      } catch (error) {
        // Handle errors
      
      }
    } else {
      // If it's not the last step, just move to the next step
      setActiveStep((prevActiveStep) => {
    
        return prevActiveStep + 1;
      });

    }
  };

  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );

  useEffect(() => {
    localStorage.setItem("authToken", authToken);
  }, [authToken]);
  useEffect(() => {
  
  }, [activeStep]);

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
