"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  image: string;
  index: number;
  onDelete: (index: number) => void;
}

export default function SortableImage({
  image,
  index,
  onDelete,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: `${index}-${image}`,
  });

  const style = {
    transform: CSS.Transform.toString(
      transform
    ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative"
    >
      <img
        src={image}
        alt={`Image ${index + 1}`}
        className="
          w-full
          h-32
          object-cover
          rounded-lg
          border
          select-none
        "
      />

      {/* Position Badge */}
      <div
        className="
          absolute
          top-2
          left-2
          bg-black/80
          text-white
          px-2
          py-1
          rounded
          text-xs
          z-10
        "
      >
        #{index + 1}
      </div>

      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="
          absolute
          bottom-2
          left-2
          bg-black
          text-white
          px-3
          py-1
          rounded
          text-xs
          cursor-grab
          active:cursor-grabbing
          z-10
          select-none
        "
      >
        Drag
      </div>

      {/* Delete Button */}
      <button
        type="button"
        onPointerDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(index);
        }}
        className="
          absolute
          top-2
          right-2
          bg-red-600
          hover:bg-red-700
          text-white
          w-8
          h-8
          rounded-full
          flex
          items-center
          justify-center
          z-20
        "
      >
        ×
      </button>
    </div>
  );
}