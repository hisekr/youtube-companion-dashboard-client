export default function VideoPlayer({ videoId }) {
  return (
    <iframe
      width="100%"
      height="400"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="rounded"
    ></iframe>
  );
}