"use client";
import { useState } from "react";

// List of placeholder images and titles
const images = [
  "https://d32621zbwb3biu.cloudfront.net/newone/2/0.01132974034829548/image.jpg",
  "https://d32621zbwb3biu.cloudfront.net/newone/2/0.7875061231755107/image.jpg",
  "https://d32621zbwb3biu.cloudfront.net/newone/2/0.06219873044874058/image.jpg",
  "https://d32621zbwb3biu.cloudfront.net/newone/2/0.5348828204882243/image.jpg",
  "https://d32621zbwb3biu.cloudfront.net/newone/2/0.647398607212359/image.jpg",
  "https://d32621zbwb3biu.cloudfront.net/newone/2/0.6041646860528629/image.jpg",
];

const titles = [
  "Task 1: Select the best thumbnail for ML",
  "Task 2: Select the best pic",
  "Task 3: Select the best cat pic",
];

export const NextTask = () => {
  const [iterationCount, setIterationCount] = useState(0);

  const handleImageClick = () => {
    setIterationCount((count) => count + 1);
  };

  if (iterationCount >= 3) {
    // Display "no tasks" after three iterations
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="text-2xl">There are no pending tasks at the moment</div>
      </div>
    );
  }

  // Display two different images for each iteration
  const startIndex = iterationCount * 2;
  const displayImages = images.slice(startIndex, startIndex + 2);
  const currentTitle = titles[iterationCount];

  return (
    <div>
      <div className="text-2xl pt-20 flex justify-center">{currentTitle}</div>
      <div className="flex justify-center pt-8">
        {displayImages.map((imageUrl, index) => (
          <Option key={index} imageUrl={imageUrl} onSelect={handleImageClick} />
        ))}
      </div>
    </div>
  );
};

function Option({
  imageUrl,
  onSelect,
}: {
  imageUrl: string;
  onSelect: () => void;
}) {
  return (
    <div>
      <img
        onClick={onSelect}
        className="p-2 w-96 rounded-md cursor-pointer"
        src={imageUrl}
        alt="placeholder"
      />
    </div>
  );
}
