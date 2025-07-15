import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
function SearchBar() {
  return (
    <div className="h-[59px] rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex w-full justify-between">
      <div className="flex ">
        <span className="ml-[23px] py-[20px] pr-[10px]">
          <IoSearch size={22} />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="placeholder:text-[16px] placeholder:text-[#3D3D3D]/35 placeholder:pl-[20px] outline-0  placeholder:font-primary placeholder:font-medium text-primary font-primary font-medium ml-[10px] w-[250px]"
        />
      </div>
      <button className="mr-[18px]">
        <BsThreeDotsVertical size={20} />
      </button>
    </div>
  );
}

export default SearchBar;
