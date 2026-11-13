import { useDraggable } from "@dnd-kit/react";
import type { ReactNode } from "react";

interface Props {
  id: string;
  container: string | ReactNode;
}

export function Draggable({ id, container }: Props) {
  const { ref } = useDraggable({
    id,
  });

  return (
    <button className="drop-shadow-xl" ref={ref}>
      {container}
    </button>
  );
}
