"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AxiosInstance from "../Components/AxiosInstance";

export default function Media() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories] = useState([
    { id: "general", name: "Photos" },
    { id: "paper-cut", name: "Paper Cutting" },
  ]);

  // Split images into chunks of 7
  const chunkArray = (arr, size = 7) =>
    arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await AxiosInstance.get("gallery/");
        let fetched = response.data;

        if (selectedCategory) {
          fetched = fetched.filter((img) => img.type === selectedCategory);
        }
        fetched.sort((a, b) => b.id - a.id);

        const transformed = fetched.map((img) => ({
          id: img.id,
          src: img.image,
          caption: img.caption,   // <-- add this
        }));

        console.log("transformed", transformed)

        setImages(transformed);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [selectedCategory]);

  const imageChunks = chunkArray(images);

  return (
    <div className="md:px-4 py-6">
      <div className="mx-4 flex items-center justify-center mb-2">

  <div className="flex-1 text-center">
    <h1 className="text-2xl font-bold text-blue-800">Photo Gallery</h1>
  </div>

        <div className="flex justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-slate-400 p-2 rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {imageChunks.map((chunk, index) => (
        <div
          key={index}
          className="relative aspect-[3/4] md:aspect-[3/3] overflow-hidden grid grid-cols-6 grid-rows-6 gap-2 p-2"
        >
          {chunk.map((img, i) => (
            <div
              key={img.id}
              className={`relative ${i === 0
                ? "col-span-3 row-span-2"
                : i === 1
                  ? "col-span-3 row-span-2"
                  : i === 2
                    ? "col-span-2 row-span-2"
                    : i === 3
                      ? "col-span-2 row-span-2"
                      : i === 4
                        ? "col-span-2 row-span-2"
                        : i === 5
                          ? "col-span-4 row-span-2"
                          : i === 6
                            ? "col-span-2 row-span-2"
                            : ""
                }`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, zIndex: 10 }}
                className="w-full h-full relative flex flex-col"
                style={{ position: 'relative' }}
              >
                <img
                  src={img.src}
                  alt={`Image ${img.id}`}
                  className="w-full h-[90%] object-cover rounded-lg"
                />
                <p className="mt-1 mb-1 text-center text-sm text-gray-600 line-clamp-2">
                  {img.caption || "No caption"}
                </p>
              </motion.div>

            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
