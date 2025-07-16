import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SidebarSkeleton = () => (
  <Box className="w-[140px] h-full bg-gray-50">
    <Skeleton variant="rectangular" width={140} height="100%" />
  </Box>
);

const PanelSkeleton = () => (
  <div className="h-full p-5 bg-gray-50 rounded-lg shadow-sm">
    <div className="flex justify-between items-center px-4 ">
      <Skeleton variant="text" width={140} height={28} />
    </div>
    <div className="mt-5 px-6">
      {[...Array(3)].map((_, index) => (
        <Box key={index} className="flex items-center justify-between mb-10">
          <Box className="flex items-center gap-5">
            <Skeleton variant="circular" width={80} height={80} />
            <Box>
              <Skeleton variant="text" width={120} height={22} />
              <Skeleton variant="text" width={160} height={18} />
            </Box>
          </Box>
          <Skeleton variant="button" width={70} height={35} />
        </Box>
      ))}
    </div>
  </div>
);

const HomeSkeleton = () => {
  return (
    <div className="flex justify-center h-screen p-[40px] ">
      {/* Sidebar */}
      <div className="w-[220px] h-full mr-0 bg-transparent">
        <SidebarSkeleton />
      </div>

      {/* Panels */}
      <div className="w-[460px] px-4 bg-transparent">
        <div className="w-full mb-10">
          <PanelSkeleton />
        </div>
        <div className="w-full">
          <PanelSkeleton />
        </div>
      </div>

      <div className="w-[460px] px-4 bg-transparent">
        <div className="w-full mb-10">
          <PanelSkeleton />
        </div>
        <div className="w-full">
          <PanelSkeleton />
        </div>
      </div>

      <div className="w-[460px] px-4 bg-transparent">
        <div className="w-full mb-10">
          <PanelSkeleton />
        </div>
        <div className="w-full">
          <PanelSkeleton />
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
