import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

interface Props {
  id: string | number;
  tittle: string;
  children: ReactNode;
  bgImage: string;
}

export function DroppableIcons({ id, tittle, children, bgImage }: Props) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className="relative min-h-60 w-100 border-4 border-secondary rounded-xl flex flex-col p-4 overflow-hidden"
    >
      <img className="absolute inset-0 opacity-50" src={bgImage} alt="" />
      <span className="w-full h-10 text-center font-bold text-secondary text-2xl uppercase z-10">
        {tittle}
      </span>
      <span className="grid grid-cols-3 gap-4 text-6xl">{children}</span>
    </div>
  );
}
