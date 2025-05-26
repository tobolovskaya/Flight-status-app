import { useState } from 'react'
import { flights } from './flightsData';
import './App.css'

function App() {
  const [flightNumberInput, setFlightNumberInput] = useState('');
  // Для MVP можна спростити і не використовувати поле для дати,
  // або додати пізніше. Пошук спершу лише за номером рейсу.
  // const [dateInput, setDateInput] = useState(''); 
  const [foundFlight, setFoundFlight] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');

  const handleSearch = () => {
  if (!flightNumberInput) {
    setSearchMessage('Будь ласка, введіть номер рейсу.');
    setFoundFlight(null);
    return;
  }

  // Для MVP шукаємо лише за номером рейсу.
  // Якщо будете додавати дату, розширте логіку пошуку.
  const flight = flights.find(
    (f) => f.flightNumber === flightNumberInput // && f.date === dateInput (якщо дата використовується)
  );

  if (flight) {
    setFoundFlight(flight);
    setSearchMessage(''); // Очистити повідомлення, якщо рейс знайдено
  } else {
    setFoundFlight(null);
    setSearchMessage(`Рейс ${flightNumberInput} не знайдено.`);
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
      {/* Можна додати поле для дати пізніше
      <input
        type="text" // Або type="date" для кращого UX
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
        placeholder="Дата (YYYY-MM-DD)"
      />
      */}
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
