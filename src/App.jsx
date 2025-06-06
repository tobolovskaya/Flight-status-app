import { useEffect, useState } from 'react';
import './App.css';
import { fetchFlightStatus } from './api/aviationAPI';
import PlaneSpinner from './component/PlaneSpinner';
import { useTranslation } from 'react-i18next';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import en from 'date-fns/locale/en-US';
import no from 'date-fns/locale/nb';
import ua from 'date-fns/locale/uk';

registerLocale('en', en);
registerLocale('no', no);
registerLocale('ua', ua);

function App() {
  const [flightNumberInput, setFlightNumberInput] = useState('');
  const [dateInput, setDateInput] = useState(new Date());
  const [foundFlight, setFoundFlight] = useState(null);
  const [searchMessage, setSearchMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t('title');
  }, [t]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const handleSearch = async () => {
    setFoundFlight(null);
    setSearchMessage('');
    setIsLoading(true);

    if (!flightNumberInput) {
      setSearchMessage(t('enterNumber'));
      setIsLoading(false);
      return;
    }

    const formattedDate = dateInput.toISOString().split('T')[0];

    const result = await fetchFlightStatus(flightNumberInput, formattedDate);

    if (result.found) {
      setFoundFlight(result.flight);
    } else {
      setSearchMessage(t('notFound', {
        number: flightNumberInput,
        date: formattedDate
      }));
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <div className="lang-buttons">
 <button onClick={() => changeLanguage('no')}>
  <img src="https://flagcdn.com/no.svg" alt="Norwegian" width="24" height="16" />
</button>
<button onClick={() => changeLanguage('en')}>
  <img src="https://flagcdn.com/gb.svg" alt="English" width="24" height="16" />
</button>
<button onClick={() => changeLanguage('ua')}>
  <img src="https://flagcdn.com/ua.svg" alt="Ukrainian" width="24" height="16" />
</button>
</div>

      <h1>{t('title')}</h1>

      <div className="search-form">
        <input
          type="text"
          value={flightNumberInput}
          onChange={(e) => setFlightNumberInput(e.target.value.toUpperCase())}
          placeholder={t('placeholderFlight')}
        />
        <DatePicker
  selected={new Date(dateInput)}
  onChange={(date) => setDateInput(date.toISOString().split('T')[0])}
  dateFormat="yyyy-MM-dd"
  className="custom-datepicker"
  calendarStartDay={1}
/>
        <button onClick={handleSearch}>{t('button')}</button>
      </div>

      {isLoading && <PlaneSpinner />}

      {searchMessage && <p className="message">{searchMessage}</p>}

      {foundFlight && (
        <div className="flight-info animate" key={foundFlight.flightNumber + foundFlight.date}>
          <h2>{t('flightInfo')}: {foundFlight.flightNumber}</h2>
          <p><strong>{t('status')}:</strong> <span className={`status-${foundFlight.status.toLowerCase().replace(/\s+/g, '-')}`}>
            {t(`statusValues.${foundFlight.status.toLowerCase()}`, { defaultValue: foundFlight.status })}
          </span></p>
          <p><strong>{t('destination')}:</strong> {foundFlight.destination}</p>
          <p><strong>{t('gate')}:</strong> {foundFlight.gate}</p>
          <p><strong>{t('date')}:</strong> {foundFlight.date}</p>
        </div>
      )}
    </div>
  );
}

export default App;