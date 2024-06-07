type ChessPieceProps = {
  type: string;
  space: [number, number];
};

const ChessPiece = ({ type, space }: ChessPieceProps) => {
  return <div>{type}</div>;
};

export default ChessPiece;
