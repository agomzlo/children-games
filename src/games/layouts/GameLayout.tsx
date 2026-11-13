import { Outlet } from "react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export const GameLayout = () => {
  return (
    <div className="max-h-screen h-screen overflow-hidden flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
