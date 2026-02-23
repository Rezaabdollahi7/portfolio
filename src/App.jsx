import gsap from "gsap";
import Draggable from "gsap/Draggable";
import { Welcome, Dock, Home } from "#components";
import NavBar from "#components/NavBar";
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
  Setting,
  Vscode,
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
        <Setting />
        <Vscode />
      </main>
    </ThemeProvider>
  );
};

export default App;
