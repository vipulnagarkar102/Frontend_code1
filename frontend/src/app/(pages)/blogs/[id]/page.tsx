"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { BlogsDetails } from '../_components/BlogsDetails';

export default function TermDetailsPage() {
  const params = useParams();
  const blogId = params.id as string;

  return <BlogsDetails blogId={blogId} />;
}