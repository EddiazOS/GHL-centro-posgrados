import { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  X,
  GraduationCap,
  Building2,
  MapPin,
  ArrowRight,
  Sparkles,
  CircleDot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { programs, FACULTIES, ALL_SEDES, slugify } from "@/data/programs";

interface Suggestion {
  type: "program" | "faculty" | "sede" | "type";
  label: string;
  subtitle?: string;
  link: string;
  icon: React.ReactNode;
}

export function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Build all searchable suggestions
  const allSuggestions = useMemo<Suggestion[]>(() => {
    const programSuggestions: Suggestion[] = programs.map((p) => ({
      type: "program",
      label: p.name,
      subtitle: p.faculty,
      link: `/programas/${p.slug}`,
      icon: <GraduationCap className="w-4 h-4 text-purple-600" />,
    }));

    const facultySuggestions: Suggestion[] = FACULTIES.map((f) => ({
      type: "faculty",
      label: f,
      subtitle: `${programs.filter((p) => p.faculty === f).length} programas`,
      link: `/facultad/${slugify(f)}`,
      icon: <Building2 className="w-4 h-4 text-blue-600" />,
    }));

    const sedeSuggestions: Suggestion[] = ALL_SEDES.map((s) => ({
      type: "sede",
      label: s,
      subtitle: `${programs.filter((p) => p.campus?.includes(s)).length} programas`,
      link: `/buscar?sede=${encodeURIComponent(s)}`,
      icon: <MapPin className="w-4 h-4 text-green-600" />,
    }));

    return [...programSuggestions, ...facultySuggestions, ...sedeSuggestions];
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return allSuggestions
      .filter(
        (s) =>
          s.label.toLowerCase().includes(q) ||
          s.subtitle?.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, allSuggestions]);

  // Group suggestions by type for display
  const groupedSuggestions = useMemo(() => {
    const groups: Record<string, Suggestion[]> = {};
    filteredSuggestions.forEach((s) => {
      if (!groups[s.type]) groups[s.type] = [];
      groups[s.type].push(s);
    });
    return groups;
  }, [filteredSuggestions]);

  const handleSearch = (customQuery?: string) => {
    const q = (customQuery ?? query).trim();
    if (q) {
      navigate(`/buscar?q=${encodeURIComponent(q)}`);
    } else {
      navigate(`/buscar`);
    }
    setIsOpen(false);
    setQuery("");
    setHighlightIndex(-1);
  };

  const handleSuggestionClick = (link: string) => {
    navigate(link);
    setIsOpen(false);
    setQuery("");
    setHighlightIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (highlightIndex >= 0 && highlightIndex < filteredSuggestions.length) {
        handleSuggestionClick(filteredSuggestions[highlightIndex].link);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        Math.min(prev + 1, filteredSuggestions.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setHighlightIndex(-1);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const typeLabels: Record<string, string> = {
    program: "Programas",
    faculty: "Facultades",
    sede: "Sedes",
  };

  let flatIndex = -1;

  return (
    <div
      className="relative z-30 -mt-8 md:-mt-14 mx-3 sm:mx-4 md:mx-auto max-w-4xl"
      ref={containerRef}
    >
      <div className="bg-primary p-3 md:p-5 rounded-2xl md:rounded-[2rem] shadow-xl">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            className="w-full pl-12 pr-12 bg-white border-none rounded-xl md:rounded-2xl h-12 md:h-14 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-black/20 placeholder:text-gray-400"
            placeholder="Busca por programa, facultad o sede..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setHighlightIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsOpen(true)}
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setHighlightIndex(-1);
                inputRef?.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Autocomplete dropdown */}
          {isOpen && query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 max-h-[60vh] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {filteredSuggestions.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Search className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm mb-1">
                    No encontramos resultados para "{query}"
                  </p>
                  <p className="text-gray-400 text-xs">
                    Intenta con otros términos
                  </p>
                </div>
              ) : (
                <>
                  {Object.entries(groupedSuggestions).map(([type, items]) => (
                    <div
                      key={type}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <div className="px-4 pt-3 pb-1 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {typeLabels[type] || type}
                      </div>
                      {items.map((s) => {
                        flatIndex++;
                        const idx = flatIndex;
                        return (
                          <button
                            key={`${type}-${s.label}`}
                            onClick={() => handleSuggestionClick(s.link)}
                            onMouseEnter={() => setHighlightIndex(idx)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                              highlightIndex === idx
                                ? "bg-purple-50"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                              {s.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-gray-900 truncate">
                                  {s.label}
                                </p>
                                {s.type === "program" &&
                                  programs.find((p) => p.name === s.label)
                                    ?.isOpenForRegistration && (
                                    <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                                      <CircleDot className="w-2.5 h-2.5" />
                                      Abiertas
                                    </span>
                                  )}
                              </div>
                              {s.subtitle && (
                                <p className="text-xs text-gray-500 truncate">
                                  {s.subtitle}
                                </p>
                              )}
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-300 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  ))}
                  <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                    <button
                      onClick={() => handleSearch()}
                      className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      <Search className="w-4 h-4" />
                      Ver todos los resultados para "{query}"
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Quick filter chips */}
        <div className="flex flex-wrap items-center gap-2 mt-3 px-1">
          <span className="flex items-center gap-1 text-xs text-white/70 font-medium">
            <Sparkles className="w-3 h-3" />
            Sugerencias:
          </span>
          {[
            "Doctorados",
            "Maestrías",
            "Especializaciones",
            "Ingeniería",
            "Medicina",
            "Cartagena",
            "Virtual",
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleSearch(chip)}
              className="px-3 py-1 text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
