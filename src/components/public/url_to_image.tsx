import React, { useState } from 'react';
import inflearn from '../../images/inflearn.png'
import krafton from '../../images/krafton.png'
import defaultThumbnail from '../../images/default_thumbnail.jpeg'

interface Props {
    imageUrl: string;
  }


const VideoThumbnail: React.FC<Props> = ({ imageUrl}) => {
  const [url, setUrl] = useState('');

  const thumbnailMappings :{ [key: string]: string } = {
    'inflearn.com': inflearn,
    'krafton.com': krafton,
    // 도메인과 썸네일을 추가하여 확장시킬 수 있음.
  };

  const getVideoThumbnail = (url:string) => {
    const domain = url.startsWith('https') ? new URL(url).hostname.replace('www.', '') : '';
    const thumbnail = thumbnailMappings[domain];
    return thumbnail || defaultThumbnail;
  };

  return (
      <div>
        <img src={getVideoThumbnail(imageUrl)} alt="Video Thumbnail"style={{ width: '300px', height: '200px' }} />
      </div>
  );
};

export default VideoThumbnail;
