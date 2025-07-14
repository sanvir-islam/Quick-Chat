import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const SidebarSkeleton = () => (
  <Box className="w-full h-full">
    <Skeleton variant="box" width={100} height={600} />
  </Box>
);

const PanelSkeleton = () => (
  <div className="h-full p-3">
    <div className="flex justify-between items-center px-2">
      <Skeleton variant="text" width={100} height={28} />
    </div>
    <div className="mt-4 px-4">
      {[...Array(3)].map((_, index) => (
        <Box key={index} className="flex items-center justify-between mb-6">
          <Box className="flex items-center gap-3">
            <Skeleton variant="circular" width={60} height={60} />
            <Box>
              <Skeleton variant="text" width={80} height={20} />
              <Skeleton variant="text" width={120} height={16} />
            </Box>
          </Box>
          <Skeleton variant="button" width={50} height={25} />
        </Box>
      ))}
    </div>
  </div>
);

const HomeSkeleton = () => {
  return (
    <div className="flex justify-center h-screen p-[35px]">
      <div className="w-[186px] h-full">
        <SidebarSkeleton />
      </div>
      <div className="w-[427px] px-3">
        <div className="w-full">
          <PanelSkeleton />
        </div>
        <div className="w-full">
          <PanelSkeleton />
        </div>
      </div>
      <div className="w-[427px] px-3">
        <div className="w-full">
          <PanelSkeleton />
        </div>
        <div className="w-full ">
          <PanelSkeleton />
        </div>
      </div>
      <div className="w-[427px] px-3">
        <div className="w-full">
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
