import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Draggable } from "../components/Draggable";
import confetti from "@hiseb/confetti";
import cloudy from "../../assets/weather/cloudy.jpeg";
import rainy from "../../assets/weather/rainy.jpeg";
import sunny from "../../assets/weather/sunny.jpeg";
import windy from "../../assets/weather/windy.jpeg";
import snowy from "../../assets/weather/snowy.jpeg";
import stormy from "../../assets/weather/stormy.jpeg";
import { useSearchParams } from "react-router";
import { DroppableWeatherImages } from "../components/DroppableWeatherImages";

const items = [
  {
    id: "sunny",
    container: <img className="w-50 aspect-square rounded-xl" src={sunny} />,
    season: "sunny",
  },
  {
    id: "cloudy",
    container: <img className="w-50 aspect-square rounded-xl" src={cloudy} />,
    season: "cloudy",
  },
  {
    id: "rainy",
    container: <img className="w-50 aspect-square rounded-xl" src={rainy} />,
    season: "rainy",
  },
  {
    id: "windy",
    container: <img className="w-50 aspect-square rounded-xl" src={windy} />,
    season: "windy",
  },
  {
    id: "snowy",
    container: <img className="w-50 aspect-square rounded-xl" src={snowy} />,
    season: "snowy",
  },
  {
    id: "stormy",
    container: <img className="w-50 aspect-square rounded-xl" src={stormy} />,
    season: "stormy",
  },
];

const droppables = [
  { id: "sunny", tittle: "Sunny" },
  { id: "cloudy", tittle: "Cloudy" },
  { id: "rainy", tittle: "Rainy" },
  { id: "windy", tittle: "Windy" },
  { id: "snowy", tittle: "Snowy" },
  { id: "stormy", tittle: "Stormy" },
];

function shuffle<T>(list: T[]) {
  const next = [...list];

  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return next;
}

export const WeathersImagesPage = () => {
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
        <div className="flex flex-col items-center gap-20 p-8">
          <div className="flex gap-8">
            {droppables.map((droppable) => (
              <DroppableWeatherImages
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
              </DroppableWeatherImages>
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
