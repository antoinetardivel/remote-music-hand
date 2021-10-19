import {
  Finger,
  FingerCurl,
  FingerDirection,
  GestureDescription,
} from "fingerpose";

// Define Gesture Description
export const note3Gesture = new GestureDescription("note3");

const unfoldedFingers = [Finger.Thumb, Finger.Index, Finger.Pinky];
// Middle
note3Gesture.addCurl(Finger.Middle, FingerCurl.fullCurl, 1.0);
note3Gesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 1.0);
note3Gesture.addDirection(Finger.Middle, FingerDirection.VerticalDown, 1.0);
note3Gesture.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalDownLeft,
  0.75
);
note3Gesture.addDirection(
  Finger.Middle,
  FingerDirection.DiagonalDownRight,
  0.75
);

for (let finger of unfoldedFingers) {
  note3Gesture.addCurl(finger, FingerCurl.NoCurl, 1.0);
  note3Gesture.addCurl(finger, FingerCurl.HalfCurl, 0.75);
  note3Gesture.addDirection(finger, FingerDirection.VerticalUp, 1.0);
  note3Gesture.addDirection(finger, FingerDirection.DiagonalUpLeft, 0.75);
  note3Gesture.addDirection(finger, FingerDirection.DiagonalUpRight, 0.75);
  note3Gesture.addDirection(finger, FingerDirection.VerticalDown, 0.0);
  note3Gesture.addDirection(finger, FingerDirection.DiagonalDownLeft, 0.0);
  note3Gesture.addDirection(finger, FingerDirection.DiagonalDownRight, 0.0);
}

note3Gesture.addCurl(Finger.Ring, FingerCurl.NoCurl, 1.0);
note3Gesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.75);
note3Gesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 0.75);
note3Gesture.addDirection(Finger.Ring, FingerDirection.VerticalUp, 1.0);
note3Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalUpLeft, 0.75);
note3Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalUpRight, 0.75);
note3Gesture.addDirection(Finger.Ring, FingerDirection.VerticalDown, 0.0);
note3Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalDownLeft, 0.0);
note3Gesture.addDirection(Finger.Ring, FingerDirection.DiagonalDownRight, 0.0);
