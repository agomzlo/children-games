import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

interface Props {
  id: string | number;
  tittle: string;
  children: ReactNode;
}

export function DroppableImages({ id, tittle, children }: Props) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className="w-80 min-h-60 border-4 border-secondary rounded-xl flex flex-col p-4"
    >
      <span className="w-full h-10 text-center font-bold text-secondary text-2xl uppercase">
        {tittle}
      </span>
      <span className="size-full grid place-items-center">{children}</span>
    </div>
  );
}
