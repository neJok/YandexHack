import PlusLogo from "@/components/Puzzle/PlusLogo";
import Image from "next/image";
import Link from "next/link";

export default function WinScreen({winScore, paintName}: {winScore: number, paintName: string}) {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="bg-white rounded-3xl p-8 shadow-plus-lg text-center max-w-md">
                <h1 className="text-4xl font-bold mb-6 text-plus-gradient">
                    Победа!
                </h1>
                <Image
                    src={`/paints/${paintName}/full.png`}
                    alt="Собранная картина"
                    className="object-contain mx-auto mb-6 rounded-lg"
                    width={200}
                    height={200}
                />
                <div className="bg-gradient-to-r from-[#fd5a54] to-[#7649f1] p-1 rounded-2xl mb-6">
                    <div className="bg-white rounded-xl p-4">
                        <div className="flex items-center justify-center gap-3">
                            <PlusLogo/>
                            <span className="text-2xl font-medium text-gray-800">
                                +{winScore} баллов
                            </span>
                        </div>
                    </div>
                </div>
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a
                    className="bg-plus-button hover:bg-plus-button-hover text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
                    href="/"
                >
                    Перейти в галерею
                </a>
            </div>
        </div>
    );
}