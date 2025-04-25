// src/app/customer-dashboard/my-videos/page.tsx
// (Rename folder/route to /my-courses if desired)

'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../sidebar'; // Adjust path if needed
import CourseCard from './_components/VideoCard'; // Use the renamed CourseCard
import { useAuthStore } from '@/store/authStore'; // To get user info
import toast, { Toaster } from 'react-hot-toast';

// Define expected WP API structures
interface WPUser {
    id: number;
    slug: string;
    name: string;
}
interface WPCourse {
    id: number;
    title: { rendered: string };
    _embedded?: {
        'wp:featuredmedia'?: { source_url: string; }[];
    };
    // This might be needed if filtering by author works, but it's usually for CREATED BY
    author?: number;
}

const WORDPRESS_API_URL = "https://h2p.c25.myftpupload.com/wp-json"; // Your WP site URL + /wp-json

// Toast styles (keep as before)
const toastErrorStyle = { style: { border: '1px solid #EF4444', padding: '12px', color: '#B91C1C', background: '#FEF2F2', fontSize: '14px', }, iconTheme: { primary: '#EF4444', secondary: '#FEF2F2' } };
const toastSuccessStyle = { style: { border: '1px solid #10B981', padding: '12px', color: '#047857', background: '#ECFDF5', fontSize: '14px', }, iconTheme: { primary: '#10B981', secondary: '#ECFDF5' } };

const Page = () => {
  const [courses, setCourses] = useState<WPCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Get the user object which contains first_name
  const { user, isAuthInitialized } = useAuthStore();

  useEffect(() => {
    // Don't fetch until auth is initialized and user data is available
    if (!isAuthInitialized || !user?.first_name) {
      // Avoid fetching if user/first_name is not yet available
      // Set loading to false if initialized but no user/name
      if(isAuthInitialized) {
         setIsLoading(false);
         setError("User data not available. Please ensure you are logged in.");
      }
      return;
    }

    const usernameToSearch = user.first_name; // Use first_name as the username slug

    const fetchCoursesDirectly = async () => {
      setIsLoading(true);
      setError(null);
      setCourses([]); // Clear previous courses

      let wpUserId: number | null = null;

      // --- Step 1: Find WordPress User ID using the first_name as slug ---
      try {
        console.log(`Searching WP User with slug: ${usernameToSearch}`);
        const userResponse = await fetch(`${WORDPRESS_API_URL}/wp/v2/users?slug=${encodeURIComponent(usernameToSearch)}&context=view`);

        if (!userResponse.ok) {
            if (userResponse.status === 404) {
                throw new Error(`WordPress user '${usernameToSearch}' not found.`);
            }
            throw new Error(`Failed to search WordPress user. Status: ${userResponse.status}`);
        }

        const userData: WPUser[] = await userResponse.json();

        if (userData && userData.length > 0) {
            wpUserId = userData[0].id;
            console.log(`Found WP User ID: ${wpUserId}`);
        } else {
            throw new Error(`WordPress user '${usernameToSearch}' not found.`);
        }

      } catch (err: any) {
        console.error("Error finding WP user:", err);
        setError(err.message || "Could not find matching user in WordPress.");
        toast.error(err.message || "Could not find matching user.", toastErrorStyle);
        setIsLoading(false);
        return; // Stop if user not found
      }

      // --- Step 2: Fetch Courses (Placeholder - Needs correct TutorLMS endpoint) ---
      // If we found a wpUserId, try fetching courses associated with them
      if (wpUserId) {
        try {
          console.log(`Fetching courses, attempting to associate with WP User ID: ${wpUserId}`);

          // !!! CRITICAL WARNING !!!
          // The standard /wp/v2/courses endpoint DOES NOT filter by enrollment.
          // It lists ALL courses. Filtering by `author` shows courses CREATED BY the user.
          // You NEED the specific TutorLMS REST API endpoint for "enrolled courses".
          // Without it, this fetch call WILL NOT show the correct "My Courses".
          // This is a placeholder demonstrating the fetch structure ONLY.

          // Example Placeholder: Fetching all courses and hoping they are filtered somehow (unlikely)
           const courseResponse = await fetch(`${WORDPRESS_API_URL}/wp/v2/courses?_embed=true`, {
               // If the REAL TutorLMS endpoint needs auth, you'd add headers here,
               // but it's insecure to manage those keys/tokens directly in the frontend.
           });

          // Example Placeholder: Trying to filter by author (WRONG for ENROLLED courses)
          // const courseResponse = await fetch(`${WORDPRESS_API_URL}/wp/v2/courses?_embed=true&author=${wpUserId}`);


          if (!courseResponse.ok) {
            throw new Error(`Failed to fetch courses from WordPress. Status: ${courseResponse.status}`);
          }

          const courseData: WPCourse[] = await courseResponse.json();

          // !!! TODO: Replace this with actual filtering or data from the correct TutorLMS endpoint !!!
          // For now, it just displays whatever the placeholder endpoint returned.
          setCourses(courseData);
          console.log("Received course data (might not be filtered by enrollment):", courseData);


        } catch (err: any) {
          console.error("Error fetching courses:", err);
          setError(err.message || "An error occurred while fetching courses.");
          toast.error(err.message || "Could not load courses.", toastErrorStyle);
        }
      }
      // --- End Step 2 ---

      setIsLoading(false);
    };

    fetchCoursesDirectly();

  // Depend on user?.first_name to refetch if it changes (e.g., after login)
  }, [user?.first_name, isAuthInitialized]);

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex w-full bg-gray-100 pt-22 min-h-screen text-[#003F5C]">
        <Sidebar />
        <div className="flex-1 p-6 md:p-12 overflow-auto w-full ml-16 md:ml-64">
          <h2 className="text-2xl font-semibold mb-8">My Courses</h2>

          {isLoading && <p className="text-center mt-10">Loading courses...</p>}
          {/* Display error if user lookup failed or course fetch failed */}
          {error && <p className="text-center mt-10 text-red-600">Error: {error}</p>}

          {!isLoading && !error && courses.length === 0 && (
            // Changed message slightly
            <p className="text-center mt-10">No enrolled courses found for user '{user?.first_name || ''}' or user not found in WordPress.</p>
          )}

          {!isLoading && !error && courses.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {courses.map((course) => {
                const imageUrl = course._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                return (
                  <CourseCard // Use CourseCard component
                    key={course.id}
                    id={course.id}
                    title={course.title.rendered}
                    imageUrl={imageUrl || undefined}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;