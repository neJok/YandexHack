import PuzzleGame from '@/components/Puzzle/PuzzleGame';

type pageParams = Promise<{ name: string }>;
export default function PuzzlePage({ params }: { params: pageParams }) {
    return <PuzzleGame params={Promise.resolve(params)} />;
}