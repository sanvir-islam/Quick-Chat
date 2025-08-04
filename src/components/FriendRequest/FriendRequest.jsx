import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "../../assets/noProfilePic.png";
import "../customScrollBar.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PiCheckFatFill } from "react-icons/pi";
import { readDataObserver, readSingleData, removeData, writeDataInDb } from "../../firebase/services/dbService";
import { ImCross } from "react-icons/im";

function FriendRequest() {
  const [friendRequestList, setFriendRequestList] = useState([]);
  const userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!userInfo) return;

    const unsubscribeFriendReqDataFetch = readDataObserver("friendRequest/", (data) => {
      const arr = data.filter((friendReq) => userInfo.uid === friendReq.reciverid);
      setFriendRequestList(arr);
    });

    return () => unsubscribeFriendReqDataFetch();
  }, []);

  async function handleRequestAccept(requestId, requestSenderId) {
    try {
      handleRequestRemove(requestId); // also update newFriendReqList
      //reading single data return , not an array
      const newFriend = await readSingleData(`users/${requestSenderId}`);

      await writeDataInDb(`friends/${userInfo.uid}/${newFriend.id}`, { ...newFriend, id: newFriend.id });
      await writeDataInDb(`friends/${newFriend.id}/${userInfo.uid}`, {
        id: userInfo.uid,
        email: userInfo.email,
        username: userInfo.displayName,
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleRequestRemove(requestId) {
    try {
      await removeData(`friendRequest/${requestId}`);

      const newFrReqList = friendRequestList.filter((req) => req.id !== requestId);
      setFriendRequestList(newFrReqList);
    } catch (err) {
      console.error(err.message);
    }
  }

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
        {friendRequestList.map((req) => {
          return (
            <div className="relative flex justify-between align-middle mb-[34px] " key={req.id}>
              <div className="flex justify-between align-middle">
                <div className="w-[70px] h-[70px]">
                  <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
                </div>
                <div className="flex flex-col justify-center align-middle ml-[14px]">
                  <h3 className="font-primary font-semibold text-primary text-[18px] ">{req.sendername}</h3>
                  <p className="font-primary font-medium text-[12px] text-[#4d4d4d]/75">
                    send at{" "}
                    {new Date(req.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-4 align-middle">
                <button onClick={() => handleRequestRemove(req.id)}>
                  <ImCross size={25} className="text-red-600/60" />
                </button>
                <button onClick={() => handleRequestAccept(req.id, req.senderid)}>
                  <PiCheckFatFill size={35} className="text-green-600/60" />
                </button>
              </div>
              <hr className="absolute left-0 bottom-[-13px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendRequest;
