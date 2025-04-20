import axios from "axios";
import { loginURL, betApiUrl } from "../constant/apiURL";

const apiCallLogin = async (url, method, formdata) => {
  console.log("API Call Made to: ", url);
  try {
    const response = await axios({
      url: url,
      method: method,
      data: formdata, // Use 'data' instead of 'body'
    });
    return response;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response;
  }
};

const betApiCalling = async (url, method, formdata, token) => {
  try {
    const response = await axios({
      url: url,
      method: method,
      data: formdata, // Use 'data' instead of 'body'
      headers: {
        Authorization: `Bearer ${token}` // Pass the token in the headers
      }
    });
    return response;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response;
  }
}

export const betApi = async (betData, token) => {
  try {
    const response = await betApiCalling(betApiUrl, "POST", betData, token);
    if (response.status === 200) {
      return response.data; // Return the data instead of the entire response object
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

export const fetchLoginData = async (formdata) => {
  try {
    const response = await apiCallLogin(loginURL, "POST", formdata);
    if (response.status === 200) {
      return response.data; // Return the data instead of the entire response object
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};


