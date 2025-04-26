'use client';

import Sidebar from '../sidebar';
import VideoCard from './_components/VideoCard';
import videos from '@/app/data/videos.json';

const Page = () => {
  return (
    <div className="flex w-full bg-gray-100 pt-22 min-h-screen text-[#003F5C]">
      <Sidebar />
      
      <div className="flex-1 p-6 md:p-12 overflow-auto w-full ml-16 md:ml-64">
        <h2 className="text-2xl font-semibold mb-5">Videos</h2>
        
        <div className="flex space-x-6 mt-4 font-poppins text-[15px] md:text-[18px] font-medium text-[#00A5CF]">
          <span className="font-semibold cursor-pointer">All Videos({videos.length})</span>
          <span className="cursor-pointer">
            Active Videos({videos.filter(v => v.progress > 0 && v.progress < 100).length})
          </span>
          <span className="cursor-pointer">
            Completed Videos({videos.filter(v => v.progress === 100).length})
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              progress={video.progress}
              rating={video.rating}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;