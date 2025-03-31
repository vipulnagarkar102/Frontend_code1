'use client';

import Sidebar from '../customerdashboard/sidebar';
import Image from 'next/image';

const Courses = () => {
  const videos = [
    { title: 'Video Name', progress: '0%', rating: 3, action: 'START LEARNING', image: '/video1.jpg' },
    { title: 'Video Name', progress: '40%', rating: 5, action: 'CONTINUE LEARNING', image: '/video2.jpg' },
    { title: 'Video Name', progress: '100%', rating: 4.5, action: 'DOWNLOAD CERTIFICATE', image: '/video3.jpg' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 overflow-auto h-screen w-full md:ml-64">
        <h2 className="text-2xl font-bold">My Videos</h2>
        <div className="flex space-x-6 mt-4 text-blue-600">
          <span className="font-semibold cursor-pointer">All Videos(10)</span>
          <span className="cursor-pointer">Active Videos(04)</span>
          <span className="cursor-pointer">Completed Videos(06)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {videos.map((video, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              <Image src={video.image} alt={video.title} width={300} height={200} className="rounded-lg" />
              <h3 className="text-lg font-semibold mt-2">{video.title}</h3>
              <div className="flex items-center mt-1">
                {'⭐'.repeat(Math.floor(video.rating))}
                {video.rating % 1 !== 0 && '⭐️'}
              </div>
              <p className="text-gray-600 text-sm mt-1">{video.progress} Complete</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: video.progress }}></div>
              </div>
              <button className="w-full mt-4 py-2 rounded-lg text-white" style={{ backgroundColor: index === 0 ? '#007BFF' : index === 1 ? '#28A745' : '#17A2B8' }}>
                {video.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
