import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const closedGesture = new GestureDescription("closed");

const unfoldedFingers = [
  Finger.Thumb,
  Finger.Index,
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
];
// Thumb
closedGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
closedGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 1.0);
closedGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 1.0);
closedGesture.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalDownRight,
  1.0
);
closedGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 1.0);
closedGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 1.0);
closedGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.0);
closedGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 0.0);
closedGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 0.0);

for (let finger of unfoldedFingers) {
  closedGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
  closedGesture.addCurl(finger, FingerCurl.HalfCurl, 0.75);
  closedGesture.addCurl(finger, FingerCurl.NoCurl, 0.0);
  closedGesture.addDirection(finger, FingerDirection.VerticalDown, 1.0);
  closedGesture.addDirection(finger, FingerDirection.DiagonalDownLeft, 1.0);
  closedGesture.addDirection(finger, FingerDirection.DiagonalDownRight, 1.0);
  closedGesture.addDirection(finger, FingerDirection.VerticalUp, 0.0);
  closedGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.0);
  closedGesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.0);
}
