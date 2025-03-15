import PuzzleGame from '@/components/Puzzle/PuzzleGame';

export default function PuzzlePage({ params }: { params: { name: string } }) {
    return <PuzzleGame params={Promise.resolve(params)} />;
}