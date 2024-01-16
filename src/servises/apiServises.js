// Importing Axios library for making HTTP requests
import axios from "axios";

// Creating an instance of Axios with a base URL from environment variables
const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// Intercepting requests to add an authorization token to the headers if available
apiService.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("authToken");
  if (authToken) {
    config.headers["token"] = authToken;
  }
  return config;
});

// Function to log in a user
export const loginUser = async (email, password) => {
  try {
    const response = await apiService.post("/login", { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch country data
export const fetchCountryData = async () => {
  try {
    const response = await apiService.get("/country-list");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch state data by country
export const fetchStateDataByCountry = async (countryId) => {
  try {
    const response = await apiService.get(
      `/state-list-by-country?countryId=${countryId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch a list of data with pagination
export const fetchListData = async (currentPage, perPage) => {
  try {
    const response = await apiService.get(
      `/seller-list?page=${currentPage}&perPage=${perPage}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a user
export const deleteUser = async (userId) => {
  try {
    const response = await apiService.get(`/seller-delete?userId=${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to fetch a user list
export const fetchUserList = async () => {
  try {
    const response = await apiService.get("/seller-list");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to submit a seller form
export const submitSellerForm = async (formData, authToken) => {
  try {
    // Extracting skills from the form data and trimming each skill
    const allSkills = formData.skills.map((skill) => skill.trim());

    // Making a POST request to create a seller with form data
    const response = await apiService.post(
      "/seller-create",
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

    return response.data;
  } catch (error) {
    console.error("Error submitting seller form:", error);
    throw error;
  }
};

// Function to fetch a list of products with pagination
export const fetchProductList = async (pageNumber, perPage) => {
  try {
    const response = await apiService.get(
      `/product-list?page=${pageNumber}&perPage=${perPage}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a product with an image
export const addProduct = async (formData) => {
  try {
    const response = await apiService.post("/create-product", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to upload an image
export const uploadImage = async (imageFormData) => {
  try {
    const response = await apiService.post("/upload-image", imageFormData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Exporting the Axios instance as the default export
export default apiService;
