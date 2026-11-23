import confetti from "@hiseb/confetti";

export const FinishPage = () => {
  const waves = 3; // oleadas
  const bursts = 4; // explosiones por oleada

  for (let w = 0; w < waves; w++) {
    for (let b = 0; b < bursts; b++) {
      setTimeout(
        () =>
          confetti({
            position: {
              x: window.innerWidth * (0.1 + Math.random() * 0.8),
              y: window.innerHeight * (0.2 + Math.random() * 0.5),
            },
            count: 300,
            velocity: 300,
            size: 1.2,
          }),
        w * 700 + b * 80,
      );
    }
  }
  return (
    <div className="bg-background h-full grid place-content-center text-4xl text-secondary font-bold">
      You Finished All Questions
    </div>
  );
};
