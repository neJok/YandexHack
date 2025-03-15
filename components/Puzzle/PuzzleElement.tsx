"use client";

export default function PuzzleElement({ paintName, frameIndex, rotate, onRotate, transitionDuration }: { paintName: string, frameIndex: number, rotate: number, onRotate: () => void, transitionDuration: string }) {
    return (
        <div
            className={`rounded-3xl select-none cursor-pointer bg-white items-center justify-center text-black flex w-full h-full`}
            style={{ transform: `rotate(${rotate}deg)`, transition: `transform ${transitionDuration} ease-in-out`}}
            onClick={onRotate}
        >
            <img src={`/paints/${paintName}/${frameIndex}.png`} alt="paint frame" className="rounded-2xl" />
        </div>
    );
}