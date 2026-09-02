import {
  BarChart3,
  Scale,
  Stethoscope,
  HeartHandshake,
  TrendingUp,
  Settings2,
  FlaskConical,
  FileCheck,
  Presentation,
  Syringe,
  Pill,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { slugify } from "@/data/programs";

interface Faculty {
  name: string;
  icon?: LucideIcon;
  imageIcon?: string;
  color: string;
  description: string;
}

const faculties: Faculty[] = [
  {
    name: "Facultad de Odontología",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/cc96d534-057e-44b8-9fdb-16274b373585.png",
    color: "#b490ca",
    description: "Conoce nuestros posgrados y transforma sonrisas con ciencia.",
  },
  {
    name: "Facultad de Medicina",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/7c725c23-4ec3-482a-b166-d49847ee22d3.png",
    color: "#8ab17d",
    description:
      "Explora nuestros posgrados con enfoque científico, humano y clínico.",
  },
  {
    name: "Facultad de Enfermería",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/c44678f4-de84-4c35-85f5-ee9bcd639787.png",
    color: "#e89d5e",
    description: "Fortalece tu impacto en la salud comunitaria.",
  },
  {
    name: "Facultad de Ciencias Económicas",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/c32ea8c1-6c4a-4fa5-962a-3d950461d8ae.png",
    color: "#e87a2c",
    description: "Conviértete en líder de impacto económico.",
  },
  {
    name: "Facultad de Derecho y Ciencias Políticas",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/b84f4fb2-29f7-4513-85b1-f48880004190.png",
    color: "#c40000",
    description:
      "Descubre nuestros posgrados con enfoque crítico y compromiso social.",
  },
  {
    name: "Facultad de Ingeniería",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/0f426470-d388-40ed-a5e9-8b905de587a1.png",
    color: "#e60000",
    description: "Diseña soluciones para un futuro sostenible e innovador.",
  },
  {
    name: "Facultad de Ciencias Sociales y Educación",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/a811b73f-dc1e-4533-bb5e-2baf827f9d3f.png",
    color: "#f5c9a6",
    description: "Forma el futuro con educación transformadora.",
  },
  {
    name: "Facultad de Ciencias Farmacéuticas",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/30f13d65-2673-4997-b0d0-443593f2b91b.png",
    color: "#4b1f5c",
    description: "Profundiza en la ciencia que salva vidas.",
  },
  {
    name: "Facultad de Ciencias Exactas y Naturales",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/dbf05005-7455-4d45-ac26-7b05bec1ef9e.png",
    color: "#9ca3af",
    description: "Investiga, innova y trasciende con nosotros.",
  },
  {
    name: "Facultad de Ciencias Humanas",
    imageIcon:
      "https://storage.googleapis.com/msgsndr/Y78ISaWU29ZinJJK5823/media/c815cae7-3873-4238-ba3b-8d2e6f777afc.png",
    color: "#16a34a",
    description: "Transforma la sociedad con conocimiento humano.",
  },
  {
    name: "Instituto de Investigaciones Inmunológicas",
    icon: Syringe,
    color: "#93c5fd",
    description: "Avanza en la ciencia de la inmunidad.",
  },
  {
    name: "Área de Especializaciones Médico Quirúrgicas",
    icon: HeartPulse,
    color: "#10b981",
    description: "Programas de especialización médica y quirúrgica.",
  },
];

export function AcademicOffer() {
  return (
    <section
      id="facultades"
      className="relative w-full py-16 px-4 md:px-8 lg:px-16 overflow-hidden bg-white"
    >
      {/* Decorative yellow shapes - Top Left */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#f1b434] opacity-90 -translate-x-1/2 -translate-y-1/2 rotate-45 z-0" />

      {/* Vertical Text Right */}
      <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center h-full z-0 pointer-events-none">
        <span
          className="text-[#519c98] text-4xl font-black tracking-[0.2em] opacity-40 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          #IMPULSATUFUTURO
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top 3 Cards (Programs) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-10 md:mb-12">
          {/* Card 1: Doctorados */}
          <Link
            to="/tipo/doctorados"
            className="relative group overflow-hidden bg-gray-100 aspect-[4/3] cursor-pointer shadow-md block"
          >
            <img
              src="https://vibe.filesafe.space/1787862407256452737/attachments/f0aeb8c5-2c30-4a8d-9b75-baab5425a5c1.png"
              alt="Doctorados"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 text-center px-4">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-widest drop-shadow-md">
                DOCTORADOS
              </h3>
            </div>
          </Link>

          {/* Card 2: Maestrías */}
          <Link
            to="/tipo/maestrias"
            className="relative group overflow-hidden bg-gray-100 aspect-[4/3] cursor-pointer shadow-md block"
          >
            <img
              src="https://vibe.filesafe.space/1787862407256452737/attachments/3122c414-03b1-42de-8839-889599face3e.png"
              alt="Maestrías"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 text-center px-4">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-widest drop-shadow-md">
                MAESTRÍAS
              </h3>
            </div>
          </Link>

          {/* Card 3: Especializaciones */}
          <Link
            to="/tipo/especializaciones"
            className="relative group overflow-hidden bg-gray-100 aspect-[4/3] cursor-pointer shadow-md block"
          >
            <img
              src="https://vibe.filesafe.space/1787862407256452737/attachments/3e2d2eef-fb29-4646-8dde-7b7d315f05fe.png"
              alt="Especializaciones"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 text-center px-4">
              <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold tracking-widest drop-shadow-md">
                ESPECIALIZACIONES
              </h3>
            </div>
          </Link>
        </div>

        {/* Purple Banner */}
        <div className="bg-[#4e2a5c] py-4 md:py-5 px-6 rounded-lg text-center mb-12 shadow-lg">
          <h2 className="text-white text-xl md:text-3xl font-bold tracking-widest uppercase">
            Oferta Académica por Facultades
          </h2>
        </div>

        {/* Bottom Cards (Faculties) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {faculties.map((fac) => (
            <Link
              key={fac.name}
              to={`/facultad/${slugify(fac.name)}`}
              className="bg-white border-2 border-[#d4c3b3] rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm hover:shadow-md transition-all group block"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {fac.imageIcon ? (
                  <img
                    src={fac.imageIcon}
                    alt={fac.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shadow-sm overflow-hidden"
                    style={{
                      backgroundColor: fac.color,
                      borderTopLeftRadius: "2rem",
                    }}
                  >
                    {fac.icon && <fac.icon className="text-white w-7 h-7" />}
                  </div>
                )}
              </div>
              <h4 className="text-lg font-bold text-black mb-4 leading-snug uppercase">
                {fac.name}
              </h4>
              <p className="text-sm text-gray-700 mb-3 font-medium">
                {fac.description}
              </p>
              <span className="text-sm text-gray-500 group-hover:text-purple-700 transition-colors">
                Conoce nuestros posgrados
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
