'use client';

import Sidebar from '../sidebar';
import VideoCard from '../my-videos/_components/VideoCard';
import vid1 from '@/assets/Rectangle 25.png'

const Page = () => {
  return (
    <div className="flex min-h-screen min-w-screen bg-gray-100 mt-26 text-[#003F5C]">
      <Sidebar />

      <div className="flex-1 p-12 overflow-auto h-screen w-full md:ml-64">
        <h2 className="text-2xl font-bold">My Videos</h2>
        <div className="flex space-x-6 mt-4 text-blue-600">
          <span className="font-semibold cursor-pointer">All Videos(10)</span>
          <span className="cursor-pointer">Active Videos(04)</span>
          <span className="cursor-pointer">Completed Videos(06)</span>
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