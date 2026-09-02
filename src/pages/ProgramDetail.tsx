import React, { useState, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { programs, slugify } from "@/data/programs";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download, ScrollText } from "lucide-react";
import {
  GraduationCap,
  Award,
  BookOpen,
  Clock,
  MapPin,
  DollarSign,
  FileText,
  Users,
  ChevronRight,
  Home,
  Phone,
  Mail,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useEffect } from "react";

// ── Helper: generate curriculum by program type ──────────────────────────────
const getCurriculum = (type: string) => {
  if (type === "Doctorado") {
    return [
      {
        semester: "I Semestre",
        subjects: [
          "Seminario de Epistemología",
          "Metodología de la Investigación I",
          "Electiva I",
        ],
      },
      {
        semester: "II Semestre",
        subjects: [
          "Seminario de Investigación I",
          "Metodología de la Investigación II",
          "Electiva II",
        ],
      },
      {
        semester: "III Semestre",
        subjects: [
          "Seminario de Investigación II",
          "Electiva III",
          "Avance de Tesis I",
        ],
      },
      {
        semester: "IV Semestre",
        subjects: [
          "Seminario de Investigación III",
          "Electiva IV",
          "Avance de Tesis II",
        ],
      },
      {
        semester: "V – VIII Semestre",
        subjects: ["Desarrollo y defensa de Tesis Doctoral"],
      },
    ];
  }
  if (type === "Maestría") {
    return [
      {
        semester: "I Semestre",
        subjects: [
          "Fundamentos del Área de Conocimiento",
          "Seminario de Investigación I",
          "Electiva I",
        ],
      },
      {
        semester: "II Semestre",
        subjects: [
          "Métodos Cuantitativos y Cualitativos",
          "Seminario de Investigación II",
          "Electiva II",
        ],
      },
      {
        semester: "III Semestre",
        subjects: [
          "Seminario de Trabajo de Grado I",
          "Electiva III",
          "Profundización Disciplinar",
        ],
      },
      {
        semester: "IV Semestre",
        subjects: [
          "Seminario de Trabajo de Grado II",
          "Electiva IV",
          "Sustentación de Trabajo de Grado",
        ],
      },
    ];
  }
  return [
    {
      semester: "I Semestre",
      subjects: ["Fundamentos del Área", "Módulo Aplicado I", "Gestión Básica"],
    },
    {
      semester: "II Semestre",
      subjects: [
        "Profundización Disciplinar",
        "Módulo Aplicado II",
        "Trabajo de Grado",
      ],
    },
  ];
};

const getRequirements = (type: string) => [
  "Título de pregrado en área afín debidamente legalizado.",
  type === "Doctorado"
    ? "Título de Maestría en disciplina relacionada."
    : "Experiencia profesional mínima de un (1) año.",
  "Formulario de inscripción diligenciado y pago de derechos.",
  "Hoja de vida con soportes académicos y laborales.",
  "Carta de motivación o propuesta de investigación (según programa).",
  ...(type === "Doctorado"
    ? [
        "Certificación de suficiencia en inglés (nivel B2 o superior).",
        "Entrevista con el Comité de Admisiones.",
      ]
    : []),
  "Dos (2) cartas de recomendación académica o profesional.",
  "Fotocopia de cédula de ciudadanía ampliada.",
];

const typeGradient: Record<string, string> = {
  Doctorado: "from-[#2d1a5e] via-[#4b2e83] to-[#3d2470]",
  Maestría: "from-[#1a3a5e] via-[#1e4d7b] to-[#163359]",
  Especialización: "from-[#1a4a2e] via-[#1e6b3a] to-[#163d27]",
};

const typeAccent: Record<string, string> = {
  Doctorado: "#c084fc",
  Maestría: "#60a5fa",
  Especialización: "#4ade80",
};

const ProgramDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const program = useMemo(() => programs.find((p) => p.slug === slug), [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!program) return <Navigate to="/404" replace />;

  const curriculum = program.detail?.curriculum || getCurriculum(program.type);
  const requirements =
    program.detail?.requirements || getRequirements(program.type);
  const applicantProfile = program.detail?.applicantProfile || [
    "Profesional con título universitario en área afín.",
    "Interés genuino por la investigación y la academia.",
    "Capacidad de trabajo autónomo y en equipo.",
    "Disposición para la actualización permanente.",
    "Compromiso con el desarrollo regional y nacional.",
  ];
  const graduateProfile = program.detail?.graduateProfile || [
    "Capacidad para liderar proyectos de investigación.",
    "Competencias para la docencia universitaria.",
    "Habilidades para la gestión del conocimiento.",
    "Pensamiento crítico y analítico avanzado.",
    "Visión estratégica y liderazgo institucional.",
  ];

  const gradient = typeGradient[program.type] || typeGradient["Maestría"];
  const accent = typeAccent[program.type] || "#f1b434";

  const credits =
    program.creditos ??
    (program.type === "Doctorado"
      ? 120
      : program.type === "Maestría"
        ? 48
        : 24);
  const duration =
    program.duracion ??
    (program.type === "Doctorado"
      ? "4 años (8 Semestres)"
      : program.type === "Maestría"
        ? "2 años"
        : "1 año");
  const cost =
    program.valorMatricula ??
    (program.type === "Doctorado"
      ? "$19.720.000/año"
      : program.type === "Maestría"
        ? "$12.500.000/año"
        : "$8.200.000/semestre");
  const sniesCode = program.snies || program.detail?.snies || "N/D";
  const resolutionText =
    program.resolucionMen ||
    program.detail?.resolution ||
    "Registro Calificado — MEN";
  const vigenciaText = program.vigencia || program.detail?.validity || "7 años";
  const sedeText = program.sede || program.campus?.join(", ") || "Cartagena";
  const modalityText =
    program.modality ||
    (program.name.includes("Virtual") ? "Virtual" : "Presencial");

  const relatedPrograms = programs
    .filter((p) => p.faculty === program.faculty && p.slug !== program.slug)
    .slice(0, 3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* ── HERO ── */}
      <section
        className={`bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}
      >
        {/* Background Image if available */}
        {program.image && (
          <div className="absolute inset-0 z-0">
            <img
              src={program.image}
              alt={program.name}
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-white/5" />
          <div className="absolute bottom-0 -left-20 w-72 h-72 rounded-full bg-white/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-10 pb-16 md:pb-20 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/50 mb-6 md:mb-8 flex-wrap">
            <Link
              to="/"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to={`/tipo/${program.type === "Doctorado" ? "doctorados" : program.type === "Maestría" ? "maestrias" : program.type === "Especialización Médico-Quirúrgica" ? "especializaciones-medico-quirurgicas" : "especializaciones"}`}
              className="hover:text-white transition-colors"
            >
              {program.type === "Especialización Médico-Quirúrgica"
                ? "Esp. Médico-Quirúrgicas"
                : `${program.type}s`}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white/80 truncate max-w-xs">
              {program.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            {/* Left: main title */}
            <div className="lg:col-span-2 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {program.isOpenForRegistration && (
                  <Badge className="px-4 py-1.5 rounded-full text-sm font-extrabold bg-emerald-500 text-white border border-emerald-400 shadow-lg animate-pulse flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    ¡Inscripciones Abiertas!
                  </Badge>
                )}
                <Badge
                  className="px-4 py-1.5 rounded-full text-sm font-semibold border"
                  style={{
                    backgroundColor: accent + "25",
                    borderColor: accent + "50",
                    color: accent,
                  }}
                >
                  {program.type}
                </Badge>
                <Badge className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/10 text-white/90 border border-white/20">
                  {program.faculty}
                </Badge>
                {program.modality &&
                  program.modality.toLowerCase().includes("virtual") && (
                    <Badge className="px-4 py-1.5 rounded-full text-sm font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Virtual
                    </Badge>
                  )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                {program.name}
              </h1>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
                Programa de posgrado de la {program.faculty} de la Universidad
                de Cartagena, orientado a la formación de profesionales con alto
                nivel de competencia académica, investigativa y de liderazgo en
                su área de conocimiento.
              </p>

              {/* Key info chips */}
              <div className="flex flex-wrap gap-2 sm:gap-4 pt-2">
                {[
                  {
                    icon: <BookOpen className="w-4 h-4" />,
                    label: `${credits} créditos`,
                  },
                  { icon: <Clock className="w-4 h-4" />, label: duration },
                  { icon: <MapPin className="w-4 h-4" />, label: modalityText },
                  { icon: <DollarSign className="w-4 h-4" />, label: cost },
                ].map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-sm text-white/90"
                  >
                    <span style={{ color: accent }}>{icon}</span>
                    {label}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                {program.isOpenForRegistration && program.registrationLink && (
                  <a
                    href={program.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-8 rounded-xl font-bold text-sm sm:text-base bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-colors"
                  >
                    Inscríbete aquí
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {program.mallaUrl && (
                  <a
                    href={program.mallaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-8 rounded-xl font-bold text-sm sm:text-base bg-white/15 hover:bg-white/25 text-white border border-white/25 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Descargar Malla Curricular
                  </a>
                )}
                <Button
                  className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl font-bold text-black hover:opacity-90 text-sm sm:text-base"
                  style={{ backgroundColor: "#f1b434" }}
                  onClick={() =>
                    document
                      .getElementById("cta-form")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Solicitar más información
                </Button>
              </div>
            </div>

            {/* Right: Ficha Técnica */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
                <ScrollText className="w-5 h-5" style={{ color: accent }} />{" "}
                Ficha Técnica
              </h3>
              {[
                { label: "Código SNIES", value: sniesCode },
                { label: "Resolución MEN", value: resolutionText },
                { label: "Vigencia", value: vigenciaText },
                { label: "Créditos", value: String(credits) },
                { label: "Duración", value: duration },
                { label: "Modalidad", value: modalityText },
                { label: "Sede", value: sedeText },
                { label: "Valor Matrícula", value: cost },
                {
                  label: "Título Otorgado",
                  value:
                    program.detail?.degree ||
                    `${program.type} en ${program.name.replace(/^(Doctorado|Maestría|Especialización) en /, "")}`,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex justify-between items-start gap-2 border-b border-white/10 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-white/55 text-sm">{label}</span>
                  <span className="text-white font-semibold text-sm text-right">
                    {value}
                  </span>
                </div>
              ))}

              {/* Botones oficiales */}
              <div className="flex flex-col gap-2 pt-2">
                {program.mallaUrl && (
                  <a
                    href={program.mallaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl font-bold text-sm bg-white text-gray-900 hover:bg-white/90 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Descargar Plan de Estudios / Malla Curricular
                  </a>
                )}
                {program.smaLink && (
                  <a
                    href={program.smaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
                  >
                    Inscribirme en SMA
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 50 L0 25 Q360 0 720 25 Q1080 50 1440 25 L1440 50 Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
        <div className="h-6" />
      </section>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          {/* ── TABS ── */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="presentacion" className="w-full">
              <TabsList className="w-full h-auto flex flex-wrap gap-1 bg-white border border-gray-200 p-1.5 rounded-2xl shadow-sm mb-6 md:mb-8">
                {[
                  {
                    value: "presentacion",
                    label: "Presentación",
                    icon: <FileText className="w-4 h-4" />,
                  },
                  {
                    value: "plan",
                    label: "Plan de Estudios",
                    icon: <BookOpen className="w-4 h-4" />,
                  },
                  {
                    value: "requisitos",
                    label: "Requisitos e Inversión",
                    icon: <CheckCircle2 className="w-4 h-4" />,
                  },
                  {
                    value: "docentes",
                    label: "Planta Docente",
                    icon: <Users className="w-4 h-4" />,
                  },
                ].map(({ value, label, icon }) => (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-2 rounded-xl h-11 text-sm font-medium data-[state=active]:bg-purple-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all text-gray-600"
                  >
                    {icon} <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{label.split(" ")[0]}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Presentación */}
              <TabsContent
                value="presentacion"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 md:p-8 space-y-6 md:space-y-8"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4">
                    Objetivo del Programa
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
                    {program.detail?.objective || (
                      <>
                        El programa de <strong>{program.name}</strong> de la
                        Universidad de Cartagena tiene como objetivo principal
                        formar profesionales con competencias investigativas,
                        científicas y de liderazgo en el campo del conocimiento
                        propio de la {program.faculty}.
                      </>
                    )}
                  </p>
                </div>

                {program.detail?.linesOfResearch && (
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-150 rounded-2xl p-6">
                    <h3 className="font-extrabold text-purple-950 text-lg mb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-purple-800" />{" "}
                      Líneas de Investigación
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {program.detail.linesOfResearch.map((line) => (
                        <div
                          key={line}
                          className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm p-3 rounded-xl border border-purple-100/60 shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                          <span className="text-sm font-semibold text-gray-800">
                            {line}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Perfil del Aspirante",
                      icon: <Users className="w-5 h-5" />,
                      items: applicantProfile,
                    },
                    {
                      title: "Perfil del Egresado",
                      icon: <Award className="w-5 h-5" />,
                      items: graduateProfile,
                    },
                  ].map(({ title, icon, items }) => (
                    <div
                      key={title}
                      className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                          {icon}
                        </div>
                        <h3 className="font-bold text-gray-900">{title}</h3>
                      </div>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                  <h3 className="font-bold text-purple-900 mb-2">
                    Misión del Programa
                  </h3>
                  <p className="text-purple-800 leading-relaxed">
                    Formar investigadores y profesionales del más alto nivel
                    científico en el área de{" "}
                    {program.name.replace(
                      /^(Doctorado|Maestría|Especialización) en /,
                      "",
                    )}
                    , capaces de generar conocimiento original, liderar grupos
                    de investigación y contribuir al avance de la ciencia y la
                    tecnología en beneficio de la sociedad colombiana.
                  </p>
                </div>

                {/* ── Acordeones de contenido del programa ── */}
                {(program.detail?.axiologicos ||
                  program.detail?.objetivos ||
                  program.detail?.resultados ||
                  program.detail?.dirigidoA ||
                  program.detail?.perfiles ||
                  program.detail?.lineasInvestigacion) && (
                  <Accordion
                    type="multiple"
                    className="w-full border border-gray-200 rounded-2xl bg-white px-2"
                  >
                    {program.detail?.axiologicos && (
                      <AccordionItem value="axiologicos">
                        <AccordionTrigger className="text-base font-bold text-gray-900 hover:no-underline px-4">
                          Principios Axiológicos
                        </AccordionTrigger>
                        <AccordionContent className="px-4 text-gray-600 leading-relaxed">
                          <ul className="space-y-2">
                            {program.detail.axiologicos.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {program.detail?.objetivos && (
                      <AccordionItem value="objetivos">
                        <AccordionTrigger className="text-base font-bold text-gray-900 hover:no-underline px-4">
                          Objetivos
                        </AccordionTrigger>
                        <AccordionContent className="px-4 text-gray-600 leading-relaxed">
                          <ul className="space-y-2">
                            {program.detail.objetivos.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {program.detail?.resultados && (
                      <AccordionItem value="resultados">
                        <AccordionTrigger className="text-base font-bold text-gray-900 hover:no-underline px-4">
                          Resultados de Aprendizaje
                        </AccordionTrigger>
                        <AccordionContent className="px-4 text-gray-600 leading-relaxed">
                          <ul className="space-y-2">
                            {program.detail.resultados.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {program.detail?.dirigidoA && (
                      <AccordionItem value="dirigidoA">
                        <AccordionTrigger className="text-base font-bold text-gray-900 hover:no-underline px-4">
                          Dirigido a
                        </AccordionTrigger>
                        <AccordionContent className="px-4 text-gray-600 leading-relaxed">
                          <ul className="space-y-2">
                            {program.detail.dirigidoA.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {program.detail?.perfiles && (
                      <AccordionItem value="perfiles">
                        <AccordionTrigger className="text-base font-bold text-gray-900 hover:no-underline px-4">
                          Perfiles
                        </AccordionTrigger>
                        <AccordionContent className="px-4 text-gray-600 leading-relaxed">
                          <ul className="space-y-2">
                            {program.detail.perfiles.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    {program.detail?.lineasInvestigacion && (
                      <AccordionItem value="lineasInvestigacion">
                        <AccordionTrigger className="text-base font-bold text-gray-900 hover:no-underline px-4">
                          Líneas de Investigación
                        </AccordionTrigger>
                        <AccordionContent className="px-4 text-gray-600 leading-relaxed">
                          <ul className="space-y-2">
                            {program.detail.lineasInvestigacion.map(
                              (item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-purple-500 mt-0.5 shrink-0" />
                                  {item}
                                </li>
                              ),
                            )}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                  </Accordion>
                )}
              </TabsContent>

              {/* Plan de Estudios */}
              <TabsContent
                value="plan"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">
                  Plan de Estudios
                </h2>
                <p className="text-gray-500 mb-8">
                  Estructura curricular del programa distribuida por semestres
                  académicos. Total:{" "}
                  <strong>{credits} créditos académicos</strong> — Duración
                  estimada: <strong>{duration}</strong>.
                </p>

                <div className="space-y-4">
                  {curriculum.map((sem, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <div className="flex items-center gap-4 px-5 py-4 bg-gray-50 border-b border-gray-200">
                        <div className="w-9 h-9 rounded-lg bg-purple-900 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {idx + 1}
                        </div>
                        <h3 className="font-bold text-gray-900">
                          {sem.semester}
                        </h3>
                      </div>
                      <div className="px-5 py-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {sem.subjects.map((subject) => (
                          <div
                            key={subject}
                            className="flex items-center gap-2 text-sm text-gray-600 bg-white border border-gray-100 rounded-lg px-3 py-2"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                  * El plan de estudios es de carácter referencial y puede ser
                  actualizado por el Comité Curricular del programa conforme a
                  la normativa vigente del MEN. Para el plan oficial aprobado
                  consulte la Resolución de Registro Calificado correspondiente.
                </p>
              </TabsContent>

              {/* Requisitos e Inversión */}
              <TabsContent
                value="requisitos"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 md:p-8 space-y-6 md:space-y-8"
              >
                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 md:mb-6">
                    Requisitos de Admisión
                  </h2>
                  <ul className="space-y-3">
                    {requirements.map((req, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50"
                      >
                        <div className="w-7 h-7 rounded-full bg-purple-900 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {req}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-4 md:mb-6">
                    Inversión Económica
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        label: "Valor del Programa",
                        value: cost,
                        icon: <DollarSign className="w-5 h-5" />,
                        note: "Precio referencia 2024",
                      },
                      {
                        label: "Derechos de Inscripción",
                        value: "$150.000",
                        icon: <FileText className="w-5 h-5" />,
                        note: "Pago único al inscribirse",
                      },
                      {
                        label: "Duración Total",
                        value: duration,
                        icon: <CalendarDays className="w-5 h-5" />,
                        note: `${credits} créditos académicos`,
                      },
                    ].map(({ label, value, icon, note }) => (
                      <div
                        key={label}
                        className="border border-gray-200 rounded-xl p-5 text-center bg-gray-50"
                      >
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 mx-auto mb-3">
                          {icon}
                        </div>
                        <p className="text-xs text-gray-400 mb-1">{label}</p>
                        <p className="text-xl font-extrabold text-gray-900">
                          {value}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{note}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                    * Los valores de matrícula están sujetos a reajuste anual
                    según resolución del Consejo Superior Universitario. Existen
                    descuentos y exenciones para egresados de la Universidad de
                    Cartagena y otras categorías definidas en el Reglamento
                    Estudiantil.
                  </p>
                </div>
              </TabsContent>

              {/* Planta Docente */}
              <TabsContent
                value="docentes"
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 md:p-8"
              >
                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">
                  Planta Docente
                </h2>
                <p className="text-gray-500 mb-8">
                  El programa cuenta con una planta docente altamente
                  calificada, conformada en su mayoría por doctores con
                  publicaciones en revistas indexadas de alto impacto nacional e
                  internacional.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: "Dr. Carlos Alberto Hernández",
                      title: "Doctor en Ciencias",
                      area: "Coordinador Académico",
                      exp: "20 años de experiencia",
                    },
                    {
                      name: "Dra. Martha Lucía Pérez",
                      title: "Ph.D. Universidad Nacional",
                      area: "Investigación Aplicada",
                      exp: "15 años de experiencia",
                    },
                    {
                      name: "Dr. Juan Manuel Rodríguez",
                      title: "Doctor en Educación",
                      area: "Metodología de Investigación",
                      exp: "18 años de experiencia",
                    },
                    {
                      name: "Dra. Adriana Milena Castro",
                      title: "Ph.D. Universidad de Barcelona",
                      area: "Docencia Internacional",
                      exp: "12 años de experiencia",
                    },
                  ].map(({ name, title, area, exp }) => (
                    <div
                      key={name}
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50"
                    >
                      <div className="w-14 h-14 rounded-full bg-purple-900 flex items-center justify-center text-white font-bold text-lg shrink-0">
                        {name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(1, 3)
                          .join("")}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 text-sm">
                          {name}
                        </p>
                        <p className="text-xs text-purple-700 font-medium">
                          {title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {area} · {exp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-gray-400 mt-6">
                  * La información de la planta docente es de carácter
                  ilustrativo. La composición exacta del cuerpo profesoral puede
                  variar por período académico. Consulte la información
                  actualizada con la Coordinación del Programa.
                </p>
              </TabsContent>
            </Tabs>

            {/* Related programs */}
            {relatedPrograms.length > 0 && (
              <div className="mt-8 md:mt-10">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-5">
                  Otros programas de la{" "}
                  {program.faculty.replace("Facultad de ", "Fac. de ")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedPrograms.map((p) => (
                    <Link
                      key={p.id}
                      to={`/programas/${p.slug}`}
                      className="group block p-4 rounded-xl border border-gray-200 bg-white hover:border-purple-300 hover:shadow-md transition-all"
                    >
                      <Badge className="text-xs mb-2 bg-purple-50 text-purple-700 border-purple-200">
                        {p.type}
                      </Badge>
                      <p className="text-sm font-semibold text-gray-800 group-hover:text-purple-800 line-clamp-2 leading-snug">
                        {p.name}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-purple-600 font-medium">
                        Ver programa <ChevronRight className="w-3 h-3" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── SIDEBAR CTA ── */}
          <div id="cta-form" className="lg:sticky lg:top-24 space-y-6">
            {/* Form card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              {program.isOpenForRegistration && (
                <div className="bg-emerald-500 px-6 py-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-white font-extrabold text-sm">
                    ¡Inscripciones Abiertas!
                  </span>
                </div>
              )}
              <div className="bg-gradient-to-r from-purple-900 to-purple-700 px-6 py-5">
                <h3 className="text-white font-extrabold text-lg">
                  Solicitar más información
                </h3>
                <p className="text-white/70 text-sm mt-1">
                  Te contactamos en menos de 24 horas.
                </p>
              </div>

              <div className="p-6">
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                    </div>
                    <p className="font-bold text-gray-900 mb-2">
                      ¡Solicitud enviada!
                    </p>
                    <p className="text-sm text-gray-500">
                      Un asesor se comunicará contigo pronto.
                    </p>
                    <Button
                      className="mt-5 w-full rounded-xl text-black font-bold"
                      style={{ backgroundColor: "#f1b434" }}
                      onClick={() => setSubmitted(false)}
                    >
                      Enviar otra solicitud
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-3" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Nombre completo *"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:ring-2 focus:ring-purple-400 outline-none"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico *"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:ring-2 focus:ring-purple-400 outline-none"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                    <input
                      type="tel"
                      placeholder="Teléfono de contacto"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:ring-2 focus:ring-purple-400 outline-none"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                    <textarea
                      placeholder="¿Tienes alguna pregunta?"
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 focus:ring-2 focus:ring-purple-400 outline-none resize-none"
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
                    {(program.isOpenForRegistration &&
                      program.registrationLink) ||
                    program.smaLink ? (
                      <a
                        href={program.smaLink || program.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-12 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center gap-2 transition-colors"
                      >
                        Inscribirme en SMA
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : null}
                    {program.mallaUrl && (
                      <a
                        href={program.mallaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full h-12 rounded-xl font-bold bg-purple-900 hover:bg-purple-800 text-white flex items-center justify-center gap-2 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        Descargar Malla Curricular
                      </a>
                    )}
                  </form>
                )}
              </div>
            </div>

            {/* Contact mini card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
              <h4 className="font-bold text-gray-900 text-sm">
                Atención y Contacto
              </h4>
              {[
                {
                  icon: <Phone className="w-4 h-4" />,
                  value: "+57 (605) 660-0640 / 660-0000",
                },
                {
                  icon: <Mail className="w-4 h-4" />,
                  value:
                    program.detail?.contactEmail ||
                    "posgrados@unicartagena.edu.co",
                },
                {
                  icon: <MapPin className="w-4 h-4" />,
                  value:
                    program.detail?.contactLocation ||
                    "Claustro de San Agustín, Cartagena",
                },
              ].map(({ icon, value }) => (
                <div
                  key={value}
                  className="flex items-center gap-3 text-sm text-gray-600"
                >
                  <span className="text-purple-700 shrink-0">{icon}</span>
                  <span className="break-all">{value}</span>
                </div>
              ))}
            </div>

            {/* Official link */}
            {program.officialLink && (
              <a
                href={program.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl border border-purple-200 bg-purple-50 p-5 hover:bg-purple-100 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-800 text-sm">
                    Página oficial del programa
                  </span>
                </div>
                <p className="text-purple-600 text-xs break-all">
                  {program.officialLink}
                </p>
              </a>
            )}

            {/* Program badge */}
            <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-5">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-5 h-5 text-yellow-600" />
                <span className="font-bold text-yellow-800 text-sm">
                  Acreditación de calidad
                </span>
              </div>
              <p className="text-yellow-700 text-xs leading-relaxed">
                La Universidad de Cartagena es una institución de educación
                superior acreditada de alta calidad por el Ministerio de
                Educación Nacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ProgramDetailPage;
