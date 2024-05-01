import React from 'react';
import inflearn from '../../images/inflearn.png'
import krafton from '../../images/krafton.png'
import defaultThumbnail from '../../images/default_thumbnail.jpeg'
import { ImageWithShadow } from '../../styles/Public';

interface Props {
    imageUrl: string;
  }

const VideoThumbnail: React.FC<Props> = ({ imageUrl }) => {
    
  const thumbnailMappings :{ [key: string]: string } = {
    'inflearn.com': inflearn,
    'krafton.com': krafton,
    // 도메인과 썸네일을 추가하여 확장시킬 수 있음.
  };

  const getVideoThumbnail = (url:string) => {
    console.log(url);
    const domain = url.startsWith('https') ? new URL(url).hostname.replace('www.', '') : '';
    if (domain === null){
      return defaultThumbnail;
    }
    const thumbnail = thumbnailMappings[domain];
    return thumbnail || defaultThumbnail;
  };

  return (
      <div>
        <ImageWithShadow src={getVideoThumbnail(imageUrl)} alt="Video Thumbnail" style={{ width: '300px', height: '200px' }} />
      </div>
  );
};

export default VideoThumbnail;
