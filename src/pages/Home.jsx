import { useNavigate } from "react-router";
import { logout } from "../firebase/authService";
import { toast } from "react-toastify";

function Home() {
  const navigate = useNavigate();

  const signOut = async () => {
    try {
      await logout();
      toast.success("Logged out successfully.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <h1 className="text-red-500 text-center text-[40px] pb-[100px]">Welcome to HOME Page</h1>

      <h2 onClick={signOut} className="bg-green-500 cursor-pointer capitalize p-[10px] w-[400px] m-auto text-center">
        Log Out
      </h2>
    </div>
  );
}

export default Home;
