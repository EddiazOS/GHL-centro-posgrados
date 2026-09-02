import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Program } from "@/data/programs";

interface ProgramContentProps {
  program: Program;
}

export const ProgramContent = ({ program }: ProgramContentProps) => {
  return (
    <div className="py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden bg-white">
      {/* Decorative yellow wave (simplified with CSS) */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#ffc600] rounded-tl-[100px] opacity-20 pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">
          Detalles del Programa Académico
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem
            value="item-1"
            className="border-2 rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="text-xl md:text-2xl font-bold hover:no-underline py-6">
              Planta Docente - A quien va dirigido
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
              <p className="mb-4">
                El programa de {program.name} está dirigido a profesionales con
                título de pregrado afines a las ciencias de la salud, ciencias
                exactas, ingeniería o ciencias sociales según el área de
                conocimiento de la {program.faculty}.
              </p>
              <p>
                Contamos con una planta docente altamente calificada, compuesta
                por doctores y magísteres con amplia experiencia en
                investigación y publicaciones en revistas indexadas de alto
                impacto a nivel nacional e internacional.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-2"
            className="border-2 rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="text-xl md:text-2xl font-bold hover:no-underline py-6">
              Misión - Visión - Resultados de aprendizaje
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
              <p className="mb-4">
                <strong>Misión:</strong> Formar investigadores y profesionales
                del más alto nivel científico, capaces de liderar, formular y
                ejecutar proyectos originales e independientes que contribuyan
                al desarrollo científico y tecnológico de la región y el país.
              </p>
              <p>
                <strong>Resultados de aprendizaje:</strong> Los egresados serán
                capaces de proponer soluciones innovadoras a problemas
                complejos, diseñar nuevas estrategias y aplicar tecnologías
                avanzadas en su campo de acción.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="item-3"
            className="border-2 rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <AccordionTrigger className="text-xl md:text-2xl font-bold hover:no-underline py-6">
              Plan de estudio - Requisitos
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
              <p className="mb-4">
                El plan de estudios está estructurado para garantizar la
                formación integral del estudiante, incluyendo seminarios de
                investigación, asignaturas electivas de profundización y el
                desarrollo de un trabajo de grado o tesis.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Formulario de inscripción debidamente diligenciado.</li>
                <li>Título profesional en un área afín.</li>
                <li>Propuesta de investigación o ensayo de motivación.</li>
                <li>Entrevista con el comité de admisiones.</li>
                <li>
                  Certificación de suficiencia en idioma extranjero si aplica.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
