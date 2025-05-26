import { useState } from 'react';
import { flights } from './flightsData';
import './App.css';

function App() {
  const [flightNumberInput, setFlightNumberInput] = useState('');
  const [dateInput, setDateInput] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // формат YYYY-MM-DD
  });
  const [foundFlight, setFoundFlight] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');

  const handleSearch = () => {
    setFoundFlight(null); // Скидання результату перед новим пошуком

    if (!flightNumberInput) {
      setSearchMessage('Будь ласка, введіть номер рейсу.');
      return;
    }

    if (dateInput) {
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
      const matchingFlights = flights.filter(
        (f) => f.flightNumber === flightNumberInput
      );

      if (matchingFlights.length === 0) {
        setSearchMessage(`Рейс ${flightNumberInput} не знайдено.`);
      } else if (matchingFlights.length === 1) {
        setFoundFlight(matchingFlights[0]);
        setSearchMessage('');
      } else {
        const uniqueDates = [...new Set(matchingFlights.map(f => f.date))];
        if (uniqueDates.length > 1) {
          setSearchMessage(`Знайдено декілька рейсів ${flightNumberInput} на різні дати. Будь ласка, вкажіть дату для уточнення.`);
        } else {
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
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <button onClick={handleSearch}>Знайти Рейс</button>
      </div>

      {searchMessage && <p className="message">{searchMessage}</p>}
      {foundFlight && (
  <div className="flight-info animate" key={foundFlight.flightNumber + foundFlight.date}>
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

export default App;
