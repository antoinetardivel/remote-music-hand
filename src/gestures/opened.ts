import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const openedGesture = new GestureDescription("opened");

const unfoldedFingers = [
  Finger.Thumb,
  Finger.Index,
  Finger.Middle,
  Finger.Ring,
  Finger.Pinky,
];
// Thumb
openedGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.75);
openedGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 0.0);
openedGesture.addCurl(Finger.Thumb, FingerCurl.FullCurl, 0.0);
openedGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 1.0);
openedGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpLeft, 1.0);
openedGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalUpRight, 1.0);
openedGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalLeft, 0.5);
openedGesture.addDirection(Finger.Thumb, FingerDirection.HorizontalRight, 0.5);
openedGesture.addDirection(Finger.Thumb, FingerDirection.VerticalDown, 0.0);
openedGesture.addDirection(Finger.Thumb, FingerDirection.DiagonalDownLeft, 0.0);
openedGesture.addDirection(
  Finger.Thumb,
  FingerDirection.DiagonalDownRight,
  0.0
);

for (let finger of unfoldedFingers) {
  openedGesture.addCurl(finger, FingerCurl.NoCurl, 0.70);
  openedGesture.addCurl(finger, FingerCurl.HalfCurl, 0.0);
  openedGesture.addCurl(finger, FingerCurl.FullCurl, 0.0);
  openedGesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  openedGesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.5);
  openedGesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.5);
  openedGesture.addDirection(finger, FingerDirection.VerticalDown, 0.0);
  openedGesture.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.0);
  openedGesture.addDirection(finger, FingerDirection.DiagonalDownRight, 0.0);
}
