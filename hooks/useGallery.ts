import { useState } from "react";

type GalleryItem = {
    name: string;
    collectedDate: Date;
    score: number;
};

export default function useGallery() {
    const [gallery, setGallery] = useState<GalleryItem[]>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("gallery");
            return saved ? JSON.parse(saved) : [];
        }
        return [];
    });

    const canCollect = (name: string) => {
        const item = gallery.find((i) => i.name === name);
        if (!item) return true;
        const lastDate = new Date(item.collectedDate);
        const today = new Date();
        return lastDate.toDateString() !== today.toDateString();
    };

    const addToGallery = (name: string, score: number) => {
        const newItem = {
            name,
            score,
            collectedDate: new Date(),
        };

        setGallery(prev => {
            const newGallery = [...prev.filter(i => i.name !== name), newItem];
            localStorage.setItem("gallery", JSON.stringify(newGallery));
            return newGallery;
        });
    };

    const resetPeriod = () => {
        setGallery(prev => {
            const newGallery = prev.map(item => ({
                ...item,
                collectedDate: new Date(0), // Сброс даты
            }));
            localStorage.setItem("gallery", JSON.stringify(newGallery));
            return newGallery;
        });
    };

    return { gallery, addToGallery, canCollect, resetPeriod };
}