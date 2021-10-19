import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const note1Gesture = new GestureDescription("note1");

const unfoldedFingers = [
  Finger.Index,
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
];
// Thumb
note1Gesture.addCurl(Finger.Thumb, FingerCurl.fullCurl, 1.0);
note1Gesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
note1Gesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.75);
note1Gesture.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalDownRight,
  0.75
);
note1Gesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.0);
note1Gesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.0);

for (let finger of unfoldedFingers) {
  note1Gesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  note1Gesture.addCurl(finger, FingerCurl.HalfCurl, 0.75);
  note1Gesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  note1Gesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.75);
  note1Gesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.75);
  note1Gesture.addDirection(finger, FingerDirection.VerticalDown, 0.0);
  note1Gesture.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.0);
  note1Gesture.addDirection(finger, FingerDirection.DiagonalDownRight, 0.0);
}
