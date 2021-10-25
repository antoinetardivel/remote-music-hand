import { useRef } from "react";
import WaveLettersAppear from "../../components/WaveLettersAppear/WaveLettersAppear.component";
import gsap, { Power4 } from "gsap";
import styles from "./Home.module.scss";
interface Ihome {
  setStarted: (started: boolean) => void;
}
const Home: React.FC<Ihome> = ({ setStarted }) => {
  const homeRef = useRef(null);
  const handleStart = () => {
    const timeline = gsap.timeline();
    timeline.to(homeRef.current, {
      css: { opacity: 0 },
      ease: Power4.easeOut,
      duration: 0.6,
    });
    timeline.to(homeRef.current, {
      css: { display: "none" },
      ease: Power4.easeOut,
      duration: 0.1,
    });
    setStarted(true);
  };
  return (
    <div ref={homeRef} className={styles.homeContainer}>
      <span className={styles.freeSpace}></span>
      <button className={styles.homeButton} onClick={handleStart}>
        <WaveLettersAppear text={"Start experience"} />
      </button>
      <p className={styles.credits}>
        Bootstrapped by{" "}
        <a
          rel="noreferrer"
          href="https://antoinetardivel.com"
          target="_blank"
          className={styles.creditsLink}
        >
          Antoine Tardivel
        </a>
      </p>
    </div>
  );
};
export default Home;
