import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import DragonTower from './components/DragonTower/DragonTower';

let mainStyle = "text-white font-serif bg-gray-950 flex flex-col items-center w-full h-screen gap-y-10"

function App() {

  return (
    <div className={mainStyle}>
      <Header />
      <DragonTower />
    </div>
  );
}

export default App;
