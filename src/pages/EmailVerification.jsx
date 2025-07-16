import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // To access Redux store
import logo from "../assets/logo.png";
import { useNavigate } from "react-router"; // Assuming you're using react-router
import { toast } from "react-toastify";
import { emailVerification, logoutUser } from "../firebase/services/authService"; // Assuming the verification function exists
import { CircleLoader } from "react-spinners";
import { logout } from "../slice/userSlice";

const EmailVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Getting user email from Redux store
  const userInfo = useSelector((state) => state.user.value);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.emailVerified) {
        navigate("/home");
        toast.success("Your email is already verified");
      } else {
        pollForEmailVerification();
      }
    } else {
      dispatch(logout());
      navigate("/login");
    }
  }, []);

  const handleEmailVerification = async () => {
    //if there is no user / userEmail
    if (!userInfo?.email) {
      toast.error("No email found in your profile.");
      dispatch(logout());
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      await emailVerification(userInfo.email); // Send email verification function
      setSuccess(true);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pollForEmailVerification = async () => {
    if (userInfo) {
      const interval = setInterval(async () => {
        await userInfo.reload();
        if (userInfo.emailVerified) {
          // dispatch(setUserInfo(userInfo));
          clearInterval(interval);
          navigate("/home");
        }
      }, 1000);
    }
  };
  const handleSignOut = async () => {
    try {
      await logoutUser();
      dispatch(logout()); //clear the store
      toast.success("You have been logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center w-[500px] m-auto ">
      <div className="mx-3 w-full max-w-lg rounded-lg border-2 border-black/10 p-6 sm:p-10 m-auto shadow-[0px_0px_4px_1px_rgba(79,214,156,.3)]">
        <div className="w-[60px] m-auto ">
          <img src={logo} alt="#logo" className="object-contain w-full h-full" />
        </div>
        <h2 className="mb-14 font-primary text-primary/80 text-center text-2xl font-semibold mt-5 tracking-wide">
          Verify Your Email
        </h2>

        {success ? (
          <p className="mb-6 text-center text-green-600 font-secondary font-semibold tracking-wide">
            Verification email has been sent. Please check your inbox.
          </p>
        ) : (
          <div className="m-auto">
            <p className="text-center text-[17px] mb-4 text-secondary font-secondary font-bold tracking-wide">
              Email: <span className="text-[#379870] text-[19px] tracking-widest">{userInfo?.email}</span>
            </p>

            <button
              onClick={handleEmailVerification}
              className="relative bg-primary rounded-[86px] w-[380px] font-primary font-semibold text-[20.6px] text-white px-[60px] py-[20px] shadow-[0px_6px_8px_-2px_rgba(0,_0,_0,_0.4)] flex justify-center items-center mt-[28px]"
              style={{
                background: !isLoading ? "radial-gradient(circle, rgb(91, 54, 245) -130%, rgb(0, 0, 0) 50%)" : "",
              }}
            >
              {isLoading ? <CircleLoader color="#B19EFF" size={30} /> : "Send Verification Email"}
            </button>
          </div>
        )}
        <div className="mt-5 text-center ">
          <div className="inline-block">
            <span
              className="flex justify-center items-center text-sm font-semibold text-blue-600 hover:underline font-secondary cursor-pointer"
              onClick={async () => {
                try {
                  await handleSignOut();
                } catch (error) {
                  toast.error(error.message);
                }
              }}
            >
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
