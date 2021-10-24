import { useRef } from "react";
import WaveLettersAppear from "../../components/WaveLettersAppear/WaveLettersAppear.component";
import gsap, { Power4 } from "gsap";
import "./home.css";
interface Ihome {}
const Home: React.FC<Ihome> = () => {
  const homeRef = useRef(null);
  const handleStart = () => {
    console.log("handle");
    const timeline = gsap.timeline();
    timeline.to(homeRef.current, {
      css: { opacity: 0 },
      ease: Power4.easeOut,
      duration: 0.7,
    });
    timeline.to(homeRef.current, {
      css: { display: "none" },
      ease: Power4.easeOut,
      duration: 0.7,
    });
  };
  return (
    <div ref={homeRef} className="homeContainer">
      <span></span>
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
