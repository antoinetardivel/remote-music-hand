import { useEffect, useRef } from "react";
import gsap, { Power4 } from "gsap";
import "./Hint.css";
import WaveLettersAppear from "../../components/WaveLettersAppear/WaveLettersAppear.component";
interface Ihint {
  hintOpened: boolean;
  setHintOpened: (toogle: boolean) => void;
}
const Hint: React.FC<Ihint> = ({ hintOpened, setHintOpened }) => {
  const hintRef = useRef(null);

  const handleHide = () => {
    const timeline = gsap.timeline();
    timeline.to(hintRef.current, {
      css: { opacity: 0 },
      ease: Power4.easeOut,
      duration: 0.6,
    });
    timeline.to(hintRef.current, {
      css: { display: "none" },
      ease: Power4.easeOut,
      duration: 0.1,
    });
    setHintOpened(false);
  };

  useEffect(() => {
    if (hintOpened) {
      const timeline = gsap.timeline();
      timeline.to(hintRef.current, {
        css: { display: "flex" },
        ease: Power4.easeOut,
        duration: 0.1,
      });
      timeline.to(hintRef.current, {
        css: { opacity: 1 },
        ease: Power4.easeOut,
        duration: 0.7,
      });
      setHintOpened(false);
    }
  }, [hintOpened, setHintOpened]);

  return (
    <div ref={hintRef} className="hintContainer">
      <span className="freeSpace"></span>
      <div className="hintText">
        <p>
          Handify is an interface for creating sounds based on hand gestures.
          There is one note per finger lowered. You have to lower your fingers
          one after the other to create your music.
        </p>
        <p>
          To begin, allow the page to access the camera and place your hand your
          hand in front of it. Your hand should be positioned flat and in the
          centre of the of the detection area. <br />
          <br /> Think to spread your fingers fingers apart to facilitate
          detection.
        </p>
        <p>
          It's up to you! One finger down corresponds to one note. For the
          moment the site only detects one note by one note.
        </p>
        <button className="hintCloseButton" onClick={handleHide}>
          <WaveLettersAppear text={"Back to experience"} />
        </button>
      </div>
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
export default Hint;
