"use client";

type Story = {
  id: number;
  image: string;
};

export default function StoryThumbnails({
  stories,
  onSelect,
  activeIndex,
}: {
  stories: Story[];
  onSelect: (index: number) => void;
  activeIndex: number;
}) {
  return (
    <div className="flex space-x-3 overflow-x-auto px-4 py-3 bg-black">
      {stories.map((story, index) => (
        <button
          key={story.id}
          onClick={() => onSelect(index)}
          className={`relative flex-shrink-0 rounded-full w-16 h-16 border-4 ${
            index === activeIndex ? "border-pink-500" : "border-gray-700"
          } transition-colors duration-300 focus:outline-none`}
        >
          <img
            src={story.image}
            alt={`Story ${index + 1}`}
            className="rounded-full object-cover w-full h-full"
          />
        </button>
      ))}
    </div>
  );
}
