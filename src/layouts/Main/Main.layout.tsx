import { useEffect, useState } from "react";
import HandDetection from "../../components/HandDetection/HandDetection.component";
import MusicCanvas from "../../components/MusicCanvas/MusicCanvas.component";
import { useDebounce } from "use-debounce";
import { Oscillator } from "../../utils/Oscillator";
import { config } from "../../config/config";
import "./Main.css";

interface Imain {
  started: boolean;
  setHintOpened: (state: boolean) => void;
}
const Main: React.FC<Imain> = ({ started, setHintOpened }) => {
  const [position, setPosition] = useState<string | null>(null);
  const [muted, setMuted] = useState<boolean>(false);
  const [positionDebouced] = useDebounce(position, 300);
  const [blob, setBlob] = useState<number>(0);
  const [oscillator, setOscillator] = useState<Oscillator | null>(null);
  useEffect(() => {
    if (oscillator && started) {
      if (!muted) {
        if (positionDebouced === "closed") {
          oscillator.mute();
          setBlob(0);
          setMuted(true);
        } else if (positionDebouced === "opened") {
          oscillator.mute();
          setBlob(0);
        } else {
          for (let i = 0; i < config.notes.length; i++) {
            if (config.notes[i].name === positionDebouced) {
              oscillator.setFrequency(config.notes[i].frequency);
              setBlob(config.notes[i].number);
              oscillator.setSound();
            }
          }
        }
      } else {
        oscillator.mute();
      }
    }
  }, [positionDebouced, oscillator, muted, started]);

  useEffect(() => {
    const newAudioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    setOscillator(new Oscillator("sine", 0, newAudioContext));
  }, []);

  return (
    <>
      <MusicCanvas blob={blob} />
      <HandDetection
        setPosition={setPosition}
        setMuted={setMuted}
        muted={muted}
      />
      <button className="helpButton" onClick={() => setHintOpened(true)}>
        Help
      </button>
    </>
  );
};
export default Main;
