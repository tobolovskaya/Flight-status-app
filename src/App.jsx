import { useState } from 'react'
import { flights } from './flightsData';
import './App.css'

function App() {
  const [flightNumberInput, setFlightNumberInput] = useState('');
  // Для MVP можна спростити і не використовувати поле для дати,
  // або додати пізніше. Пошук спершу лише за номером рейсу.
  const [dateInput, setDateInput] = useState(''); 
  const [foundFlight, setFoundFlight] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');

  const handleSearch = () => {
    setFoundFlight(null); // Reset foundFlight at the beginning of each search

    if (!flightNumberInput) {
      setSearchMessage('Будь ласка, введіть номер рейсу.');
      return;
    }

    if (dateInput) {
      // Search by flight number and date
      const flight = flights.find(
        (f) => f.flightNumber === flightNumberInput && f.date === dateInput
      );

      if (flight) {
        setFoundFlight(flight);
        setSearchMessage('');
      } else {
        setSearchMessage(`Рейс ${flightNumberInput} на дату ${dateInput} не знайдено.`);
      }
    } else {
      // Search by flight number only
      const matchingFlights = flights.filter(
        (f) => f.flightNumber === flightNumberInput
      );

      if (matchingFlights.length === 0) {
        setSearchMessage(`Рейс ${flightNumberInput} не знайдено.`);
      } else if (matchingFlights.length === 1) {
        setFoundFlight(matchingFlights[0]);
        setSearchMessage('');
      } else {
        // Multiple flights found for the same number on different dates
        // Check if all found flights are on the same date (unlikely based on current data but good for robustness)
        const uniqueDates = [...new Set(matchingFlights.map(f => f.date))];
        if (uniqueDates.length > 1) {
          setSearchMessage(`Знайдено декілька рейсів ${flightNumberInput} на різні дати. Будь ласка, вкажіть дату для уточнення.`);
        } else {
          // This case implies multiple flights with the same number and same date, which shouldn't happen with current data.
          // Handling it defensively by showing the first one.
          setFoundFlight(matchingFlights[0]);
          setSearchMessage('');
        }
      }
    }
  };

  return (
  <div className="container">
    <h1>Інформатор Статусу Рейсів</h1>
    <div className="search-form">
      <input
        type="text"
        value={flightNumberInput}
        onChange={(e) => setFlightNumberInput(e.target.value.toUpperCase())}
        placeholder="Номер рейсу (напр. WF101)"
      />
      <input
        type="text" // Або type="date" для кращого UX
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
        placeholder="Дата (YYYY-MM-DD)"
      />
      <button onClick={handleSearch}>Знайти Рейс</button>
    </div>

    {/* Область для відображення результатів */}
    {searchMessage && <p className="message">{searchMessage}</p>}
    {foundFlight && (
      <div className="flight-info">
        <h2>Інформація про рейс: {foundFlight.flightNumber}</h2>
        <p><strong>Статус:</strong> <span className={`status-${foundFlight.status.toLowerCase().replace(/\s+/g, '-')}`}>{foundFlight.status}</span></p>
        <p><strong>Призначення:</strong> {foundFlight.destination}</p>
        <p><strong>Вихід (Gate):</strong> {foundFlight.gate}</p>
        <p><strong>Дата:</strong> {foundFlight.date}</p>
      </div>
    )}
  </div>
);
}

export default App
