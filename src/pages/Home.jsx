import Categories from '../components/Categories';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LatestBlogs from '../components/LatestBlogs';
import TrendingProducts from '../components/TrendingProduct';

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <main>
        <TrendingProducts />
        <Categories />
        <LatestBlogs />

      </main>
    </div>
  )
}

export default Home;