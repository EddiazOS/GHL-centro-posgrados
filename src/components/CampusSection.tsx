import React from "react";

const campuses = [
  {
    name: "Claustro La Merced",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/ba60b885-fbe2-4d17-bb47-e52865d2c673.png",
  },
  {
    name: "Claustro San Agustín",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/698619b4-3452-467b-8e8c-aa14539e7871.png",
  },
  {
    name: "Campus Piedra de Bolívar",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/88254f62-8e2a-4a58-ad0f-80464777e11a.png",
  },
  {
    name: "Campus de Zaragocilla",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/70821004-5087-4010-bde2-6e1d1352fe7e.png",
  },
  {
    name: "Campus San Pablo",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/1627a214-3cbf-4713-9fa4-15b1016ee8f6.png",
  },
];

export function CampusSection() {
  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-white">
      {/* Decorative yellow shapes - Top Left */}
      <div className="absolute top-0 left-0 w-[200px] h-[300px] bg-[#f1b434] rounded-full opacity-90 -translate-x-1/2 -translate-y-1/4 rotate-[-30deg] z-0" />
      <div className="absolute top-10 left-10 w-[100px] h-[300px] bg-white rounded-full opacity-20 -translate-x-1/2 -translate-y-1/4 rotate-[-30deg] z-0" />

      {/* Decorative yellow shapes - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-[150px] h-[400px] bg-[#f1b434] rounded-full opacity-90 translate-x-1/2 translate-y-1/4 rotate-45 z-0" />

      {/* Vertical Text Right */}
      <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center h-full z-0 pointer-events-none">
        <span
          className="text-[#519c98] text-4xl font-black tracking-[0.2em] opacity-40 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          #IMPULSATUFUTURO
        </span>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Purple Banner */}
        <div className="bg-[#4e2a5c] py-4 md:py-6 px-6 rounded-lg text-center mb-12 shadow-lg">
          <h2 className="text-white text-2xl md:text-4xl font-bold tracking-widest uppercase">
            CAMPUS
          </h2>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 md:mb-8">
          {campuses.slice(0, 3).map((campus, index) => (
            <div
              key={index}
              className="relative group overflow-hidden bg-gray-100 aspect-[4/3] shadow-md"
            >
              <img
                src={campus.image}
                alt={campus.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-0 right-0 text-center px-4 pointer-events-none">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide drop-shadow-md">
                  {campus.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 2 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {campuses.slice(3, 5).map((campus, index) => (
            <div
              key={index}
              className="relative group overflow-hidden bg-gray-100 aspect-[4/3] shadow-md"
            >
              <img
                src={campus.image}
                alt={campus.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-0 right-0 text-center px-4 pointer-events-none">
                <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold tracking-wide drop-shadow-md">
                  {campus.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
