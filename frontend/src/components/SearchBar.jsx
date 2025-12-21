import { useTranslation } from 'react-i18next';

export default function SearchBar() {
  const { t } = useTranslation();

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          id="autocomplete"
          type="text"
          placeholder={t('search_placeholder')}
        />
        <button type="button" className="search-button">
          {t('search')}
        </button>
      </div>
    </div>
  );
}
