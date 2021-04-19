import logo from "./logo.svg";
import "./App.css";
import InteractiveMap from "./components/InteractiveMap";
import MenuHeader from "./components/MenuHeader";
import Schedule from "./components/Schedule";
import bookingPageContainer from "./components/bookingPage/bookingPageContainer";

//This is the file for App Component. App Component is the main component in React which acts as a container for all other components.

function App() {
  return (
    <div>

      <MenuHeader />
      <InteractiveMap />
      <Schedule />
      <BookingPageContainer/>
    </div>
  );
}

export default App;
