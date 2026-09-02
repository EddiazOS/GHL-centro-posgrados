import { Droplets, Plane, Scale, Shield } from "lucide-react";

const agreements = [
  {
    name: "fonducar",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/bccf91d3-785b-494d-ad58-05d716a3fecb.png",
    subtitle: "Solidaridad para el bienestar",
    isImage: true,
  },
  {
    name: "COOACEDED",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/2a8b8f4d-efa4-4533-956d-00793a5fea90.png",
    subtitle: "Nuestro Patrimonio",
    isImage: true,
  },
  {
    name: "FENALCO",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/c815e303-4d19-4a70-a932-27f4ff70bef5.png",
    subtitle: "La fuerza que une",
    isImage: true,
  },
  {
    name: "Fonrecar",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/c04c9509-2373-4215-badb-0a736ea4cf94.png",
    subtitle: "¡Unimos la Familia!",
    isImage: true,
  },
  {
    name: "Supersolidaria",
    icon: Shield,
    subtitle: "",
    iconColor: "text-yellow-600",
  },
  {
    name: "AGUAS DE CARTAGENA",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/ccde6e9b-a8bb-4dea-8ad4-e3d87ad1d920.png",
    subtitle: "",
    isImage: true,
  },
];

export const AgreementsSection = () => {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-primary">
          <path d="M 0 0 L 200 0 L 0 200 Z" />
        </svg>
      </div>

      {/* Vertical hashtag text */}
      <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 rotate-90 origin-right text-gray-200 font-bold text-4xl tracking-widest whitespace-nowrap pointer-events-none select-none">
        #IMPULSATUFUTURO
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12 flex justify-center">
          <div className="bg-[#5c2a7a] text-white px-8 py-4 rounded-lg shadow-md w-full max-w-5xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
              Conoce Nuestros Convenios
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-5xl mx-auto">
          {agreements.map((agreement, index) => (
            <div
              key={index}
              className="bg-white border-[3px] border-primary/60 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md h-56 group"
            >
              <div
                className={`mb-4 transition-transform duration-300 group-hover:scale-110 ${agreement.isImage ? "" : agreement.iconColor}`}
              >
                {agreement.isImage && agreement.image ? (
                  <img
                    src={agreement.image}
                    alt={agreement.name}
                    className="w-20 h-20 object-contain"
                  />
                ) : (
                  <agreement.icon className="w-16 h-16" strokeWidth={1.5} />
                )}
              </div>
              <h3 className="font-bold text-xl text-gray-800">
                {agreement.name}
              </h3>
              {agreement.subtitle && (
                <p className="text-sm text-gray-500 mt-2 font-medium italic">
                  {agreement.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Decorative wave bottom right */}
      <div className="absolute right-0 bottom-0 w-64 h-64 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-primary">
          <path d="M 200 200 L 0 200 L 200 0 Z" />
        </svg>
      </div>
    </section>
  );
};
