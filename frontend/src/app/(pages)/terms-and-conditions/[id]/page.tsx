"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { TermsDetails } from '../_components/TermsDetails';
import Footer from '@/app/_components/Footer';

export default function TermDetailsPage() {
  const params = useParams();
  const termId = params.id as string;

  return(
    <div>
      <div className='min-h-screen'>
        <TermsDetails termId={termId} />
      </div>
      <Footer/>
    </div>
  );
}