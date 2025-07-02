import Footer from "@/components/shared/Footer/Footer";
import NavBar from "@/components/shared/NavBar/NavBar";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <main>
      <NavBar />
      <div className="container p-6 min-h-[80vh] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
