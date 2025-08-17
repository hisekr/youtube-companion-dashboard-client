"use client";
import React, { useState, useEffect } from "react";
import VideoPlayer from "../../../components/VideoPlayer";
import CommentSection from "../../../components/CommentSection";
import NotesSection from "../../../components/NotesSection";
import LogsSection from "../../../components/LogsSection";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth";
import useDebounce from "../../../hooks/useDebounce";
import {
  getVideoDetails,
  updateVideo,
  addComment,
  replyToComment,
  deleteComment,
  getComments,
  addNote,
  getNotes,
  getLogs,
} from "../../../utils/api";

export default function VideoPage({ params }) {
  const { id } = React.use(params);
  const { isAuthenticated, loading } = useAuth();
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comments, setComments] = useState([]);
  const [notes, setNotes] = useState([]);
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [showEdit, setShowEdit] = useState(false);


  useEffect(() => {
    if (isAuthenticated && id) {
      fetchVideoDetails();
      fetchComments();
      fetchNotes("");
      fetchLogs();
    }
  }, [isAuthenticated, id]);

  useEffect(() => {
    if (id && debouncedSearch !== undefined) {
      fetchNotes(debouncedSearch);
    }
  }, [debouncedSearch]);

  const fetchVideoDetails = async () => {
    try {
      const data = await getVideoDetails(id);
      setVideo(data);
      setTitle(data.snippet.title);
      setDescription(data.snippet.description);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch video");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateVideo(id, title, description);
      fetchVideoDetails();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update video");
    }
  };

  const handleAddComment = async (text) => {
    try {
      await addComment(id, text);
      fetchComments();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add comment");
    }
  };

  const handleReply = async (parentId, text) => {
    try {
      await replyToComment(parentId, text);
      fetchComments();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to reply");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      fetchComments();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete comment");
    }
  };

  const fetchComments = async () => {
    try {
      const data = await getComments(id);
      setComments(data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch comments");
    }
  };

  const handleAddNote = async (text, tags) => {
    try {
      await addNote(id, text, tags);
      fetchNotes(search);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add note");
    }
  };

  const fetchNotes = async (searchQuery) => {
    try {
      const data = await getNotes(id, searchQuery);
      setNotes(data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch notes");
    }
  };

  const fetchLogs = async () => {
    try {
      const data = await getLogs();
      setLogs(data);
    } catch (err) {
      alert(err.response?.data?.error || "Failed to fetch logs");
    }
  };

  if (loading || !video) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* === Top: Video + Details === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Left: Video Player */}
        <div className="w-full h-[50vh]">
          <VideoPlayer videoId={id} />
        </div>

        {/* Right: Title + Description */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <p className="text-gray-700 whitespace-pre-line">{description}</p>
        </div>
      </div>

      {/* === Edit Section === */}
      {/* === Edit Section === */}
<div className="mt-6">
  <h2 className="text-xl font-bold mb-2">Edit Video Title & Description</h2>

  {/* Toggle button */}
  <Button onClick={() => setShowEdit((prev) => !prev)}>
    {showEdit ? "Cancel" : "Edit"}
  </Button>

  {/* Inputs only visible when editing */}
  {showEdit && (
    <div className="mt-4">
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
      <Button onClick={handleUpdate} disabled={!title}>
        Update
      </Button>
    </div>
  )}
</div>


      {/* === Comments === */}
      <CommentSection
        comments={comments}
        onAddComment={handleAddComment}
        onReply={handleReply}
        onDelete={handleDeleteComment}
        onRefresh={fetchComments}
      />

      {/* === Notes === */}
      <NotesSection
        notes={notes}
        onAddNote={handleAddNote}
        onSearch={setSearch}
      />

      {/* === Logs === */}
      <LogsSection logs={logs} />
    </div>
  );
}
