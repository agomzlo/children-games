import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Draggable } from "../components/Draggable";
import { DroppableNumbers } from "../components/DroppableNumbers";
import confetti from "@hiseb/confetti";
import { useSearchParams } from "react-router";

const items = [
  {
    id: "six",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-3xl">
        <span className="size-full grid grid-cols-2 justify-between">
          <p>🍐</p>
          <p>🍐</p>
          <p>🍐</p>
          <p>🍐</p>
          <p>🍐</p>
          <p>🍐</p>
        </span>
      </div>
    ),
    season: "six",
  },
  {
    id: "seven",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-3xl">
        <span className="size-full flex flex-row justify-between">
          <span className="w-full flex flex-col justify-between">
            <p>🍊</p>
            <p>🍊</p>
            <p>🍊</p>
          </span>
          <span className="w-full flex flex-col justify-center">
            <p>🍊</p>
          </span>
          <span className="w-full flex flex-col justify-between">
            <p>🍊</p>
            <p>🍊</p>
            <p>🍊</p>
          </span>
        </span>
      </div>
    ),
    season: "seven",
  },
  {
    id: "eigth",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-3xl">
        <span className="size-full flex flex-row justify-between">
          <span className="w-full flex flex-col justify-between">
            <p>🍋</p>
            <p>🍋</p>
            <p>🍋</p>
          </span>
          <span className="w-full flex flex-col justify-evenly">
            <p>🍋</p>
            <p>🍋</p>
          </span>
          <span className="w-full flex flex-col justify-between">
            <p>🍋</p>
            <p>🍋</p>
            <p>🍋</p>
          </span>
        </span>
      </div>
    ),
    season: "eigth",
  },
  {
    id: "nine",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-2xl">
        <span className="size-full flex flex-row justify-between">
          <span className="w-full flex flex-col justify-between">
            <p>🥥</p>
            <p>🥥</p>
            <p>🥥</p>
            <p>🥥</p>
          </span>
          <span className="w-full flex flex-col justify-center">
            <p>🥥</p>
          </span>
          <span className="w-full flex flex-col justify-between">
            <p>🥥</p>
            <p>🥥</p>
            <p>🥥</p>
            <p>🥥</p>
          </span>
        </span>
      </div>
    ),
    season: "nine",
  },
  {
    id: "ten",
    container: (
      <div className="p-4 rounded-xl bg-white w-40 aspect-square grid place-items-center text-2xl">
        <span className="size-full flex flex-row justify-between">
          <span className="w-full flex flex-col justify-between">
            <p>🍒</p>
            <p>🍒</p>
            <p>🍒</p>
            <p>🍒</p>
          </span>
          <span className="w-full flex flex-col justify-evenly">
            <p>🍒</p>
            <p>🍒</p>
          </span>
          <span className="w-full flex flex-col justify-between">
            <p>🍒</p>
            <p>🍒</p>
            <p>🍒</p>
            <p>🍒</p>
          </span>
        </span>
      </div>
    ),
    season: "ten",
  },
];

const droppables = [
  { id: "six", tittle: "6 - Six" },
  { id: "seven", tittle: "7 - Seven" },
  { id: "eigth", tittle: "8 - Eigth" },
  { id: "nine", tittle: "9 - Nine" },
  { id: "ten", tittle: "10 - Ten" },
];

function shuffle<T>(list: T[]) {
  const next = [...list];

  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

export const NumbersSixToTenPage = () => {
  const [shufledItems] = useState(() => shuffle(items));
  const [placements, setPlacements] = useState<Record<string, string | null>>(
    Object.fromEntries(shufledItems.map((item) => [item.id, null])),
  );
  const [_, setSearchParams] = useSearchParams();

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
            setSearchParams((prev) => {
              prev.set("completed", "true");
              return prev;
            });

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
