import profile from "../../assets/noProfilePic.png";
import blackTriangle from "../../assets/blackTriangle.png";
import whiteTriangle from "../../assets/whiteTriangle.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import "../customScrollBar.css";
import { FaPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { readDataObserver, writeDataWithIdInDb } from "../../firebase/services/dbService";
import { formatMessageTime } from "../../utils/timeFormatter";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";

function ChatBox() {
  const activeChat = useSelector((state) => state.activeChat.value);
  const [msgInput, setMsgInput] = useState("");
  const [chats, setChats] = useState([]);
  const [emojiShow, setEmojiShow] = useState(false);
  const messageInputRef = useRef(null);

  useEffect(() => {
    if (!activeChat) return;
    readDataObserver(`messages/${activeChat.id}`, (data) => {
      console.log(data);
      setChats(data);
    });
  }, [activeChat]);

  function sendMessage() {
    if (!msgInput.trim()) return;
    writeDataWithIdInDb(`messages/${activeChat.id}`, {
      senderid: activeChat.senderid,
      reciverid: activeChat.reciverid,
      msg: msgInput,
      timestamp: new Date().getTime(),
    });
    setMsgInput("");
    if (messageInputRef.current) {
      messageInputRef.current.focus(); // Focus back on the input
    }
  }

  function handleEmojiClick(event) {
    setMsgInput((prev) => prev + event.emoji);
  }
  return (
    <div className="flex flex-col justify-between h-full pb-[34px] rounded-r-[20px] pl-[50px] pr-[14px] rounded-l-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-full border-l-1 border-primary/10 pt-[24px]">
      <div className="relative flex justify-between align-middle pr-[26px]">
        <div className="flex justify-between align-middle ">
          <div className="w-[75px] h-[75px]">
            <img src={profile} alt="userPorfile pic" className="w-full h-full object-cover rounded-[50%]" />
          </div>
          <div className="ml-[33px]">
            <h3 className="text-[24px] font-secondary font-semibold ">{activeChat.name}</h3>
            <p className="font-secondary  text-[14px] text-black/70">online</p>
          </div>
        </div>
        <button>
          <BsThreeDotsVertical size={30} />
        </button>
        <div className="absolute left-0 bottom-[-25px] bg-black/10 w-[592px] h-[2px] "></div>
      </div>

      <div className="relative h-full mt-26 " onClick={() => emojiShow && setEmojiShow(false)}>
        {/* messages  */}
        <div className="absolute right-0 bottom-20 scrollbar-custom h-full pl-3 pr-[15px] ">
          {chats.length > 0 &&
            chats.map((chat) => {
              if (chat.senderid === activeChat.reciverid) {
                //left
                return (
                  <div className="text-left mb-[25px]" key={chat.id}>
                    <div className="relative py-[13px] pl-[27px] pr-[25px] bg-[#F1F1F1] inline-block text-primary rounded-[10px] ">
                      <p className="text-[16px] font-secondary font-medium">{chat.msg}</p>
                      <div className="w-[30px] h-[30px] absolute left-[-10px] bottom-0">
                        <img src={whiteTriangle} className="w-full h-full" alt="triangle" />
                      </div>
                    </div>
                    <p className="font-secondary text-[12px] text-primary/25 font-medium pt-[7px] text-left">
                      {formatMessageTime(chat.timestamp)}
                    </p>
                  </div>
                );
              } else {
                return (
                  <div className="text-right mb-[25px]" key={chat.id}>
                    <div className="relative py-[13px] pl-[26px] pr-[18px] bg-primary inline-block text-white rounded-[10px]">
                      <p className="text-[16px] font-secondary font-medium">{chat.msg}</p>
                      <div className="w-[30px] h-[30px] absolute right-[-8px] bottom-0">
                        <img src={blackTriangle} className="w-full h-full" alt="triangle" />
                      </div>
                    </div>
                    <p className="font-secondary text-[12px] text-primary/25 font-medium pt-[7px] text-right">
                      {formatMessageTime(chat.timestamp)}
                    </p>
                  </div>
                );
              }
            })}
        </div>

        {/* input msg */}
        <div className="flex justify-between align-bottom w-[590px] absolute bottom-0 left-0 ">
          <div className=" relative w-[527px] h-[80px]">
            <div className=" bg-black/10 w-[590px] h-[2px] mb-[35px]"></div>
            {/* emoji picker */}
            {emojiShow && (
              <div className="absolute bottom-[60px] right-10">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}

            <textarea
              ref={messageInputRef}
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              type="text"
              className="w-full h-[45px] text-[16px] px-4 py-2 resize-none border-none rounded-lg bg-[#f1f1f1] outline-none scrollbar-custom"
            ></textarea>
          </div>
          <button className="absolute top-[47px] right-[90px]" onClick={() => setEmojiShow(!emojiShow)}>
            <BsEmojiSmile
              className="text-primary/60 hover:bg-black hover:text-white rounded-full hover:border-0 transition-all duration-200"
              size={26}
            />
          </button>
          <button className=" bg-primary w-[45px] h-[45px] rounded-[10px] mt-9" onClick={sendMessage}>
            <FaPaperPlane size={16} className="text-white m-auto " />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
