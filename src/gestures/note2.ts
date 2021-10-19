import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const note2Gesture = new GestureDescription("note2");

const unfoldedFingers = [
  Finger.Thumb,
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
];
// Index
note2Gesture.addCurl(Finger.Index, FingerCurl.fullCurl, 1.0);
note2Gesture.addDirection(Finger.Index, FingerDirection.VerticalDown, 1.0);
note2Gesture.addDirection(Finger.Index, FingerDirection.DiagonalDownLeft, 0.75);
note2Gesture.addDirection(
  Finger.Index,
  FingerDirection.DiagonalDownRight,
  0.75
);

for (let finger of unfoldedFingers) {
  note2Gesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  note2Gesture.addCurl(finger, FingerCurl.HalfCurl, 0.75);
  note2Gesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  note2Gesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.75);
  note2Gesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.75);
  note2Gesture.addDirection(finger, FingerDirection.VerticalDown, 0.0);
  note2Gesture.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.0);
  note2Gesture.addDirection(finger, FingerDirection.DiagonalDownRight, 0.0);
}
