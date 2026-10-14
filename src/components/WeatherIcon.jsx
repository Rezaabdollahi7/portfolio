import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun } from "lucide-react";

const WeatherIcon = ({ code, ...props }) => {
  const Icon =
    code === 0
      ? Sun
      : code <= 2
        ? CloudSun
        : code === 3
          ? Cloud
          : code <= 48
            ? CloudFog
            : code <= 57
              ? CloudDrizzle
              : code <= 67 || (code >= 80 && code <= 82)
                ? CloudRain
                : code <= 86
                  ? CloudSnow
                  : CloudLightning;
  return <Icon aria-hidden="true" {...props} />;
};

export default WeatherIcon;
