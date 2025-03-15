"use client";

export default function PuzzleElement({ paintName, frameIndex, rotate, onRotate }: { paintName: string, frameIndex: number, rotate: number, onRotate: () => void }) {
    return (
        <div
            className={`rounded-3xl select-none cursor-pointer bg-white items-center justify-center text-black flex w-full h-full transition-transform`}
            style={{ transform: `rotate(${rotate}deg)` }}
            onClick={onRotate}
        >
            <img src={`/${paintName}/${frameIndex}.png`} alt="paint frame" className="rounded-2xl" />
        </div>
    );
}