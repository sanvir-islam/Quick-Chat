import { useEffect, useRef, useState } from "react";
import login from "../assets/Login.png";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { CircleLoader } from "react-spinners";
import { signInUser, signInWithGoogle } from "../firebase/services/authService";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slice/userSlice";
import { writeDataInDb } from "../firebase/services/dbService";

function Login() {
  const userInfo = useSelector((state) => state.user.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passwordInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      toast.warn("You are already logged in.");
      setTimeout(() => {
        navigate("/home");
      }, 500);
    }
  }, []);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [loginErrors, setLoginErrors] = useState({
    emailError: "",
    passwordError: "",
  });
  const [showPass, setShowPass] = useState(false);

  const handleInputChange = (e, field) => {
    const value = field === "password" ? e.target.value : e.target.value.trim();

    setLoginInfo((prev) => ({ ...prev, [field]: value }));
    setLoginErrors((prev) => ({ ...prev, [`${field}Error`]: "" }));
  };

  const handleLoginValidation = () => {
    let emailError = "";
    let passwordError = "";

    if (!loginInfo.email) {
      emailError = "Email is required";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(loginInfo.email)) {
      emailError = "Invalid email format";
    }

    if (!loginInfo.password) {
      passwordError = "Password is required";
    } else {
      if (loginInfo.password.length < 6) passwordError = "Password must be at least 6 characters long.";
      else if (!/(?=.*[a-z])/.test(loginInfo.password))
        passwordError = "Password must contain at least one lowercase letter.";
      else if (!/(?=.*[A-Z])/.test(loginInfo.password))
        passwordError = "Password must contain at least one uppercase letter.";
      else if (!/(?=.*\d)/.test(loginInfo.password)) passwordError = "Password must contain at least one number.";
    }

    // Set the errors in state
    setLoginErrors({
      emailError,
      passwordError,
    });
    return !emailError && !passwordError;
  };

  const handleLogin = async () => {
    const isValid = handleLoginValidation();

    if (isValid) {
      setIsLoading(true);
      try {
        const user = await signInUser(loginInfo.email, loginInfo.password);
        dispatch(setUserInfo(user));
        //clear the fields
        setLoginInfo({
          email: "",
          password: "",
        });
        toast.success("Successfully logged in!");
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Login Failed: Some fields are invalid");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      await writeDataInDb(`users/${user.uid}`, { email: user.email, username: user.displayName, id: user.uid });

      dispatch(setUserInfo(user));

      toast.success("Successfully logged in!");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center">
      <div className="w-[52%] ml-[20%] align-center ">
        <h2 className="text-secondary text-[35px] font-bold font-sans">Login to your account!</h2>
        <div
          className="flex items-center ml-[3px] py-[23px] pr-[40px] pl-[30px] w-[240px] border-2 border-black/20 cursor-pointer mt-[30px] rounded-[8.6px]"
          onClick={handleGoogleSignIn}
        >
          <span className="w-[20px] h-[20px] mr-[10px]">
            <FcGoogle className="w-full h-full" />
          </span>
          <p className="font-primary text-[14px] font-semibold text-primary/80 tracking-wide">Login with Google</p>
        </div>

        <div className="mt-[80px]">
          <div className="relative mt-[62px] ml-[3px] w-[400px]">
            <input
              onChange={(e) => handleInputChange(e, "email")}
              onKeyDown={(e) => e.key === "Enter" && passwordInputRef.current.focus()}
              value={loginInfo.email}
              type="email"
              className={`w-full py-[26.6px] px-[52px] text-[18px] font-secondary font-semibold border-2   text-black/80 rounded-[8.6px] ${
                loginErrors.emailError ? "rounded-b-none border-red-400" : "border-secondary/30"
              } focus:outline-0 `}
              placeholder="Enter your email address"
            />
            <p className="w-full text-white bg-red-500 text-[13px] font-secondary rounded-b-[8.6px] px-[12px] tracking-wider font-semibold capitalize">
              {loginErrors.emailError}
            </p>
            <label className="absolute top-[-25px] left-[34.4px] text-[16px] tracking-[3px] bg-white text-secondary/70 px-[16px] py-[12px] text-center font-semibold">
              Email Address
            </label>
          </div>

          <div className=" w-[400px] relative mt-[45px] ml-[3px]">
            <input
              onChange={(e) => handleInputChange(e, "password")}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              ref={passwordInputRef}
              value={loginInfo.password}
              type={showPass ? "text" : "password"}
              className={`w-full py-[26.6px] px-[52px] text-[18px] font-secondary font-semibold border-2 text-black/80  rounded-[8.6px] ${
                loginErrors.passwordError ? "rounded-b-none border-red-400" : "border-secondary/30"
              } focus:outline-0 `}
              placeholder="Enter password"
            />
            <button
              className={`absolute top-1/2 ${
                !loginErrors.passwordError ? "translate-y-[-95%]" : "translate-y-[-135%]"
              }  right-[20px] text-[22px] cursor-pointer p-[2px]`}
            >
              {showPass ? (
                <IoMdEyeOff onClick={() => setShowPass(!showPass)} />
              ) : (
                <IoMdEye onClick={() => setShowPass(!showPass)} />
              )}
            </button>

            <p className="w-full text-white bg-red-500 text-[13px] font-secondary rounded-b-[8.6px] px-[12px] tracking-wider font-semibold ">
              {loginErrors.passwordError}
            </p>
            <p
              className="text-primary/60 hover:underline leading-[3px] pl-[10px] text-[13px] font-semibold font-primary mt-[15px] cursor-pointer tracking-wider inline-block"
              style={{ wordSpacing: "2px" }}
              onClick={() => navigate("/forgotpassword")}
            >
              Forgot password?
            </p>
            <label className="absolute top-[-25px] left-[34.4px] text-[16px] tracking-[3px] bg-white text-secondary/70 px-[16px] py-[12px] text-center font-semibold">
              Password
            </label>
          </div>

          <div className="w-[400px] mt-[52px]">
            <button
              onClick={handleLogin}
              className="relative bg-primary rounded-[86px] w-full font-primary font-semibold text-[20.6px] text-white px-[135px] py-[20px] shadow-[0px_6px_8px_-2px_rgba(0,_0,_0,_0.4)] flex justify-center items-center"
              style={{
                background: !isLoading ? "radial-gradient(circle, rgb(91, 54, 245) -130%, rgb(0, 0, 0) 50%)" : "",
              }}
            >
              {isLoading ? <CircleLoader color="#B19EFF" size={30} /> : "Login"}
            </button>
            <p className="font-sans text-[13.4px] mt-[35px] text-center mb-[20px]">
              Already have an account ?{" "}
              <span className="text-[#EA6C00] font-bold font-sans text-[13.4px] cursor-pointer">
                <Link to="/registration">Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-[48%] h-screen">
        <img src={login} className="w-full h-full object-cover " alt="#Login" />
      </div>
    </div>
  );
}

export default Login;
