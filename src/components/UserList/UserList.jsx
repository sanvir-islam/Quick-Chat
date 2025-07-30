import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "./../../assets/noProfilePic.png";
import { BsPersonFillCheck } from "react-icons/bs";
import "../customScrollBar.css";
import { useEffect, useState } from "react";
import { readDataObserver, removeData, writeDataInDb } from "../../firebase/services/dbService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaSquareMinus } from "react-icons/fa6";
import { BiUndo } from "react-icons/bi";
import { GoPersonAdd } from "react-icons/go";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [friendRequestKeyList, setFriendRequestKeyList] = useState([]);
  const [friendIdList, setFriendIdList] = useState([]);
  const [blockedUserIdList, setBlockedUserIdList] = useState([]);
  const [blockedByIdList, setBlockedByIdList] = useState([]);

  const userInfo = useSelector((state) => state.user.value);

  //fetching userLIst
  useEffect(() => {
    if (!userInfo) return;

    const unsubscribe = readDataObserver("users/", (data) => {
      const arr = data.filter((userData) => userData.id !== userInfo.uid);
      setUserList(arr);
    });

    return () => unsubscribe();
  }, []);

  //add + / -  btn
  useEffect(() => {
    if (!userInfo) return;

    const unsubscribe = readDataObserver("friendRequest/", (data) => {
      const arr = data.map((frReq) => frReq.id);
      setFriendRequestKeyList(arr);
    });

    return () => unsubscribe();
  }, []);

  //blocked user should not be shown in the userlist
  useEffect(() => {
    if (!userInfo) return;

    // Your blocklist: people YOU blocked
    const unsubscribeBlocklist = readDataObserver(`blocklist/${userInfo.uid}`, (data) => {
      const blockedIds = data.map((blockedUser) => blockedUser.id);
      setBlockedUserIdList(blockedIds);
    });

    // Users who blocked YOU
    const unsubscribeBlockedBy = readDataObserver(`blockedBy/${userInfo.uid}`, (data) => {
      const blockedByIds = data.map((blocker) => blocker.id);
      setBlockedByIdList(blockedByIds);
    });

    return () => {
      unsubscribeBlocklist();
      unsubscribeBlockedBy();
    };
  }, []);

  // for friend lable
  useEffect(() => {
    if (!userInfo) return;

    const unsubscribe = readDataObserver(`friends/${userInfo.uid}`, (data) => {
      const arr = data.map((friends) => friends.id);
      setFriendIdList(arr);
    });

    return () => unsubscribe();
  }, []);

  const handleSendFriendRequest = async (recipientUser) => {
    try {
      //path id => reciverId + senderId
      await writeDataInDb(`friendRequest/${recipientUser.id + userInfo.uid}`, {
        id: recipientUser.id + userInfo.uid,
        senderid: userInfo.uid,
        sendername: userInfo.displayName,
        reciverid: recipientUser.id,
        timestamp: Date.now(),
      });
      toast.success("Request send");
    } catch (err) {
      toast.error(err.message);
    }
  };

  async function handleCancelSendingReq(userId) {
    try {
      for (const req of friendRequestKeyList) {
        // reciver + sender id
        if (req === userId + userInfo.uid) {
          await removeData(`friendRequest/${userId + userInfo.uid}`);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="pl-[20px] pr-[15px] pb-[15px] pt-[19px] w-full h-[451px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] ">
      {/* title */}
      <div className="flex justify-between align-middle mb-[30px]">
        <h2 className="font-primary font-semibold text-[20px] text-primary">User List</h2>
        <button>
          <BsThreeDotsVertical size={20} />
        </button>
      </div>

      {/* users */}
      <div className=" h-[365px] w-[344px] pr-[18px] scrollbar-custom ">
        {/* user */}
        {userList
          .filter((user) => !blockedUserIdList.includes(user.id) && !blockedByIdList.includes(user.id))
          .map((user) => (
            <div className="relative flex justify-between align-middle mb-[25px]" key={user.id}>
              <div className="flex justify-between align-middle">
                <div className="w-[52px] h-[52px] ">
                  <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
                </div>
                <div className="flex flex-col justify-center align-middle ml-[11px]">
                  <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">{user.username}</h3>
                  <p className="font-primary font-medium text-[12px] text-primary/50">{user.email}</p>
                </div>
              </div>
              <div className="flex flex-col align-middle justify-center">
                {friendIdList.includes(user.id) ? (
                  <button
                    className="font-primary font-semibold tracking-wider text-green-600/40 text-[12px] pb-[3px] "
                    title="Friend"
                  >
                    <BsPersonFillCheck size={30} className="cursor-not-allowed" />
                  </button>
                ) : //friendRequest => reciver + sender | checking am i the sender
                friendRequestKeyList.includes(userInfo.uid + user.id) ? (
                  //if i am the reciver
                  <button>
                    <FaSquareMinus size={30} className="text-primary/90 cursor-not-allowed" />
                  </button>
                ) : friendRequestKeyList.includes(user.id + userInfo.uid) ? (
                  // if i am the sender
                  <button className="text-red-500/80" onClick={() => handleCancelSendingReq(user.id)} title="Undo">
                    <BiUndo
                      size={30}
                      onClick={() => {
                        toast.info("Request removed");
                      }}
                    />
                  </button>
                ) : (
                  //if i am not the sender or the reciver
                  <button onClick={() => handleSendFriendRequest(user)} title="Add friend">
                    <GoPersonAdd size={28} />
                  </button>
                )}
              </div>

              <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default UserList;
