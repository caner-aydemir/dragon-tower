import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';

let mainStyle = "text-white font-serif bg-gray-950 w-full h-screen"

function App() {

  return (
    <div className={mainStyle}>
      <Header />
    </div>
  );
}

export default App;
