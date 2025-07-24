import React from "react";
import Image from "next/image";

export const InProgress: React.FC = () => {
    return (
        // Main container for the entire page, centered vertically and horizontally
        // Changed background gradient to a more subdued, professional look
        <div className="min-h-screen relative flex items-center justify-center bg-background">
            {/* Card-like container for the content, with rounded corners and shadow */}
            <div className="bg-white p-8 rounded-3xl shadow-2xl text-center max-w-md w-full">
                {/* Title text "Coming Soon" for a more professional tone */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
                    Coming Soon
                </h1>

                {/* Avatar image - using a more neutral placeholder for a mature audience */}
                <Image
                    src="https://placehold.co/200x200/3B82F6/ffffff.png?text=Site+Developer" // Neutral blue background with white text
                    alt="Professional avatar"
                    height={200}
                    width={200}
                    // Border color changed to a more professional blue
                    className="w-48 h-48 rounded-full mx-auto mb-8 border-4 border-blue-500 shadow-lg object-cover"
                    // Fallback in case the image fails to load
                    onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/200x200/cccccc/333333?text=Avatar+Error";
                        e.currentTarget.alt = "Image failed to load";
                    }}
                />

                {/* Descriptive text with a more formal message */}
                <p className="text-lg md:text-xl text-gray-600 mb-6">
                    This section is currently under development. Please check back shortly for updates.
                </p>

                {/* Removed the playful "That's all folks!" message */}
            </div>
        </div>
    );
};
