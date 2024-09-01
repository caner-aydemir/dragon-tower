import Header from './components/Header/Header';
import DragonTower from './components/DragonTower/DragonTower';

let mainStyle = "text-white font-serif bg-gray-950 flex flex-col items-center h-screen w-screen gap-y-10 xs:gap-y-2"

function App() {

  return (
    <div className={mainStyle}>
      <Header />
      <DragonTower />
    </div>
  );
}

export default App;
