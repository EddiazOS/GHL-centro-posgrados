import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { programs, slugify } from "@/data/programs";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/FooterSection";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  GraduationCap,
  Award,
  BookOpen,
  ChevronRight,
  Home,
  Stethoscope,
  CircleDot,
} from "lucide-react";

// Map URL slug → array of program types that belong to that category
const TYPE_MAP: Record<string, string[]> = {
  doctorados: ["Doctorado"],
  maestrias: ["Maestría"],
  especializaciones: ["Especialización"],
  "especializaciones-medico-quirurgicas": ["Especialización Médico-Quirúrgica"],
};

const typeConfig: Record<
  string,
  {
    label: string;
    plural: string;
    subtitle: string;
    icon: React.ReactNode;
    accent: string;
    bgGradient: string;
    image?: string;
    credits: string;
    duration: string;
    description: string;
  }
> = {
  doctorados: {
    label: "Doctorado",
    plural: "Doctorados",
    subtitle: "El nivel más alto de formación académica",
    icon: <Award className="w-8 h-8" />,
    accent: "#f1b434",
    bgGradient: "from-[#2d1a5e] via-[#4b2e83] to-[#3d2470]",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/f0aeb8c5-2c30-4a8d-9b75-baab5425a5c1.png",
    credits: "120 créditos",
    duration: "4 años",
    description:
      "Los programas de Doctorado de la Universidad de Cartagena representan el pináculo de la formación académica. Diseñados para formar investigadores de alto nivel con capacidad de generar conocimiento original que contribuya al avance científico, tecnológico y social de la región y del país.",
  },
  maestrias: {
    label: "Maestría",
    plural: "Maestrías",
    subtitle: "Formación especializada de alto nivel",
    icon: <GraduationCap className="w-8 h-8" />,
    accent: "#f1b434",
    bgGradient: "from-[#1a3a5e] via-[#1e4d7b] to-[#163359]",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/3122c414-03b1-42de-8839-889599face3e.png",
    credits: "48 créditos",
    duration: "2 años",
    description:
      "Las Maestrías de la Universidad de Cartagena ofrecen formación especializada de alto nivel para profesionales que buscan profundizar sus conocimientos y desarrollar competencias investigativas o de profundización en áreas específicas del saber, impulsando su desarrollo profesional y académico.",
  },
  especializaciones: {
    label: "Especialización",
    plural: "Especializaciones",
    subtitle: "Formación avanzada en áreas específicas",
    icon: <BookOpen className="w-8 h-8" />,
    accent: "#f1b434",
    bgGradient: "from-[#1a4a2e] via-[#1e6b3a] to-[#163d27]",
    image:
      "https://vibe.filesafe.space/1787862407256452737/attachments/3e2d2eef-fb29-4646-8dde-7b7d315f05fe.png",
    credits: "24 créditos",
    duration: "1 año",
    description:
      "Las Especializaciones de la Universidad de Cartagena están orientadas a la formación avanzada en un área disciplinar o interdisciplinar específica. Dirigidas a profesionales que desean actualizar y profundizar sus conocimientos con una perspectiva práctica y aplicada al ejercicio profesional.",
  },
  "especializaciones-medico-quirurgicas": {
    label: "Especialización Médico-Quirúrgica",
    plural: "Especializaciones Médico-Quirúrgicas",
    subtitle: "Formación clínica de alto nivel",
    icon: <Stethoscope className="w-8 h-8" />,
    accent: "#f1b434",
    bgGradient: "from-[#4a1010] via-[#6b1a1a] to-[#3d0d0d]",
    credits: "Variable",
    duration: "3-4 años",
    description:
      "Las Especializaciones Médico-Quirúrgicas de la Universidad de Cartagena forman especialistas clínicos de alto nivel, con énfasis en la atención hospitalaria, la investigación clínica y el compromiso con la salud de la población.",
  },
};

