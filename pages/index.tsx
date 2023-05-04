import { Inter } from 'next/font/google'

const Home = () => {
  return (
    <main>
      <ul>
        <li>
          <a href="./inventory">Inventory</a>
        </li>
        <li>
          <a href="./products">Products</a>
        </li>

      </ul>
    </main>
  )
}

export default Home;
