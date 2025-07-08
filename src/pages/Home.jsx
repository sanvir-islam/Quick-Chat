// import { useNavigate } from "react-router";
// import { logout } from "../firebase/authService";
// import { toast } from "react-toastify";

import Sidebar from "../components/Sidebar/Sidebar";

function Home() {
  // const navigate = useNavigate();

  // const signOut = async () => {
  //   try {
  //     await logout();
  //     toast.success("Logged out successfully.");
  //     navigate("/login");
  //   } catch (error) {
  //     toast.error(error.message);
  //   }
  // };
  return (
    <div>
      <div className="flex justify-center h-screen p-[35px]">
        <div className="w-[186px] h-full ">
          <Sidebar />
        </div>
        <div className="w-[427px]">adsgfasdf</div>
        <div className="w-[344px]">adsgfasdf</div>
        <div className="w-[344px]">adsgfasdf</div>
      </div>
    </div>
  );
}

export default Home;
