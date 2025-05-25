import React, { useEffect, useState } from "react";

type Story = {
  id: number;
  image: string;
  caption: string;
  duration: number;
  user: {
    name: string;
    profilePic: string;
  };
};

type Props = {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
};

export default function StoryViewer({
  stories,
  currentIndex,
  onClose,
  onChangeIndex,
}: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onChangeIndex(currentIndex + 1);
          return 0;
        }
        return prev + 2;
      });
    }, stories[currentIndex]?.duration / 50 || 100); // 5000 ms over 50 ticks

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentStory = stories[currentIndex];

  if (!currentStory) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      {/* Close button */}
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        ✕
      </button>

      {/* Story */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img
          src={currentStory.image}
          alt={currentStory.caption}
          className="object-cover w-full h-full"
        />

        {/* Left and Right click zones */}
        <div
          className="absolute left-0 top-0 w-1/2 h-full cursor-pointer"
          onClick={() => onChangeIndex(currentIndex - 1)}
        />
        <div
          className="absolute right-0 top-0 w-1/2 h-full cursor-pointer"
          onClick={() => onChangeIndex(currentIndex + 1)}
        />
      </div>

      {/* Caption and User Info */}
      <div className="absolute bottom-8 text-white text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <img
            src={currentStory.user.profilePic}
            className="w-8 h-8 rounded-full"
            alt={currentStory.user.name}
          />
          <span>{currentStory.user.name}</span>
        </div>
        <p className="text-sm">{currentStory.caption}</p>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
