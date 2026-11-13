import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Draggable } from "../components/Draggable";
import { DroppableColorsIcons } from "../components/DroppableColorsIcons";
import confetti from "@hiseb/confetti";

const items = [
  { id: "ballon", container: "🎈", color: "red" },
  { id: "strawberry", container: "🍓", color: "red" },
  { id: "fire-truck", container: "🚒", color: "red" },

  { id: "whale", container: "🐳", color: "blue" },
  { id: "wave", container: "🌊", color: "blue" },
  { id: "water-drop", container: "💧", color: "blue" },

  { id: "banana", container: "🍌", color: "yellow" },
  { id: "chick", container: "🐥", color: "yellow" },
  { id: "star", container: "⭐", color: "yellow" },

  { id: "frog", container: "🐸", color: "green" },
  { id: "broccoli", container: "🥦", color: "green" },
  { id: "turtle", container: "🐢", color: "green" },

  { id: "orange-fruit", container: "🍊", color: "orange" },
  { id: "carrot", container: "🥕", color: "orange" },
  { id: "fox", container: "🦊", color: "orange" },

  { id: "pig", container: "🐷", color: "pink" },
  { id: "flamingo", container: "🦩", color: "pink" },
  { id: "blossom", container: "🌸", color: "pink" },

  { id: "black-cat", container: "🐈‍⬛", color: "black" },
  { id: "ant", container: "🐜", color: "black" },
  { id: "sunglasses", container: "🕶️", color: "black" },

  { id: "snowman", container: "⛄", color: "white" },
  { id: "cloud", container: "☁️", color: "white" },
  { id: "sheep", container: "🐑", color: "white" },
];

const droppables = [
  {
    id: "red",
    tittle: "Red",
    bgColor: "bg-red-500",
    textColor: "text-secondary",
  },
  {
    id: "blue",
    tittle: "Blue",
    bgColor: "bg-blue-500",
    textColor: "text-secondary",
  },
  {
    id: "yellow",
    tittle: "Yellow",
    bgColor: "bg-yellow-500",
    textColor: "text-secondary",
  },
  {
    id: "green",
    tittle: "Green",
    bgColor: "bg-green-500",
    textColor: "text-secondary",
  },
  {
    id: "orange",
    tittle: "Orange",
    bgColor: "bg-orange-500",
    textColor: "text-secondary",
  },
  {
    id: "pink",
    tittle: "Pink",
    bgColor: "bg-pink-500",
    textColor: "text-secondary",
  },
  {
    id: "black",
    tittle: "Black",
    bgColor: "bg-black",
    textColor: "text-primary",
  },
  {
    id: "white",
    tittle: "White",
    bgColor: "bg-white",
    textColor: "text-secondary",
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

export const ColorsIconsPage = () => {
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
              <DroppableColorsIcons
                key={droppable.id}
                id={droppable.id}
                tittle={droppable.tittle}
                bgColor={droppable.bgColor}
                textColor={droppable.textColor}
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
              </DroppableColorsIcons>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8 text-7xl">
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
