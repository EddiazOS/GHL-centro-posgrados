import React, { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { programs, slugify } from "@/data/programs";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  Award,
  ChevronRight,
  Home,
  ArrowRight,
  Users,
  FlaskConical,
  Stethoscope,
  CircleDot,
} from "lucide-react";

// Faculty-specific metadata
const facultyMeta: Record<
  string,
  {
    description: string;
    color: string;
    bgImage: string;
    mission: string;
    icon: React.ReactNode;
  }
> = {
  "Facultad de Ciencias Económicas": {
    description:
      "La Facultad de Ciencias Económicas forma profesionales competentes en gestión, finanzas y administración pública, con visión estratégica para el desarrollo regional y nacional.",
    color: "#1e6b3a",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Contribuir al desarrollo económico y social mediante la formación de líderes íntegros con capacidad investigativa y visión global.",
    icon: <BookOpen className="w-8 h-8" />,
  },
  "Facultad de Ciencias Farmacéuticas": {
    description:
      "Reconocida por su excelencia en investigación farmacéutica y toxicológica, la Facultad forma profesionales capaces de responder a los retos de salud pública y ambiental.",
    color: "#1a4a6b",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Generar conocimiento farmacéutico de alto impacto para mejorar la calidad de vida de la población.",
    icon: <FlaskConical className="w-8 h-8" />,
  },
  "Facultad de Ciencias Exactas y Naturales": {
    description:
      "Centro de excelencia en ciencias básicas, matemáticas y física, con programas de posgrado que conectan la investigación fundamental con aplicaciones tecnológicas de vanguardia.",
    color: "#4b2e83",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Fomentar el pensamiento crítico y la investigación en ciencias exactas para impulsar la innovación científica y tecnológica.",
    icon: <FlaskConical className="w-8 h-8" />,
  },
  "Facultad de Medicina": {
    description:
      "Una de las facultades de medicina más prestigiosas del Caribe colombiano, con tradición en la formación de médicos especialistas de alto nivel y en investigación clínica.",
    color: "#8b1a1a",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Formar médicos especializados con vocación de servicio, capacidad investigativa y compromiso con la salud de la población.",
    icon: <Users className="w-8 h-8" />,
  },
  "Facultad de Ingeniería": {
    description:
      "Con una sólida tradición en ciencias aplicadas, la Facultad de Ingeniería ofrece programas de posgrado que responden a los desafíos del desarrollo industrial y tecnológico.",
    color: "#b35a00",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Formar ingenieros de posgrado con competencias para innovar y liderar proyectos de impacto en la sociedad.",
    icon: <Award className="w-8 h-8" />,
  },
  "Facultad de Enfermería": {
    description:
      "Comprometida con el cuidado humanizado, la Facultad de Enfermería forma profesionales de posgrado con liderazgo en salud comunitaria, salud mental y seguridad laboral.",
    color: "#2e7d6e",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Fortalecer la práctica de enfermería a través de la investigación y la formación avanzada orientada al bienestar humano.",
    icon: <Users className="w-8 h-8" />,
  },
  "Facultad de Odontología": {
    description:
      "La Facultad de Odontología lidera la formación de especialistas en salud oral con los más altos estándares académicos y clínicos de la región Caribe.",
    color: "#1a5f7a",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Formar odontólogos especialistas con excelencia clínica, ética profesional e impacto social.",
    icon: <Users className="w-8 h-8" />,
  },
  "Facultad de Ciencias Sociales y Educación": {
    description:
      "Pionera en la reflexión sobre educación, conflicto social y género, la facultad forma investigadores y docentes que transforman realidades desde las ciencias humanas.",
    color: "#5a3472",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Contribuir a la transformación social mediante la formación avanzada en ciencias sociales, educación y humanidades.",
    icon: <BookOpen className="w-8 h-8" />,
  },
  "Facultad de Ciencias Humanas": {
    description:
      "La Facultad de Ciencias Humanas promueve el pensamiento crítico y humanístico a través de programas de posgrado enfocados en las humanidades contemporáneas.",
    color: "#7a4f1a",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Fomentar la reflexión humanística y la producción intelectual en diálogo con los grandes desafíos contemporáneos.",
    icon: <BookOpen className="w-8 h-8" />,
  },
  "Facultad de Derecho y Ciencias Políticas": {
    description:
      "Reconocida en la región por la formación jurídica de excelencia, la Facultad de Derecho forma especialistas y magísteres en áreas del derecho penal y las ciencias políticas.",
    color: "#1a3a6b",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Formar juristas y politólogos de alto nivel comprometidos con la justicia, la democracia y el Estado de Derecho.",
    icon: <Award className="w-8 h-8" />,
  },
  "Instituto de Investigaciones Inmunológicas": {
    description:
      "El Instituto de Investigaciones Inmunológicas es un referente nacional e internacional en investigación inmunológica y biomédica, con programas de posgrado de alto impacto científico.",
    color: "#6b1a4a",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Generar conocimiento de frontera en inmunología para contribuir al diagnóstico y tratamiento de enfermedades de alto impacto.",
    icon: <FlaskConical className="w-8 h-8" />,
  },
  "Vicerrectoría de Docencia": {
    description:
      "La Vicerrectoría de Docencia coordina programas de doctorado de alcance nacional en alianza con redes interuniversitarias como Rudecolombia, formando investigadores de alto nivel para el país.",
    color: "#6366f1",
    bgImage:
      "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
    mission:
      "Articular la formación doctoral de la Universidad con redes nacionales e internacionales para el desarrollo del conocimiento.",
    icon: <BookOpen className="w-8 h-8" />,
  },
};

