import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "../../assets/profile.png";
import "../customScrollBar.css";

function BlockedUsers() {
  return (
    <div className="pl-[20px] pr-[15px] pb-[15px] pt-[19px] h-[463px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full mt-[43px]">
      {/* title */}
      <div className="flex justify-between align-middle mb-[30px]">
        <h2 className="font-primary font-semibold text-[20px] text-primary">Blocked Users</h2>
        <button>
          <BsThreeDotsVertical size={20} />
        </button>
      </div>

      {/* users */}
      <div className=" h-[375px] w-[344px] pr-[15px] scrollbar-custom ">
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[26px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[54px] h-[54px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">Raghav</h3>
              <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
            </div>
          </div>
          <button className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white">
            unblock
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
      </div>
    </div>
  );
}

export default BlockedUsers;
