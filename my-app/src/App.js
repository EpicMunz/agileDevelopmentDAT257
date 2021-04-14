import logo from "./logo.svg";
import "./App.css";
import InteractiveMap from "./components/InteractiveMap";
import MenuHeader from "./components/MenuHeader";

//This is the file for App Component. App Component is the main component in React which acts as a container for all other components.

function App() {
  return (
    <div>
      <MenuHeader />
      <InteractiveMap />
    </div>
  );
}

export default App;
