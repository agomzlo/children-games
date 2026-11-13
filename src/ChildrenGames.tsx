import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

export const ChildrenGames = () => {
  return <RouterProvider router={appRouter} />;
};
