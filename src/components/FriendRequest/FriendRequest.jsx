import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "../../assets/profile.png";
import { FaSquarePlus } from "react-icons/fa6";
import "../CustomScrollBar.css";

function FriendRequest() {
  return (
    <div className="pl-[20px] pr-[18px] pb-[20px] pt-[19px]  h-[462px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full mt-[43px]">
      {/* title */}
      <div className="flex justify-between align-middle mb-[18px]">
        <h2 className="font-primary font-semibold text-[20px] text-primary">Friend Request</h2>
        <button>
          <BsThreeDotsVertical size={20} />
        </button>
      </div>

      {/* users */}
      <div className=" h-[390px] w-[427px] pr-[20px] scrollbar-custom ">
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[34px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[70px] h-[70px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle ml-[14px]">
              <h3 className="font-primary font-semibold text-primary text-[18px] ">Friends Reunion</h3>
              <p className="font-primary font-medium text-[14px] text-[#4d4d4d]/75">Hi Guys, Wassup!</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            Accept
          </button>
          <hr className="absolute left-0 bottom-[-13px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[34px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[70px] h-[70px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle ml-[14px]">
              <h3 className="font-primary font-semibold text-primary text-[18px] ">Friends Reunion</h3>
              <p className="font-primary font-medium text-[14px] text-[#4d4d4d]/75">Hi Guys, Wassup!</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            Accept
          </button>
          <hr className="absolute left-0 bottom-[-13px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[34px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[70px] h-[70px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle ml-[14px]">
              <h3 className="font-primary font-semibold text-primary text-[18px] ">Friends Reunion</h3>
              <p className="font-primary font-medium text-[14px] text-[#4d4d4d]/75">Hi Guys, Wassup!</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            Accept
          </button>
          <hr className="absolute left-0 bottom-[-13px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[34px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[70px] h-[70px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle ml-[14px]">
              <h3 className="font-primary font-semibold text-primary text-[18px] ">Friends Reunion</h3>
              <p className="font-primary font-medium text-[14px] text-[#4d4d4d]/75">Hi Guys, Wassup!</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            Accept
          </button>
          <hr className="absolute left-0 bottom-[-13px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[34px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[70px] h-[70px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle ml-[14px]">
              <h3 className="font-primary font-semibold text-primary text-[18px] ">Friends Reunion</h3>
              <p className="font-primary font-medium text-[14px] text-[#4d4d4d]/75">Hi Guys, Wassup!</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            Accept
          </button>
          <hr className="absolute left-0 bottom-[-13px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
        </div>
      </div>
    </div>
  );
}

export default FriendRequest;
