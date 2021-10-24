import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap, { Back, Power4 } from "gsap";
import "./WaveLettersAppear.css";
interface IwaveLettersAppear {
  text: string;
}
const WaveLettersAppear: React.FC<IwaveLettersAppear> = ({ text }) => {
  const [letters, setLetters] = useState<string[]>([]);
  const underlineRef = useRef(null);
  useEffect(() => {
    for (let i = 0; i < text.length; i++) {
      setLetters((prevLetters) => {
        return [...prevLetters, text.charAt(i)];
      });
    }
  }, [text]);
  useLayoutEffect(() => {
    setTimeout(() => {
      gsap.to(underlineRef.current, {
        css: { width: "100%", opacity: 1 },
        ease: Power4.easeOut,
        duration: 0.7,
      });
    }, 100 * text.length);
  }, [text.length]);
  if (letters.length < text.length) return null;
  return (
    <div className="waveLettersAppear">
      {letters.map((letter, index) => {
        return <WaveLetterAppear key={index} letter={letter} index={index} />;
      })}
      <span ref={underlineRef} className={"textUnderline"}></span>
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
      gsap.to(letterRef.current, {
        css: { marginTop: "-0px", opacity: 1 },
        ease: Back.easeOut.config(1.7),
        duration: 0.7,
      });
    }, 100 * index);
  }, [letter, index]);
  return (
    <p ref={letterRef} className={"waveLetterAppear"}>
      {letter}
    </p>
  );
};
