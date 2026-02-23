import React from "react";
import WindowControlls from "#components/windowControlls";
import WindowWrapper from "#hoc/WindowWrapper";
import { useTheme } from "#context/ThemeContext";
import { wallpapers } from "#constants";

const Setting = () => {
  const { wallpaper, changeWallpaper } = useTheme();

  return (
    <section id="setting">
      <div id="window-header">
        <WindowControlls target="setting" />
        <h2>Settings</h2>
      </div>

      <div className="settings-content">
        <h3>Desktop Wallpaper</h3>

        <div className="wallpaper-grid">
          {wallpapers.map((wp) => (
            <div
              key={wp.id}
              className={`wallpaper-option ${wallpaper === wp.id ? "active" : ""}`}
              onClick={() => changeWallpaper(wp.id)}
            >
              <div
                className="preview-light"
                style={{ backgroundImage: `url(${wp.lightPreview})` }}
              />
              <div
                className="preview-dark"
                style={{ backgroundImage: `url(${wp.darkPreview})` }}
              />
              <div className="wallpaper-label">
                <span>{wp.name}</span>
              </div>

              {wallpaper === wp.id && (
                <div className="selected-badge">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="current-selection">
          <h4>Current Selection</h4>
          <p>
            Selected wallpaper: <span>{wallpaper}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

const SettingWindow = WindowWrapper(Setting, "setting");
export default SettingWindow;
