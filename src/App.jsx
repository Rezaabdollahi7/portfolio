import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { NavBar, Welcome, Dock, Home } from "#components";
import {
  Terminal,
  Safari,
  Resume,
  Finder,
  Text,
  ImageWindowContent,
  Contact,
  Photos,
  Note,
} from "#windows";
import { ThemeProvider } from "./context/ThemeContext";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <ThemeProvider>
      <main>
        <NavBar />
        <Welcome />
        <Dock />
        <Home />
        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <ImageWindowContent />
        <Contact />
        <Photos />
        <Note />
      </main>
    </ThemeProvider>
  );
};

export default App;
