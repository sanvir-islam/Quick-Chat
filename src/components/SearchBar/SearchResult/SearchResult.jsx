import { useNavigate } from "react-router";
import profile from "../../../assets/noProfilePic.png";
import { RiQuestionAnswerLine } from "react-icons/ri";

function SearchResult({ result }) {
  const navigate = useNavigate();
  return (
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
            result.tag === "user" ? "bg-green-100 text-green-600 " : "bg-yellow-100 text-yellow-600"
          } px-4 py-2 rounded-full`}
        >
          {result.tag}
        </span>
        <button onClick={() => navigate("/message")}>
          <RiQuestionAnswerLine size={28} />
        </button>
      </div>
    </div>
  );
}

export default SearchResult;
