'use client';

import Sidebar from '../sidebar';
import VideoCard from '../my-videos/_components/VideoCard';
import vid1 from '@/assets/Rectangle 25.png'

const Page = () => {
  return (
    <div className="flex min-h-screen min-w-screen bg-gray-100 mt-26">
      <Sidebar />

      <div className="flex-1 p-12 pt-7 overflow-auto h-screen w-full md:ml-64">
        <h2 className="text-2xl font-semibold">My Videos</h2>
        <div className="flex space-x-6 mt-4 text-[#00A5CF]">
          <span className="font-medium cursor-pointer text-lg">All Videos(10)</span>
          <span className="font-medium cursor-pointer text-lg text-[#003F5C]">Active Videos(04)</span>
          <span className=" font-medium cursor-pointer text-lg text-[#003F5C]">Completed Videos(06)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {/* Directly calling VideoCard components */}
          <VideoCard title="Video Name 1" progress={0} rating={3} image={vid1} />
          <VideoCard title="Video Name 2" progress={40} rating={5} image={vid1}/>
          <VideoCard title="Video Name 3" progress={100} rating={4.5} image={vid1}/>
          <VideoCard title="Video Name 3" progress={20} rating={4.5} image={vid1}/>
          <VideoCard title="Video Name 3" progress={0} rating={4.5} image={vid1}/>
        </div>
      </div>
    </div>
  );
};

export default Page;
