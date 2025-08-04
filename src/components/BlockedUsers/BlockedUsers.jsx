import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "../../assets/noProfilePic.png";
import "../customScrollBar.css";
import { RxExit } from "react-icons/rx";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { readDataObserver, removeData } from "../../firebase/services/dbService";

function BlockedUsers() {
  const [blockList, setBlockList] = useState([]);
  const userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!userInfo) return;

    const unsubscribeBlockListDataFetch = readDataObserver(`blocklist/${userInfo.uid}`, (data) => {
      setBlockList(data);
    });
    return () => unsubscribeBlockListDataFetch();
  }, []);

  async function handleRemoveFromBlockList(blockedUserId) {
    try {
      await removeData(`blocklist/${userInfo.uid}/${blockedUserId}`);
      await removeData(`blockedBy/${blockedUserId}/${userInfo.uid}`);
    } catch (err) {
      console.log(err.message);
    }
  }
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
        {blockList.map((blockedUser) => (
          <div className="relative flex justify-between align-middle mb-[26px] " key={blockedUser.id}>
            <div className="flex justify-between align-middle">
              <div className="w-[54px] h-[54px]">
                <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
              </div>
              <div className="flex flex-col justify-center align-middle  ml-[11px]">
                <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px] ">
                  {blockedUser.username}
                </h3>
                <p className="font-primary font-medium text-[10px] text-black/50">i am home</p>
              </div>
            </div>
            <button onClick={() => handleRemoveFromBlockList(blockedUser.id)}>
              <RxExit size={28} className="text-green-800" />
            </button>
            <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockedUsers;
