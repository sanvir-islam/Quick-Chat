import { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { readDataObserver } from "../../firebase/services/dbService";
import profile from "../../assets/noProfilePic.png";
import { LuMessageCircleMore } from "react-icons/lu";
import { useNavigate } from "react-router";

function SearchBar() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [userList, setUserList] = useState("");
  const [groupList, setGroupList] = useState("");

  const [searchResult, setSearchResult] = useState([]);
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const inputRef = useRef(null);
  const boxRef = useRef(null);

  //fetching data
  useEffect(() => {
    const unsubscribeUserDataFetch = readDataObserver("users/", (data) => {
      setUserList(data);
    });
    const unsubscribeGroupDataFetch = readDataObserver("groups/", (data) => {
      setGroupList(data);
    });

    return () => {
      unsubscribeUserDataFetch();
      unsubscribeGroupDataFetch();
    };
  }, []);

  function handleSearch(inputValue) {
    setSearchInput(inputValue);
    const query = inputValue.trim().toLocaleLowerCase();

    if (query === "") {
      setSearchResult([]);
      return;
    }

    const result = [];
    userList.forEach((user) => {
      if (user.username.toLocaleLowerCase().includes(query)) result.push({ ...user, tag: "User" });
      return;
    });
    groupList.forEach((group) => {
      if (group.grouptitle.toLocaleLowerCase().includes(query)) result.push({ ...group, tag: "Group" });
      return;
    });
    setSearchResult([...result]);
  }

  useEffect(() => {
    if (showSearchPopup) {
      inputRef.current?.focus();
    }
  }, [showSearchPopup]);
  return (
    <div className="h-[59px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex w-full justify-between cursor-text">
      <div
        className="flex "
        onClick={() => {
          setShowSearchPopup(true);
        }}
      >
        <span className="ml-[23px] py-[20px] pr-[10px]">
          <IoSearch size={22} />
        </span>
        <p className="text-[16px] text-[#3D3D3D]/35 pl-[15px] outline-0 tracking-wide font-primary font-medium  ml-[10px] py-[18px] w-[300px]">
          Search
        </p>
      </div>

      {showSearchPopup && (
        <div
          className="absolute inset-[-4px] rounded-2xl backdrop-blur-2xl flex items-start justify-center z-50 pt-20 px-4 fade-in cursor-grab"
          style={{
            background: "linear-gradient(to bottom, white 0%, rgba(0,0,0,0.01) 60% , rgba(0,0,0,0.05) 100%)",
          }}
          onClick={(e) => {
            if (boxRef.current && !boxRef.current.contains(e.target)) {
              setShowSearchPopup(false);
            }
          }}
        >
          <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 slide-up cursor-text" ref={boxRef}>
            {/* Search Input */}
            <div className="mb-6 relative">
              <input
                ref={inputRef}
                value={searchInput}
                onChange={(e) => handleSearch(e.target.value)}
                type="text"
                placeholder="Search users or groups..."
                className="w-full px-5 py-3 pl-15 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-gray-800 placeholder-gray-400 shadow-sm placeholder:pl-4 "
              />
              <span className="absolute left-[-5px] top-[13px] ml-[23px] text-primary/80">
                <IoSearch size={24} />
              </span>
            </div>

            {/* Search Result */}
            {searchResult.map((result) => (
              <div
                className="flex items-center justify-between gap-4 p-4 border-b border-gray-200 last:border-none "
                key={result.id}
              >
                <div className="flex items-center gap-4">
                  <img src={profile} alt="Profile" className="w-14 h-14 rounded-full object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {result.username ? result.username : result.grouptitle}
                    </h3>
                    <p className="text-sm text-gray-500">{result.email ? result.email : result.groupbio}</p>
                  </div>
                </div>
                <div className="flex justify-between align-middle gap-10">
                  <span
                    className={`text-xs tracking-wider font-medium  ${
                      result.tag === "User" ? "bg-green-100 text-green-600 " : "bg-yellow-100 text-yellow-600"
                    } px-4 py-2 rounded-full`}
                  >
                    {result.tag}
                  </span>
                  <button onClick={() => navigate("/message")}>
                    <LuMessageCircleMore size={30} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="mr-[18px]">
        <BsThreeDotsVertical size={20} />
      </button>
    </div>
  );
}

export default SearchBar;
