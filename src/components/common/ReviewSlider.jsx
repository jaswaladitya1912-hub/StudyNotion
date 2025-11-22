import React, { useEffect, useState, useRef } from "react";

const reviews = [
  { id: 1, name: "John Doe", review: "Amazing course!" },
  { id: 2, name: "Jane Smith", review: "Learned a lot!" },
  { id: 3, name: "Alice Johnson", review: "Highly recommend!" },
];

const ReviewSlider = () => {
  const [current, setCurrent] = useState(0);
  const slideInterval = useRef(null);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    slideInterval.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 3000); // 3 seconds
  };

  const stopAutoplay = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
  };

  return (
    <div className="w-full overflow-hidden relative">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 p-4"
          >
            <div className="flex flex-col items-center justify-center p-6 bg-richblack-700 rounded-lg h-full">
              <p className="text-white text-lg mb-2">"{review.review}"</p>
              <span className="text-yellow-50 font-semibold">{review.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 left-2 text-white bg-black/50 px-2 py-1 rounded"
        onClick={() =>
          setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length)
        }
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-2 text-white bg-black/50 px-2 py-1 rounded"
        onClick={() => setCurrent((prev) => (prev + 1) % reviews.length)}
      >
        Next
      </button>
    </div>
  );
};

export default ReviewSlider;
