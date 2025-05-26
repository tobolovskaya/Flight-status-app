import { useState } from 'react';
import './App.css';
import { fetchFlightStatus } from './api/aviationAPI';
import PlaneSpinner from './component/PlaneSpinner';
import { useTranslation } from 'react-i18next';


function App() {
  const [flightNumberInput, setFlightNumberInput] = useState('');
  const [dateInput, setDateInput] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD
  });
  const [foundFlight, setFoundFlight] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
  i18n.changeLanguage(lang);
};


  const handleSearch = async () => {
    setFoundFlight(null);
    setSearchMessage('');
    setIsLoading(true);

    if (!flightNumberInput) {
      setSearchMessage('Будь ласка, введіть номер рейсу.');
      setIsLoading(false);
      return;
    }

    const result = await fetchFlightStatus(flightNumberInput, dateInput);

    if (result.found) {
      setFoundFlight(result.flight);
    } else {
      setSearchMessage(result.reason);
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="lang-buttons">
  <button onClick={() => changeLanguage('ua')}>🇺🇦</button>
  <button onClick={() => changeLanguage('no')}>🇳🇴</button>
  <button onClick={() => changeLanguage('en')}>🇬🇧</button>
</div>
      <h1>{t('title')}</h1>
      <div className="search-form">
        <input
          type="text"
          value={flightNumberInput}
          onChange={(e) => setFlightNumberInput(e.target.value.toUpperCase())}
          placeholder={t('placeholderFlight')}
        />
        <input
          type="date"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
        />
        <button onClick={handleSearch}>{t('button')}</button>
      </div>

      {isLoading && <PlaneSpinner />}

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
