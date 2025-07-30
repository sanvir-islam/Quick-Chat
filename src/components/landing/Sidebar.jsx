import { LuMessageCircleMore } from "react-icons/lu";
import { VscHome } from "react-icons/vsc";
import { ImExit } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import profile from "../../assets/noProfilePic.png";
import "../../index.css";
import { useState } from "react";
import { useSelector } from "react-redux";

function Sidebar({ handleSignOut }) {
  const [activeSection, setActiveSection] = useState("home");
  const userInfo = useSelector((state) => state.user.value);

  return (
    <div className="h-full bg-black rounded-[20px]">
      <div className=" pt-[40px] mb-[80px]">
        <img src={profile} alt="#profile" className="h-[100px] w-[100px] mx-auto rounded-[50%]" />
        <p className="font-bold font-secondary pt-[10px] text-white/80 text-center ">{userInfo.displayName}</p>
      </div>

      <div
        className={`relative z-1 pt-[20px] pb-[25px] cursor-pointer ${
          activeSection === "home" ? "btn-active" : "text-white "
        }`}
        onClick={() => setActiveSection("home")}
      >
        <VscHome size={50} className="mx-auto  " />
      </div>
      <div
        className={`relative z-1 pt-[20px] pb-[25px] cursor-pointer ${
          activeSection === "message" ? "btn-active" : "text-white "
        }`}
        onClick={() => setActiveSection("message")}
      >
        <LuMessageCircleMore size={50} className="mx-auto" />
      </div>
      <div
        className={`relative z-1 pt-[20px] pb-[25px] cursor-pointer ${
          activeSection === "setting" ? "btn-active" : "text-white "
        }`}
        onClick={() => setActiveSection("setting")}
      >
        <IoSettingsOutline size={50} className="mx-auto" />
      </div>
      <div className="mt-[300px] cursor-pointer text-white" onClick={handleSignOut}>
        <ImExit size={65} className="mx-auto" />
      </div>
    </div>
  );
}

export default Sidebar;
