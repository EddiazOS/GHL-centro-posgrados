import React from "react";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="bg-black text-white pt-16 pb-12 px-4 md:px-8 lg:px-16 border-t-[10px] border-[#f1b434]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/* Logos */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
          <img
            src="https://vibe.filesafe.space/1787862407256452737/attachments/ee0af3c1-26b8-4da3-badd-d1c59dcf7269.png"
            alt="Universidad de Cartagena - Centro de Posgrados"
            className="h-20 md:h-28 object-contain"
          />
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-5xl">
          {/* Column 1: Social Media */}
          <div className="flex flex-col items-start md:items-center text-left md:text-left">
            <div className="w-full max-w-[250px]">
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">
                REDES SOCIALES
              </h3>
              <div className="space-y-4 text-sm text-gray-300">
                <p>Centro de Posgrados</p>
                <a
                  href="#"
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@posgrados_unicartagena</span>
                </a>
                <p>Centro de Posgrados Unictg</p>
              </div>
            </div>
          </div>

          {/* Column 2: Location */}
          <div className="flex flex-col items-start md:items-center text-left md:text-left relative">
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px bg-white/30 -ml-6"></div>
            <div className="w-full max-w-[250px]">
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">
                UBICACIÓN
              </h3>
              <div className="space-y-4 text-sm text-gray-300">
                <p>Claustro La Merced</p>
                <p>Centro Histórico, Cra. 4 #38-40</p>
                <p>Cartagena de Indias, Colombia</p>
              </div>
            </div>
            <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-white/30 -mr-6"></div>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col items-start md:items-center text-left md:text-left">
            <div className="w-full max-w-[250px]">
              <h3 className="text-lg font-bold mb-6 uppercase tracking-wider">
                CONTÁCTO
              </h3>
              <div className="space-y-4 text-sm text-gray-300">
                <a
                  href="mailto:postgrado@unicartagena.edu.co"
                  className="block hover:text-white transition-colors"
                >
                  postgrado@unicartagena.edu.co
                </a>
                <a
                  href="mailto:comercialposgrado@unicartagena.edu.co"
                  className="block hover:text-white transition-colors"
                >
                  comercialposgrado@unicartagena.edu.co
                </a>
                <p className="pt-2">300 667 6830 - 301 751 1512</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
