import { useEffect, useRef, useState } from "react";
import MusicScene from "../../utils/three/scenes/MusicScene/MusicScene";

const MusicCanvas: React.FC = () => {
  const [scene, setScene] = useState<MusicScene | null>(null);
  const refScene = useRef(null);
  useEffect(() => {
    setScene(new MusicScene());
  }, []);
  return <canvas id="scene" ref={refScene}></canvas>;
};
export default MusicCanvas;
