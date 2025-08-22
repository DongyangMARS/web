import '../styles/VideoSection.css';

function VideoSection() {
  return (
    <section className="video-section" id="video">
      <h2 className="video-title">시연 영상</h2>
      <div className="video-container">
        <div className="video-box">
          <iframe
            className="youtube"
            src="https://youtu.be/XGxIE1hr0w4?si=MAouibA8ROmwJ5gH"
            title="시연영상 1"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="video-box">
          <iframe
            className="youtube"
            src="https://youtu.be/dQw4w9WgXcQ?si=GbXX6k-8L4dj2feS"
            title="시연영상 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
