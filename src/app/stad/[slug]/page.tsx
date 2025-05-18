import cities from "@/src/assets/city_static_params";
import { getImageProps } from "next/image";
import high_day from "@/src/assets/skies/high_day-min.png";
import TanningTimeWidget from "@/src/components/TanningTimeWidget";
import { TanningProvider } from "@/src/contexts/tanningContext";
import fetchUV from "@/src/utils/fetchUV";
import ForecastWidget from "@/src/components/ForecastWidget";

export async function generateStaticParams() {
  return Object.keys(cities).map((slug) => ({
    slug,
  }));
}

function getBackgroundImage(srcSet = "") {
  const imageSet = srcSet
    .split(", ")
    .map((str) => {
      const [url, dpi] = str.split(" ");
      return `url("${url}") ${dpi}`;
    })
    .join(", ");
  return `image-set(${imageSet})`;
}

export default async function CityPage({ params }) {
  const { slug: encodedSlug } = await params;
  const slug = decodeURIComponent(encodedSlug);
  const cityData = await cities[slug];

  if (!cityData) return <>Not found!</>;

  const uvData = await fetchUV(cityData.lat, cityData.long);
  if (!uvData) return <>Not found!</>;
  // TODO: Fix these error pages

  const {
    props: { srcSet },
  } = getImageProps({ alt: "", width: 1920, height: 1080, src: high_day });
  const backgroundImage = getBackgroundImage(srcSet);

  return (
    <TanningProvider>
      <div>
        <div
          className="fixed left-0 top-0 z-0 h-screen w-screen bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage }}
        ></div>
        <div className="flex relative z-1 px-4 gap-4">
          <div className="shrink grow-0 pt-20 xl:block hidden">
            {/* Ad space */}
          </div>
          <div className="max-w-xl mx-auto grow shrink-0">
            <div className="text-center px-2 py-20 text-neutral-50">
              <span className="block text-3xl">
                I {cityData.name} är UV-index
              </span>
              <p className="font-black font-serif">
                <span className="text-[16rem] leading-[1] pl-32">2</span>
                <span className="text-8xl leading-[1] opacity-55">.89</span>
              </p>
              <span className="block text-3xl mt-4">just nu.</span>
            </div>
            <div>{/* Ad space */}</div>
            <div className="py-4">
              <TanningTimeWidget
                currentUVIndex={parseInt(uvData.uv ?? "", 10)}
                uvHourByHour={uvData.hourly}
              />
            </div>
            <div>{/* Ad space */}</div>
            <div className="py-4">
              <ForecastWidget
                maxUV={{
                  time: uvData.maxUV[0],
                  value: parseInt(uvData.maxUV[1], 10),
                  isTomorrow: uvData.maxUVIsTomorrow ?? true,
                }}
                sunsetTime={{
                  time: uvData.sunset,
                  hasPassed: uvData.sunsetHasPassed,
                }}
                uvHourByHour={uvData.hourly}
              />
            </div>
            <div>{/* Ad space */}</div>
          </div>
          <div className="shrink grow-0 pt-20 xl:block hidden">
            {/* Ad space */}
          </div>
        </div>
      </div>
    </TanningProvider>
  );
}
