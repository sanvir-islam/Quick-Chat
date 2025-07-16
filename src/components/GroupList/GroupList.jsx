import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "../../assets/profile.png";
import "../customScrollBar.css";

function GroupList() {
  return (
    <div className="pl-[20px] pr-[18px] pb-[20px] pt-[19px]  h-[347px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full mt-[43px]">
      {/* title */}
      <div className="flex justify-between align-middle mb-[18px]">
        <h2 className="font-primary font-semibold text-[20px] text-primary">Groups List</h2>
        <button>
          <BsThreeDotsVertical size={20} />
        </button>
      </div>

      {/* users */}
      <div className=" h-[270px] w-[427px] pr-[20px] scrollbar-custom ">
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[28px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[70px] h-[70px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
            </div>
            <div className="flex flex-col justify-center align-middle ml-[14px]">
              <h3 className="font-primary font-semibold text-primary text-[18px] ">Friends Reunion</h3>
              <p className="font-primary font-medium text-[14px] text-[#4d4d4d]/75">Hi Guys, Wassup!</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[20px] text-center font-primary rounded-[5px] font-semibold px-[23px] bg-primary text-white">
            Join
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[28px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[70px] h-[70px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle ml-[14px]">
              <h3 className="font-primary font-semibold text-primary text-[18px] ">Friends Reunion</h3>
              <p className="font-primary font-medium text-[14px] text-[#4d4d4d]/75">Hi Guys, Wassup!</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[20px] text-center font-primary rounded-[5px] font-semibold px-[23px] bg-primary text-white">
            Join
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[28px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[70px] h-[70px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle ml-[14px]">
              <h3 className="font-primary font-semibold text-primary text-[18px] ">Friends Reunion</h3>
              <p className="font-primary font-medium text-[14px] text-[#4d4d4d]/75">Hi Guys, Wassup!</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[20px] text-center font-primary rounded-[5px] font-semibold px-[23px] bg-primary text-white">
            Join
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
        </div>
      </div>
    </div>
  );
}

export default GroupList;
