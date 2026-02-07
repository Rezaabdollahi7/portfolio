// src/windows/Note.js
import { WindowControlls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { Check, Circle } from "lucide-react";
import { noteTasks } from "#constants";

const Note = () => {
  return (
    <section id="note" className="flex flex-col bg-white dark:bg-[#1e1e1e]">
      <div id="window-header">
        <WindowControlls target="note" />
        <h2 className="text-center text-sm font-medium flex-1">Notes</h2>
      </div>

      <div className="p-7 flex-1 overflow-y-auto">
        <div className="space-y-8">
          {/* Completed */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-green-700 font-bold mb-2 dark:text-green-400">
              Completed
            </h3>
            <ul className="space-y-4">
              {noteTasks
                .filter((t) => t.completed)
                .map((task) => (
                  <li key={task.id} className="note-item completed">
                    <Check className="note-icon text-green-500" />
                    <span className="note-text line-through">{task.text}</span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Upcoming */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-gray-500 font-bold my-3 dark:text-gray-400">
              Upcoming
            </h3>
            <ul className="space-y-4">
              {noteTasks
                .filter((t) => !t.completed)
                .map((task) => (
                  <li key={task.id} className="note-item">
                    <Circle className="note-icon text-gray-400" />
                    <span className="note-text">{task.text}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

const NoteWindow = WindowWrapper(Note, "note");
export default NoteWindow;
