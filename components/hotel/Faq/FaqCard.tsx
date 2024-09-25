type Props = {
  question: string;
  answer: string;
};

export default function FaqCard({ question, answer }: Props) {
  return (
    <div className="py-1">
      <h3 className="text-sm font-semibold text-secondary">Q. {question}</h3>
      <h4 className="text-justify text-sm">Ans. {answer}</h4>
    </div>
  );
}
