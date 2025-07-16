import { BsThreeDotsVertical } from "react-icons/bs";
import profilePic from "./../../assets/noUserProfilePic.png";
import { FaSquarePlus } from "react-icons/fa6";
import "../customScrollBar.css";
import { useEffect, useState } from "react";
import { createMessage, listenToPath } from "../../firebase/services/dbService";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { TiMinus } from "react-icons/ti";

function UserList() {
  const [userList, setUserList] = useState([]);
  const [friendRequestList, setFriendRequestList] = useState([]);
  const userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!userInfo) return;

    const unsubscribe = listenToPath("users/", (snapshot) => {
      try {
        const arr = [];

        snapshot.forEach((item) => {
          if (item.key !== userInfo.uid) {
            arr.push({ ...item.val(), uid: item.key });
          }
        });

        setUserList(arr);
      } catch (err) {
        toast.error("Failed to load users" + err.message);
      }
    });

    return () => unsubscribe();
  }, [userInfo]);

  useEffect(() => {
    if (!userInfo) return;

    const unsubscribe = listenToPath("friendRequest/", (snapshot) => {
      try {
        const arr = [];
        snapshot.forEach((item) => {
          arr.push(item.val().reciverid + item.val().senderid);
        });
        setFriendRequestList(arr);
      } catch (err) {
        toast.error("Failed to load users" + err.message);
      }
    });

    return () => unsubscribe();
  }, [userInfo]);

  console.log(friendRequestList);

  const handleRequest = async (recipientUser) => {
    try {
      await createMessage("friendRequest/", {
        senderid: userInfo.uid,
        sendername: userInfo.displayName,
        reciverid: recipientUser.uid,
        recivername: recipientUser.username,
        timestamp: Date.now(),
      });
      toast.success("Friend request send to '" + recipientUser.username + "'");
    } catch (err) {
      toast.error(err.message);
    }
  };
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
      <div className=" h-[365px] w-[344px] pr-[30px] scrollbar-custom ">
        {/* user */}
        {userList.map((user, i) => {
          return (
            <div className="relative flex justify-between align-middle mb-[25px]" key={i}>
              <div className="flex justify-between align-middle">
                <div className="w-[52px] h-[52px] ">
                  <img src={profilePic} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
                </div>
                <div className="flex flex-col justify-center align-middle ml-[11px]">
                  <h3 className="font-primary font-semibold text-primary text-[14px] pb-[3px]">{user.username}</h3>
                  <p className="font-primary font-medium text-[12px] text-primary/50">{user.email}</p>
                </div>
              </div>
              {friendRequestList.includes(userInfo.uid + user.uid) ||
              friendRequestList.includes(user.uid + userInfo.uid) ? (
                <button>
                  <TiMinus />
                </button>
              ) : (
                <button onClick={() => handleRequest(user)}>
                  <FaSquarePlus size={30} />
                </button>
              )}
              <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserList;
