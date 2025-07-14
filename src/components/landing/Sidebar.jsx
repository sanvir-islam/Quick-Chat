import { LuMessageCircleMore } from "react-icons/lu";
import { VscHome } from "react-icons/vsc";
import { ImExit } from "react-icons/im";
import { IoSettingsOutline } from "react-icons/io5";
import profile from "../../assets/profile.png";

function Sidebar({ handleSignOut }) {
  return (
    <div className="h-full bg-black rounded-[20px]">
      <div className=" pt-[40px] mb-[80px]">
        <img src={profile} alt="#profile" className="h-[100px] w-[100px] mx-auto" />
      </div>

      <div className=" relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white after:z-[-1] z-1 after:ml-[25px] after:rounded-l-[20px] pt-[20px] pb-[25px] before:content-[''] before:absolute before:right-0 before:top-0 before:w-[8px] before:h-full before:bg-primary before:rounded-l-[20px] before:shadow-[-2px_0px_4px_0px_rgba(0,0,0,0.2)]">
        <VscHome size={50} className="mx-auto  cursor-pointer" />
      </div>
      <div className=" relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white after:z-[-1] z-1 after:ml-[25px] after:rounded-l-[20px] pt-[20px] pb-[25px] before:content-[''] before:absolute before:right-0 before:top-0 before:w-[8px] before:h-full before:bg-primary before:rounded-l-[20px] before:shadow-[-2px_0px_4px_0px_rgba(0,0,0,0.2)]">
        <LuMessageCircleMore size={50} className="mx-auto cursor-pointer" />
      </div>
      <div className=" relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-white after:z-[-1] z-1 after:ml-[25px] after:rounded-l-[20px] pt-[20px] pb-[25px] before:content-[''] before:absolute before:right-0 before:top-0 before:w-[8px] before:h-full before:bg-primary before:rounded-l-[20px] before:shadow-[-2px_0px_4px_0px_rgba(0,0,0,0.2)]">
        <IoSettingsOutline size={50} className="mx-auto cursor-pointer" />
      </div>
      <div className="mt-[330px] cursor-pointer " onClick={handleSignOut}>
        <ImExit size={65} className="mx-auto text-white" />
      </div>
    </div>
  );
}

export default Sidebar;
