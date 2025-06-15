import React from 'react';
import ReactPlayer from 'react-player';

type IProps = {
  videoURL: string;
  allowDownload?: boolean;
  className?: string;
  allowPictureInPicture?: boolean;
};

const ReactVideoPlayer = ({ videoURL, allowDownload = false, allowPictureInPicture = true, className }: IProps) => {
  return (
    <div className={`relative ${className}`} style={{ position: 'relative', paddingTop: '56.25%' }}>
      <ReactPlayer
        url={videoURL}
        controls
        width="100%"
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0, padding: '2px' }}
        config={{
          file: {
            attributes: {
              controlsList: `${!allowDownload ? 'nodownload' : ''}`,
              disablePictureInPicture: !allowPictureInPicture,
            },
          },
        }}
      />
    </div>
  );
};

export default ReactVideoPlayer;
