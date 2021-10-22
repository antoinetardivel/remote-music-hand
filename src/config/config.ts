interface Inote {
  name: "note1" | "note2" | "note3" | "note4" | "note5" | "opened" | "closed";
  frequency: number;
  number: number;
  text: "do" | "re" | "mi" | "fa" | "sol";
}
export const config = {
  video: { width: 320, height: 240, fps: 30 },
  notes: [
    {
      // do
      name: "note1",
      frequency: 256,
      number: 1,
      text: "do",
    },
    {
      // re
      name: "note2",
      frequency: 288,
      number: 2,
      text: "re",
    },
    {
      // mi
      name: "note3",
      frequency: 324,
      number: 3,
      text: "mi",
    },
    {
      // fa
      name: "note4",
      frequency: 342,
      number: 4,
      text: "fa",
    },
    {
      name: "note5",
      frequency: 384,
      number: 5,
      text: "sol",
    },
  ] as Inote[],
};
