'use client';
import { FiBookOpen, FiSmartphone, FiThumbsUp, FiGrid } from 'react-icons/fi';
import Sidebar from './sidebar'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

const Dashboard = () => {

  const router = useRouter();
  const { isAuthenticated, isAuthInitialized, initializeAuth } = useAuthStore();
  const { profile, isLoadingProfile, getUserProfile, error: userProfileError } = useUserStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Protection Effect: Redirect if not authenticated after initialization
  useEffect(() => {
    const checkAuth = async () => {
      await initializeAuth();
      if (!isAuthenticated && isAuthInitialized) {
        router.push('/auth/login');
      }
    };
    checkAuth();
  }, [isAuthenticated, isAuthInitialized]);
  
  if (!isAuthInitialized) {
    return (
      <div className="flex min-h-screen w-full bg-gray-100">
        <Sidebar/>
        <div className="flex ml-16 md:ml-64 flex-col w-full items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-t-[#003F5C] border-r-transparent border-b-[#003F5C] border-l-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[20px] font-lato font-semibold text-[#003F5C]">Loading...</p>
          </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; 
  }

  

  const stats = [
    { icon: <FiBookOpen size={24} />, count: 14, label: 'Enrolled Videos' },
    { icon: <FiSmartphone size={24} />, count: 8, label: 'Active Videos' },
    { icon: <FiThumbsUp size={24} />, count: 7, label: 'Completed Videos' },
    { icon: <FiGrid size={24} />, count: 10, label: 'Quiz Attempts' },
  ];



  // --- Handle Profile Fetch Error ---
   // If auth is initialized and user is authenticated, but there was an error fetching the profile
   if (isAuthInitialized && isAuthenticated && userProfileError && !profile) {
    return (
       <div className="flex min-h-screen bg-gray-100">
          <Sidebar />
          <main className="flex-1 pt-[72px] p-6 md:ml-64 overflow-y-auto">
             <h2 className="text-2xl font-bold text-red-600 mb-6">Error Loading Profile</h2>
             <p className="text-red-500">Could not load your profile data. Please try refreshing the page or contact support.</p>
             <p className="text-sm text-gray-500 mt-2">Error details: {userProfileError}</p>
          </main>
       </div>
    )
 }


  const userName = profile?.first_name || 'User'; // Replace with actual user name retrieval logic

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 mt-26 p-6 overflow-auto h-screen ml-16 md:ml-64">
        <h2 className="text-2xl font-bold">Welcome Back,{userName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
              <div className="bg-blue-500 text-white p-3 rounded-full">
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{stat.count}</h3>
                <p className="text-gray-600 ">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



