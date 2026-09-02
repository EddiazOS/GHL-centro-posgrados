/**
 * Configuración del CRM GoHighLevel (GHL) y utilidades de captura de Leads
 */

export interface LeadPayload {
  name: string;
  email: string;
  phone: string;
  message?: string;
  programName?: string;
  faculty?: string;
  level?: string;
  snies?: string;
  mallaUrl?: string;
  smaLink?: string;
  channel?: "web-form" | "whatsapp-agustina";
}

export const CRM_CONFIG = {
  // URL del Webhook Inbound de GHL (configurable por variable de entorno o endpoint por defecto)
  ghlWebhookUrl:
    import.meta.env.VITE_GHL_WEBHOOK_URL ||
    "https://services.leadconnectorhq.com/hooks/inbound/posgrados-udc",
  // Número oficial de WhatsApp Business de atención y admisiones (formato internacional sin signos)
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "573164390360",
};

/**
 * Captura parámetros UTM de la URL actual
 */
export const getUtmParameters = () => {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") || "directo",
    utm_medium: params.get("utm_medium") || "web",
    utm_campaign: params.get("utm_campaign") || "organico",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
  };
};

/**
 * Envía los datos del lead a GoHighLevel de manera asíncrona
 */
export const sendLeadToGHL = async (data: LeadPayload): Promise<{ success: boolean; message?: string }> => {
  try {
    const utms = getUtmParameters();
    const payload = {
      first_name: data.name.split(" ")[0] || data.name,
      last_name: data.name.split(" ").slice(1).join(" ") || "",
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      notes: data.message || "Interesado en información y admisiones de posgrado",
      custom_fields: {
        programa_posgrado: data.programName || "General",
        facultad_posgrado: data.faculty || "",
        nivel_formacion: data.level || "",
        codigo_snies: data.snies || "",
        malla_curricular_url: data.mallaUrl || "",
        sma_convocatoria_link: data.smaLink || "",
        origen_canal: data.channel || "web-form",
        pagina_origen: typeof window !== "undefined" ? window.location.href : "",
        ...utms,
      },
      tags: [
        "web-centro-posgrados",
        data.channel === "whatsapp-agustina" ? "canal:whatsapp" : "canal:formulario-web",
        data.level ? `nivel:${data.level.toLowerCase().replace(/\s+/g, "-")}` : "posgrados",
        data.programName
          ? `posgrado:${data.programName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`
          : "general",
      ],
      created_at: new Date().toISOString(),
    };

    // Si hay webhook configurado, enviamos mediante fetch (con mode no-cors si el endpoint de GHL tiene restricción CORS)
    if (CRM_CONFIG.ghlWebhookUrl) {
      fetch(CRM_CONFIG.ghlWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        mode: "no-cors", // Permite envío seguro a endpoints de GHL sin bloqueos por CORS en el cliente
      }).catch((err) => console.warn("Aviso envío CRM GHL:", err));
    }

    // Notificar a la ventana contenedora de GoHighLevel para disparar eventos de conversión/píxel
    try {
      if (typeof window !== "undefined" && window.parent && window.parent !== window) {
        window.parent.postMessage({ type: "GHL_LEAD_SUBMITTED", lead: payload }, "*");
      }
    } catch {
      // Ignorar si hay políticas de origen restringidas
    }

    // Almacenamos localmente el último lead enviado para evitar duplicidades
    try {
      localStorage.setItem("ultimo_lead_posgrados_udc", JSON.stringify(payload));
    } catch {
      // Ignorar errores de localStorage
    }

    return { success: true };
  } catch (error) {
    console.error("Error procesando lead para GHL:", error);
    return { success: false, message: "Error al enviar solicitud" };
  }
};
