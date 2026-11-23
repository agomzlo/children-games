import { useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { Draggable } from "../components/Draggable";
import confetti from "@hiseb/confetti";
import brushYourTeethAction from "../../assets/hygiene/brush-your-teeth-action.jpeg";
import washYourHandsAction from "../../assets/hygiene/wash-your-hands-action.jpeg";
import brushYourHairAction from "../../assets/hygiene/brush-your-hair-action.jpeg";
import dryWithTowelAction from "../../assets/hygiene/dry-with-a-towel-action.jpeg";
import brushYourTeethObject from "../../assets/hygiene/brush-your-teeth-object.jpeg";
import washYourHandsObject from "../../assets/hygiene/wash-your-hands-object.jpeg";
import brushYourHairObject from "../../assets/hygiene/brush-your-hair-object.jpeg";
import dryWithTowelObject from "../../assets/hygiene/dry-with-a-towel-object.jpeg";
import { useSearchParams } from "react-router";
import { DroppableHygieneImages } from "../components/DroppableHygieneImages";

const items = [
  {
    id: "brushYourTeeth",
    container: (
      <img
        className="w-80 aspect-video rounded-xl"
        src={brushYourTeethAction}
      />
    ),
    season: "brushYourTeeth",
  },
  {
    id: "washYourHands",
    container: (
      <img className="w-80 aspect-video rounded-xl" src={washYourHandsAction} />
    ),
    season: "washYourHands",
  },
  {
    id: "brushYourHair",
    container: (
      <img className="w-80 aspect-video rounded-xl" src={brushYourHairAction} />
    ),
    season: "brushYourHair",
  },
  {
    id: "dryWithTowel",
    container: (
      <img className="w-80 aspect-video rounded-xl" src={dryWithTowelAction} />
    ),
    season: "dryWithTowel",
  },
];

const droppables = [
  {
    id: "brushYourTeeth",
    tittle: "Brush Your Teeth",
    bgImage: brushYourTeethObject,
  },
  {
    id: "washYourHands",
    tittle: "Wash Your Hands",
    bgImage: washYourHandsObject,
  },
  {
    id: "brushYourHair",
    tittle: "Brush Your Hair",
    bgImage: brushYourHairObject,
  },
  {
    id: "dryWithTowel",
    tittle: "Dry With A Towel",
    bgImage: dryWithTowelObject,
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

export const PersonalHygienePage = () => {
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
              <DroppableHygieneImages
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
              </DroppableHygieneImages>
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
