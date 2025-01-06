"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "tailwindcss/tailwind.css";

interface NavItemInterface {
  url: string;
  label: string;
}

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const items: NavItemInterface[] = [
    { url: "/", label: "Inicio" },
    { url: "/about", label: "Sobre" },
    { url: "/services", label: "Serviços" },
    { url: "/blog", label: "Blog" },
    { url: "/contact", label: "Contacto" },
  ];

  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-slate-600 shadow-xl">
      <nav className="flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/globe.svg"
            alt="Logo"
            width={50}
            height={50}
            className="max-w-60 h-full object-cover"
          />
        </Link>

        {/* Botão Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16m-7 6h7"
                }
              ></path>
            </svg>
          </button>
        </div>

        {/* Overlay e Menu Hambúrguer */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>
        )}
        <div
          className={`fixed top-0 left-0 bg-white shadow-lg transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-50`}
          style={{
            width: "200px", // Largura mais compacta
            height: `${items.length * 50}px`, // Altura ajustada para 50px por item
          }}
        >
          <button
            onClick={closeMenu}
            className="text-gray-800 absolute top-4 right-4 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          {/* Itens do Menu Mobile */}
          <ul className="flex flex-col gap-4 p-6">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className={`block text-lg font-medium ${
                    pathname === item.url ? "text-blue-500" : "text-gray-700"
                  } hover:text-blue-700`}
                  onClick={closeMenu} // Fecha o menu ao clicar no link
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex md:items-center">
          <ul className="flex gap-8 items-center">
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className={`text-white text-lg ${
                    pathname === item.url ? "font-bold" : "font-normal"
                  } hover:text-blue-300`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
