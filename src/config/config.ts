interface Inote {
  name: "note1" | "note2" | "note3" | "note4" | "note5" | "opened" | "closed";
  frequency: number;
}
export const config = {
  video: { width: 320, height: 240, fps: 30 },
  notes: [
    {
      // do
      name: "note1",
      frequency: 256,
    },
    {
      // re
      name: "note2",
      frequency: 288,
    },
    {
      // mi
      name: "note3",
      frequency: 324,
    },
    {
      // fa
      name: "note4",
      frequency: 342,
    },
    {
      // sol
      name: "note5",
      frequency: 384,
    },
  ] as Inote[],
};