const ProgramTypePage = () => {
  const { type } = useParams<{ type: string }>();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("all");

  const config = typeConfig[type || ""] || typeConfig["maestrias"];
  const currentTypes = TYPE_MAP[type || ""] || TYPE_MAP["maestrias"];

  const faculties = useMemo(() => {
    const relevant = programs
      .filter((p) => currentTypes.includes(p.type))
      .map((p) => p.faculty);
    return Array.from(new Set(relevant)).sort();
  }, [currentTypes]);

  const filteredPrograms = useMemo(() => {
    return programs
      .filter((p) => {
        const matchesType = currentTypes.includes(p.type);
        const matchesSearch =
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.faculty.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFaculty =
          selectedFaculty === "all" || p.faculty === selectedFaculty;
        return matchesType && matchesSearch && matchesFaculty;
      })
      .sort((a, b) => {
        if (a.isOpenForRegistration && !b.isOpenForRegistration) return -1;
        if (!a.isOpenForRegistration && b.isOpenForRegistration) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [currentTypes, searchTerm, selectedFaculty]);

  const totalPrograms = programs.filter((p) =>
    currentTypes.includes(p.type),
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section
        className={`bg-gradient-to-br ${config.bgGradient} text-white relative overflow-hidden`}
      >
        {/* Background Image */}
        {config.image && (
          <div className="absolute inset-0 z-0">
            <img
              src={config.image}
              alt={config.plural}
              className="w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/5" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-white/5" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-white/60 mb-8 md:mb-10 flex-wrap">
            <Link
              to="/"
              className="hover:text-white flex items-center gap-1 transition-colors"
            >
              <Home className="w-3.5 h-3.5" /> Inicio
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium">{config.plural}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-8">
            <div className="flex-1">
              {/* Icon badge */}
              <div
                className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-5 md:mb-6"
                style={{
                  backgroundColor: config.accent + "30",
                  border: `2px solid ${config.accent}50`,
                }}
              >
                <span style={{ color: config.accent }}>{config.icon}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold mb-3 md:mb-4 leading-none tracking-tight">
                {config.plural}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-light text-white/80 mb-3">
                {config.subtitle}
              </p>
              <p className="text-sm sm:text-base text-white/65 max-w-2xl leading-relaxed">
                {config.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-4 sm:gap-6 md:gap-8 shrink-0">
              <div className="text-center">
                <div
                  className="text-3xl sm:text-4xl font-extrabold"
                  style={{ color: config.accent }}
                >
                  {totalPrograms}
                </div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">
                  Programas
                </div>
              </div>
              <div className="text-center border-l border-white/20 pl-4 sm:pl-6 md:pl-8">
                <div
                  className="text-3xl sm:text-4xl font-extrabold"
                  style={{ color: config.accent }}
                >
                  {faculties.length}
                </div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">
                  Facultades
                </div>
              </div>
              <div className="text-center border-l border-white/20 pl-4 sm:pl-6 md:pl-8">
                <div
                  className="text-xl sm:text-2xl font-extrabold"
                  style={{ color: config.accent }}
                >
                  {config.duration}
                </div>
                <div className="text-xs sm:text-sm text-white/60 mt-1">
                  Duración
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z"
              fill="#f9fafb"
            />
          </svg>
        </div>
        <div className="h-8" />
      </section>

      {/* Filters Section */}
      <section className="py-6 md:py-8 px-4 md:px-8 bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder={`Buscar ${config.plural.toLowerCase()}...`}
                className="pl-12 h-11 md:h-12 bg-gray-50 border-gray-200 rounded-xl text-sm focus-visible:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Faculty filter */}
            <div className="w-full md:w-72 lg:w-80">
              <Select
                value={selectedFaculty}
                onValueChange={setSelectedFaculty}
              >
                <SelectTrigger className="h-11 md:h-12 bg-gray-50 border-gray-200 rounded-xl text-sm">
                  <SelectValue placeholder="Filtrar por Facultad" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="all">
                    Todas las Facultades ({totalPrograms})
                  </SelectItem>
                  {faculties.map((faculty) => {
                    const count = programs.filter(
                      (p) =>
                        currentTypes.includes(p.type) && p.faculty === faculty,
                    ).length;
                    return (
                      <SelectItem key={faculty} value={faculty}>
                        {faculty} ({count})
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Clear filters */}
            {(searchTerm || selectedFaculty !== "all") && (
              <Button
                variant="outline"
                className="h-11 md:h-12 px-5 md:px-6 rounded-xl shrink-0 border-gray-300 text-gray-600 hover:bg-gray-50 text-sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFaculty("all");
                }}
              >
                Limpiar
              </Button>
            )}
          </div>

          {/* Results count */}
          <div className="mt-3 text-xs sm:text-sm text-gray-500">
            Mostrando{" "}
            <span className="font-semibold text-gray-800">
              {filteredPrograms.length}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-gray-800">{totalPrograms}</span>{" "}
            {config.plural.toLowerCase()}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-8 md:py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filteredPrograms.map((program) => (
                <Card
                  key={program.id}
                  className="group hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden bg-white flex flex-col"
                >
                  {/* Top color bar / Image */}
                  {program.image ? (
                    <div className="h-48 w-full relative overflow-hidden">
                      <img
                        src={program.image}
                        alt={program.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className="absolute top-0 left-0 right-0 h-1.5"
                        style={{ backgroundColor: config.accent }}
                      />
                    </div>
                  ) : (
                    <div
                      className="h-1.5 w-full"
                      style={{ backgroundColor: config.accent }}
                    />
                  )}

                  <CardHeader className="p-6 pb-4 flex-1">
                    {/* Type badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{
                            backgroundColor: config.accent + "20",
                            color: "#4b2e83",
                            border: `1px solid ${config.accent}40`,
                          }}
                        >
                          {program.type}
                        </Badge>
                        {program.isOpenForRegistration && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CircleDot className="w-2.5 h-2.5" />
                            Inscripciones Abiertas
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">
                        SNIES: {program.snies || "N/D"}
                      </span>
                    </div>

                    <CardTitle className="text-lg font-bold leading-snug text-gray-900 group-hover:text-purple-800 transition-colors line-clamp-3 min-h-[4.5rem]">
                      {program.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-4">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-gray-500 leading-snug">
                        {program.faculty}
                      </p>
                    </div>
                    <div className="mt-3 flex gap-4 text-xs text-gray-400 flex-wrap">
                      <span>{config.credits}</span>
                      <span>·</span>
                      <span>{config.duration}</span>
                      <span>·</span>
                      <span>{program.modality || "Presencial"}</span>
                    </div>
                  </CardContent>

                  <CardFooter className="px-6 pb-6 pt-0">
                    <Button
                      asChild
                      className="w-full h-11 rounded-xl font-semibold text-sm text-black hover:opacity-90 transition-opacity"
                      style={{ backgroundColor: config.accent }}
                    >
                      <Link to={`/programas/${program.slug}`}>
                        Ver detalles del programa{" "}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-gray-400" />
              </div>
              <p className="text-xl font-semibold text-gray-600 mb-2">
                No se encontraron programas
              </p>
              <p className="text-gray-400 mb-6">
                Intenta con otros términos de búsqueda o filtros.
              </p>
              <Button
                variant="outline"
                className="rounded-xl px-8"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedFaculty("all");
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
};

export default ProgramTypePage;
