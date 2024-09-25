import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/solid";

export default function Breadcrumbs() {
  const router = useRouter();
  const paths = router.asPath.split("/");

  const breadcrumbs = paths.map((path, index) => {
    const href = `${paths.slice(0, index + 1).join("/")}`;
    if (index === 0) {
      return { label: "home", href: "/" };
    } else {
      return {
        // label: path.charAt(0).toUpperCase() + path.slice(1), // use when you need cpaitalized first word
        label: path,
        href,
      };
    }
  });

  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-3">
        {breadcrumbs.map((link, index) => {
          return (
            <Fragment key={link.href}>
              <li>
                <Link
                  title={`${link.label} link`}
                  href={link.href}
                  className={`text-neutral-400 hover:text-neutral-500`}
                >
                  {link.label}
                </Link>
              </li>
              {index < breadcrumbs.length - 1 && (
                <ChevronRightIcon className="max-w-4 max-h-4 font-semibold fill-neutral-400" />
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
