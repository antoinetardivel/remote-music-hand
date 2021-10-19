import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const note5Gesture = new GestureDescription("note5");

const unfoldedFingers = [
  Finger.Thumb,
  Finger.Index,
  Finger.Middle,
];
// Pinky
note5Gesture.addCurl(Finger.Pinky, FingerCurl.fullCurl, 1.0);
note5Gesture.addDirection(Finger.Pinky, FingerDirection.VerticalDown, 1.0);
note5Gesture.addDirection(Finger.Pinky, FingerDirection.DiagonalDownLeft, 0.75);
note5Gesture.addDirection(
  Finger.Pinky,
  FingerDirection.DiagonalDownRight,
  0.75
);

for (let finger of unfoldedFingers) {
  note5Gesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  note5Gesture.addCurl(finger, FingerCurl.HalfCurl, 0.75);
  note5Gesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  note5Gesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.75);
  note5Gesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.75);
  note5Gesture.addDirection(finger, FingerDirection.VerticalDown, 0.0);
  note5Gesture.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.0);
  note5Gesture.addDirection(finger, FingerDirection.DiagonalDownRight, 0.0);
}
note5Gesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
note5Gesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.75);
note5Gesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.75);
note5Gesture.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
note5Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.75);
note5Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.75);
note5Gesture.addDirection(Finger.Ring, FingerDirection.VerticalDown, 0.0);
note5Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalDownLeft, 0.0);
note5Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalDownRight, 0.0);
