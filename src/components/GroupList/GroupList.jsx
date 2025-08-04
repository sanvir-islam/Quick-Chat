import { BiSolidMessageSquareAdd } from "react-icons/bi";
import profile from "../../assets/noProfilePic.png";
import "../customScrollBar.css";
import { BiSolidMessageSquareX } from "react-icons/bi";
import { useEffect, useState } from "react";
import { readDataObserver, removeData, writeDataInDb, writeDataWithIdInDb } from "../../firebase/services/dbService";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

function GroupList() {
  const [showGroupInput, setShowGroupInput] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const userInfo = useSelector((state) => state.user.value);
  const [groupList, setGroupList] = useState([]);
  const [groupReqIdList, setGroupReqIdList] = useState([]);

  const [groupInputInfo, setGroupInputInfo] = useState({
    groupTitle: "",
    groupBio: "",
  });
  const [groupInputErrors, setGroupInputErrors] = useState({
    groupTitleError: "",
    groupBioError: "",
  });

  useEffect(() => {
    if (!userInfo) return;

    const unsubscribeGroupDataFetch = readDataObserver("groups/", (data) => {
      const arr = data.filter((groupData) => groupData.adminid !== userInfo.uid);
      setGroupList(arr);
    });

    const unsubscribeGroupJoinReqFetch = readDataObserver("groupJoinRequest/", (data) => {
      //checking am i the sender - data stored as reciverId + senderId
      const arr = [];
      data.forEach((groupData) => {
        const key = groupData.groupid + userInfo.uid;
        if (groupData.id === key) arr.push(key);
      });

      setGroupReqIdList(arr);
    });

    return () => {
      unsubscribeGroupDataFetch();
      unsubscribeGroupJoinReqFetch();
    };
  }, []);

  function handleInputChange(e, field) {
    setGroupInputInfo((prev) => ({ ...prev, [field]: e.target.value }));
    setGroupInputErrors((prev) => ({ ...prev, [`${field}Error`]: "" }));
  }

  async function handleCreateGroup() {
    if (!groupInputInfo.groupTitle || groupInputInfo.groupTitle.trim() === "") {
      setGroupInputErrors((prev) => ({ ...prev, groupTitleError: "Group Title is required" }));
      return;
    } else if (!groupInputInfo.groupBio || groupInputInfo.groupBio.trim() === "") {
      setGroupInputErrors((prev) => ({ ...prev, groupBioError: "Group Bio is required" }));
      return;
    } else {
      try {
        setIsBtnLoading(true);
        await writeDataWithIdInDb(`groups/`, {
          adminid: userInfo.uid,
          grouptitle: groupInputInfo.groupTitle,
          groupbio: groupInputInfo.groupBio,
        });

        setTimeout(() => {
          setGroupInputInfo({
            groupTitle: "",
            groupBio: "",
          });
          toast.success("Group created successfully");
          setShowGroupInput(false);
          setIsBtnLoading(false);
        }, 500);
      } catch (err) {
        console.log(err.message);
        setIsBtnLoading(false);
      }
    }
  }

  async function handleGroupJoinRequest(group) {
    try {
      //reciverId(groupId) + senderId
      await writeDataInDb(`groupJoinRequest/${group.id + userInfo.uid}`, {
        id: group.id + userInfo.uid,
        sendername: userInfo.displayName,
        senderid: userInfo.uid,
        reciverid: group.adminid,
        groupid: group.id,
        grouptitle: group.grouptitle,
        timestamp: Date.now(),
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  async function handleGroupCancelRequest(group) {
    try {
      //reciverId + senderId
      await removeData(`groupJoinRequest/${group.id + userInfo.uid}`);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="pl-[20px] pr-[18px] pb-[20px] pt-[19px]  h-[347px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full mt-[43px]">
      {/* title */}
      <div className="flex justify-between align-middle mb-[18px] mr-1">
        <h2 className="font-primary font-semibold text-[20px] text-primary">
          {showGroupInput ? "Create New Group" : "Groups List"}
        </h2>
        {showGroupInput ? (
          <button onClick={() => setShowGroupInput(false)}>
            <BiSolidMessageSquareX size={30} className="text-red-600" />
          </button>
        ) : (
          <button onClick={() => setShowGroupInput(true)}>
            <BiSolidMessageSquareAdd size={30} className="text-[#1E1E1E]" />
          </button>
        )}
      </div>

      {showGroupInput ? (
        <div>
          <div className="relative mt-[28px] ml-[3px] w-[380px]">
            <input
              onChange={(e) => handleInputChange(e, "groupTitle")}
              value={groupInputInfo.groupTitle}
              type="text"
              className={`w-full py-[24px] px-[25px] text-[16px] font-secondary font-semibold border-2   text-black/80 rounded-[8px] ${
                groupInputErrors.groupTitleError ? "rounded-b-none border-red-400" : "border-secondary/30"
              } focus:outline-0 `}
              placeholder="Enter group name"
            />
            <p className="w-full text-white bg-red-500 text-[11px] font-secondary rounded-b-[8.6px] px-[12px] tracking-wider font-semibold capitalize">
              {groupInputErrors.groupTitleError}
            </p>
            <label className="absolute top-[-25px] left-[34.4px] text-[14px] tracking-[2px] bg-white text-secondary/70 px-[14px] py-[12px]  text-center font-semibold">
              Group Name
            </label>
          </div>
          <div className="w-[380px] relative mt-[25px] ml-[3px]">
            <input
              onChange={(e) => handleInputChange(e, "groupBio")}
              value={groupInputInfo.groupBio}
              type="text"
              className={`w-full py-[24px] px-[25px] text-[16px] font-secondary font-semibold border-2   text-black/80 rounded-[8px] ${
                groupInputErrors.groupBioError ? "rounded-b-none border-red-400" : "border-secondary/30"
              } focus:outline-0 `}
              placeholder="Enter group bio"
            />
            <p className="w-full text-white bg-red-500 text-[11px] font-secondary rounded-b-[8.6px] px-[12px] tracking-wider font-semibold capitalize">
              {groupInputErrors.groupBioError}
            </p>
            <label className="absolute top-[-25px] left-[34.4px] text-[14px] tracking-[2px] bg-white text-secondary/70 px-[14px] py-[12px]  text-center font-semibold">
              Group Bio
            </label>
          </div>
          <div className="w-[380px] mt-[13px] mx-auto">
            <button
              onClick={handleCreateGroup}
              disabled={isBtnLoading}
              className="relative bg-primary rounded-[90px] w-full font-primary font-semibold text-[20px] text-white px-[130px] py-[16px] shadow-[0px_6px_8px_-2px_rgba(0,_0,_0,_0.3)] flex justify-center items-center tracking-wide"
              style={{
                background: !isBtnLoading ? "radial-gradient(circle, rgb(91, 54, 245) -130%, rgb(0, 0, 0) 50%)" : "",
              }}
            >
              {isBtnLoading ? <CircleLoader color="#B19EFF" size={30} /> : "Create"}
            </button>
          </div>
        </div>
      ) : (
        // groups
        <div className=" h-[270px] w-[380px] pr-[18px] scrollbar-custom ">
          {/* group */}
          {groupList.map((group) => (
            <div className="relative flex justify-between align-middle mb-[28px] " key={group.id}>
              <div className="flex justify-between align-middle w-[280px]">
                <div className="w-[70px] h-[70px]">
                  <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
                </div>
                <div className="flex flex-col justify-center align-middle ml-[14px] overflow-x-hidden w-[200px] text-left">
                  <h3 className="font-primary font-semibold text-primary text-[18px] ">{group.grouptitle}</h3>
                  <p className="font-primary font-medium text-[14px] text-[#4d4d4d]/75">
                    <span className="text-primary/80 font-bold pr-0.5">Description: </span>
                    {group.groupbio}
                  </p>
                </div>
              </div>
              {groupReqIdList.includes(group.id + userInfo.uid) ? (
                <button
                  className="mt-[16px] h-[35px] text-[17px] text-center font-primary rounded-[8px] font-semibold px-[12px] bg-red-500 hover:bg-red-600 text-white "
                  onClick={() => handleGroupCancelRequest(group)}
                >
                  Cancel
                </button>
              ) : (
                <button
                  className="mt-[16px] h-[35px] text-[18px] text-center font-primary rounded-[8px] font-semibold px-[23px] border-3 hover:bg-primary hover:text-white bg-primary/90 text-white "
                  onClick={() => handleGroupJoinRequest(group)}
                >
                  Join
                </button>
              )}

              <hr className="absolute left-0 bottom-[-12px] text-black/10 w-[371px] h-[2px] ml-[6px]" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GroupList;
