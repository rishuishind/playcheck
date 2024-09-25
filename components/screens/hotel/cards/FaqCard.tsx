type Props = {
  question: string;
  answer: string;
};

export default function FaqCard(props: Props) {
  return (
    <div className="py-1">
      <p className="text-secondary font-bold">Q. {props.question}</p>
      <p>{props.answer}</p>
    </div>
  );
}
