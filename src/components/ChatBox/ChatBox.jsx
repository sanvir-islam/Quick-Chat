import profile from "../../assets/noProfilePic.png";
import blackTriangle from "../../assets/blackTriangle.png";
import whiteTriangle from "../../assets/whiteTriangle.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../customScrollBar.css";
import { FaPaperPlane } from "react-icons/fa";

function ChatBox() {
  return (
    <div className="flex flex-col justify-between h-full pb-[34px] rounded-r-[20px] pl-[50px] pr-[26px] rounded-l-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full border-l-1 border-primary/10 pt-[24px]">
      <div className="relative flex justify-between align-middle pr-[26px]">
        <div className="flex justify-between align-middle ">
          <div className="w-[75px] h-[75px]">
            <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
          </div>
          <div className="ml-[33px]">
            <h3 className="text-[24px] font-secondary font-semibold ">sanvir</h3>
            <p className="font-secondary  text-[14px] text-black/70">online</p>
          </div>
        </div>
        <button>
          <BsThreeDotsVertical size={30} />
        </button>
        <div className="absolute left-0 bottom-[-25px] bg-black/10 w-[592px] h-[2px] "></div>
      </div>

      <div>
        {/* messages  */}
        <div>
          {/* text left */}
          <div className="text-left mb-[25px]">
            <div className="relative py-[13px] pl-[27px] pr-[25px] bg-[#F1F1F1] inline-block text-primary rounded-[10px] ">
              <p className="text-[16px] font-secondary font-medium">hello asdfj asdfj asfd aslfdj</p>
              <div className="w-[30px] h-[30px] absolute left-[-10px] bottom-0">
                <img src={whiteTriangle} className="w-full h-full" alt="triangle" />
              </div>
            </div>
            <p className="font-secondary text-[12px] text-primary/25 font-medium pt-[7px] text-left">Today, 2:12pm</p>
          </div>
          {/* text right/ */}
          <div className="text-right mb-[25px]">
            <div className="relative py-[13px] pl-[26px] pr-[18px] bg-primary inline-block text-white rounded-[10px]">
              <p className="text-[16px] font-secondary font-medium">hello alsd fhjas dfasljfdh asl fasdlfj</p>
              <div className="w-[30px] h-[30px] absolute right-[-8px] bottom-0">
                <img src={blackTriangle} className="w-full h-full" alt="triangle" />
              </div>
            </div>
            <p className="font-secondary text-[12px] text-primary/25 font-medium pt-[7px] text-right">Today, 2:12pm</p>
          </div>
        </div>
        {/* input msg */}
        <div className="flex justify-between align-bottom w-[590px] ">
          <div className="w-[527px] h-[80px]">
            <div className=" bg-black/10 w-[590px] h-[2px] mb-[35px]"></div>
            <textarea
              type="text"
              className="w-full h-[45px] text-[16px] px-4 py-2 resize-none border-none rounded-lg bg-[#f1f1f1] outline-none scrollbar-custom"
            ></textarea>
          </div>
          <button className=" bg-primary w-[45px] h-[45px] rounded-[10px] mt-9">
            <FaPaperPlane size={16} className="text-white m-auto " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
