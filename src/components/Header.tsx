import { useState } from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { TYPE_LABELS, TYPE_SLUGS, FACULTIES, slugify } from "@/data/programs";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePosgradosOpen, setMobilePosgradosOpen] = useState(false);
  const [mobileFacultadesOpen, setMobileFacultadesOpen] = useState(false);

  const posgradoTypes = Object.keys(TYPE_SLUGS);

  return (
    <header className="relative z-50 flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-white border-b-8 border-black">
      {/* Decorative Yellow Shape Left */}
      <div className="absolute top-0 left-0 w-64 h-full pointer-events-none overflow-hidden">
        <svg
          viewBox="0 0 200 100"
          className="w-full h-full fill-primary"
          preserveAspectRatio="none"
        >
          <path d="M0,0 L200,0 C150,50 100,100 0,100 Z" />
          <path
            d="M0,0 L150,0 C100,30 50,80 0,100 Z"
            className="fill-white opacity-20"
          />
        </svg>
      </div>

      {/* Hashtag Outline Text */}
      <div
        className="relative z-10 hidden lg:block text-xl md:text-2xl font-black text-transparent tracking-wider"
        style={{
          WebkitTextStroke: "1.5px #0d9488",
          textShadow: "2px 2px 0px rgba(255,255,255,0.5)",
        }}
      >
        #IMPULSATUFUTURO
      </div>

      {/* Mobile Menu Button */}
      <button
        className="relative z-20 lg:hidden flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
        onClick={() => setMobileOpen(true)}
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Desktop Navigation Menu */}
      <div className="relative z-10 hidden lg:flex flex-1 justify-center">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to="/">Inicio</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Facultades</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[340px] gap-1 p-4 bg-white max-h-[420px] overflow-y-auto">
                  {FACULTIES.map((faculty) => (
                    <li key={faculty}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`/facultad/${slugify(faculty)}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-snug">
                            {faculty}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Posgrados</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[260px] gap-2 p-4 bg-white">
                  {posgradoTypes.map((type) => (
                    <li key={type}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`/tipo/${TYPE_SLUGS[type]}`}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">
                            {TYPE_LABELS[type]}
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Logo Section */}
      <div className="relative z-10 flex items-center">
        <img
          src="https://vibe.filesafe.space/1787862407256452737/attachments/185254b1-2dee-4231-8859-8d4099a44af7.png"
          alt="Universidad de Cartagena - Centro de Posgrados"
          className="h-10 sm:h-12 md:h-16 object-contain"
        />
      </div>

      {/* Mobile Menu Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[340px] p-0">
          <SheetHeader className="px-6 py-5 border-b bg-primary">
            <SheetTitle className="text-white text-lg font-bold">
              Menú
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col py-4">
            <Link
              to="/"
              className="px-6 py-4 text-base font-semibold text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100"
              onClick={() => setMobileOpen(false)}
            >
              Inicio
            </Link>
            <button
              className="flex items-center justify-between px-6 py-4 text-base font-semibold text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100"
              onClick={() => setMobileFacultadesOpen(!mobileFacultadesOpen)}
            >
              Facultades
              <ChevronDown
                className={`w-5 h-5 transition-transform ${mobileFacultadesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileFacultadesOpen && (
              <div className="bg-gray-50 border-b border-gray-100 max-h-[300px] overflow-y-auto">
                {FACULTIES.map((faculty) => (
                  <Link
                    key={faculty}
                    to={`/facultad/${slugify(faculty)}`}
                    className="block px-10 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobileFacultadesOpen(false);
                    }}
                  >
                    {faculty}
                  </Link>
                ))}
              </div>
            )}
            <button
              className="flex items-center justify-between px-6 py-4 text-base font-semibold text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100"
              onClick={() => setMobilePosgradosOpen(!mobilePosgradosOpen)}
            >
              Posgrados
              <ChevronDown
                className={`w-5 h-5 transition-transform ${mobilePosgradosOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobilePosgradosOpen && (
              <div className="bg-gray-50 border-b border-gray-100">
                {posgradoTypes.map((type) => (
                  <Link
                    key={type}
                    to={`/tipo/${TYPE_SLUGS[type]}`}
                    className="block px-10 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                    onClick={() => {
                      setMobileOpen(false);
                      setMobilePosgradosOpen(false);
                    }}
                  >
                    {TYPE_LABELS[type]}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
