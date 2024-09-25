import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  links: any[];
  style?: string;
};

export default function StickyBarSection({ links, style }: Props) {
  const router = useRouter();
  return (
    <div className={`sticky inset-x-0 top-0 z-20 border-b-2 bg-white ${style}`}>
      <div className="container-snap wrapper flex items-center overflow-x-scroll">
        {links.map((link: any) => (
          <Link
            rel="preload"
            key={`${link.name}`}
            href={`#${link.hash}`}
            className={`min-w-fit px-6 py-1.5 text-sm font-semibold tracking-wide transition-all hover:border-gray-200 hover:text-primary ${router.asPath.split("#")[1] === link.hash ? "border-b-[3px] border-primary" : ""}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
