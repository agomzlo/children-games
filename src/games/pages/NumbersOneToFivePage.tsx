import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Draggable } from "../components/Draggable";
import { DroppableNumbers } from "../components/DroppableNumbers";
import confetti from "@hiseb/confetti";

const items = [
  {
    id: "one",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-7xl">
        <p>🍓</p>
      </div>
    ),
    season: "one",
  },
  {
    id: "two",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-5xl">
        <p className="w-full text-start">⭐</p>
        <p className="w-full text-end">⭐</p>
      </div>
    ),
    season: "two",
  },
  {
    id: "three",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-3xl">
        <p className="w-full text-start">🥦</p>
        <p className="w-full text-center">🥦</p>
        <p className="w-full text-end">🥦</p>
      </div>
    ),
    season: "three",
  },
  {
    id: "four",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-4xl">
        <span className="w-full flex flex-row justify-between">
          <p>🍎</p>
          <p>🍎</p>
        </span>
        <span className="w-full flex flex-row justify-between">
          <p>🍎</p>
          <p>🍎</p>
        </span>
      </div>
    ),
    season: "four",
  },
  {
    id: "five",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-3xl">
        <span className="w-full flex flex-row justify-between">
          <p>🌸</p>
          <p>🌸</p>
        </span>
        <p className="w-full text-center">🌸</p>
        <span className="w-full flex flex-row justify-between">
          <p>🌸</p>
          <p>🌸</p>
        </span>
      </div>
    ),
    season: "five",
  },
];

const droppables = [
  { id: "one", tittle: "1 - One" },
  { id: "two", tittle: "2 - Two" },
  { id: "three", tittle: "3 - Three" },
  { id: "four", tittle: "4 - Four" },
  { id: "five", tittle: "5 - Five" },
];

function shuffle<T>(list: T[]) {
  const next = [...list];

  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

export const NumbersOneToFivePage = () => {
  const [shufledItems] = useState(() => shuffle(items));
  const [placements, setPlacements] = useState<Record<string, string | null>>(
    Object.fromEntries(shufledItems.map((item) => [item.id, null])),
  );

  return (
    <section className="h-full bg-background grid place-items-center">
      <DragDropProvider
        onDragEnd={(event) => {
          if (event.canceled) return;

          const { source, target } = event.operation;
          if (!source) return;

          const item = shufledItems.find((entry) => entry.id === source.id);
          const targetId = typeof target?.id === "string" ? target.id : null;

          const next = {
            ...placements,
            [source.id]: item?.season === targetId ? targetId : null,
          };

          const isComplete = (state: Record<string, string | null>) =>
            shufledItems.every((entry) => state[entry.id] === entry.season);

          // Solo cuando se completa ahora, no si ya estaba completo
          if (!isComplete(placements) && isComplete(next)) {
            const waves = 2; // oleadas
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
          }

          setPlacements(next);
        }}
      >
        <div className="flex flex-col items-center gap-16 p-8">
          <div className="grid grid-cols-5 gap-4">
            {droppables.map((droppable) => (
              <DroppableNumbers
                key={droppable.id}
                id={droppable.id}
                tittle={droppable.tittle}
              >
                {shufledItems
                  .filter(
                    (item) =>
                      item.season === droppable.id &&
                      placements[item.id] === droppable.id,
                  )
                  .map((item) => (
                    <Draggable
                      key={item.id}
                      id={item.id}
                      container={item.container}
                    />
                  ))}
              </DroppableNumbers>
            ))}
          </div>

          <div className="flex gap-4">
            {shufledItems
              .filter((item) => placements[item.id] == null)
              .map((item) => (
                <Draggable
                  key={item.id}
                  id={item.id}
                  container={item.container}
                />
              ))}
          </div>
        </div>
      </DragDropProvider>
    </section>
  );
};
