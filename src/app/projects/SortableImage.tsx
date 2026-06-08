"use client";

import {
  useSortable,
} from "@dnd-kit/sortable";

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
    id: image,
  });

  const style = {
    transform:
      CSS.Transform.toString(
        transform
      ),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        relative
        cursor-grab
      "
    >
      <img
        src={image}
        alt=""
        className="
          w-full
          h-32
          object-cover
          rounded-lg
          border
        "
      />

      <div
        className="
          absolute
          top-2
          left-2
          bg-black
          text-white
          px-2
          py-1
          rounded
          text-xs
        "
      >
        #{index + 1}
      </div>

      <button
        type="button"
        onClick={() =>
          onDelete(index)
        }
        className="
          absolute
          top-2
          right-2
          bg-red-600
          text-white
          w-8
          h-8
          rounded-full
        "
      >
        ×
      </button>
    </div>
  );
}