import { BsThreeDotsVertical } from "react-icons/bs";
import profile from "../../assets/profile.png";
import "../customScrollBar.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { readData } from "../../firebase/services/dbService";
// import FriendList from "../FriendList/FriendList";

function FriendRequest() {
  const [friendRequestList, setFriendRequestList] = useState([]);
  const userInfo = useSelector((state) => state.user.value);

  useEffect(() => {
    const fetchFriendRequest = async () => {
      try {
        const userDataRecived = await readData("friendRequest/");
        const arr = [];
        userDataRecived.forEach((item) => {
          if (userInfo.uid === item.val().reciverid) arr.push(item.val());
        });
        setFriendRequestList(arr);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (userInfo) {
      fetchFriendRequest();
    }
  }, []);

  // async function handleFriendRequest(requestId) {
  //   try {
  //     const snapshot = await readData("friendRequest/");
  //     snapshot.forEach((req) => {
  //       const arr = [];
  //       if (req.val().senderid !== requestId) {
  //         arr.push(req.key: req.val() );
  //       }
  //       setFriendRequestList(arr);
  //     });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  // const resolveFriendRequst = async (path) => {
  //   try {

  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
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
            <div className="relative flex justify-between align-middle mb-[34px] ">
              <div className="flex justify-between align-middle">
                <div className="w-[70px] h-[70px]">
                  <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
                </div>
                <div className="flex flex-col justify-center align-middle ml-[14px]">
                  <h3 className="font-primary font-semibold text-primary text-[18px] ">{req.sendername}</h3>
                  <p className="font-primary font-medium text-[12px] text-[#4d4d4d]/75">
                    {new Date(req.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
              <button
                className="mt-[16px] h-[30px] text-[18px] text-center font-primary rounded-[5px] font-semibold px-[10px] bg-primary text-white"
                // onClick={() => handleFriendRequest(req.senderid)}
              >
                Accept
              </button>
              <hr className="absolute left-0 bottom-[-13px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendRequest;
