import axios from 'axios';
import React, { FC, useState, useEffect } from 'react';

type Props = {
  videoUrl: string;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl, title }) => {
  const [videoData, setVideoData] = useState({
    otp: '',
    playbackInfo: '',
  });

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        await axios
          .post(`${process.env.NEXT_PUBLIC_SERVER_URI}getVdoCipherOTP`, {
            videoId: 'ab66da8d1b194643ac35eedd5ff3d6b5',
          })
          .then((res) => {
            setVideoData(res.data);
          });
      } catch (error) {
        console.log('Error fetching video data:', error);
      }
    };
    fetchVideoData();
  }, [videoUrl]);

  return (
    <div style={{ paddingTop: '41%', position: 'relative' }}>
      {videoData.otp && videoData.playbackInfo !== '' && (
        <iframe
          src={`https://player.vdocipher.com/v2/?otp=${videoData?.otp}&playbackInfo=${videoData.playbackInfo}&player=6Gcft7W97pRCQYGU`}
          style={{
            border: 0,
            width: '90%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          allowFullScreen={true}
          allow='encrypted-media'
        ></iframe>
      )}
    </div>
  );
};

export default CoursePlayer;
