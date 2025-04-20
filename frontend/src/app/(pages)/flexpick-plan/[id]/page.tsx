"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Footer from '@/app/_components/Footer';
import VideoDetailPage from '../_components/VideoDetails';
import MostPurchase from '../_components/MostPurchase';

export default function Page() {
  const params = useParams();
  const videoId = params.id as string;

  return(
    <div>
      <div>
        <VideoDetailPage videoId={videoId} />
        <MostPurchase/>
      </div>
      <Footer/>
    </div>
  );
}