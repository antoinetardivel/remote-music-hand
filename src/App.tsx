import React, { useRef, useState, useEffect } from "react";

import "@tensorflow/tfjs-backend-webgl";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";

import * as fp from "fingerpose";
import { drawHand } from "./utils/drawHand";

import { note1Gesture } from "./gestures/note1";
import { note2Gesture } from "./gestures/note2";
import { note3Gesture } from "./gestures/note3";
import { note4Gesture } from "./gestures/note4";
import { note5Gesture } from "./gestures/note5";
import { openedGesture } from "./gestures/opened";
import { closedGesture } from "./gestures/closed";
import { config } from "./config/config";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [position, setPosition] = useState<string | null>(null);

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

        // webcam.video.msHorizontalMirror = true;

        // Set canvas height and width
        const canvas = canvasRef.current;
        if (typeof canvas !== "undefined" && canvas !== null) {
          canvas.width = videoWidth;
          canvas.height = videoHeight;
        }

        // Make Detections
        const hand = await net.estimateHands(webcam.video, true);
        // console.log(hand);

        if (hand.length > 0) {
          const GE = new fp.GestureEstimator([
            // fp.Gestures.VictoryGesture,
            // fp.Gestures.ThumbsUpGesture,
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
            // console.log(gesture.gestures);

            const confidence = gesture.gestures.map(
              (prediction: any) => prediction.confidence
            );
            const maxConfidence = confidence.indexOf(
              Math.max.apply(null, confidence)
            );
            // console.log(gesture.gestures[maxConfidence].name);
            setPosition(gesture.gestures[maxConfidence].name);
            console.log(gesture.gestures[maxConfidence].name);
          }
        }

        // Draw mesh
        const ctx = canvas?.getContext("2d");
        if (ctx) drawHand(hand, ctx);
      }
    };
    const runHandpose = async (webcamRef: React.MutableRefObject<any>) => {
      const net = await handpose.load();
      console.log("Handpose model loaded.");
      //  Loop and detect hands
      setInterval(() => {
        detect(net, webcamRef);
      }, 10);
    };
    if (webcamRef) {
      runHandpose(webcamRef);
    }
  }, [webcamRef]);

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          className="video"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: config.video.width,
            height: config.video.height,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: config.video.width,
            height: config.video.height,
          }}
        />
      </header>
    </div>
  );
}

export default App;
