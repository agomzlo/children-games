import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

interface Props {
  id: string | number;
  tittle: string;
  children: ReactNode;
}

export function DroppableWeatherImages({ id, tittle, children }: Props) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className="min-h-70 min-w-60 border-4 border-secondary rounded-xl flex flex-col p-4 gap-2"
    >
      <span className="w-full h-10 text-center font-bold text-secondary text-2xl uppercase">
        {tittle}
      </span>
      <span className="size-full grid place-items-center">{children}</span>
    </div>
  );
}
