'use client';
import { useRouter } from "next/navigation";
import useGallery from "@/hooks/useGallery";
import {availablePaints, paintNames} from "@/constants";

export default function HomePage() {
    const { gallery } = useGallery();
    const router = useRouter();

    const availableToday = availablePaints.filter(paint => {
        const item = gallery.find(i => i.name === paint);
        return !item;
    });

    const handleCollectNew = () => {
        if (availableToday.length === 0) return;
        const newPaint = availableToday[0];
        router.push(`/puzzle/${newPaint}`);
    };

    return (
        <div className="min-h-screen bg-plus-bg p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Моя галерея</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleCollectNew}
                            disabled={availableToday.length === 0}
                            className={`bg-plus-button text-white px-6 py-2 rounded-xl transition-colors ${
                                availableToday.length === 0
                                    ? 'opacity-50 cursor-not-allowed'
                                    : 'cursor-pointer hover:bg-plus-button-hover'
                            }`}
                        >
                            Собрать новую
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availablePaints.map((paint) => {
                        const item = gallery.find((i) => i.name === paint);
                        return (
                            <div
                                key={paint}
                                className="bg-white rounded-2xl p-4 shadow-plus-lg hover:shadow-plus-xl transition-shadow"
                            >
                                <div className="relative aspect-square mb-4">
                                    <img
                                        src={`/paints/${paint}/full.png`}
                                        alt={paint}
                                        className={`w-full h-full object-cover rounded-xl ${
                                            !item ? "opacity-50 blur-xs" : ""
                                        }`}
                                    />
                                    {!item && (
                                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
                                            <span className="text-white text-lg">Ещё не собрана</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold">
                                            {item? paintNames[paint as keyof typeof paintNames] || "???" : "???"}
                                        </h3>
                                        {item && (
                                            <p className="text-sm text-gray-500">
                                                Собрано: {new Date(item.collectedDate).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <div
                                        className="bg-gradient-to-r from-[#fd5a54] to-[#7649f1] text-white px-3 py-1 rounded-lg">
                                        {item ? `+${item.score} баллов` : "???"}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}