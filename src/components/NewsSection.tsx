import React from "react";

const newsItems = [
  {
    title:
      "LA UNIVERSIDAD DE CARTAGENA, MIEMBRO DEL COMITÉ ORGANIZADOR DEL 1ER CONGRESO INTERNACIONAL COLOMBO-PANAMEÑO",
    description:
      "La Universidad de Cartagena anuncia con orgullo su participación activa en la Red Colombiana de Posgrados y su integración al comité organizador del 1er Congreso Internacional Colombo-Panameño de Investigación + Desarrollo + Innovación, que se llevará a cabo en Panamá del 11 al 17 de agosto de 2025......",
    image:
      "https://vibe.filesafe.space/1787862407256452737/assets/e06cdcb7-64d5-4b8a-b07e-43dfefe79961.png",
  },
  {
    title:
      "EL CENTRO DE POSGRADOS PRESENTE EN EL EVENTO DE BUENAS PRÁCTICAS DOCENTES EN LA UNIVERSIDAD SERGIO ARBOLEDA DE SANTA MARTA - RED COLOMBIANA DE POSGRADOS",
    description:
      "La Universidad de Cartagena a través del Centro de Posgrados participó en el evento de buenas prácticas docentes de la Red Colombiana de Posgrados que se llevó a cabo en la Universidad Sergio Arboleda en Santa Marta...",
    image:
      "https://vibe.filesafe.space/1787862407256452737/assets/4bfa09f2-2304-4ee2-9dbd-b264de99cd43.png",
  },
];

export function NewsSection() {
  return (
    <section className="relative w-full py-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-white">
      {/* Decorative yellow shapes - Top Left */}
      <div className="absolute top-0 left-0 w-[300px] h-[150px] bg-[#f1b434] opacity-90 -translate-x-1/2 -translate-y-1/2 rounded-full z-0" />

      {/* Decorative yellow shapes - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-transparent border-[30px] border-[#f1b434] rounded-[100px] translate-x-1/4 translate-y-1/4 -rotate-45 z-0" />

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
        <div className="bg-[#4e2a5c] py-4 md:py-5 px-6 rounded-lg text-center mb-12 shadow-lg">
          <h2 className="text-white text-2xl md:text-3xl font-bold tracking-widest uppercase">
            NOTICIAS - BLOGS
          </h2>
        </div>

        <div className="flex flex-col gap-12">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 md:gap-10 items-center group"
            >
              <div className="w-full md:w-5/12 shrink-0">
                <div className="relative overflow-hidden shadow-md aspect-[16/10]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="w-full md:w-7/12 flex flex-col justify-center">
                <h3 className="text-xl md:text-2xl font-bold text-black mb-4 leading-snug uppercase">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
