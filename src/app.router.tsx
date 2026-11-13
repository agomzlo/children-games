import { createBrowserRouter } from "react-router";
import { GameLayout } from "./games/layouts/GameLayout";
import { HomePage } from "./games/pages/HomePage";
import { ColorsIconsPage } from "./games/pages/ColorsIconsPage";
import { NumbersOneToFivePage } from "./games/pages/NumbersOneToFivePage";
import { NumbersSixToTenPage } from "./games/pages/NumbersSixToTenPage";
import { SeasonsIconsPage } from "./games/pages/SeasonsIconsPage";
import { SeasonsImagesPage } from "./games/pages/SeasonsImagesPage";
import { ColorsNamesPage } from "./games/pages/ColorsNamesPage";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <GameLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "colors/names",
        element: <ColorsNamesPage />,
      },
      {
        path: "colors/icons",
        element: <ColorsIconsPage />,
      },
      {
        path: "numbers/one-to-five",
        element: <NumbersOneToFivePage />,
      },
      {
        path: "numbers/six-to-ten",
        element: <NumbersSixToTenPage />,
      },
      {
        path: "seasons/images",
        element: <SeasonsImagesPage />,
      },
      {
        path: "seasons/icons",
        element: <SeasonsIconsPage />,
      },
    ],
  },
]);
