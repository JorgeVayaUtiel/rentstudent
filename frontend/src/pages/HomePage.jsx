import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Map from '../components/Map';
import LatestAds from '../components/LatestAds';

export default function HomePage() {
  return (
    <div>
      <Header />
      <main style={{ paddingBottom: '60px' }}>
        <SearchBar />
        <Map />
        <LatestAds />
      </main>
    </div>
  );
}
