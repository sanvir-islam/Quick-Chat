import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "../../assets/noProfilePic.png";
import "../customScrollBar.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { readDataObserver, readSingleData, removeData, writeDataInDb } from "../../firebase/services/dbService";
import { AiOutlineUserDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { BsPersonSlash } from "react-icons/bs";
import { BsPersonFillSlash } from "react-icons/bs";

function FriendList() {
  const [friendList, setFriendList] = useState([]);
  const userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    if (!userInfo) return;

    const unsubscribe = readDataObserver(`friends/${userInfo.uid}`, (friend) => {
      setFriendList(friend);
    });

    return () => unsubscribe();
  }, []);

  async function handleAddToBlocklist(friendId) {
    try {
      const friend = await readSingleData(`friends/${userInfo.uid}/${friendId}`);
      await handleRemoveFriend(friendId);
      await writeDataInDb(`blocklist/${userInfo.uid}/${friend.id}`, friend);
      await writeDataInDb(`blockedBy/${friend.id}/${userInfo.uid}`, {
        id: userInfo.uid,
        username: userInfo.displayName,
        email: userInfo.email,
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleRemoveFriend = async (friendId) => {
    try {
      //delete from friendList of both sides
      await removeData(`friends/${userInfo.uid}/${friendId}`);
      await removeData(`friends/${friendId}/${userInfo.uid}`);

      toast.success("Friend Removed");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="pl-[20px] pr-[15px] pb-[15px] pt-[19px] h-[451px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full">
      {/* title */}
      <div className="flex jus`tify-between align-middle mb-[30px]">
        <h2 className="font-primary font-semibold text-[20px] text-primary">Friends</h2>
        <button>
          <BsThreeDotsVertical size={20} />
        </button>
      </div>

      {/* users */}
      <div className=" h-[320px] w-[344px] pr-[10px] scrollbar-custom ">
        {/* user */}
        {friendList.map((friend) => {
          return (
            <div className="relative flex justify-between align-middle mb-[32px] " key={friend.id}>
              <div className="flex justify-between align-middle">
                <div className="w-[54px] h-[54px]">
                  <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
                </div>
                <div className="flex flex-col justify-center align-middle  ml-[11px]">
                  <h3 className="font-primary font-semibold text-primary text-[14px] ">{friend.username}</h3>
                  <p className="font-primary font-medium text-[12px] text-[#4d4d4d]/75">i am home</p>
                </div>
              </div>

              <div className="flex justify-center gap-4 ml-[40px] mt-[5px]]">
                <button onClick={() => handleAddToBlocklist(friend.id)} title="Block">
                  <BsPersonFillSlash
                    size={25}
                    className="text-primary/90 hover:text-red-600/70 transition-all duration-200"
                  />
                </button>
                <button onClick={() => handleRemoveFriend(friend.id)} title="Delete">
                  <AiOutlineUserDelete size={25} className="text-red-600/70 " />
                </button>
              </div>

              <hr className="absolute left-0 bottom-[-14px] text-black/10 w-[277px] h-[2px] ml-[6px]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendList;