const DEFAULT_META = {
  description:
    "Unidad académica de la Universidad de Cartagena comprometida con la excelencia investigativa y la formación de posgrado de alto nivel.",
  color: "#4b2e83",
  bgImage:
    "https://vibe.filesafe.space/1787862407256452737/assets/f40aab0d-f620-4e18-a48b-8ebf08a9e049.png",
  mission:
    "Contribuir al desarrollo académico, científico y social mediante la formación avanzada de talento humano.",
  icon: <GraduationCap className="w-8 h-8" />,
};

const typeIcons: Record<string, React.ReactNode> = {
  Doctorados: <Award className="w-5 h-5" />,
  Maestrías: <GraduationCap className="w-5 h-5" />,
  Especializaciones: <BookOpen className="w-5 h-5" />,
  "Especializaciones Médico-Quirúrgicas": <Stethoscope className="w-5 h-5" />,
};

const typeColors: Record<string, string> = {
  Doctorados: "#4b2e83",
  Maestrías: "#1e4d7b",
  Especializaciones: "#1a6b3a",
  "Especializaciones Médico-Quirúrgicas": "#8b1a1a",
};

const FacultyDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    program: "",
    message: "",
  });

  const facultyName = useMemo(() => {
    return programs.find((p) => slugify(p.faculty) === slug)?.faculty || "";
  }, [slug]);

  const meta = facultyMeta[facultyName] || DEFAULT_META;

  const facultyPrograms = useMemo(
    () => programs.filter((p) => p.faculty === facultyName),
    [facultyName],
  );

  const grouped = useMemo(
    () => ({
      Doctorados: facultyPrograms.filter((p) => p.type === "Doctorado"),
      Maestrías: facultyPrograms.filter((p) => p.type === "Maestría"),
      Especializaciones: facultyPrograms.filter(
        (p) => p.type === "Especialización",
      ),
      "Especializaciones Médico-Quirúrgicas": facultyPrograms.filter(
        (p) => p.type === "Especialización Médico-Quirúrgica",
      ),
    }),
    [facultyPrograms],
  );

  if (!facultyName) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Facultad no encontrada</h1>
          <Button asChild>
            <Link to="/">Volver al inicio</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ── HERO ── */}
      <section className="relative h-[360px] sm:h-[420px] md:h-[480px] flex items-end overflow-hidden">
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${meta.bgImage}')`,
            filter: "brightness(0.35)",
          }}
        />
        {/* Color tint overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: meta.color + "99" }}
        />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pb-10 md:pb-12 w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/50 mb-6">
            <Link
              to="/"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/75">Facultades</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{facultyName}</span>
          </nav>

          <div className="flex items-end gap-4 md:gap-6">
            {/* Icon */}
            <div
              className="hidden md:flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl shrink-0"
              style={{
                backgroundColor: meta.color,
                border: "3px solid rgba(255,255,255,0.3)",
              }}
            >
              <span className="text-white">{meta.icon}</span>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {Object.entries(grouped).map(([type, list]) =>
                  list.length > 0 ? (
                    <Badge
                      key={type}
                      className="text-xs px-3 py-1 rounded-full bg-white/15 text-white border border-white/20"
                    >
                      {list.length} {type}
                    </Badge>
                  ) : null,
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white leading-tight">
                {facultyName}
              </h1>
              <div
                className="h-1.5 w-24 mt-3 rounded-full"
                style={{ backgroundColor: "#f1b434" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-2">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                Acerca de la Facultad
              </h2>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg mb-6">
                {meta.description}
              </p>
              <div
                className="p-5 rounded-xl border-l-4 bg-gray-50"
                style={{ borderColor: meta.color }}
              >
                <p
                  className="text-sm font-semibold uppercase tracking-wider mb-2"
                  style={{ color: meta.color }}
                >
                  Misión
                </p>
                <p className="text-gray-700 leading-relaxed">{meta.mission}</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-4">
              {Object.entries(grouped).map(([type, list]) =>
                list.length > 0 ? (
                  <div
                    key={type}
                    className="rounded-xl p-5 border flex items-center gap-4"
                    style={{
                      borderColor: typeColors[type] + "30",
                      backgroundColor: typeColors[type] + "08",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: typeColors[type] + "20" }}
                    >
                      <span style={{ color: typeColors[type] }}>
                        {typeIcons[type]}
                      </span>
                    </div>
                    <div>
                      <div
                        className="text-2xl font-extrabold"
                        style={{ color: typeColors[type] }}
                      >
                        {list.length}
                      </div>
                      <div className="text-sm text-gray-500">{type}</div>
                    </div>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ACCORDION ── */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2 text-gray-900">
            Nuestros Posgrados
          </h2>
          <p className="text-gray-500 mb-10">
            {facultyPrograms.length} programas académicos clasificados por nivel
            de formación.
          </p>

          <Accordion
            type="multiple"
            defaultValue={["Doctorados", "Maestrías", "Especializaciones"]}
            className="space-y-4"
          >
            {Object.entries(grouped).map(([type, list]) =>
              list.length > 0 ? (
                <AccordionItem
                  key={type}
                  value={type}
                  className="border rounded-2xl overflow-hidden shadow-sm bg-white"
                >
                  <AccordionTrigger className="px-6 py-5 hover:bg-gray-50 hover:no-underline">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: typeColors[type] + "15" }}
                      >
                        <span style={{ color: typeColors[type] }}>
                          {typeIcons[type]}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="text-lg font-bold text-gray-900">
                          {type}
                        </div>
                        <div className="text-sm text-gray-400">
                          {list.length} programas disponibles
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {list.map((program) => (
                        <Card
                          key={program.id}
                          className="border border-gray-200 shadow-none hover:border-purple-300 hover:shadow-md transition-all bg-white"
                        >
                          <CardContent className="p-4 flex items-center justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
                                  {program.name}
                                </p>
                                {program.isOpenForRegistration && (
                                  <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                                    <CircleDot className="w-2.5 h-2.5" />
                                    Abiertas
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-gray-400 mt-1">
                                SNIES: {program.snies || "N/D"}
                              </p>
                            </div>
                            <Button
                              asChild
                              size="sm"
                              className="shrink-0 rounded-lg text-white text-xs h-9"
                              style={{ backgroundColor: typeColors[type] }}
                            >
                              <Link to={`/programas/${program.slug}`}>
                                Ver <ArrowRight className="w-3 h-3 ml-1" />
                              </Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : null,
            )}
          </Accordion>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        className="py-14 md:py-20 px-4 md:px-8"
        style={{ backgroundColor: meta.color }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: info */}
            <div className="text-white">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
                Contacto de la Facultad
              </h2>
              <p className="text-white/75 mb-8 md:mb-10 leading-relaxed text-base sm:text-lg">
                ¿Tienes preguntas sobre nuestros programas o el proceso de
                admisión? Nuestro equipo está disponible para orientarte en cada
                paso.
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail className="w-5 h-5" />,
                    label: "Correo Electrónico",
                    value: `posgrados.${slug}@unicartagena.edu.co`,
                  },
                  {
                    icon: <Phone className="w-5 h-5" />,
                    label: "Teléfono",
                    value: "+57 (605) 660 0000 Ext. 1234",
                  },
                  {
                    icon: <MapPin className="w-5 h-5" />,
                    label: "Ubicación",
                    value: "Sede Principal, Claustro de San Agustín, Cartagena",
                  },
                ].map(({ icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                      <span style={{ color: "#f1b434" }}>{icon}</span>
                    </div>
                    <div>
                      <p className="text-sm text-white/55">{label}</p>
                      <p className="font-semibold text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl">
              <h3
                className="text-xl md:text-2xl font-bold mb-2"
                style={{ color: meta.color }}
              >
                Solicitar Información
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Completa el formulario y te contactaremos a la brevedad.
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    className="w-full p-3 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 outline-none text-sm"
                    style={
                      { focusRingColor: meta.color } as React.CSSProperties
                    }
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="w-full p-3 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 outline-none text-sm"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <select
                  className="w-full p-3 rounded-xl border border-gray-200 text-gray-700 focus:ring-2 outline-none text-sm bg-white"
                  value={formData.program}
                  onChange={(e) =>
                    setFormData({ ...formData, program: e.target.value })
                  }
                >
                  <option value="">Selecciona un programa de interés</option>
                  {facultyPrograms.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
                <textarea
                  placeholder="¿En qué podemos ayudarte?"
                  rows={4}
                  className="w-full p-3 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 outline-none text-sm resize-none"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl font-bold text-black hover:opacity-90"
                  style={{ backgroundColor: "#f1b434" }}
                >
                  Enviar solicitud
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default FacultyDetailPage;
