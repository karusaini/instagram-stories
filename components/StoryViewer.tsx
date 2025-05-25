"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface Story {
  id: number;
  image: string;
  caption: string;
  duration: number;
  user: {
    name: string;
    profilePic: string;
  };
}

export default function StoryViewer() {
  const [stories, setStories] = useState<Story[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      const res = await fetch("/stories.json");
      const data = await res.json();
      setStories(data);
    };

    fetchStories();
  }, []);

  useEffect(() => {
    if (stories.length === 0) return;

    const currentStory = stories[currentIndex];
    timeoutRef.current = setTimeout(() => {
      nextStory();
    }, currentStory.duration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, stories]);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1 < stories.length ? prev + 1 : 0));
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : stories.length - 1));
  };

  if (stories.length === 0)
    return <div className="text-center mt-10">Loading...</div>;

  const story = stories[currentIndex];

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center p-4">
      <div className="relative w-[320px] h-[600px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={story.image}
          alt="story"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />

        {/* Top Progress Bar */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-10">
          {stories.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                i < currentIndex
                  ? "bg-white"
                  : i === currentIndex
                  ? "bg-white/80"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Left / Right Tap for navigation */}
        <div className="absolute inset-0 flex z-10">
          <div onClick={prevStory} className="w-1/2 h-full" />
          <div onClick={nextStory} className="w-1/2 h-full" />
        </div>

        {/* User Info */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full z-10">
          <Image
            src={story.user.profilePic}
            alt="user"
            width={30}
            height={30}
            className="rounded-full"
          />
          <div className="text-white text-sm font-medium">
            {story.user.name}
          </div>
        </div>

        {/* Caption */}
        <div className="absolute bottom-6 left-4 right-4 text-white text-lg bg-black/40 px-4 py-2 rounded-lg z-10">
          {story.caption}
        </div>
      </div>
    </div>
  );
}
