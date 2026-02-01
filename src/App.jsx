import gsap from "gsap";
import Draggable from "gsap/Draggable";

import { NavBar, Welcome, Dock } from "#components";
import { Terminal } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <NavBar />
      <Welcome />
      <Dock />
      <Terminal />
    </main>
  );
};

export default App;
