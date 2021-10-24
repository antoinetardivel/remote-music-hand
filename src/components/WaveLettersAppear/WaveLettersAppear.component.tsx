import { useEffect, useRef, useState } from "react";
import gsap, { Power4 } from "gsap";
import "./WaveLettersAppear.css";
interface IwaveLettersAppear {
  text: string;
}
const WaveLettersAppear: React.FC<IwaveLettersAppear> = ({ text }) => {
  const [letters, setLetters] = useState<string[]>([]);
  useEffect(() => {
    for (let i = 0; i < text.length; i++) {
      setLetters((prevLetters) => {
        return [...prevLetters, text.charAt(i)];
      });
    }
  }, [text]);
  if (letters.length < text.length) return null;
  return (
    <div className="waveLettersAppear">
      {letters.map((letter, index) => {
        return <WaveLetterAppear key={index} letter={letter} index={index} />;
      })}
    </div>
  );
};
export default WaveLettersAppear;

interface IwaveLetterAppear {
  letter: string;
  index: number;
}
const WaveLetterAppear: React.FC<IwaveLetterAppear> = ({ letter, index }) => {
  const letterRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      const timeline = gsap.timeline();
      timeline.to(letterRef.current, {
        css: { marginTop: "-10px", opacity: 0.5 },
        ease: Power4.easeOut,
        duration: 0.4,
      });
      timeline.to(letterRef.current, {
        css: { marginTop: "0px", opacity: 1 },
        ease: Power4.easeOut,
        duration: 0.2,
      });
    }, (100 * index));
  }, [letter, index]);
  return (
    <p ref={letterRef} className={"waveLetterAppear"}>
      {letter}
    </p>
  );
};
