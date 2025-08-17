'use client';
import { useState, useEffect } from 'react';
import VideoCard from '../../components/VideoCard';
import { getVideos, updateVideo } from '../../utils/api';
import useAuth from '../../hooks/useAuth';

export default function Dashboard() {
  const { isAuthenticated, loading } = useAuth();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchVideos();
    }
  }, [isAuthenticated]);

  const fetchVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, title, description) => {
    try {
      await updateVideo(id, title, description);
      fetchVideos();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update video');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {videos.length === 0 ? (
        <p className="text-gray-600">No videos found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.contentDetails.videoId} video={video} onUpdate={handleUpdate} />
          ))}
        </div>
      )}
    </div>
  );
}