import { createContext, useState, useContext, useEffect } from "react";
import AxiosInstance from "../Components/AxiosInstance";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null; // Retrieve user data from localStorage
  }); 
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  

  const token = localStorage.getItem("access_token");
  console.log(token)

  const fetchUserData = async () => {
    if (!token) {
      setError("No token found. Please log in.");
      setUser(null);
      setLoading(false)
      return;
    }

    try {
      setLoading(true);
      setError(null);

      console.log("Fetching user data...");
      const response = await AxiosInstance.get("/user/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("API Response:", response.data);

      setUser(response.data); // Update user state
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user in LocalStorage

    } catch (err) {
      console.error("Error fetching user data:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to fetch user data.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to Manually Refresh User Data
  const refreshUser = () => {
    console.log("Refreshing User Data...");
    fetchUserData();
  };

  // Handle User Logout
  const signOut = () => {
    console.log("Signing out...");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
  };


  useEffect(() => {
    if (token && !user) {
      console.log("Token found, but no user data. Fetching user data...");
      fetchUserData();
    }
  }, [token, user]); // Remove `user` to avoid unnecessary refetching

  return (
    <UserContext.Provider value={{ user, loading, error, refreshUser, signOut }}>
      {loading ? <div>Loading...</div> : children}
    </UserContext.Provider>
  );
};
