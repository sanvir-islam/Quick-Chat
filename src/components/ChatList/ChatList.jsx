import { useEffect, useState } from "react";
import profile from "../../assets/noProfilePic.png";
import { readDataObserver } from "../../firebase/services/dbService";
import { useSelector } from "react-redux";
import { TbMessageOff } from "react-icons/tb";
import SearchResult from "../SearchResult/SearchResult";

function ChatList() {
  const userInfo = useSelector((state) => state.user.value);
  const [chatSearchInput, setChatSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [friendList, setFriendList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    if (!userInfo) return;

    const unsubscribeFriendDataFetch = readDataObserver(`friends/${userInfo.uid}`, (data) => {
      setFriendList(data);
    });
    const unsubscribeGroupDataFetch = readDataObserver("groups/", (data) => {
      const arr = [];

      data.forEach((groupData) => {
        if (groupData.adminid === userInfo.uid) {
          arr.push(groupData);
        }
      });
      setGroupList(arr);
    });

    return () => {
      unsubscribeFriendDataFetch();
      unsubscribeGroupDataFetch();
    };
  }, []);

  function handleSearch(inputValue) {
    setChatSearchInput(inputValue);
    const query = inputValue.trim().toLocaleLowerCase();
    if (query === "") {
      setSearchResult([]);
      return;
    }
    const result = [];
    [...friendList, ...groupList].forEach((chat) => {
      const newChat = chat.username
        ? { ...chat, tag: "user", name: chat.username }
        : { ...chat, tag: "group", name: chat.grouptitle };
      if (newChat.name.toLocaleLowerCase().includes(query)) {
        result.push(newChat);
      }
    });

    setSearchResult([...result]);
  }

  return (
    <div className="pl-[20px] pr-[15px] pb-[15px] pt-[19px] h-full rounded-l-[20px]  shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full">
      {/* title */}
      <div className="flex justify-between align-middle mb-[30px]">
        <h2 className="font-primary font-semibold text-[20px] text-primary pr-20">Chats</h2>
        <input
          value={chatSearchInput}
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          placeholder="Search chat"
          className="w-full px-4 pb-1 placeholder:pl-3 border-b-1 tracking-wider border-primary/20 rounded-xl text-[14px] outline-none text-gray-800 font-semibold placeholder:font-medum placeholder-gray-400/80"
        />
      </div>

      {/* users */}
      <div className="relative h-[320px] w-[344px] pr-[10px] scrollbar-custom ">
        {/* user */}
        {(searchResult.length > 0 ? searchResult : [...friendList, ...groupList]).map((chat) => {
          return (
            <div
              className="relative flex justify-between align-middle mb-[32px] pr-[10px] cursor-pointer group "
              key={chat.id}
            >
              <div className="flex justify-between align-middle">
                <div className="w-[54px] h-[54px]">
                  <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
                </div>
                <div className="flex flex-col justify-center align-middle  ml-[11px]">
                  <h3 className="font-primary font-semibold text-primary text-[14px] ">
                    {chat.username ? chat.username : chat.grouptitle}
                  </h3>
                  <p className="font-primary font-medium text-[12px] text-[#4d4d4d]/75">
                    {chat.email ? "" : <span className="text-primary/80 font-bold pr-1">Description: </span>}
                    {chat.email ? chat.email : `${chat.groupbio}`}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-4  mt-[5px]">
                <button>
                  <TbMessageOff size={26} className="text-red-600/60" />
                </button>
              </div>
              <hr
                className={`absolute left-[40%] bottom-[-14px] text-black/10  w-0 h-[2px] ml-[6px] group-hover:w-[400px] transition-all duration-500 group-hover:blur-[.8px] group-hover:text-primary/20 group-hover:left-0 rounded-xl `}
              />
              <hr
                className={`absolute left-0 bottom-[-14px] text-black/8  blur-[.8px] w-[400px] h-[2px] ml-[6px] group-hover:opacity-0 rounded-xl transition-all duration-300`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ChatList;
