import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Wallpaper from "../dataset/Wallpaper";

const Editor = ({ selectedImage, onClose, quote, setQuote, textColor, setTextColor }) => {
    const handleAddToStory = async () => {
        if (!quote.trim()) {
            alert("Please add a quote first!");
            return;
        }

        // Create canvas to overlay quote on image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.crossOrigin = "anonymous"; // In case of CORS issues with images

        img.onload = async () => {
            // Set canvas size to match image (adjust aspect ratio if needed)
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw the background image
            ctx.drawImage(img, 0, 0);

            // Style and draw the quote text (centered, semi-transparent background for readability)
            ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black bg for text
            ctx.fillRect(0, canvas.height / 2 - 60, canvas.width, 120); // Bg rectangle behind text

            ctx.fillStyle = textColor;
            ctx.font = "bold 48px sans-serif"; // Large, bold font (adjust size as needed)
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(quote, canvas.width / 2, canvas.height / 2);

            // Convert canvas to blob file
            canvas.toBlob(async (blob) => {
                const file = new File([blob], "quote-story.png", { type: "image/png" });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    try {
                        await navigator.share({
                            files: [file],
                            title: "Share to Instagram Story",
                            text: quote, // Optional: Pre-fill text if supported
                        });
                    } catch (error) {
                        if (error.name !== "AbortError") {
                            console.error("Share failed:", error);
                            alert("Sharing failed. Try saving the image and sharing manually.");
                        }
                    }
                } else {
                    // Fallback: Download the image
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "quote-story.png";
                    a.click();
                    URL.revokeObjectURL(url);
                    alert("Image downloaded! Open it and share to Instagram Stories manually.");
                }
            }, "image/png");
        };

        img.src = selectedImage;
    };

    return (
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                    className="fixed inset-0 z-20 flex items-center justify-center bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Background image */}
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${selectedImage})` }}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    ></motion.div>

                    {/* Overlay content */}
                    <motion.div
                        className="relative z-30 w-4/5 max-w-md flex flex-col items-center space-y-4"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Color controls */}
                        <div className="flex items-center space-x-2">
                            {["white", "black", "red", "yellow", "blue", "green", "purple"].map((color) => (
                                <button
                                    key={color}
                                    className="w-6 h-6 rounded-full border-2 border-white"
                                    style={{ backgroundColor: color, borderColor: textColor === color ? "black" : "white" }}
                                    onClick={() => setTextColor(color)}
                                ></button>
                            ))}
                        </div>

                        {/* Quote input */}
                        <textarea
                            value={quote}
                            onChange={(e) => setQuote(e.target.value)}
                            placeholder="Write your quote..."
                            style={{ color: textColor }}
                            className="w-full p-3 text-base placeholder:text-gray tracking-tight rounded-2xl border border-gray-700 shadow-sm bg-white/10 backdrop-blur-sm focus:outline-none resize-none font-light"
                            rows={4}
                        />

                        {/* Buttons */}
                        <div className="justify-end flex w-full space-x-2">
                            <button
                                onClick={onClose}
                                className="px-3 py-2 bg-white text-red-500 rounded-xl text-sm shadow hover:bg-red-600 hover:text-white transition"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleAddToStory}
                                className="px-3 py-2 bg-dark text-white rounded-xl text-sm shadow transition"
                            >
                                Add to Story
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const MobileView = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [quote, setQuote] = useState("");
    const [textColor, setTextColor] = useState("white");

    return (
        <div className="p-2">
            {/* Editor with animation */}
            <Editor
                selectedImage={selectedImage}
                onClose={() => setSelectedImage(null)}
                quote={quote}
                setQuote={setQuote}
                textColor={textColor}
                setTextColor={setTextColor}
            />

            {/* Heading */}
            <div className="flex flex-col items-center space-y-3 my-16">
                <h1 className="text-center text-4xl font-bold tracking-tighter">
                    Insta Story Gallery
                </h1>
                <h3 className="tracking-tighter text-center">
                    Click the Image to Add your Quote and Share this Beautiful Quote On your Instagram Story!
                </h3>
            </div>

            {/* Masonry layout */}
            <div className="columns-2 gap-2">
                {Wallpaper.map((wallpaper, index) => (
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(wallpaper)}
                        key={index}
                        src={wallpaper}
                        alt={`wallpaper${index}`}
                        className="mb-2 w-full rounded-xl object-cover cursor-pointer hover:opacity-90 transition"
                    />
                ))}
            </div>
        </div>
    );
};

export default MobileView;