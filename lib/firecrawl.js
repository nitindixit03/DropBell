import Firecrawl from "@mendable/firecrawl-js";

const firecrawl = new Firecrawl({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: [
        {
          type: "json",
          prompt:
            "Extract the product name as productName, current price as a number as currentPrice, currency code such as USD or INR as currencyCode, and the main product image URL as productImageUrl. The productImageUrl must be the actual visible product photo, not a placeholder, transparent-background image, logo, icon, or other website asset.",
          schema: {
            type: "object",
            properties: {
              productName: { type: "string" },
              currentPrice: { type: "number" },
              currencyCode: { type: "string" },
              productImageUrl: { type: "string" },
            },
            required: ["productName", "currentPrice"],
          },
        },
      ],
    });

    console.log("Firecrawl result:", result);

    const extractedData = result.json;

    if (!extractedData || !extractedData.productName) {
      throw new Error("No data extracted from URL");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);

    throw new Error(
      `Failed to scrape product: ${error.message}`
    );
  }
}