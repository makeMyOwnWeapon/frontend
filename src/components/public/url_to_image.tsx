import React from 'react';
import inflearn from '../../images/inflearn.png';
import krafton from '../../images/krafton.png';
import defaultThumbnail from '../../images/default_thumbnail.png';
import styled from 'styled-components';

interface Props {
    imageUrl: string;
}

const VideoThumbnail: React.FC<Props> = ({ imageUrl }) => {
    
  const thumbnailMappings: { [key: string]: string } = {
    'inflearn.com': inflearn,
    'krafton.com': krafton,
  };

  const getVideoThumbnail = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const domain = parsedUrl.hostname.replace('www.', '');

      if (domain === 'youtube.com') {
        const videoId = domain === 'youtube.com' ? parsedUrl.searchParams.get('v') : url.split('/').pop();
        return `https://img.youtube.com/vi/${videoId}/0.jpg`;
      }

      return thumbnailMappings[domain] || defaultThumbnail;
    } catch (error) {
      return defaultThumbnail;
    }
  };

  return (
        <ImageWithShadow src={getVideoThumbnail(imageUrl)} alt="Video Thumbnail" style={{ width: '200px', height: '200px' }} />
  );
};

export default VideoThumbnail;


const ImageWithShadow = styled.img`
  /* border: 1px solid red; */
  object-fit: cover;
`;