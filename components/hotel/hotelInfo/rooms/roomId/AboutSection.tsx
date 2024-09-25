type Props = {
  roomType: string;
  roomInfo: string;
  roomDescription: string;
};

export default function AboutSection({
  roomType,
  roomInfo,
  roomDescription,
}: Props) {
  return (
    <div id="room-info" className="navLink rounded-2xl border-2">
      <div className="text-center font-bold text-secondary lg:text-left">
        <h2 className="mb-2 tracking-wider md:text-2xl md:font-bold md:leading-none">
          Room Info
        </h2>
        <div className="p-2 md:p-3">
          <h3 className="line-clamp-1 lg:text-xl">{roomType}</h3>
          <p className="lg:text-xl">{roomInfo}</p>
        </div>
        <p className="mt-1.5">{roomDescription}</p>
      </div>
    </div>
  );
}
