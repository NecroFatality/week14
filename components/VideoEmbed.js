import styles from './VideoEmbed.module.css';

function getVideoEmbed(url) {
  if (!url) return null;

  // YouTube
  const youtubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  if (youtubeMatch) {
    return {
      type: 'youtube',
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
    };
  }

  // TikTok
  const tiktokMatch = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  if (tiktokMatch) {
    return {
      type: 'tiktok',
      embedUrl: `https://www.tiktok.com/embed/${tiktokMatch[1]}`,
    };
  }

  // Instagram Reels
  const instaMatch = url.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
  if (instaMatch) {
    return {
      type: 'instagram',
      embedUrl: `https://www.instagram.com/p/${instaMatch[1]}/embed`,
    };
  }

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return {
      type: 'vimeo',
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // Unknown - just return the link
  return { type: 'link', url };
}

export default function VideoEmbed({ url }) {
  const video = getVideoEmbed(url);

  if (!video) return null;

  if (video.type === 'link') {
    return (
      <section className={styles.videoSection}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.sectionIcon}>🎬</span> Watch the Video
        </h2>
        <a href={video.url} target="_blank" rel="noopener noreferrer" className={styles.videoLink}>
          Watch on {new URL(video.url).hostname} →
        </a>
      </section>
    );
  }

  return (
    <section className={styles.videoSection}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>🎬</span> Watch the Video
      </h2>
      <div className={styles.videoWrapper}>
        <iframe
          src={video.embedUrl}
          title="Recipe video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.videoIframe}
        />
      </div>
    </section>
  );
}
