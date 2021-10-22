import { useEffect, useState } from "react";
import "./App.css";
import HandDetection from "./components/HandDetection/HandDetection.component";
import { config } from "./config/config";
import { Oscillator } from "./utils/Oscillator";
import { useDebounce } from "use-debounce";
import MusicCanvas from "./components/MusicCanvas/MusicCanvas.component";

const App: React.FC = () => {
  const [position, setPosition] = useState<string | null>(null);
  const [muted, setMuted] = useState<boolean>(false);
  const [positionDebouced] = useDebounce(position, 300);
  const [blob, setBlob] = useState<number>(0);
  const [oscillator, setOscillator] = useState<Oscillator | null>(null);

  useEffect(() => {
    if (oscillator) {
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
  }, [positionDebouced, oscillator, muted]);

  useEffect(() => {
    const newAudioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    setOscillator(new Oscillator("sine", 0, newAudioContext));
  }, []);

  return (
    <div className="App">
      <MusicCanvas blob={blob} />
      <HandDetection
        setPosition={setPosition}
        setMuted={setMuted}
        muted={muted}
      />
    </div>
  );
};

export default App;
