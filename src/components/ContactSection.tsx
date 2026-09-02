import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { toast } from "@/hooks/use-toast";

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Formulario enviado",
      description: "Nos pondremos en contacto contigo pronto.",
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-white flex flex-col md:flex-row">
      {/* Decorative yellow shapes - Top Left */}
      <div className="absolute top-0 left-0 w-[200px] h-[300px] bg-transparent border-[30px] border-[#f1b434] rounded-[100px] -translate-x-1/2 -translate-y-1/2 rotate-[30deg] z-0" />

      {/* Decorative yellow shapes - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-transparent border-[40px] border-[#f1b434] rounded-full translate-x-1/4 translate-y-1/4 z-0" />

      {/* Vertical Text Right */}
      <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 items-center justify-center h-full z-0 pointer-events-none">
        <span
          className="text-[#519c98] text-4xl font-black tracking-[0.2em] opacity-40 whitespace-nowrap"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          #IMPULSATUFUTURO
        </span>
      </div>

      <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-16 lg:p-24 relative z-10 flex flex-col justify-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-[#1b7a75] mb-4 sm:mb-6 leading-tight uppercase">
          ESTUDIA EN
          <br />
          LA MEJOR
          <br />
          UNIVERSIDAD
          <br />
          DEL CARIBE
          <br />
          COLOMBIANO
        </h2>

        <p className="text-base sm:text-lg font-bold text-gray-800 mb-6 sm:mb-8">
          ¡Solicita información ahora!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
          <div className="space-y-2">
            <Label htmlFor="nombres">Nombres *</Label>
            <Input
              id="nombres"
              placeholder="Nombres"
              required
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="apellidos">Apellidos *</Label>
            <Input
              id="apellidos"
              placeholder="Apellidos"
              required
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">WhatsApp *</Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="WhatsApp"
              required
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico *</Label>
            <Input
              id="email"
              type="email"
              placeholder="Correo Electrónico"
              required
              className="border-gray-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje">Mensaje *</Label>
            <Textarea
              id="mensaje"
              placeholder="Escribe tu mensaje o consulta aquí"
              required
              rows={4}
              className="border-gray-300"
            />
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" required />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-600"
            >
              Acepto términos y condiciones.
            </label>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#a04033] hover:bg-[#853428] text-white font-bold py-6 mt-4 rounded-md"
          >
            Enviar
          </Button>
        </form>
      </div>

      <div className="w-full md:w-1/2 relative min-h-[300px] sm:min-h-[400px] md:min-h-screen">
        <img
          src="https://vibe.filesafe.space/1787862407256452737/attachments/b5ee50b4-f8f4-4087-a9f7-d2e9863b599a.png"
          alt="Universidad de Cartagena"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
