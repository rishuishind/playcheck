import Image from "next/image";

export default function FallbackImage() {
  return (
    <Image
      src={"/fallback_image.jpg"}
      alt={"fallback_image"}
      fill
      priority
      className="object-cover"
    />
  );
}
