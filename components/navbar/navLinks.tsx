import {asideLinks, navLinks} from "@/lib/consts";
import Link from "next/link";

export default function NavLinks({setNavState, dashboard}: {setNavState: any; dashboard?: boolean}) {
  const links = dashboard ? asideLinks : navLinks;
  return (
    <div className="flex max-sm:flex-col items-center gap-3">
      {links.map((item, i) => (
        <Link
          href={item.href}
          key={i}
          className="link-underline text-nowrap max-sm:w-full max-sm:bg-gray-500 text-center p-2 rounded-lg"
          onClick={() => {
            setNavState(false);
          }}
        >
          {item.link}
        </Link>
      ))}
    </div>
  );
}
