import { useEffect, useRef, useState } from "react";
import MusicScene from "../../utils/three/scenes/MusicScene/MusicScene";
interface ImusicCanvas {
  blob: number;
}
const MusicCanvas: React.FC<ImusicCanvas> = ({ blob }) => {
  const [scene, setScene] = useState<MusicScene | null>(null);
  const refScene = useRef(null);
  useEffect(() => {
    setScene(new MusicScene());
  }, []);
  useEffect(() => {
    if (scene) {
      scene.play(blob);
    }
  }, [blob]);
  return <canvas id="scene" ref={refScene}></canvas>;
};
export default MusicCanvas;
