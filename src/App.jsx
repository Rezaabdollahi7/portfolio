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
} from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
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
    </main>
  );
};

export default App;
