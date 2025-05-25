"use client";

import { useEffect, useState } from "react";
import StoryViewer from "@/components/StoryViewer";
import StoryThumbnails from "@/components/StoryThumbnails";

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

export default function HomePage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [showViewer, setShowViewer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await fetch("/stories.json");
        const data = await res.json();
        setStories(data);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };

    fetchStories();
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
    <main className="bg-black min-h-screen text-white px-4 py-6">
      <h1 className="text-center text-xl font-bold mb-4">
        Instagram Stories Clone
      </h1>

      {/* Horizontal Story Thumbnails */}
      <StoryThumbnails
        stories={stories}
        onSelect={openViewer}
        activeIndex={currentIndex}
      />

      {/* Story Viewer */}
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
