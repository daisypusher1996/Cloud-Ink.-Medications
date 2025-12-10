import { GoogleGenAI } from "@google/genai";
import { DashboardData } from "../types";

const apiKey = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
}

export const generateHospitalInsights = async (data: DashboardData): Promise<string> => {
  if (!ai) {
    return "API Key not configured. Unable to generate AI insights.";
  }

  try {
    // Summarize data to keep prompt size manageable
    const summary = {
        totalMedications: data.stats.find(s => s.label === "Total SKUs")?.value,
        lowStockAlerts: data.stats.find(s => s.label === "Low Stock Alerts")?.value,
        inventoryValue: data.stats.find(s => s.label === "Inventory Value")?.value,
        criticalItems: data.inventoryLevels.filter(i => i.stock <= i.reorderLevel).map(i => i.name),
        recentOrdersTrend: data.orderTrends.slice(-3),
        topManufacturers: Array.from(new Set(data.rawMedications.map(m => m.manufacturer))).slice(0, 5),
        sampleBatchInfo: data.rawMedications.slice(0, 2).map(m => ({ name: m.medication_name, batch: m.batch_number }))
    };

    const prompt = `
      You are the Pharmacy Director for "Cloud Ink Co.".
      Analyze the current inventory and purchase order data.
      
      Dashboard Summary:
      ${JSON.stringify(summary)}

      Provide a concise executive summary (max 3 sentences). 
      Focus on stock risks (low stock items), financial value of inventory, and supply chain diversity (manufacturers).
      If there are low stock alerts, prioritize mentioning them and suggesting reorders.
      Mention specific manufacturer names if relevant to supply chain diversity.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "No insights generated.";
  } catch (error) {
    console.error("Error generating insights:", error);
    return "Unable to generate insights at this time due to a connection error.";
  }
};