import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Draggable } from "../components/Draggable";
import { DroppableImages } from "../components/DroppableImages";
import confetti from "@hiseb/confetti";
import winter from "../../assets/winter.png";
import spring from "../../assets/spring.png";
import summer from "../../assets/summer.png";
import autumn from "../../assets/autumn.png";

const items = [
  {
    id: "summer",
    container: <img className="w-80 aspect-video rounded-xl" src={summer} />,
    season: "summer",
  },
  {
    id: "winter",
    container: <img className="w-80 aspect-video rounded-xl" src={winter} />,
    season: "winter",
  },
  {
    id: "spring",
    container: <img className="w-80 aspect-video rounded-xl" src={spring} />,
    season: "spring",
  },
  {
    id: "autumn",
    container: <img className="w-80 aspect-video rounded-xl" src={autumn} />,
    season: "autumn",
  },
];

const droppables = [
  { id: "winter", tittle: "Winter" },
  { id: "spring", tittle: "Spring" },
  { id: "summer", tittle: "Summer" },
  { id: "autumn", tittle: "Autumn" },
];

function shuffle<T>(list: T[]) {
  const next = [...list];

  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

export const SeasonsImagesPage = () => {
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
              <DroppableImages
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
              </DroppableImages>
            ))}
          </div>

          <div className="flex gap-8 text-7xl">
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
