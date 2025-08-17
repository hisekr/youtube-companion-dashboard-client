import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
})

export async function loginWithGoogle() {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
}

export async function logout() {
    return api.post('/auth/logout');
}


export async function getVideos() {
    const res = await api.get('/videos');
    return res.data;
} 

export async function updateVideo(id, title, description) {
    const res = await api.post('/videos/update', { id, title, description });
    return res.data;
}


export async function checkAuth() {
    const res = await api.get('/auth/check');
    return res.data.authenticated;
}

export async function getVideoDetails(id) {
    const res = await api.get(`/videos/${id}`);
    return res.data;
}

export async function addComment(videoId, text) {
    const res = await api.post('/comments/add', { videoId, text });
    return res.data;
}

export async function replyToComment(parentId, text) {
    const res = await api.post('/comments/reply', { parentId, text });
    return res.data;
}

export async function deleteComment(id) {
    const res = await api.delete(`/comments/${id}`);
    return res.data;
}

export async function getComments(videoId) {
    const res = await api.get(`/comments/${videoId}`);
    return res.data;
}

export async function addNote(videoId, text, tags) {
    const res = await api.post('/notes/add', { videoId, text, tags });
    return res.data;
}

export async function getNotes(videoId, search) {
    const res = await api.get(`/notes/${videoId}?search=${encodeURIComponent(search)}`);
    return res.data;
}

export async function getLogs() {
    const res = await api.get('/logs');
    return res.data;
}