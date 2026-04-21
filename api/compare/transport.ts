export const config = {
  runtime: 'edge',
};

// Realistic pricing configurations for Indian transport (in INR)
const TRANSPORT_CONFIG = {
  auto: { base: 30, perKm: 15, perMin: 1.5, name: "Auto Rickshaw" },
  mini: { base: 50, perKm: 20, perMin: 2, name: "Mini Cab" },
  sedan: { base: 70, perKm: 25, perMin: 2.5, name: "Sedan Cab" },
  bike: { base: 20, perKm: 10, perMin: 1, name: "Bike Taxi" }
};

export default async function handler(request: Request) {
  const url = new URL(request.url);
  const pickup = url.searchParams.get('pickup');
  const dropoff = url.searchParams.get('dropoff');
  
  if (!pickup || !dropoff) {
    return new Response(JSON.stringify({ error: 'Parameters "pickup" and "dropoff" are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const apiKey = process.env.VITE_ORS_KEY;
    
    // Fallback if no API key is provided
    if (!apiKey || apiKey === 'your_openrouteservice_key_here') {
      return new Response(JSON.stringify([
        { platform: "Ola", price: "Demo Mode (Add API Key)", rating: 4.2, delivery: "4 min away", badge: "Demo Data", link: "https://book.olacabs.com/" },
        { platform: "Uber", price: "Demo Mode (Add API Key)", rating: 4.5, delivery: "2 min away", link: "https://m.uber.com/looking" },
        { platform: "Rapido", price: "Demo Mode (Add API Key)", rating: 4.0, delivery: "6 min away", link: "https://www.rapido.bike/" }
      ]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Step 1: Geocode the pickup and dropoff locations
    // We would use OpenRouteService Geocoding here to get coordinates.
    // For brevity in MVP, let's assume we do that, or we use a simplified distance algorithm.
    // Since ORS geocoding requires coordinates, we'll fetch them.
    
    const getCoords = async (address: string) => {
      const res = await fetch(`https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}&boundary.country=IN`);
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        return data.features[0].geometry.coordinates; // [lon, lat]
      }
      return null;
    };

    const pickupCoords = await getCoords(pickup);
    const dropoffCoords = await getCoords(dropoff);

    if (!pickupCoords || !dropoffCoords) {
      return new Response(JSON.stringify({ error: 'Could not find locations' }), { status: 404 });
    }

    // Step 2: Get Distance Matrix or Directions
    const routeRes = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${pickupCoords.join(',')}&end=${dropoffCoords.join(',')}`);
    const routeData = await routeRes.json();
    
    if (!routeData.features || routeData.features.length === 0) {
      return new Response(JSON.stringify({ error: 'No route found' }), { status: 404 });
    }

    const summary = routeData.features[0].properties.summary;
    const distanceKm = summary.distance / 1000;
    const durationMin = summary.duration / 60;

    // Step 3: Calculate estimated fares
    const calculateFare = (config: any) => {
      const baseFare = config.base + (distanceKm * config.perKm) + (durationMin * config.perMin);
      // Add a slight random variation (surge/availability) between -5% and +15%
      const multiplier = 0.95 + (Math.random() * 0.20); 
      return Math.round(baseFare * multiplier);
    };

    const results = [
      {
        platform: "Ola",
        price: `₹${calculateFare(TRANSPORT_CONFIG.mini)}`,
        rating: 4.2,
        delivery: `${Math.floor(Math.random() * 5) + 2} min away`,
        badge: "Cheapest",
        link: "https://book.olacabs.com/"
      },
      {
        platform: "Uber",
        price: `₹${calculateFare(TRANSPORT_CONFIG.sedan)}`,
        rating: 4.5,
        delivery: `${Math.floor(Math.random() * 4) + 1} min away`,
        badge: "Nearest",
        link: "https://m.uber.com/looking"
      },
      {
        platform: "Rapido",
        price: `₹${calculateFare(TRANSPORT_CONFIG.bike)}`,
        rating: 4.0,
        delivery: `${Math.floor(Math.random() * 6) + 3} min away`,
        link: "https://www.rapido.bike/"
      }
    ];

    // Sort by price roughly
    results.sort((a, b) => parseInt(a.price.replace('₹', '')) - parseInt(b.price.replace('₹', '')));

    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching transport data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch transport data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
