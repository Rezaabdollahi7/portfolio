import gsap from "gsap";
import Draggable from "gsap/Draggable";

import { NavBar, Welcome, Dock } from "#components";
import { Terminal, Safari, Resume } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <NavBar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
    </main>
  );
};

export default App;
