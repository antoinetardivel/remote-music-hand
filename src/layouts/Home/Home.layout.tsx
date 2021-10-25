import { useRef } from "react";
import WaveLettersAppear from "../../components/WaveLettersAppear/WaveLettersAppear.component";
import gsap, { Power4 } from "gsap";
import "./Home.css";
interface Ihome {
  setStarted: (started: boolean) => void;
}
const Home: React.FC<Ihome> = ({ setStarted }) => {
  const homeRef = useRef(null);
  const handleStart = () => {
    console.log("handle");
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
    <div ref={homeRef} className="homeContainer">
      <span className="freeSpace"></span>
      <button className="homeButton" onClick={handleStart}>
        <WaveLettersAppear text={"Start experience"} />
      </button>
      <p className="credits">
        Bootstrapped by{" "}
        <a
          rel="noreferrer"
          href="https://antoinetardivel.com"
          target="_blank"
          className="creditsLink"
        >
          Antoine Tardivel
        </a>
      </p>
    </div>
  );
};
export default Home;
