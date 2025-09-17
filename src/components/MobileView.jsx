import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Wallpaper from "../dataset/Wallpaper";

const Editor = ({ selectedImage, onClose, quote, setQuote, textColor, setTextColor }) => {
    return (
        <AnimatePresence>
            {selectedImage && (
                <motion.div
                    className="fixed inset-0 z-20 flex items-center justify-center bg-black/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.7 }}
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
                                onClick={onClose}
                                className="px-3 py-2 bg-dark text-white rounded-xl text-sm shadow  transition"
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
