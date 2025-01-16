export const backend_url = window.location.hostname === "localhost"
    ? "http://localhost:7000"
    : "https://real-time-cheat-ap.onrender.com";

    

export const USER_END_POINT_API = `${backend_url}/api/v1/user`;
export const MESSAGE_END_POINT_API = `${backend_url}/api/v1/message`;