import React, { useState, useEffect } from "react";

export default function SkillsDetails({ formData, setFormData }) {
  const [skills, setSkills] = useState(formData?.skills || [""]);

  const handleSkillChange = (index, value) => {
    const newSkills = [...skills];
    newSkills[index] = value;

    // Update the parent form data with the skills as they are changed
    setFormData((prevData) => ({
      ...prevData,
      skills: newSkills,
    }));

    setSkills(newSkills);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);

    // Update the parent form data after removing a skill
    setFormData((prevData) => ({
      ...prevData,
      skills: newSkills,
    }));

    setSkills(newSkills);
  };

  const handleAddSkill = () => {
    const newSkills = [...skills, ""];

    // Update the parent form data after adding a skill
    setFormData((prevData) => ({
      ...prevData,
      skills: newSkills,
    }));

    setSkills(newSkills);
  };

  // Update the local state when formData.skills change externally
  useEffect(() => {
    setSkills(formData?.skills || [""]);
  }, [formData.skills]);
  console.log(formData);

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
            Skills Details
          </h1>
          <div className="mb-4">
            {skills.map((skill, index) => (
              <div key={index} className="flex space-x-6 mb-4">
                <input
                  type="text"
                  placeholder="Add Skills"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(index)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSkill}
              className="text-white bg-blue-700 text-left flex hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Add Skills
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
