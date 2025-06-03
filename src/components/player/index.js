import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const MySecurePlayer = ({ mp3link }) => {
  return (
    <AudioPlayer
      src={mp3link}
      onPlay={e => console.log("Playing")}
      showDownloadProgress={false}
      customAdditionalControls={[]} // removes download and extra buttons
    />
  );
};
export default MySecurePlayer;