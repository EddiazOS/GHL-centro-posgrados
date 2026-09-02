import { useMemo, useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { programs, slugify, FACULTIES, ALL_SEDES } from "@/data/programs";
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
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  GraduationCap,
  FlaskConical,
  ArrowRight,
  X,
  SlidersHorizontal,
  Building2,
  MapPin,
  Stethoscope,
  Sparkles,
  FileText,
  HelpCircle,
  Phone,
  CircleDot,
} from "lucide-react";

const TYPE_COLORS: Record<string, string> = {
  Doctorado: "bg-purple-100 text-purple-800 border-purple-200",
  Maestría: "bg-blue-100 text-blue-800 border-blue-200",
  Especialización: "bg-amber-100 text-amber-800 border-amber-200",
  "Especialización Médico-Quirúrgica": "bg-red-100 text-red-800 border-red-200",
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  Doctorado: <FlaskConical className="h-4 w-4" />,
  Maestría: <GraduationCap className="h-4 w-4" />,
  Especialización: <BookOpen className="h-4 w-4" />,
  "Especialización Médico-Quirúrgica": <Stethoscope className="h-4 w-4" />,
};

const TYPE_COUNTS_LABEL: Record<string, string> = {
  Doctorado: "Doctorados",
  Maestría: "Maestrías",
  Especialización: "Especializaciones",
  "Especialización Médico-Quirúrgica": "Esp. Médico-Quirúrgicas",
};

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialQ = searchParams.get("q") || "";
  const initialFacultad = searchParams.get("facultad") || "todas";
  const initialSede = searchParams.get("sede") || "todas";

  const [localQ, setLocalQ] = useState(initialQ);
  const [localFacultad, setLocalFacultad] = useState(initialFacultad);
  const [localSede, setLocalSede] = useState(initialSede);
  const [filterType, setFilterType] = useState("todos");

  // Sync local state when URL params change
  useEffect(() => {
    setLocalQ(searchParams.get("q") || "");
    setLocalFacultad(searchParams.get("facultad") || "todas");
    setLocalSede(searchParams.get("sede") || "todas");
  }, [searchParams]);

  const faculties = useMemo(() => FACULTIES, []);

  const results = useMemo(() => {
    return programs
      .filter((p) => {
        const q = initialQ.toLowerCase().trim();
        const matchQ =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.faculty.toLowerCase().includes(q) ||
          (p.campus || []).some((c) => c.toLowerCase().includes(q)) ||
          p.type.toLowerCase().includes(q);
        const matchFac =
          initialFacultad === "todas" || p.faculty === initialFacultad;
        const matchSede =
          initialSede === "todas" ||
          (p.campus && p.campus.includes(initialSede));
        const matchType = filterType === "todos" || p.type === filterType;
        return matchQ && matchFac && matchSede && matchType;
      })
      .sort((a, b) => {
        // Open registration programs first
        if (a.isOpenForRegistration && !b.isOpenForRegistration) return -1;
        if (!a.isOpenForRegistration && b.isOpenForRegistration) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [initialQ, initialFacultad, initialSede, filterType]);

  const typeCounts = useMemo(() => {
    return {
      Doctorado: results.filter((p) => p.type === "Doctorado").length,
      Maestría: results.filter((p) => p.type === "Maestría").length,
      Especialización: results.filter((p) => p.type === "Especialización")
        .length,
      "Especialización Médico-Quirúrgica": results.filter(
        (p) => p.type === "Especialización Médico-Quirúrgica",
      ).length,
    };
  }, [results]);

  const handleRefine = () => {
    const params = new URLSearchParams();
    if (localQ.trim()) params.set("q", localQ.trim());
    if (localFacultad && localFacultad !== "todas")
      params.set("facultad", localFacultad);
    if (localSede && localSede !== "todas") params.set("sede", localSede);
    navigate(`/buscar?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleRefine();
  };

  const clearFilters = () => {
    setLocalQ("");
    setLocalFacultad("todas");
    setLocalSede("todas");
    setFilterType("todos");
    navigate("/buscar");
  };

  const hasActiveFilters =
    initialQ ||
    (initialFacultad && initialFacultad !== "todas") ||
    (initialSede && initialSede !== "todas");

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />

      {/* Search Hero Banner */}
      <div className="bg-gradient-to-br from-[#4a1272] via-[#6b2ca0] to-[#8b45c2] pt-20 md:pt-24 pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-white/70 text-sm mb-4 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white">Resultados de búsqueda</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              {hasActiveFilters
                ? "Resultados de Búsqueda"
                : "Todos los Programas de Posgrado"}
            </h1>
            {hasActiveFilters ? (
              <p className="text-white/80 text-base sm:text-lg flex flex-wrap items-center gap-2">
                {initialQ && (
                  <span className="inline-flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full text-sm">
                    <Search className="w-3.5 h-3.5" />"{initialQ}"
                  </span>
                )}
                {initialFacultad && initialFacultad !== "todas" && (
                  <span className="inline-flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full text-sm">
                    <Building2 className="w-3.5 h-3.5" />
                    {initialFacultad}
                  </span>
                )}
                {initialSede && initialSede !== "todas" && (
                  <span className="inline-flex items-center gap-1 bg-white/15 px-3 py-1 rounded-full text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {initialSede}
                  </span>
                )}
              </p>
            ) : (
              <p className="text-white/80 text-base sm:text-lg">
                Explora nuestra oferta académica de alto nivel:{" "}
                {programs.length} programas disponibles
              </p>
            )}
          </div>

          {/* Inline Search Refinement */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 sm:p-4">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
              <div className="relative w-full md:flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  className="pl-10 bg-white border-none rounded-xl h-11 text-sm"
                  placeholder="Buscar por programa, facultad, sede..."
                  value={localQ}
                  onChange={(e) => setLocalQ(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <div className="w-full md:w-[200px] lg:w-[220px]">
                <Select value={localFacultad} onValueChange={setLocalFacultad}>
                  <SelectTrigger className="w-full bg-white border-none rounded-xl h-11 text-sm text-gray-600">
                    <SelectValue placeholder="Facultad" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-[300px]">
                    <SelectItem value="todas">Todas las Facultades</SelectItem>
                    {faculties.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-[140px] lg:w-[160px]">
                <Select value={localSede} onValueChange={setLocalSede}>
                  <SelectTrigger className="w-full bg-white border-none rounded-xl h-11 text-sm text-gray-600">
                    <SelectValue placeholder="Sede" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="todas">Todas las Sedes</SelectItem>
                    {ALL_SEDES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleRefine}
                className="w-full md:w-auto bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl h-11 px-5 sm:px-6 gap-2"
              >
                <Search className="h-4 w-4" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-gray-700 font-semibold">
              <span className="text-2xl font-bold text-[#4a1272]">
                {results.length}
              </span>
              <span className="ml-2 text-gray-600">
                programa{results.length !== 1 ? "s" : ""} encontrado
                {results.length !== 1 ? "s" : ""}
              </span>
            </span>
            <div className="hidden md:flex items-center gap-3 flex-wrap">
              {Object.entries(typeCounts).map(([type, count]) =>
                count > 0 ? (
                  <span
                    key={type}
                    className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full border ${TYPE_COLORS[type]}`}
                  >
                    {TYPE_ICONS[type]}
                    {count} {TYPE_COUNTS_LABEL[type]}
                  </span>
                ) : null,
              )}
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              <X className="h-4 w-4" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-60 xl:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden lg:sticky lg:top-4">
              <div className="bg-[#4a1272] text-white px-5 py-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="font-semibold text-sm">
                  Filtrar resultados
                </span>
              </div>
              <div className="p-5 space-y-5">
                {/* By type */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Tipo de Programa
                  </p>
                  <div className="space-y-2">
                    {[
                      "todos",
                      "Doctorado",
                      "Maestría",
                      "Especialización",
                      "Especialización Médico-Quirúrgica",
                    ].map((t) => (
                      <button
                        key={t}
                        onClick={() => setFilterType(t)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center justify-between ${
                          filterType === t
                            ? "bg-[#4a1272] text-white font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>
                          {t === "todos"
                            ? "Todos los tipos"
                            : t === "Especialización Médico-Quirúrgica"
                              ? "Esp. Médico-Quirúrgicas"
                              : t + "s"}
                        </span>
                        {t !== "todos" && (
                          <span
                            className={`text-xs font-bold rounded-full px-2 py-0.5 ${
                              filterType === t
                                ? "bg-white/20 text-white"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {typeCounts[t as keyof typeof typeCounts] ?? 0}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick links */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Explorar por Tipo
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        label: "Todos los Doctorados",
                        href: "/tipo/doctorados",
                      },
                      { label: "Todas las Maestrías", href: "/tipo/maestrias" },
                      {
                        label: "Todas las Especializaciones",
                        href: "/tipo/especializaciones",
                      },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        className="flex items-center justify-between text-sm text-[#4a1272] hover:text-[#6b2ca0] hover:bg-purple-50 px-3 py-2 rounded-lg transition-all group"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Faculties quick links */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Facultades
                  </p>
                  <div className="space-y-1 max-h-[200px] overflow-y-auto pr-1">
                    {faculties.map((f) => (
                      <Link
                        key={f}
                        to={`/facultad/${slugify(f)}`}
                        className="block text-xs text-gray-600 hover:text-[#4a1272] hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors truncate"
                      >
                        {f}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Sedes info */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Sedes
                  </p>
                  <div className="space-y-1">
                    {ALL_SEDES.map((s) => (
                      <div
                        key={s}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${s === "Cartagena" ? "bg-green-500" : "bg-gray-300"}`}
                        />
                        {s}
                        {s === "Cartagena" && (
                          <span className="text-xs text-green-600 font-medium">
                            Principal
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main className="flex-1 min-w-0">
            {results.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 md:p-16 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  No se encontraron resultados
                </h2>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  No encontramos programas que coincidan con tu búsqueda.
                  Intenta con otros términos o amplía los filtros.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-[#4a1272] hover:bg-[#6b2ca0] text-white"
                >
                  Ver todos los programas
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                {results.map((program) => (
                  <Link
                    key={program.id}
                    to={`/programas/${program.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-purple-200 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col"
                  >
                    {/* Card top accent */}
                    <div
                      className={`h-1.5 w-full ${
                        program.type === "Doctorado"
                          ? "bg-gradient-to-r from-purple-500 to-purple-700"
                          : program.type === "Maestría"
                            ? "bg-gradient-to-r from-blue-500 to-blue-700"
                            : program.type ===
                                "Especialización Médico-Quirúrgica"
                              ? "bg-gradient-to-r from-red-500 to-red-700"
                              : "bg-gradient-to-r from-amber-400 to-amber-600"
                      }`}
                    />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Type badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${TYPE_COLORS[program.type]}`}
                          >
                            {TYPE_ICONS[program.type]}
                            {program.type}
                          </span>
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

                      {/* Program name */}
                      <h3 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#4a1272] transition-colors line-clamp-3 flex-1">
                        {program.name}
                      </h3>

                      {/* Faculty */}
                      <div className="flex items-start gap-2 mt-3 pt-3 border-t border-gray-50">
                        <Building2 className="h-3.5 w-3.5 text-gray-400 mt-0.5 shrink-0" />
                        <span className="text-xs text-gray-500 leading-snug">
                          {program.faculty}
                        </span>
                      </div>

                      {/* CTA */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <MapPin className="h-3 w-3" />
                          {program.campus?.join(", ") || "Cartagena"}
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#4a1272] group-hover:gap-2 transition-all">
                          Ver detalles
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Info section below results */}
            {results.length > 0 && (
              <div className="mt-8 md:mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#4a1272]" />
                  Información de interés
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-start gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-purple-700" />
                    </div>
                    <h4 className="font-bold text-gray-900">
                      Proceso de Admisión
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Conoce los requisitos, fechas y documentos necesarios para
                      inscribirte a cualquier programa de posgrado.
                    </p>
                    <Link
                      to="/"
                      className="text-sm text-[#4a1272] font-semibold hover:underline mt-auto flex items-center gap-1"
                    >
                      Más información <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col items-start gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-yellow-700" />
                    </div>
                    <h4 className="font-bold text-gray-900">
                      Becas y Financiamiento
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Explora las opciones de becas, créditos ICETEX y convenios
                      de financiamiento disponibles para posgrados.
                    </p>
                    <Link
                      to="/"
                      className="text-sm text-[#4a1272] font-semibold hover:underline mt-auto flex items-center gap-1"
                    >
                      Ver opciones <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>

                  <div className="bg-gradient-to-br from-[#4a1272] to-[#8b45c2] rounded-2xl shadow-sm p-6 flex flex-col items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <HelpCircle className="h-5 w-5 text-white" />
                    </div>
                    <h4 className="font-bold text-white">
                      ¿Necesitas orientación?
                    </h4>
                    <p className="text-sm text-white/80 leading-relaxed">
                      Nuestros asesores académicos están disponibles para
                      ayudarte a elegir el programa ideal para tu perfil.
                    </p>
                    <Link
                      to="/#contacto"
                      className="mt-auto text-sm bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1"
                    >
                      Contáctanos <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Stats summary */}
                <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    Resumen de la oferta académica
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      {
                        label: "Doctorados",
                        count: programs.filter((p) => p.type === "Doctorado")
                          .length,
                        color: "text-purple-700 bg-purple-50",
                      },
                      {
                        label: "Maestrías",
                        count: programs.filter((p) => p.type === "Maestría")
                          .length,
                        color: "text-blue-700 bg-blue-50",
                      },
                      {
                        label: "Especializaciones",
                        count: programs.filter(
                          (p) => p.type === "Especialización",
                        ).length,
                        color: "text-amber-700 bg-amber-50",
                      },
                      {
                        label: "Esp. Médico-Quirúrgicas",
                        count: programs.filter(
                          (p) => p.type === "Especialización Médico-Quirúrgica",
                        ).length,
                        color: "text-red-700 bg-red-50",
                      },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className={`rounded-xl p-4 text-center ${stat.color}`}
                      >
                        <div className="text-2xl font-bold">{stat.count}</div>
                        <div className="text-xs font-medium mt-1">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
