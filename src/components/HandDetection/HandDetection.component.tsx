import React, { useRef, useEffect, useState } from "react";

import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import styles from "./HandDetection.module.scss";
import iconMute from "../../assets/icons/volume-mute.svg";
import iconSoundOn from "../../assets/icons/volume-on.svg";

import * as fp from "fingerpose";
import { drawHand } from "../../utils/drawHand";

import { note1Gesture } from "../../gestures/note1";
import { note2Gesture } from "../../gestures/note2";
import { note3Gesture } from "../../gestures/note3";
import { note4Gesture } from "../../gestures/note4";
import { note5Gesture } from "../../gestures/note5";
import { openedGesture } from "../../gestures/opened";
import { closedGesture } from "../../gestures/closed";
import { config } from "../../config/config";

interface IhandDetection {
  setPosition: (position: string) => void;
  setMuted: (state: boolean) => void;
  muted: boolean;
}
const HandDetection: React.FC<IhandDetection> = ({
  setPosition,
  muted,
  setMuted,
}) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [textPosition, setTextPosition] = useState<string>();

  useEffect(() => {
    const detect = async (net: any, webcamRef: React.MutableRefObject<any>) => {
      // Check data is available
      const webcam: Webcam | null = webcamRef.current;

      if (
        typeof webcam !== "undefined" &&
        webcam !== null &&
        webcam.video?.readyState === 4
      ) {
        // Get Video Properties
        const videoWidth = webcam.video?.videoWidth;
        const videoHeight = webcam.video?.videoHeight;

        // Set video width
        webcam.video.width = videoWidth;
        webcam.video.height = videoHeight;

        // Set canvas height and width
        const canvas = canvasRef.current;
        if (typeof canvas !== "undefined" && canvas !== null) {
          canvas.width = videoWidth;
          canvas.height = videoHeight;
        }

        // Make Detections
        const hand = await net.estimateHands(webcam.video, true);

        if (hand.length > 0) {
          const GE = new fp.GestureEstimator([
            note1Gesture,
            note2Gesture,
            note3Gesture,
            note4Gesture,
            note5Gesture,
            openedGesture,
            closedGesture,
          ]);
          const gesture = await GE.estimate(hand[0].landmarks, 4);
          if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
            const confidence = gesture.gestures.map(
              (prediction: any) => prediction.confidence
            );
            const maxConfidence = confidence.indexOf(
              Math.max.apply(null, confidence)
            );
            setPosition(gesture.gestures[maxConfidence].name);
            setTextPosition(gesture.gestures[maxConfidence].name);
          }
        }

        // Draw mesh
        const ctx = canvas?.getContext("2d");
        if (ctx) drawHand(hand, ctx);
      }
    };
    const runHandpose = async (webcamRef: React.MutableRefObject<any>) => {
      const net = await handpose.load();
      //  Loop and detect hands
      setInterval(() => {
        detect(net, webcamRef);
      }, 10);
    };
    if (webcamRef) {
      runHandpose(webcamRef);
    }
  }, [webcamRef, setPosition]);

  return (
    <div className={styles.handDetection}>
      <div
        className={styles.videoContainer}
        style={{ height: config.video.height, width: "200px" }}
      >
        <Webcam
          ref={webcamRef}
          className={styles.video}
          style={{
            width: config.video.width,
            height: config.video.height,
          }}
        />

        <canvas
          ref={canvasRef}
          className={styles.handCanvas}
          style={{
            width: config.video.width,
            height: config.video.height,
          }}
        />
        <div
          className={styles.textPositionContainer}
          style={{
            width: config.video.width,
            height: config.video.height,
          }}
        >
          <p className={styles.textPositionstyles}>
            {textPosition === "closed"
              ? "mute"
              : textPosition === "opened"
              ? "no notes"
              : config.notes.filter((note) => note.name === textPosition)[0]
                  ?.text}
          </p>
        </div>
      </div>
      <button className={styles.muteButton} onClick={() => setMuted(!muted)}>
        <img src={muted ? iconMute : iconSoundOn} alt="Mute button" />
      </button>
    </div>
  );
};

export default HandDetection;
