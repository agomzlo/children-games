import { Link, useLocation, useSearchParams } from "react-router";

export const Footer = () => {
  const paths = [
    "/numbers/one-to-five",
    "/numbers/six-to-ten",
    "/seasons/images",
    "/seasons/icons",
    // "/colors/names",
    "/colors/icons",
    "/weathers/images",
    "/hygiene/images",
    "/finish",
  ];
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const completed = searchParams.get("completed");

  const prevPath = () => {
    if (Number(paths.indexOf(pathname)) === 0) return "/";
    return paths[Number(paths.indexOf(pathname) - 1)];
  };

  const nextPath = () => {
    if (Number(paths.indexOf(pathname)) >= paths.length - 1)
      return paths[Number(paths.length - 1)];
    return paths[Number(paths.indexOf(pathname) + 1)];
  };

  const showNextButton = () => {
    return (
      (pathname !== paths[Number(paths.length - 1)] && completed === "true") ||
      pathname === "/"
    );
  };

  console.log(showNextButton());

  return (
    <footer
      className={`flex flex-row ${pathname === "/" ? "justify-end" : "justify-between"} p-4 mt-auto bg-background`}
    >
      {pathname !== "/" && (
        <Link
          to={prevPath()}
          className="px-8 py-2 flex flex-row items-center rounded-xl font-semibold text-2xl cursor-pointer bg-secondary/75 text-primary/75 hover:bg-secondary hover:text-primary"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left preview-icon"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Prev
        </Link>
      )}
      {showNextButton() && (
        <Link
          to={nextPath()}
          className="px-8 py-2 flex flex-row items-center rounded-xl font-semibold text-2xl cursor-pointer bg-secondary/75 text-primary/75 hover:bg-secondary hover:text-primary"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right preview-icon"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      )}
    </footer>
  );
};
