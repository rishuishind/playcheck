import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Review {
  review_id: string;
  Rooms: number;
  Service: number;
  Location: number;
}

interface Props {
  reviews: Review[];
}

export default function RatingProgress({ reviews }: Props) {
  const [roomAverage, setRoomAverage] = useState<number>(0);
  const [serviceAverage, setServiceAverage] = useState<number>(0);
  const [locationAverage, setLocationAverage] = useState<number>(0);

  useEffect(() => {
    const calculateAverages = () => {
      const sumRooms = reviews.reduce((acc, review) => acc + review.Rooms, 0);
      const sumService = reviews.reduce(
        (acc, review) => acc + review.Service,
        0,
      );
      const sumLocation = reviews.reduce(
        (acc, review) => acc + review.Location,
        0,
      );

      const avgRooms = sumRooms / reviews.length;
      const avgService = sumService / reviews.length;
      const avgLocation = sumLocation / reviews.length;

      setRoomAverage(avgRooms);
      setServiceAverage(avgService);
      setLocationAverage(avgLocation);
    };

    calculateAverages();
  }, [reviews]);

  const percentage = 66;

  return (
    <div className="racking-wide flex justify-center text-sm lg:text-base space-x-8 mb-2">
      <div className="h-16 w-16 text-center">
        <CircularProgressbar
          className="font-bold"
          value={(roomAverage / 5) * 100}
          text={`${roomAverage.toFixed(1)}`}
          styles={buildStyles({
            pathColor: `#005250`,
            textColor: "#000000",
            trailColor: "#ccc",
            backgroundColor: "#000",
          })}
        />
        <p className="mt-1">Room</p>
      </div>
      <div className="h-16 w-16 text-center">
        <CircularProgressbar
          className="font-bold"
          value={(serviceAverage / 5) * 100} // Convert average rating to percentage
          text={`${serviceAverage.toFixed(1)}`}
          styles={buildStyles({
            pathColor: `#005250`,
            textColor: "#000000",
            trailColor: "#ccc",
            backgroundColor: "#000",
          })}
        />
        <p className="mt-1">Service</p>
      </div>
      <div className="h-16 w-16 text-center">
        <CircularProgressbar
          className="font-bold"
          value={(locationAverage / 5) * 100} // Convert average rating to percentage
          text={`${locationAverage.toFixed(1)}`}
          styles={buildStyles({
            pathColor: `#005250`,
            textColor: "#000000",
            trailColor: "#ccc",
            backgroundColor: "#000",
          })}
        />
        <p className="mt-1">Location</p>
      </div>
    </div>
  );
}
