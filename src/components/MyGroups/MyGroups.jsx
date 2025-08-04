import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "../../assets/noProfilePic.png";
import "../customScrollBar.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { readDataObserver, removeData } from "../../firebase/services/dbService";
import "./bellShake.css";
import { ImCross } from "react-icons/im";
import { PiCheckFatFill } from "react-icons/pi";
import { MdOutlineNotificationsOff } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

function MyGroups() {
  const [showGroupJoinReq, setShowGroupJoinReq] = useState(false);
  const userInfo = useSelector((state) => state.user.value);
  const [myGroupList, setMyGroupList] = useState([]);
  const [myGroupJoinReqList, setMyGroupJoinReqList] = useState([]);

  useEffect(() => {
    if (!userInfo) return;

    const unsubscribeGroupDataFetch = readDataObserver("groups/", (data) => {
      const arr = data.filter((groupData) => groupData.adminid === userInfo.uid);
      setMyGroupList(arr);
    });

    const unsubscribeGroupReqDataFetch = readDataObserver(`groupJoinRequest/`, (data) => {
      const arr = data.filter((req) => req.reciverid === userInfo.uid);
      setMyGroupJoinReqList(arr);
    });

    return () => {
      unsubscribeGroupDataFetch();
      unsubscribeGroupReqDataFetch();
    };
  }, []);

  async function handleGroupJoinRequestRemove(reqId) {
    try {
      await removeData(`groupJoinRequest/${reqId}`);
    } catch (err) {
      console.log(err.message);
    }
  }
  function handleGroupJoinRequestAccept() {}
  return (
    <div className="pl-[20px] pr-[15px] pb-[15px] pt-[19px] h-[463px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full mt-[43px]">
      {/* title */}
      <div className="flex justify-between align-middle mb-[35px] ">
        <h2 className="font-primary font-semibold text-[20px] text-primary">
          {showGroupJoinReq ? "Group Join Requests" : "My Groups"}
        </h2>
        <div className="flex justify-between gap-4">
          {showGroupJoinReq ? (
            <button onClick={() => setShowGroupJoinReq((status) => !status)}>
              <MdOutlineNotificationsOff className="text-primary" size={25} />
            </button>
          ) : (
            <button
              className={`relative ${myGroupJoinReqList.length > 0 && "bell-shake"}`}
              onClick={() => setShowGroupJoinReq((status) => !status)}
            >
              <IoIosNotifications size={25} className="text-primary/90" />
              {myGroupJoinReqList.length > 0 && (
                <span className="absolute right-0 top-0 text-white bg-red-500/80 text-[10px] h-[12px] w-[12px] rounded-[10px]">
                  {myGroupJoinReqList.length}
                </span>
              )}
            </button>
          )}
          <button>
            <BsThreeDotsVertical size={20} />
          </button>
        </div>
      </div>

      {showGroupJoinReq ? (
        <div className=" h-[320px] w-[344px] pr-[15px] scrollbar-custom ">
          {myGroupJoinReqList.map((groupJoinReq) => {
            return (
              <div className="relative flex justify-between align-middle mb-[32px] " key={groupJoinReq.id}>
                <div className="flex justify-between align-middle ">
                  <div className="w-[54px] h-[54x]">
                    <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
                  </div>
                  <div className="flex flex-col justify-center align-middle ml-[11px] ">
                    <h3 className="font-primary font-semibold text-primary text-[14px] ">{groupJoinReq.sendername}</h3>
                    <p className="font-primary font-medium text-[11px] text-[#4d4d4d]/75 w-[140px] overflow-hidden">
                      want to join{" "}
                      <span className="text-primary font-bold tracking-wider text-[13px] pl-0.5">
                        {groupJoinReq.grouptitle}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex justify-between gap-4 align-middle">
                  <button onClick={() => handleGroupJoinRequestRemove(groupJoinReq.id)}>
                    <ImCross size={22} className="text-red-600/60" />
                  </button>
                  <button onClick={() => handleGroupJoinRequestAccept(groupJoinReq.id)}>
                    <PiCheckFatFill size={31} className="text-green-600/60" />
                  </button>
                </div>
                <hr className="absolute left-0 bottom-[-13px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" h-[320px] w-[344px] pr-[15px] scrollbar-custom ">
          {/* group */}
          {myGroupList.map((group) => (
            <div className="relative flex justify-between align-middle mb-[32px] " key={group.id}>
              <div className="flex justify-between align-middle">
                <div className="w-[54px] h-[54px]">
                  <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
                </div>
                <div className="flex flex-col justify-center align-middle  ml-[11px]">
                  <h3 className="font-primary font-semibold text-primary text-[14px] ">{group.grouptitle}</h3>
                  <p className="font-primary font-medium text-[12px] text-[#4d4d4d]/75">
                    <span className="text-primary/80 font-bold pr-1">Description: </span>
                    {group.groupbio}
                  </p>
                </div>
              </div>
              <p className="font-primary font-medium text-[10px] text-black/50 mt-[10px]">today, 8:00am</p>
              <hr className="absolute left-0 bottom-[-14px] text-black/10 w-[290px] h-[2px] ml-[6px]" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyGroups;
