import Link from "next/link";

export default function Header(props) {
  return (
    <header className="w-full md:w-56">
      <nav
        role="navigation"
        aria-label="main navigation"
        className="flex md:justify-between justify-start flex-row md:flex-col h-full border-r-2 border-gray-200 bg-gray-100"
      >
        <Link href="/">
          <h1 className="text-3xl p-2 text-center">{props.siteTitle}</h1>
        </Link>
        <div>
          <Link href={`info`}>
            <h4 className="text-lg p-2">{`About`}</h4>
          </Link>
        </div>
      </nav>
    </header>
  );
}

