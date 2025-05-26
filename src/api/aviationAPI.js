const API_KEY = import.meta.env.VITE_API_KEY; // розмісти ключ у .env

export const fetchFlightStatus = async (flightNumber, date) => {
  try {
    const response = await fetch(
      `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flightNumber}`
    );

    const data = await response.json();

    if (!data || !data.data) return { found: false, reason: "Немає даних від API." };

    const filtered = data.data.find((f) => f.flight.iata === flightNumber && f.flight_date === date);

    if (!filtered) {
      return { found: false, reason: `Рейс ${flightNumber} на дату ${date} не знайдено.` };
    }

    return {
      found: true,
      flight: {
        flightNumber: filtered.flight.iata,
        date: filtered.flight_date,
        status: filtered.flight_status || "Невідомо",
        destination: filtered.arrival?.airport || "Невідомо",
        gate: filtered.departure?.gate || "N/A"
      }
    };
  } catch (error) {
    return { found: false, reason: "Помилка при запиті до API." };
  }
};
