"use client";
import { useState } from "react";
import Button from "./Button";
import Link from "next/link";

export default function VideoCard({ video, onUpdate }) {
  const [title, setTitle] = useState(video.snippet.title);
  const [description, setDescription] = useState(video.snippet.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    await onUpdate(video.contentDetails.videoId, title, description);
    setIsEditing(false);
  };

  return (
    <div className="border p-4 rounded shadow">
      <Link href={`/video/${video.contentDetails.videoId}`}>
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="text-lg font-semibold mt-2">{video.snippet.title}</h3>
      </Link>
      {isEditing ? (
        <div className="mt-2">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Description"
          />
          <Button onClick={handleUpdate}>Save</Button>
          <Button onClick={() => setIsEditing(false)}>Cancel</Button>
        </div>
      ) : (
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      )}
    </div>
  );
}
