import toTwoDecimals from "@/src/utils/toTwoDecimals";

const TIMEZONE = "Europe/Berlin";
const HOURLY_LIMIT = 24;

function formatHour(timestamp: number) {
  return new Date(timestamp * 1000)
    .toLocaleTimeString("sv", {
      timeZone: TIMEZONE,
      hour: "2-digit",
      hour12: false,
    })
    .slice(0, 2);
}

const fetchUV = async (
  lat: string,
  long: string
): Promise<
  | {
      uv: string;
      hourly: any;
      maxUV: string[];
      sunset: string;
      sunsetHasPassed: boolean;
      requestedAt: string;
      maxUVIsTomorrow: boolean;
    }
  | false
> => {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=minutely,daily,alerts&units=metric&lang=sv&appid=${process.env.API_KEY}`;
  const now = new Date();

  let data;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    data = await response.json();
    if (!data.current.uvi) return false;
  } catch (err) {
    console.error("Failed to fetch UV data:", err);
    throw err;
  }

  // Current UV
  const currentUV = toTwoDecimals(data.current.uvi);

  // Determine slicing offset (0 if before half-hour, else 1)
  const offset = now.getMinutes() < 30 ? 0 : 1;
  const hoursCount = HOURLY_LIMIT - offset;

  // Build hourly UV data and find max
  let maxUV = { hour: "", value: 0 };
  const hourly = data.hourly.slice(offset, hoursCount).map((hourData, i) => {
    const uv = offset
      ? toTwoDecimals(hourData.uvi)
      : toTwoDecimals(
          ((parseFloat(hourData.uvi) + parseFloat(currentUV)) / 2).toString()
        );
    const hour = formatHour(hourData.dt);

    if (parseFloat(uv) > maxUV.value) maxUV = { hour, value: parseFloat(uv) };
    return [hour, uv];
  });

  // Sunset information
  const sunsetTs = data.current.sunset;
  const sunsetDate = new Date(sunsetTs * 1000);
  const sunsetHourMin = sunsetDate.toLocaleTimeString("sv", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunsetHasPassed = now.getTime() > sunsetDate.getTime();

  return {
    uv: currentUV,
    hourly,
    maxUV: [maxUV.hour, maxUV.value.toString()],
    sunset: sunsetHourMin,
    sunsetHasPassed,
    requestedAt: now.toLocaleString("sv", { timeZone: TIMEZONE }),
    maxUVIsTomorrow:
      parseInt(maxUV.hour) <
      parseInt(
        now
          .toLocaleString("sv", {
            timeZone: TIMEZONE,
          })
          .split(" ")[1]
          .split(":")[0],
        10
      ),
  };
};

export default fetchUV;
