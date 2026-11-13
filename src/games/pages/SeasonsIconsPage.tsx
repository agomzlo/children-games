import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Draggable } from "../components/Draggable";
import { DroppableIcons } from "../components/DroppableIcons";
import confetti from "@hiseb/confetti";

const items = [
  {
    id: "sun",
    container: <div className="p-4 rounded-xl bg-white">☀️</div>,
    season: "summer",
  },
  {
    id: "snowflake",
    container: <div className="p-4 rounded-xl bg-white">❄️</div>,
    season: "winter",
  },
  {
    id: "flower",
    container: <div className="p-4 rounded-xl bg-white">🌸</div>,
    season: "spring",
  },
  {
    id: "leaf",
    container: <div className="p-4 rounded-xl bg-white">🍂</div>,
    season: "autumn",
  },
  {
    id: "snowman",
    container: <div className="p-4 rounded-xl bg-white">⛄</div>,
    season: "winter",
  },
  {
    id: "gloves",
    container: <div className="p-4 rounded-xl bg-white">🧤</div>,
    season: "winter",
  },
  {
    id: "tulip",
    container: <div className="p-4 rounded-xl bg-white">🌷</div>,
    season: "spring",
  },
  {
    id: "butterfly",
    container: <div className="p-4 rounded-xl bg-white">🦋</div>,
    season: "spring",
  },
  {
    id: "ice-cream",
    container: <div className="p-4 rounded-xl bg-white">🍦</div>,
    season: "summer",
  },
  {
    id: "beach",
    container: <div className="p-4 rounded-xl bg-white">🏖️</div>,
    season: "summer",
  },
  {
    id: "pumpkin",
    container: <div className="p-4 rounded-xl bg-white">🎃</div>,
    season: "autumn",
  },
  {
    id: "maple",
    container: <div className="p-4 rounded-xl bg-white">🍁</div>,
    season: "autumn",
  },
];

const droppables = [
  { id: "winter", tittle: "Winter", bgImage: "/src/assets/winter.png" },
  { id: "spring", tittle: "Spring", bgImage: "/src/assets/spring.png" },
  { id: "summer", tittle: "Summer", bgImage: "/src/assets/summer.png" },
  { id: "autumn", tittle: "Autumn", bgImage: "/src/assets/autumn.png" },
];

function shuffle<T>(list: T[]) {
  const next = [...list];

  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

export const SeasonsIconsPage = () => {
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
          <div className="flex gap-8">
            {droppables.map((droppable) => (
              <DroppableIcons
                key={droppable.id}
                id={droppable.id}
                tittle={droppable.tittle}
                bgImage={droppable.bgImage}
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
              </DroppableIcons>
            ))}
          </div>

          <div className="flex gap-4 text-7xl">
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
