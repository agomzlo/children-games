import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

interface Props {
  id: string | number;
  tittle: ReactNode | string;
  children: ReactNode;
}

export function DroppableNumbers({ id, tittle, children }: Props) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className="min-h-60 size-auto aspect-square border-4 border-secondary rounded-xl flex flex-col p-4 gap-2 overflow-hidden"
    >
      <span className="w-full h-10 text-center font-bold text-secondary text-4xl uppercase z-10">
        {tittle}
      </span>
      <span className="grid place-items-center">{children}</span>
    </div>
  );
}
