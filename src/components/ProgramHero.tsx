import { Button } from "@/components/ui/button";
import { Program } from "@/data/programs";
import { Download, ExternalLink } from "lucide-react";

interface ProgramHeroProps {
  program: Program;
}

export const ProgramHero = ({ program }: ProgramHeroProps) => {
  const [typeLabel, nameRest] = program.name.includes(" en ")
    ? program.name.split(" en ")
    : [program.type, program.name];

  return (
    <div className="bg-[#4b2e83] text-white py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      {/* Top decorative bar */}
      <div className="absolute top-0 left-0 w-full h-4 bg-black"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 mt-4">
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <h2 className="font-script text-5xl md:text-6xl text-[#ffc600] mb-2 font-medium">
              {typeLabel} en
            </h2>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight uppercase">
              {nameRest || program.name}
            </h1>
          </div>

          <div className="space-y-1 text-sm md:text-base opacity-95">
            <p>
              <span className="font-bold">Código SNIES:</span>{" "}
              {program.snies || "En trámite"}
            </p>
            <p>
              <span className="font-bold">Registro Calificado:</span>{" "}
              {program.resolucionMen || program.detail?.resolution || "Registro Calificado MEN"}
            </p>
            <p>
              <span className="font-bold">Vigencia:</span>{" "}
              {program.vigencia || program.detail?.validity || "7 años"}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            {program.smaLink && (
              <a
                href={program.smaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ffc600] text-black hover:bg-[#e6b200] font-bold rounded-full px-7 py-3.5 text-sm uppercase tracking-wider transition-transform hover:scale-105 shadow-md"
              >
                <span>Inscríbete en SMA</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {program.mallaUrl && (
              <a
                href={program.mallaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/30 font-semibold rounded-full px-6 py-3.5 text-sm tracking-wider transition-colors"
              >
                <Download className="w-4 h-4 text-[#ffc600]" />
                <span>Descargar Malla (PDF)</span>
              </a>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:border-l border-white/30 lg:pl-12 space-y-3.5 text-base md:text-lg">
          <p>
            <span className="font-semibold">Créditos:</span>{" "}
            {program.creditos || (program.type === "Doctorado" ? 120 : program.type === "Maestría" ? 48 : 24)}
          </p>
          <p>
            <span className="font-semibold">Jornada:</span> {program.detail?.contactLocation?.includes("Jornada") ? "Según programación" : "Tiempo completo / Quincenal"}
          </p>
          <p>
            <span className="font-semibold">Modalidad:</span> {program.modality || "Presencial"}
          </p>
          <p>
            <span className="font-semibold">Duración:</span> {program.duracion || (program.type === "Doctorado" ? "Cuatro (4) años" : program.type === "Maestría" ? "Dos (2) años" : "Un (1) año")}
          </p>
          <p>
            <span className="font-semibold">Valor Matrícula:</span> {program.valorMatricula || "Sujeto a liquidación oficial UDC"}
          </p>
          <p>
            <span className="font-semibold">Título Otorgado:</span> {program.detail?.degree || program.name}
          </p>
          <p>
            <span className="font-semibold">Facultad:</span> {program.faculty}
          </p>
        </div>
      </div>
    </div>
  );
};
