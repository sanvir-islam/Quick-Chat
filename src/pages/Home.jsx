import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-red-500 text-center text-[40px] pb-[100px]">Welcome to HOME Page</h1>

      <h2
        onClick={() => navigate("/login")}
        className="bg-green-500 cursor-pointer capitalize p-[10px] w-[400px] m-auto text-center"
      >
        go to login page
      </h2>
    </div>
  );
}

export default Home;
