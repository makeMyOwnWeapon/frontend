import React from 'react';
import inflearn from '../../images/inflearn.png';
import krafton from '../../images/krafton.png';
import defaultThumbnail from '../../images/default_thumbnail.png';
import { ImageWithShadow } from '../../styles/Public';

interface Props {
    imageUrl: string;
}

const VideoThumbnail: React.FC<Props> = ({ imageUrl }) => {
    
  const thumbnailMappings: { [key: string]: string } = {
    'inflearn.com': inflearn,
    'krafton.com': krafton,
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

      return thumbnailMappings[domain] || defaultThumbnail;
    } catch (error) {
      return defaultThumbnail; // 유효하지 않은 URL의 경우 기본 썸네일
    }
  };

  return (
        <ImageWithShadow src={getVideoThumbnail(imageUrl)} alt="Video Thumbnail" style={{ width: '200px', height: '200px' }} />
  );
};

export default VideoThumbnail;
