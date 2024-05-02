import React from 'react';

interface Props {
    imageUrl: string;
}

const VideoThumbnail: React.FC<Props> = ({ imageUrl }) => {
    
  const thumbnailMappings: { [key: string]: string } = {
    'inflearn.com': 'inflearn.png',
    'krafton.com': 'krafton.png',
    // 추가 도메인 및 썸네일 확장 가능
  };

  const getVideoThumbnail = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const domain = parsedUrl.hostname.replace('www.', '');

      if (domain === 'youtube.com') {
        const videoId = domain === 'youtube.com' ? parsedUrl.searchParams.get('v') : url.split('/').pop();
        return `https://img.youtube.com/vi/${videoId}/0.jpg`; // 유튜브 썸네일 URL
      }

      return thumbnailMappings[domain] || 'default_thumbnail.png';
    } catch (error) {
      return 'default_thumbnail.png'; // 유효하지 않은 URL의 경우 기본 썸네일
    }
  };

  return (
      <div>
        <img src={getVideoThumbnail(imageUrl)} alt="Video Thumbnail" style={{ width: '300px', height: '200px', boxShadow: '5px 5px 10px #888888' }} />
      </div>
  );
};

export default VideoThumbnail;
