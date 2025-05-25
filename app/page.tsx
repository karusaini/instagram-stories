"use client";

import { useEffect, useState } from "react";
import StoryThumbnails from "@/components/StoryThumbnails";
import StoryViewer from "@/components/StoryViewer";

type Story = {
  id: number;
  image: string;
};

export default function Home() {
  const [stories, setStories] = useState<Story[]>([]);
  const [showViewer, setShowViewer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/stories.json")
      .then((res) => res.json())
      .then((data) => {
        // Optional: Validate that ids are unique
        const ids = data.map((story: Story) => story.id);
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
          console.warn("Warning: Duplicate story IDs detected!");
        }
        setStories(data);
      })
      .catch((err) => console.error("Failed to load stories:", err));
  }, []);

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setShowViewer(true);
  };

  const changeIndex = (index: number) => {
    if (index >= 0 && index < stories.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <main className="bg-black min-h-screen text-white">
      <h1 className="text-center text-lg font-bold py-4">
        Instagram Stories Clone
      </h1>

      <StoryThumbnails
        stories={stories}
        onSelect={openViewer}
        activeIndex={currentIndex}
      />

      {showViewer && stories.length > 0 && (
        <StoryViewer
          stories={stories}
          currentIndex={currentIndex}
          onClose={() => setShowViewer(false)}
          onChangeIndex={changeIndex}
        />
      )}
    </main>
  );
}
