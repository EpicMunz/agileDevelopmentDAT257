import logo from "./logo.svg";
import "./App.css";
import InteractiveMap from "./components/InteractiveMap";
import MenuHeader from "./components/MenuHeader";

function App() {
  return (
    <div>
      <MenuHeader />
      <InteractiveMap />
    </div>
  );
}

export default App;
