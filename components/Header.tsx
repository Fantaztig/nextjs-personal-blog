import Link from "next/link";

export default function Header(props) {
  return (
    <header className="w-full md:w-56">
      <nav
        role="navigation"
        aria-label="main navigation"
        className="sticky flex md:justify-between justify-start flex-row md:flex-col h-full border-r-2 border-ruuk-gray bg-ruuk-gray-200"
      >
        <Link href="/">
          <a>
            <h1 className="text-3xl p-2 text-center">{props.siteTitle}</h1>
          </a>
        </Link>
        <div>
          <Link href="/info">
            <a>
              <h4 className="text-lg p-2">About</h4>
            </a>
          </Link>
        </div>
      </nav>
    </header>
  );
}
