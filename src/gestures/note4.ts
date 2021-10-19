import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const note4Gesture = new GestureDescription("note4");

const unfoldedFingers = [
  Finger.Thumb,
  Finger.Index,
  Finger.Middle,
  Finger.Pinky,
];
// Ring
note4Gesture.addCurl(Finger.Ring, FingerCurl.fullCurl, 1.0);
note4Gesture.addDirection(Finger.Ring, FingerDirection.VerticalDown, 1.0);
note4Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalDownLeft, 0.75);
note4Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalDownRight, 0.75);

for (let finger of unfoldedFingers) {
  note4Gesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  note4Gesture.addCurl(finger, FingerCurl.HalfCurl, 0.75);
  note4Gesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  note4Gesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.75);
  note4Gesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.75);
  note4Gesture.addDirection(finger, FingerDirection.VerticalDown, 0.0);
  note4Gesture.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.0);
  note4Gesture.addDirection(finger, FingerDirection.DiagonalDownRight, 0.0);
}
