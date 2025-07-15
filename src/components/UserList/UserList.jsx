import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "../../assets/profile.png";
import { FaSquarePlus } from "react-icons/fa6";
import "../CustomScrollBar.css";

function UserList() {
  return (
    <div className="pl-[20px] pr-[15px] pb-[15px] pt-[19px] w-full h-[448px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ">
      {/* title */}
      <div className="flex justify-between align-middle mb-[30px]">
        <h2 className="font-primary font-semibold text-[20px] text-primary">User List</h2>
        <button>
          <BsThreeDotsVertical size={20} />
        </button>
      </div>

      {/* users */}
      <div className=" h-[365px] w-[344px] pr-[35px] scrollbar-custom ">
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
        {/* user */}
        <div className="relative flex justify-between align-middle mb-[25px] ">
          <div className="flex justify-between align-middle">
            <div className="w-[52px] h-[52px]">
              <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center align-middle  ml-[11px]">
              <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">Raghav</h3>
              <p className="font-primary font-medium text-[12px] text-primary/50">today , 9:00pm</p>
            </div>
          </div>
          <button>
            <FaSquarePlus size={30} />
          </button>
          <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
        </div>
      </div>
    </div>
  );
}

export default UserList;
