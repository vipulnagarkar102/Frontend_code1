// File: app/api/get-courses/route.ts

import { NextResponse } from 'next/server';
import { Buffer } from 'buffer';

// Updated interface to potentially include _embedded data
interface WordPressCourse {
  id: number;
  title: {
    rendered: string;
  };
  slug: string; // Slug for linking
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

export async function GET(request: Request) {
  const apiUrl = process.env.WORDPRESS_API_URL;
  const username = process.env.WORDPRESS_APP_USERNAME;
  const password = process.env.WORDPRESS_APP_PASSWORD;

  if (!apiUrl || !username || !password) {
    console.error("Server Error: Missing WordPress API environment variables.");
    return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
  }

  // Add _embed to fetch linked data like featured images
  const courseEndpoint = `${apiUrl}/wp/v2/courses?_embed`;
  const basicAuth = Buffer.from(`${username}:${password}`).toString('base64');

  try {
    console.log(`Fetching courses from: ${courseEndpoint} using Basic Auth`);
    const response = await fetch(courseEndpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`);
      console.error("Error Body:", errorBody);
      return NextResponse.json(
          { message: `Failed to fetch courses. Status: ${response.status}` },
          { status: response.status }
      );
    }

    const courses: WordPressCourse[] = await response.json();
    return NextResponse.json(courses);

  } catch (error: unknown) {
    console.error('Error fetching WordPress courses:', error);
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json(
        { message: `Failed to fetch courses: ${message}` },
        { status: 500 }
    );
  }
}

export const dynamic = 'force-dynamic';