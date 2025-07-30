import { useEffect, useRef, useState } from "react";
import registration from "../assets/registration.png";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { signUpUser } from "../firebase/services/authService";
import { CircleLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slice/userSlice";
import { updateUserInfo, writeDataInDb } from "../firebase/services/dbService";

function Registration() {
  const userInfo = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      toast.warn("You are already registered.");
      setTimeout(() => {
        navigate("/home");
      }, 500);
    }
  }, []);

  const inputRefs = {
    email: useRef(null),
    fullName: useRef(null),
    password: useRef(null),
  };
  const [isLoading, setIsLoading] = useState(false);

  const [registrationInfo, setRegistrationInfo] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  const [registrationErrors, setRegistrationErrors] = useState({
    emailError: "",
    fullNameError: "",
    passwordError: "",
  });
  const [showPass, setShowPass] = useState(false);

  const handleInputChange = (e, field) => {
    const value = field === "password" ? e.target.value : e.target.value.trim();

    setRegistrationInfo((prev) => ({ ...prev, [field]: value }));
    setRegistrationErrors((prev) => ({ ...prev, [`${field}Error`]: "" }));
  };

  const handleRegistrationValidation = () => {
    let emailError = "";
    let fullNameError = "";
    let passwordError = "";

    if (!registrationInfo.email) {
      emailError = "Email is required";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(registrationInfo.email)) {
      emailError = "Invalid email format";
    }

    if (!registrationInfo.fullName) {
      fullNameError = "Full name is required";
    }

    if (!registrationInfo.password) {
      passwordError = "Password is required";
    } else {
      if (registrationInfo.password.length < 6) passwordError = "Password must be at least 6 characters long.";
      else if (!/(?=.*[a-z])/.test(registrationInfo.password))
        passwordError = "Password must contain at least one lowercase letter.";
      else if (!/(?=.*[A-Z])/.test(registrationInfo.password))
        passwordError = "Password must contain at least one uppercase letter.";
      else if (!/(?=.*\d)/.test(registrationInfo.password))
        passwordError = "Password must contain at least one number.";
    }

    // Set the errors in state
    setRegistrationErrors({
      emailError,
      fullNameError,
      passwordError,
    });

    return !emailError && !fullNameError && !passwordError;
  };

  const handleRegistration = async () => {
    const isValid = handleRegistrationValidation();
    if (isValid) {
      setIsLoading(true);
      try {
        const user = await signUpUser(registrationInfo.email, registrationInfo.password);
        await updateUserInfo(registrationInfo.fullName);
        await writeDataInDb(`users/${user.uid}`, { email: user.email, username: user.displayName, id: user.uid });
        dispatch(setUserInfo(user));
        // clear input fields
        setRegistrationInfo({
          email: "",
          fullName: "",
          password: "",
        });

        toast.success("Successfully signed u p and logged in!");
        setTimeout(() => {
          navigate("/emailverification");
        }, 1000);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Fix your inpout errors");
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-[52%] ml-[20%] align-center ">
        <h2 className="text-secondary text-[35px] font-bold font-secondary">Get started with easily register</h2>
        <p className="text-[20px] text-primary/50 mt-[13px]">Free register and you can enjoy it</p>

        <div className="mt-[62px]">
          <div className="relative mt-[62px] ml-[3px] w-[400px]">
            <input
              onChange={(e) => handleInputChange(e, "email")}
              onKeyDown={(e) => e.key === "Enter" && inputRefs.fullName.current.focus()}
              ref={inputRefs.email}
              value={registrationInfo.email}
              type="email"
              className={`w-full py-[26.6px] px-[52px] text-[18px] font-secondary font-semibold border-2   text-black/80 rounded-[8.6px] ${
                registrationErrors.emailError ? "rounded-b-none border-red-400" : "border-secondary/30"
              } focus:outline-0 `}
              placeholder="Enter your email address"
            />
            <p className="w-full text-white bg-red-500 text-[13px] font-secondary rounded-b-[8.6px] px-[12px] tracking-wider font-semibold capitalize">
              {registrationErrors.emailError}
            </p>
            <label className="absolute top-[-25px] left-[34.4px] text-[16px] tracking-[3px] bg-white text-secondary/70 px-[16px] py-[12px] text-center font-semibold">
              Email Address
            </label>
          </div>
          <div className=" w-[400px] relative mt-[50px] ml-[3px]">
            <input
              onChange={(e) => handleInputChange(e, "fullName")}
              onKeyDown={(e) => e.key === "Enter" && inputRefs.password.current.focus()}
              ref={inputRefs.fullName}
              value={registrationInfo.fullName}
              type="text"
              className={`w-full py-[26.6px] px-[52px] text-[18px] font-secondary font-semibold border-2   text-black/80 rounded-[8.6px] ${
                registrationErrors.fullNameError ? "rounded-b-none border-red-400" : "border-secondary/30"
              } focus:outline-0 `}
              placeholder="Enter your full name"
            />
            <p className="w-full text-white bg-red-500 text-[13px] font-secondary rounded-b-[8.6px] px-[12px] tracking-wider font-semibold capitalize">
              {registrationErrors.fullNameError}
            </p>
            <label className="absolute top-[-25px] left-[34.4px] text-[16px] tracking-[3px] bg-white text-secondary/70 px-[16px] py-[12px]  text-center font-semibold">
              Full name
            </label>
          </div>
          <div className=" w-[400px] relative mt-[50px] ml-[3px]">
            <input
              onChange={(e) => handleInputChange(e, "password")}
              onKeyDown={(e) => e.key === "Enter" && handleRegistration()}
              ref={inputRefs.password}
              value={registrationInfo.password}
              type={showPass ? "text" : "password"}
              className={`w-full py-[26.6px] px-[52px] text-[18px] font-secondary font-semibold border-2 text-black/80  rounded-[8.6px] ${
                registrationErrors.passwordError ? "rounded-b-none border-red-400" : "border-secondary/30"
              } focus:outline-0 `}
              placeholder="Enter password"
            />
            <button
              className={`absolute top-1/2 ${
                !registrationErrors.passwordError ? "translate-y-[-50%]" : "translate-y-[-86%]"
              }  right-[20px] text-[22px] cursor-pointer p-[2px]`}
            >
              {showPass ? (
                <IoMdEyeOff onClick={() => setShowPass(!showPass)} />
              ) : (
                <IoMdEye onClick={() => setShowPass(!showPass)} />
              )}
            </button>

            <p className="w-full text-white bg-red-500 text-[13px] font-secondary rounded-b-[8.6px] px-[12px] tracking-wider font-semibold ">
              {registrationErrors.passwordError}
            </p>
            <label className="absolute top-[-25px] left-[34.4px] text-[16px] tracking-[3px] bg-white text-secondary/70 px-[16px] py-[12px] text-center font-semibold">
              Password
            </label>
          </div>

          <div className="w-[400px] mt-[52px]">
            <button
              onClick={handleRegistration}
              disabled={isLoading}
              className="relative bg-primary rounded-[86px] w-full font-primary font-semibold text-[20.6px] text-white px-[135px] py-[20px] shadow-[0px_6px_8px_-2px_rgba(0,_0,_0,_0.4)] flex justify-center items-center"
              style={{
                background: !isLoading ? "radial-gradient(circle, rgb(91, 54, 245) -130%, rgb(0, 0, 0) 50%)" : "",
              }}
            >
              {isLoading ? <CircleLoader color="#B19EFF" size={30} /> : "Sign Up"}
            </button>
            <p className="font-sans text-[13.4px] mt-[35px] text-center mb-[20px]">
              Already have an account ?{" "}
              <span className="text-[#EA6C00] font-bold font-sans text-[13.4px] cursor-pointer">
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-[48%] h-screen">
        <img src={registration} className="w-full h-full object-cover " alt="#registration" />
      </div>
    </div>
  );
}

export default Registration;
