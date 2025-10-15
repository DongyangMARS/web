import '../styles/VideoSection.css';
import '../styles/color.css';
import gifResearch from './gifResearch.gif';
import gifGameplay from './gifGameplay.gif';

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
          <img
            src={gifResearch}
            title="시연영상1"
            alt="시연영상1"
            className="video-gif"
          />
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
          <img
            src={gifGameplay}
            title="시연영상2"
            alt="시연영상2"
            className="video-gif"
          />
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
