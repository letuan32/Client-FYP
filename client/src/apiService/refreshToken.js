import axios from 'axios';

const FIRE_BASE_API_KEY = process.env.REACT_APP_FIREBASE_AUTHEN_KEY
const refreshTokenUrl = `https://securetoken.googleapis.com/v1/token?key=${FIRE_BASE_API_KEY}`;

export const exchangeIdTokenForRefreshToken = async (idToken) => {
    const response = await axios.post(refreshTokenUrl, {
        grant_type: 'refresh_token',
        refresh_token: idToken,
    });
    return response.data;
};