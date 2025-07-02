import { Link, NavLink } from "react-router";
import Nl from "@/assets/nano_library_logo.svg";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { ChartBar } from "lucide-react";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import { navLinks } from "@/lib/constants";

export default function NavBar() {
  const [position, setPosition] = useState<string>(() => "");

  return (
    <header className="flex justify-between items-center p-6 bg-secondary">
      <div>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Nl} alt="logo" width={32} height={32} />
          <h2 className="text-2xl text-green-600 font-medium">Nano_Library</h2>
        </Link>
      </div>
      <nav className="flex items-center gap-4">
        <div className="hidden md:block">
          <ul className="flex items-center gap-4">
            {navLinks.map(({ name, link }) => (
              <li key={link}>
                <NavLink to={link}>
                  <Button variant={"outline"}>{name}</Button>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* Nav buttons for small devices */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ChartBar />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="max-w-52">
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                {navLinks.map(({ name, link }) => (
                  <DropdownMenuRadioItem value={name} key={link}>
                    <NavLink to={link}>{name}</NavLink>
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <ModeToggle />
      </nav>
    </header>
  );
}
