import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { forgotPassword } from "../firebase/services/authService";
import { CircleLoader } from "react-spinners";
import Countdown from "react-countdown";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleEmail = (e) => {
    setEmail(e.target.value.trim());
    setEmailError("");
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setEmailError("Email is required");
      return;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("Please enter a valid email.");
      return;
    }
    setIsLoading(true);
    try {
      await forgotPassword(email.trim());
      setSuccess(true);
      toast.success("Reset password email sent");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center w-[500px] m-auto">
      <div className="mx-3 w-full max-w-lg rounded-lg border-2 border-primary/20 p-6 sm:p-10 m-auto">
        <div className="w-[60px] m-auto ">
          <img src={logo} alt="#logo" className="object-contain w-full h-full" />
        </div>
        <h2
          className="mb-12 font-primary text-primary/80 text-center text-2xl font-semibold mt-5  tracking-wide"
          style={{ wordSpacing: "5px" }}
        >
          Forgot Password?
        </h2>

        {success ? (
          <p className="mb-6 text-center text-green-600 font-secondary font-semibold tracking-wide">
            Email has been sent. Please check your inbox.
          </p>
        ) : (
          <div className="m-auto">
            <div className="relative mt-[70px] ml-[3px] w-[400px] ">
              <input
                onChange={handleEmail}
                value={email}
                type="email"
                className={`w-full py-[26.6px] px-[52px] text-[18px] font-secondary font-semibold border-2   text-black/80 rounded-[8.6px] ${
                  emailError ? "rounded-b-none border-red-400" : "border-secondary/30"
                } focus:outline-0 `}
                placeholder="Enter your email address"
              />
              <p className="w-full text-white bg-red-500 text-[13px] font-secondary rounded-b-[8.6px] px-[12px] tracking-wider font-semibold capitalize">
                {emailError}
              </p>
              <label className="absolute top-[-25px] left-[34.4px] text-[16px] tracking-[3px] bg-white text-secondary/70 px-[16px] py-[12px] text-center font-semibold">
                Email Address
              </label>
            </div>
            <button
              onClick={handleForgotPassword}
              className="relative bg-primary rounded-[86px] w-[400px] font-primary font-semibold text-[20.6px] text-white px-[100px] py-[20px] shadow-[0px_6px_8px_-2px_rgba(0,_0,_0,_0.4)] flex justify-center items-center mt-[28px]"
              style={{
                background: !isLoading ? "radial-gradient(circle, rgb(91, 54, 245) -130%, rgb(0, 0, 0) 50%)" : "",
              }}
            >
              {isLoading ? <CircleLoader color="#B19EFF" size={30} /> : "Send Reset Email"}
            </button>
          </div>
        )}

        <div className="mt-5 text-center ">
          <span className="inline-block">
            <Link
              to="/login"
              className="flex justify-center items-center text-sm font-semibold text-blue-600 hover:underline font-secondary"
            >
              Back to Login
              {success && (
                <span className="opacity-60 text-blue-600">
                  <Countdown
                    date={Date.now() + 5000} // Set countdown to 5 seconds
                    onComplete={() => navigate("/login")}
                    renderer={({ seconds }) => {
                      return seconds > 0 ? <p>&nbsp;({seconds})</p> : null;
                    }}
                  />
                </span>
              )}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
