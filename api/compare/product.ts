export const config = {
  runtime: 'edge',
};

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q');
  
  if (!query) {
    return new Response(JSON.stringify({ error: 'Query parameter "q" is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiKey = process.env.VITE_SERPAPI_KEY;
    
    // If no API key, return mock data for demo purposes so it doesn't break
    if (!apiKey || apiKey === 'your_serpapi_key_here') {
      return new Response(JSON.stringify([
        { platform: "Amazon", price: "₹299", rating: 4.5, delivery: "Tomorrow", badge: "Demo Data (No API Key)" },
        { platform: "Flipkart", price: "₹315", rating: 4.3, delivery: "2 days" }
      ]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const serpApiUrl = new URL('https://serpapi.com/search.json');
    serpApiUrl.searchParams.append('q', query);
    serpApiUrl.searchParams.append('tbm', 'shop');
    serpApiUrl.searchParams.append('gl', 'in'); // India
    serpApiUrl.searchParams.append('hl', 'en');
    serpApiUrl.searchParams.append('api_key', apiKey);

    const response = await fetch(serpApiUrl.toString());
    const data = await response.json();

    if (!data.shopping_results) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Transform to MockResult format expected by the frontend
    const results = data.shopping_results.slice(0, 5).map((item: any) => ({
      platform: item.source || "Unknown Store",
      price: item.price ? `₹${item.extracted_price}` : "N/A",
      originalPrice: item.extracted_old_price ? `₹${item.extracted_old_price}` : undefined,
      rating: item.rating || 4.0, // Default if not provided
      delivery: item.delivery || "Standard Delivery",
      badge: item.extracted_price && data.shopping_results[0].extracted_price === item.extracted_price ? "Best Price" : undefined
    }));

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch product data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
