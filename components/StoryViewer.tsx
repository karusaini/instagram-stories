"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

type Story = {
  id: number;
  image: string;
};

export default function StoryViewer({
  stories,
  currentIndex,
  onClose,
  onChangeIndex,
}: {
  stories: Story[];
  currentIndex: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (currentIndex < stories.length - 1) {
            onChangeIndex(currentIndex + 1);
          } else {
            onClose();
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleTap = (e: React.MouseEvent) => {
    const x = e.nativeEvent.offsetX;
    if (x < window.innerWidth / 2 && currentIndex > 0) {
      onChangeIndex(currentIndex - 1);
    } else if (
      x >= window.innerWidth / 2 &&
      currentIndex < stories.length - 1
    ) {
      onChangeIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black z-50 flex flex-col"
      onClick={handleTap}
    >
      {/* Progress bars */}
      <div className="flex space-x-1 p-3 pt-6">
        {stories.map((_, i) => (
          <div
            key={i}
            className={clsx(
              "h-1 rounded-full flex-1 overflow-hidden bg-white/30",
              i === currentIndex && "bg-white"
            )}
          >
            {i === currentIndex && (
              <div
                className="h-full bg-white transition-all duration-100 linear"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Story image */}
      <img
        src={stories[currentIndex].image}
        alt="story"
        className="flex-grow object-cover"
        style={{ userSelect: "none" }}
      />
    </div>
  );
}
