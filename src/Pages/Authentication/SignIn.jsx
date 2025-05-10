import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../Provider/UserProvider"
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons
import AxiosInstance from "../../Components/AxiosInstance";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { refreshUser } = useUser();

  const handleLoginChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!credentials.username || !credentials.password) {
      alert("Username and password are required!");
      return;
    }

  
    try {
      const response = await AxiosInstance.post("login/", credentials);
      const data = response.data;
      localStorage.setItem("access_token", data.access);
      refreshUser();
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 401) {
          alert("Invalid username or password!");
        } else if (status === 400) {
          alert("Please provide both username and password.");
        } else {
          alert(error.response.data?.message || "Something went wrong!");
        }
      } else {
        alert("Network error. Please try again.");
      }
    }
  };

  // Registration State (Only username, email, password)
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [registers, setRegister] = useState(false);
  // const [showName1, setShowName1] = useState("");
  // const fileInputRef = useRef();

  // const handleClearFile = () => {
  //   setShowName1("");
  //   setUser({ ...user, profile_picture: null });
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };

  // const handleFileChange = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     const imageFile = e.target.files[0];
  //     setShowName1(imageFile.name);
  //     setUser({ ...user, profile_picture: imageFile });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check removed since confirm_password is not used
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    // formData.append("phone", user.phone);
    // if (user.profile_picture) {
    //   formData.append("profile_picture", user.profile_picture);
    // }
    // formData.append("confirm_password", user.confirm_password);

    try {
      const response = await AxiosInstance.post("/register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data);
      setUser({
        username: "",
        email: "",
        password: "",
        // phone: "",
        // profile_picture: null,
        // confirm_password: "",
      });

      // setShowName1("");
      alert("Registration successful!");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="w-80 md:w-96 my-16 lg:w-[800px] mx-auto bg-white flex items-center relative overflow-hidden shadow-xl">
      {/* Registration Form */}
      <form onSubmit={handleSubmit} method="post" className={`p-8 w-full ${registers ? "lg:translate-x-0" : "lg:-translate-x-full hidden lg:block"} duration-500`}>
        <h1 className="text-2xl lg:text-4xl pb-4">Register</h1>

        <div className="space-y-2">
          <div>
            <label htmlFor="username" className="block text-sm text-gray-600">Name</label>
            <input id="username" name="username" type="text" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} required placeholder="John Doe" className="p-3 h-8 text-sm block w-full outline-none border rounded-md border-black" />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">Email</label>
            <input id="email" name="email" type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="example@example.com" className="p-3 h-8 text-sm block w-full outline-none border rounded-md border-black" />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
            <input id="password" name="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required type="password" placeholder="Password" className="p-3 h-8 text-sm block w-full outline-none border rounded-md border-black" />
          </div>
        </div>

        <input type="submit" value="Register" className="btn py-2 px-5 mb-4 mx-auto mt-8 shadow-lg border rounded-md border-black block" />
        <p className="mb-3 text-center">Already have an account?
          <Link onClick={() => setRegister(!registers)} className="underline font-semibold">Login</Link>
        </p>
        <hr />
      </form>

      {/* Image */}
      <div className={`hidden lg:block absolute w-1/2 h-full top-0 z-50 duration-500 overflow-hidden bg-black/20 ${registers ? "translate-x-full rounded-bl-full" : "rounded-br-full"}`}>
        {/* <img src={img} className="h-full w-full" alt="card navigate ui" /> */}
      </div>

      {/* Login form */}
      <form onSubmit={handleLogin} className={`p-8 w-full mr-0 ml-auto duration-500 ${registers ? "lg:translate-x-full hidden lg:block" : ""}`}>
        <h1 className="text-2xl lg:text-4xl pb-4">Login</h1>
        <div className="space-y-3">
          <label htmlFor="login_username" className="block text-sm text-gray-600">User Name</label>
          <input id="login_username" name="username" type="text" value={credentials.username} onChange={handleLoginChange} placeholder="example1234" autoComplete="username" className="p-3 block w-full outline-none border rounded-md border-black" required />

          <label htmlFor="login_password" className="block text-sm text-gray-600">Password</label>
          <div className="relative">
            <input id="login_password" name="password" type={showPassword ? "text" : "password"} value={credentials.password} onChange={handleLoginChange} placeholder="********" autoComplete="current-password" className="p-3 block w-full outline-none border rounded-md border-black" required />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>

        <p className="mb-3 mt-3 text-center">
          Don't have an account?{" "}
          <Link onClick={() => setRegister(true)} className="underline font-semibold">Register</Link>
        </p>
        <hr />

        <button type="submit" className="btn py-2 px-5 mt-4 shadow-lg border rounded-md border-black block w-full">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
