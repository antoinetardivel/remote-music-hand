import { useEffect, useState } from "react";
import "./App.css";
import HandDetection from "./components/HandDetection/HandDetection.component";
import { config } from "./config/config";
import { Oscillator } from "./utils/Oscillator";
import { useDebounce } from "use-debounce";
import MusicCanvas from "./components/MusicCanvas/MusicCanvas.component";

const App: React.FC = () => {
  const [position, setPosition] = useState<string | null>(null);
  const [positionDebouced] = useDebounce(position, 300);
  const [oscillator, setOscillator] = useState<Oscillator | null>(null);

  useEffect(() => {
    if (positionDebouced === "opened" || positionDebouced === "closed") {
      oscillator?.mute(0.0);
    } else {
      for (let i = 0; i < config.notes.length; i++) {
        if (config.notes[i].name === positionDebouced) {
          oscillator?.setFrequency(config.notes[i].frequency);
          oscillator?.setSound(1.0);
        }
      }
    }
  }, [positionDebouced, oscillator]);

  useEffect(() => {
    const newAudioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    setOscillator(new Oscillator("sine", 0, newAudioContext));
  }, []);

  return (
    <div className="App">
      <MusicCanvas />
      <HandDetection setPosition={setPosition} />
    </div>
  );
};

export default App;
