import axios from 'axios';
import { toastError, toastWarn } from './notifyCustom';

export const getApi = async (url) => {
    try {
        const response = await axios.get(
            url,
        )
        return response
    } catch (error) {
        return error;
    }
}
export const getApiWithToken = async (url) => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    try {
        const response = await axios(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`, // Correctly format the token
                "Content-Type": "application/json",
            },
        });
        return response.data; // Return only the data from the response
    } catch (error) {
        // Log the error and optionally handle it with a toast notification
        console.error('API Error:', error);
        throw new Error(error?.response?.data?.message || 'Failed to fetch data');
    }
};



export const postApi = async (url, formData) => {
    try {
        const response = await axios(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: formData,
        });

        return response;

    } catch (error) {
        // Improved error handling to check if error.response is defined
        const errorMessage = error.response?.data?.message || 'An unknown error occurred';
        toastError(errorMessage);
        return error;
    }
};

export const postFormDataApi = async (url, formData) => {
    try {
        const response = await axios(url, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",  // This is essential for formData uploads
            },
            data: formData, // Sending the formData directly
        });

        return response;

    } catch (error) {
        // Improved error handling to check if error.response is defined
        const errorMessage = error.response?.data?.message || 'An unknown error occurred';
        toastError(errorMessage);
        return error;
    }
};
export const postApiWithToken = async (url, formData) => {

    let data = JSON.stringify(formData);

    try {
        const token = localStorage.getItem('token')
        console.log("ghgjhgkj",token);
        
        const response = await axios(url, {
            method: "POST",
            headers: {
                Authorization: JSON.parse(token),
                "Content-Type": "application/json",
            },
            data: data
        })
        return response;

    } catch (error) {
        // console.log(error.response.data.message);
        toastError(error?.response?.data?.message)
        return error;
    }

}
export const postApiWithFormdata = async (url, formData) => {


    let data = JSON.stringify(formData);

    try {
        const response = await axios(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            data: data
        })
        return response

    } catch (error) {
        // console.log(error);
        toastError(error.response.data.message)
        return error.response;
    }

}


export const postApiWithTokenRowData = async (url, formData) => {

    // console.log(formData, url, "------");

    let data = JSON.stringify(formData);

    try {
        // const token = localStorage.getItem('token')
        const response = await axios(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
            },
            data: formData
        })
        return response;

    } catch (error) {
        console.log(error, "gggggggf");
        toastError(error?.response?.data?.message)
        return error;
    }

}