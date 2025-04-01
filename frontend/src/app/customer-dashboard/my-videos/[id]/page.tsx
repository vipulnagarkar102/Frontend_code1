'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import VideoDetails from '../_components/VideoDetails';
import videos from '@/app/data/videos.json';

// Define the Video type based on your JSON structure
interface Video {
  id: string;
  title: string;
  progress: number;
  rating: number;
  enrolledDate: string;
  totalEnrolled: number;
  lastUpdatedDate: string;
  description: string;
  ratingCounts: number[];
  reviews: Array<{
    id: string;
    userImage?: string;
    userName: string;
    rating: number;
    text: string;
    timestamp: string;
  }>;
}

const VideoDetailsPage = () => {
  const params = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get the video ID from the URL params
    const videoId = params.id as string;
    
    // Find the video in the JSON data
    const videoData = videos.find(v => v.id === videoId);
    
    if (videoData) {
      setVideo(videoData as Video);
    }
    
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00A5CF]"></div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Video Not Found</h1>
        <p className="mt-4">The video you're looking for doesn't exist or may have been removed.</p>
      </div>
    );
  }

  return <VideoDetails video={video} />;
};

export default VideoDetailsPage;