import { useDroppable } from "@dnd-kit/react";
import type { ReactNode } from "react";

interface Props {
  id: string | number;
  tittle: string;
  children: ReactNode;
  bgColor: string;
  textColor: string;
}

export function DroppableColorsIcons({
  id,
  tittle,
  children,
  bgColor,
  textColor,
}: Props) {
  const { ref } = useDroppable({
    id,
  });

  return (
    <div
      ref={ref}
      className={`relative min-h-50 w-100 ${bgColor} border-4 border-secondary rounded-xl flex flex-col p-4 overflow-hidden`}
    >
      <span
        className={`w-full h-10 text-center font-bold text-xl uppercase ${textColor}`}
      >
        {tittle}
      </span>

      <span className="grid grid-cols-3 gap-4 text-6xl">{children}</span>
    </div>
  );
}
