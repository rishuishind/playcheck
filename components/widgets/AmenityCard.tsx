import React from "react";
import Image from "next/image";
import { useSpring, animated } from "react-spring";

type Props = {
  amenityDetail: any;
};

export default function AmenityCard(props: Props) {
  const calc = (x: any, y: any) => [
    -(y - window.innerHeight / 2) / 20,
    (x - window.innerWidth / 2) / 20,
    1,
  ];
  const trans = (x: any, y: any, s: any) =>
    `prespective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;
  const [hoverEffect, setHoverEffect] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 10, tension: 200, friction: 50 },
  }));
  return (
    <>
      <animated.div
        onMouseMove={({ clientX: x, clientY: y }) =>
          setHoverEffect({ xys: calc(x, y) })
        }
        onMouseLeave={() => setHoverEffect({ xys: [0, 0, 1] })}
        style={{ transform: hoverEffect.xys.interpolate(trans) }}
        className={`relative w-full lg:w-1/3 flex flex-col items-center align-middle whitespace-nowrap border-2 border-red-500 rounded-b-full p-5 cursor-pointer`}
      >
        <div className={`pb-4`}>
          <h1 className={`text-3xl text-center text-red-500`}>
            {props.amenityDetail.name}
          </h1>
        </div>
        <div
          className={`relative w-screen sm:w-[300px] md:w-[400px] h-[250px]`}
        >
          <Image
            src={
              props.amenityDetail.image_Src
                ? props.amenityDetail.image_Src
                : "/fallback_image.jpg"
            }
            alt="icon"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
            className={`rounded-lg drop-shadow-xl`}
          />
        </div>
      </animated.div>
    </>
  );
}
