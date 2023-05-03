import axios from 'axios';
// Get the base URL from the environment variables
const BASE_API_GATEWAY_URL = process.env.REACT_APP_API_GATEWAY;

// Create an Axios instance with the base URL and auth token header
const axiosApiGatewayInstance = axios.create({

    baseURL: BASE_API_GATEWAY_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
export default axiosApiGatewayInstance;

// Make a POST request to the API endpoint with the provided request body
export const createPostAsync = async (postData) => {
    try {
        const response = await axiosApiGatewayInstance.post('/post', postData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create post');
    }
};


export const updatePostApproveStatusAsync = async (postData) => {
    try {
        const response = await axiosApiGatewayInstance.post('/post/approve', postData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update post approve status');
    }
};

export const paypalCaptureAsync = async (paymentId, postId) => {
    try {
        await axiosApiGatewayInstance.post('/donation/paypal-capture', {paymentId: paymentId, postId: postId });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to capture paypal payment');
    }
};


