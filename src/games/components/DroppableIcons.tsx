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
      className="relative min-h-60 w-100 border-4 border-secondary rounded-xl flex flex-col p-4 bg-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <span className="absolute -bottom-12 right-0 w-full h-10 text-center font-bold text-secondary text-2xl uppercase z-10 drop-shadow drop-shadow-white">
        {tittle}
      </span>
      <span className="grid grid-cols-3 gap-4 text-6xl">{children}</span>
    </div>
  );
}
