import { useDispatch } from "react-redux";
import { logoutUser } from "../firebase/services/authService";
import { logout } from "../slice/userSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Sidebar from "../components/landing/Sidebar";
import SearchBar from "../components/SearchBar/SearchBar";
import FriendList from "../components/FriendList/FriendList";
import ChatBox from "../components/ChatBox/ChatBox";

function Message() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await logoutUser();
      dispatch(logout()); //clear the store

      navigate("/login");
      toast.success("You have been logged out successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex justify-center h-screen p-[35px] gap-[20px]">
      <div className="w-[186px] h-full mr-[23px]">
        <Sidebar handleSignOut={handleSignOut} activeSection="message" />
      </div>
      <div className="relative flex justify-center h-full gap-[20px]">
        <div className="w-[427px]">
          <SearchBar />
          <FriendList />
        </div>
        <div className="w-[708px]">
          <ChatBox />
        </div>
      </div>
    </div>
  );
}

export default Message;
