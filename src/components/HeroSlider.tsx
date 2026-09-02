import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Laptop,
  Award,
  Send,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { programs, Program } from "@/data/programs";
import { useToast } from "@/hooks/use-toast";

export function HeroSlider() {
  const { toast } = useToast();
  const navigate = useNavigate();

  // Programs with open registrations for slides
  const openPrograms = programs.filter((p) => p.isOpenForRegistration);

  // Track active slide for background sync
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form state — no program pre-selected
  const [selectedProgramSlug, setSelectedProgramSlug] = useState<string>("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Programs sorted: Open programs FIRST, then others
  const sortedPrograms = [...programs].sort((a, b) => {
    if (a.isOpenForRegistration && !b.isOpenForRegistration) return -1;
    if (!a.isOpenForRegistration && b.isOpenForRegistration) return 1;
    return a.name.localeCompare(b.name);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) {
      toast({
        title: "Campos requeridos",
        description: "Por favor diligencia tu nombre, correo y teléfono.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const chosen = programs.find((p) => p.slug === selectedProgramSlug);
      toast({
        title: "¡Solicitud enviada con éxito!",
        description: `Un asesor del Centro de Posgrados te contactará pronto con información sobre ${
          chosen?.name || "el programa seleccionado"
        }.`,
      });
      setFullName("");
      setEmail("");
      setPhone("");
    }, 1000);
  };

  return (
    <section className="relative w-full overflow-hidden bg-slate-900">
      {/* Full-bleed background image for the active slide */}
      <div className="absolute inset-0 z-0">
        {openPrograms.map((prog, idx) => (
          <div
            key={prog.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              currentSlide === idx ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${prog.image})`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* LEFT COLUMN: HERO SLIDER CAROUSEL (7 Cols on desktop) */}
          <div className="lg:col-span-7 xl:col-span-7 relative w-full">
            <Carousel
              opts={{
                loop: true,
                duration: 40,
              }}
              plugins={[
                Autoplay({ delay: 6500, stopOnInteraction: true }),
                Fade(),
              ]}
              setApi={(api) => {
                if (!api) return;
                api.on("select", () => {
                  setCurrentSlide(api.selectedScrollSnap());
                });
              }}
              className="w-full"
            >
              <CarouselContent>
                {openPrograms.map((prog: Program) => (
                  <CarouselItem key={prog.id}>
                    <div className="relative w-full min-h-[460px] sm:min-h-[500px] lg:min-h-[540px] flex flex-col justify-center p-6 sm:p-8 lg:p-10 group">
                      {/* Content */}
                      <div className="relative z-10 flex flex-col items-start">
                        {/* Open Registration Kicker */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500 text-white shadow-lg tracking-wide uppercase animate-pulse">
                            <Sparkles className="w-3.5 h-3.5 mr-1" />
                            ¡Inscripciones Abiertas!
                          </span>
                          <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
                            {prog.faculty}
                          </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white tracking-tight leading-tight mb-3 text-balance drop-shadow-md">
                          {prog.name}
                        </h1>

                        {/* Tagline */}
                        <p className="text-xs sm:text-sm md:text-base text-slate-200 mb-5 max-w-xl leading-relaxed font-normal">
                          {prog.tagline ||
                            "Formación avanzada de alta calidad académica en la Universidad de Cartagena. Potencia tu perfil profesional."}
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          <Badge className="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-3 py-1 text-xs">
                            <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
                            {prog.modality || "Presencial"}
                          </Badge>
                          {prog.campus && prog.campus.length > 0 && (
                            <Badge className="bg-white/15 hover:bg-white/25 text-white border border-white/20 px-3 py-1 text-xs">
                              <Laptop className="w-3.5 h-3.5 mr-1.5 text-primary" />
                              Sede {prog.campus.join(", ")}
                            </Badge>
                          )}
                          {prog.snies && (
                            <Badge className="bg-amber-500/80 text-black font-bold border-none px-3 py-1 text-xs">
                              <Award className="w-3.5 h-3.5 mr-1.5" />
                              SNIES {prog.snies}
                            </Badge>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                          <Button
                            asChild
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-black font-bold text-sm sm:text-base px-6 h-11 sm:h-12 shadow-lg rounded-xl flex-1 sm:flex-none"
                          >
                            <Link to={`/programas/${prog.slug}`}>
                              Ver detalles del programa
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={() => {
                              setSelectedProgramSlug(prog.slug);
                              const formElem =
                                document.getElementById("hero-lead-form");
                              formElem?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold text-sm sm:text-base px-5 h-11 sm:h-12 rounded-xl backdrop-blur-md"
                          >
                            Solicita Información
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Controls */}
              <div className="hidden sm:block">
                <CarouselPrevious className="left-3 bg-black/40 hover:bg-black/70 border-white/20 text-white h-10 w-10" />
                <CarouselNext className="right-3 bg-black/40 hover:bg-black/70 border-white/20 text-white h-10 w-10" />
              </div>
            </Carousel>
          </div>

          {/* RIGHT COLUMN: HERO LEAD CAPTURE FORM (5 Cols on desktop) */}
          <div
            className="lg:col-span-5 xl:col-span-5 w-full"
            id="hero-lead-form"
          >
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 relative overflow-hidden">
              {/* Header Decorative Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-amber-400 to-amber-600" />

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
                    <Sparkles className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    Solicita más información
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  Déjanos tus datos y un asesor académico te brindará atención
                  personalizada sobre admisión y becas.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <div>
                  <Label
                    htmlFor="hero-fullname"
                    className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block"
                  >
                    Nombre completo *
                  </Label>
                  <Input
                    id="hero-fullname"
                    type="text"
                    required
                    placeholder="Ej. María Camila Pérez"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-primary"
                  />
                </div>

                {/* Email & Phone side-by-side on sm+ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label
                      htmlFor="hero-email"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block"
                    >
                      Correo electrónico *
                    </Label>
                    <Input
                      id="hero-email"
                      type="email"
                      required
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="hero-phone"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block"
                    >
                      Teléfono / WhatsApp *
                    </Label>
                    <Input
                      id="hero-phone"
                      type="tel"
                      required
                      placeholder="Ej. 300 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-10 text-sm bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Programa de Interés */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Label
                      htmlFor="hero-program-select"
                      className="text-xs font-bold text-slate-700 dark:text-slate-300"
                    >
                      Programa de interés *
                    </Label>
                    <span className="text-[10px] text-emerald-600 font-extrabold uppercase flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Inscripciones 2026-II
                    </span>
                  </div>

                  <select
                    id="hero-program-select"
                    value={selectedProgramSlug}
                    onChange={(e) => setSelectedProgramSlug(e.target.value)}
                    className="w-full h-11 px-3 text-xs sm:text-sm font-medium rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
                  >
                    <option value="" disabled>
                      — Selecciona un programa —
                    </option>
                    <optgroup label="🟢 PROGRAMAS CON INSCRIPCIONES ABIERTAS">
                      {sortedPrograms
                        .filter((p) => p.isOpenForRegistration)
                        .map((p) => (
                          <option key={p.id} value={p.slug}>
                            🟢 {p.name} ({p.type})
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="── OTROS PROGRAMAS DE POSGRADO ──">
                      {sortedPrograms
                        .filter((p) => !p.isOpenForRegistration)
                        .map((p) => (
                          <option key={p.id} value={p.slug}>
                            {p.name} ({p.type})
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-extrabold text-sm h-11 rounded-xl shadow-lg transition-all"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      Enviando solicitud...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      Enviar solicitud de información
                    </span>
                  )}
                </Button>

                <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 mt-2">
                  🔒 Tus datos están protegidos conforme a la ley de datos
                  personales de la Universidad de Cartagena.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
