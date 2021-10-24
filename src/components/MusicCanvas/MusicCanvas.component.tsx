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
    window.addEventListener("resize", () => {
      if (refScene && refScene.current) {
        //@ts-ignore
        refScene.current.style.width = window.innerWidth;
        //@ts-ignore
        refScene.current.style.height = window.innerHeight;
      }
    });
  }, []);
  useEffect(() => {
    if (scene) {
      scene.play(blob);
    }
  }, [blob, scene]);
  return (
    <canvas id="scene" width="100vw" height="100vh" ref={refScene}></canvas>
  );
};
export default MusicCanvas;
