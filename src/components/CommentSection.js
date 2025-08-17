'use client';
import { useState } from 'react';
import Button from './Button';

export default function CommentSection({ comments, onAddComment, onReply, onDelete, onRefresh }) {
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyParentId, setReplyParentId] = useState('');

  const handleAddComment = async () => {
    await onAddComment(commentText);
    setCommentText('');
  };

  const handleReply = async () => {
    await onReply(replyParentId, replyText);
    setReplyText('');
    setReplyParentId('');
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">Comments</h2>
      <div className="mt-2">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          placeholder="Add a comment"
        />
        <Button onClick={handleAddComment} disabled={!commentText}>Comment</Button>
        <Button onClick={onRefresh}>Refresh</Button>
      </div>
      <ul className="mt-4 h-64 overflow-y-auto border rounded p-2">
        {comments.map((thread) => (
          <li key={thread.id} className="border-b py-2">
            <p>{thread.snippet.topLevelComment.snippet.textDisplay}</p>
            <div className="flex gap-2">
              <Button onClick={() => setReplyParentId(thread.id)}>Reply</Button>
              <Button onClick={() => onDelete(thread.snippet.topLevelComment.id)}>Delete</Button>
            </div>
            {thread.replies && thread.replies.comments.map((reply) => (
              <div key={reply.id} className="ml-6 mt-2">
                <p>{reply.snippet.textDisplay}</p>
                <Button onClick={() => onDelete(reply.id)}>Delete</Button>
              </div>
            ))}
          </li>
        ))}
      </ul>
      {replyParentId && (
        <div className="mt-2">
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="Reply"
          />
          <Button onClick={handleReply} disabled={!replyText}>Send Reply</Button>
          <Button onClick={() => setReplyParentId('')}>Cancel</Button>
        </div>
      )}
    </div>
  );
}