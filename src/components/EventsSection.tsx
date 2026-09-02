import React from "react";

const events = [
  {
    title:
      "Desarrollo, pobreza, desigualdad y su relación con la política económica",
    date: "12-06-2025",
    time: "4:00 p.m.",
    image:
      "https://vibe.filesafe.space/1787862407256452737/assets/91d42cf2-4d82-48d4-8349-6efc91d70a6b.png",
  },
  {
    title: "Feria EXPOSGRADOS 2025",
    date: "07-06-2025",
    time: "8:00 a.m.",
    image:
      "https://vibe.filesafe.space/1787862407256452737/assets/484b94d8-e32d-4987-92dd-75425de8783f.png",
  },
  {
    title: "Mejorando la Salud Mental",
    date: "20-06-2025",
    time: "5:00 p.m.",
    image:
      "https://vibe.filesafe.space/1787862407256452737/assets/26db669d-e7b0-4341-932e-667435d9d0ec.png",
  },
];

export function EventsSection() {
  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-white">
      {/* Decorative yellow shapes - Top Left */}
      <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-[#f1b434] opacity-90 -translate-x-1/2 -translate-y-1/2 rotate-45 z-0" />

      {/* Decorative yellow shapes - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[100px] bg-[#f1b434] opacity-90 translate-x-1/4 translate-y-1/4 -rotate-45 z-0" />

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
        <div className="bg-[#4e2a5c] py-4 md:py-5 px-6 rounded-lg text-center mb-10 shadow-lg">
          <h2 className="text-white text-2xl md:text-3xl font-bold tracking-widest uppercase">
            EVENTOS
          </h2>
        </div>

        <h3 className="text-xl md:text-2xl font-bold text-center mb-12 text-gray-800">
          Sigue nuestros EVENTOS institucionales y académicos
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col group">
              <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] shadow-lg mb-4 rounded-sm border border-gray-200">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h4 className="font-bold text-lg leading-tight mb-2 text-gray-900 group-hover:text-primary transition-colors">
                {event.title}
              </h4>
              <p className="text-sm font-semibold text-gray-600">
                {event.date}
              </p>
              <p className="text-sm font-semibold text-gray-600">
                {event.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
