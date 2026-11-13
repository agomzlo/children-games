import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Draggable } from "../components/Draggable";
import { DroppableImages } from "../components/DroppableImages";
import confetti from "@hiseb/confetti";

const items = [
  {
    id: "red",
    container: <div className="w-60 aspect-video bg-red-500 rounded-xl"></div>,
    color: "red",
  },
  {
    id: "blue",
    container: <div className="w-60 aspect-video bg-blue-500 rounded-xl"></div>,
    color: "blue",
  },
  {
    id: "yellow",
    container: (
      <div className="w-60 aspect-video bg-yellow-500 rounded-xl"></div>
    ),
    color: "yellow",
  },
  {
    id: "green",
    container: (
      <div className="w-60 aspect-video bg-green-500 rounded-xl"></div>
    ),
    color: "green",
  },
  {
    id: "orange",
    container: (
      <div className="w-60 aspect-video bg-orange-500 rounded-xl"></div>
    ),
    color: "orange",
  },
  {
    id: "pink",
    container: <div className="w-60 aspect-video bg-pink-500 rounded-xl"></div>,
    color: "pink",
  },
  {
    id: "black",
    container: <div className="w-60 aspect-video bg-black rounded-xl"></div>,
    color: "black",
  },
  {
    id: "white",
    container: <div className="w-60 aspect-video bg-white rounded-xl"></div>,
    color: "white",
  },
];

const droppables = [
  {
    id: "red",
    tittle: "Red",
  },
  {
    id: "blue",
    tittle: "Blue",
  },
  {
    id: "yellow",
    tittle: "Yellow",
  },
  {
    id: "green",
    tittle: "Green",
  },
  {
    id: "orange",
    tittle: "Orange",
  },
  {
    id: "pink",
    tittle: "Pink",
  },
  {
    id: "black",
    tittle: "Black",
  },
  {
    id: "white",
    tittle: "White",
  },
];

function shuffle<T>(list: T[]) {
  const next = [...list];

  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

export const ColorsNamesPage = () => {
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
            [source.id]: item?.color === targetId ? targetId : null,
          };

          const isComplete = (state: Record<string, string | null>) =>
            shufledItems.every((entry) => state[entry.id] === entry.color);

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
          <div className="grid grid-cols-4 gap-4">
            {droppables.map((droppable) => (
              <DroppableImages
                key={droppable.id}
                id={droppable.id}
                tittle={droppable.tittle}
              >
                {shufledItems
                  .filter(
                    (item) =>
                      item.color === droppable.id &&
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

          <div className="flex flex-row gap-4 w-188 overflow-hidden pb-4">
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
