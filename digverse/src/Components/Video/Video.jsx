import styles from "./Video.module.css";

const Video = ({ src }) => {
  return (
    <video playsInline autoPlay loop muted className={styles.video} src={src} />
  );
};

export default Video;
