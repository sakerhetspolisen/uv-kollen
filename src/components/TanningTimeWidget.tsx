"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import { TanningContext } from "@/src/contexts/tanningContext";
import useTimer from "@/src/hooks/useTimer";

function getTimeToSunburnFromCurrentUV(
  uv: number,
  skinType: string,
  spf: number
) {
  // Equation for calculation of number of minutes until 1% of
  // population starts getting sunburned. Equation is as follows:
  // tts = 200/(3 * current_uv_index) * skin_type_factor * min(0.2 * spf, 1)
  //
  // The research by Sánchez-Pérez et al. is limited to the skin types
  // 1-4 and the UV-index 2-11
  const SUNBURN_VALUES = [
    [64, 45, 34, 26, 22, 20, 17, 15, 12, 11],
    [82, 57, 42, 34, 29, 25, 22, 20, 18, 17],
    [117, 79, 59, 46, 39, 35, 30, 25, 23, 21],
    [150, 101, 75, 60, 50, 42, 39, 33, 30, 27],
  ];

  if (uv === 0) return -1;
  if (parseInt(skinType, 10) <= 4 && uv > 1) {
    return (
      SUNBURN_VALUES[Number(skinType) - 1][Math.round(uv - 2)] *
      Math.max(0.2 * spf, 1)
    );
  }
  return Math.floor(
    (200 / (3 * uv)) *
      [2.5, 3, 4, 5, 8, 15][parseInt(skinType, 10) - 1] *
      Math.max(0.2 * spf, 1)
  );
}

function estimateTimeToSunburn(
  startUV: number,
  uvHourByHour: [number, number][],
  skinType: string,
  spf: number
) {
  // TTS for the current hour determines how much of the UV-index-forecast
  // for the upcoming hours should be included in the calculation.
  // If tts0 is less than 90min, only tss0 will be returned.
  //
  // Example: tts0 is calculated to 260min (4h 20min). This results in
  // a calculation of ttsres in the following way:
  // ttsres = 60 + 60*tts1/tts0 + 60*tts2/tts0 + 60*tts3/tts0 + 20*tts4/tts0

  const tts0 = getTimeToSunburnFromCurrentUV(startUV, skinType, spf);
  if (tts0 < 90) return tts0;
  const hoursInTTS0 = Math.round(tts0 / 60);
  if (hoursInTTS0 > 23) return tts0;

  let ttsres = 60;
  for (let i = 1; i <= hoursInTTS0; i += 1) {
    const minInThisHour = i < Math.floor(tts0 / 60) ? 60 : tts0 % 60;
    const ttsn = getTimeToSunburnFromCurrentUV(
      uvHourByHour[i][1],
      skinType,
      spf
    );
    if (ttsn >= 0) {
      ttsres += (minInThisHour / tts0) * ttsn;
    } else {
      ttsres += minInThisHour;
    }
  }

  return Math.floor(ttsres);
}

const getMinUntilMidnight = () => {
  const now = new Date().toLocaleString("sv", {
    timeZone: "Europe/Berlin",
  });
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight.getTime() - new Date(now).getTime()) / 1000 / 60);
};

interface TanningTimeWidgetProps {
  currentUVIndex?: number;
  uvHourByHour?: [number, number][];
}

export default function TanningTimeWidget(props: TanningTimeWidgetProps) {
  const { skinType, setSkinType, spf, setSPF } = useContext(TanningContext);

  return (
    <div className="w-full rounded-md text-black">
      {skinType ? (
        <MainWidget
          spf={spf}
          skinType={skinType}
          setSPF={setSPF}
          setSkinType={setSkinType}
          {...props}
        />
      ) : (
        <WidgetLanding skinType={skinType} setSkinType={setSkinType} />
      )}
    </div>
  );
}

interface WidgetLandingProps {
  skinType: string;
  setSkinType: (value: string) => void;
}

function WidgetLanding({ skinType, setSkinType }: WidgetLandingProps) {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex justify-start items-start p-6">
        <div className="flex items-start">
          <p className="font-semibold text-xl leading-none">Maximal soltid</p>
          <span className="text-[0.7em] bg-yellow-400 text-gray-900 px-2 rounded-full ml-1 font-semibold">
            BETA
          </span>
        </div>
      </div>
      <div className="px-6 pt-2 pb-10 flex flex-col">
        <p className="text-lg font-medium">Börja med att välja din hudtyp:</p>
        <p className="mt-4 mb-2 text-sm">När jag solar blir jag:</p>
        <SkinTypeSelect onChange={setSkinType} defaultValue={skinType} />
      </div>
    </div>
  );
}

interface MainWidgetProps {
  currentUVIndex?: number;
  uvHourByHour?: [number, number][];
  spf: number;
  skinType: string;
  setSPF: (value: number | null) => void;
  setSkinType: (value: string) => void;
}

function MainWidget({
  currentUVIndex = 0,
  uvHourByHour = [],
  spf,
  skinType,
  setSPF,
  setSkinType,
}: MainWidgetProps) {
  const [ttsIsRestOfDay, setTTSIsRestOfDay] = useState(false);
  const { seconds, minutes, hours, isRunning, pause, resume, setTimer } =
    useTimer({
      onExpire: () => null,
      autoStart: false,
      expiryTimestamp: new Date(),
    });
  const countDownBoxRef = useRef<HTMLDivElement>(null);
  const [countDownBoxRefWidth, setCountDownBoxRefWidth] = useState(0);
  useEffect(() => {
    if (countDownBoxRef.current)
      setCountDownBoxRefWidth(countDownBoxRef.current.offsetWidth);
  }, [countDownBoxRef]);
  const [aboutDrawerIsOpen, setAboutDrawerIsOpen] = useState(false);
  const readMoreAboutBtn = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const minUntilMidnight = getMinUntilMidnight();
    const tts = estimateTimeToSunburn(
      currentUVIndex,
      uvHourByHour,
      skinType,
      spf
    );
    if (tts > 480 || tts === -1 || tts > minUntilMidnight) {
      setTTSIsRestOfDay(true);
    } else {
      const expiryDateTime = new Date();
      expiryDateTime.setMinutes(expiryDateTime.getMinutes() + tts);
      setTimer(expiryDateTime, false);
      setTTSIsRestOfDay(false);
    }
  }, [spf, skinType, currentUVIndex, setTimer]);

  return (
    <div>
      <div
        className={`transition-colors duration-300 rounded-t-md ${
          isRunning ? "bg-gray-300" : "bg-white"
        } relative`}
      >
        <div className="p-6 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className="mr-4">
              <div className="flex items-start">
                <p className="font-semibold text-xl leading-none">
                  Maximal soltid
                </p>
                <span className="text-[0.7em] bg-yellow-400 text-gray-900 px-2 rounded-full ml-1 font-semibold">
                  BETA
                </span>
              </div>
              <p className="leading-tight mt-2">
                Tid som du kan vistas i solen innan solbränna.{" "}
                <button
                  className="text-gray-600 font-normal"
                  ref={readMoreAboutBtn}
                  onClick={() => setAboutDrawerIsOpen(true)}
                >
                  Läs mer
                </button>
                {aboutDrawerIsOpen && (
                  <div className="fixed inset-0 overflow-hidden z-50">
                    <div
                      className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                      onClick={() => setAboutDrawerIsOpen(false)}
                    ></div>
                    <div className="absolute top-0 right-0 bottom-0 max-w-md w-full bg-white shadow-xl overflow-y-auto">
                      <div className="p-4 h-full">
                        <button
                          className="absolute right-4 top-4"
                          onClick={() => setAboutDrawerIsOpen(false)}
                        >
                          ✕
                        </button>
                        <h2 className="text-2xl font-medium">
                          Om beräkningen av
                          <br />
                          maximal soltid
                        </h2>

                        <div className="mt-4 text-lg">
                          <p className="font-medium">
                            UV-Kollen beräknar den maximala tiden som en vuxen
                            människa kan befinna sig i direkt solljus innan
                            brännskador bildas. Algoritmen bygger i huvudsak på
                            forskning från Cartagenas Polytekniska Universitet
                            och Spaniens hälsoministerium.
                          </p>
                          <div className="p-4 bg-orange-100 mt-4 rounded-md">
                            <p className="font-semibold">Var vaksam på att:</p>
                            <ul className="list-disc ml-5">
                              <li>
                                Det är ditt ansvar att bedöma om den maximala
                                soltiden är lämplig för dig.
                              </li>
                              <li>
                                Barn och unga har en lägre maximal soltid.
                              </li>
                              <li>
                                Över tid så finns det ingen säker nivå av
                                oskyddad solexponering, det är den kumulativa
                                exponeringen över tid som gör att du löper
                                störst risk för hudcancer, skador på ögon och
                                immunsystem.
                              </li>
                            </ul>
                          </div>
                          <div className="p-4 bg-gray-100 my-4 rounded-md">
                            <p>
                              Hela underlaget för beräkning av maximal soltid
                              finns i PDF-format.
                            </p>
                            <a
                              href="/bilagor/Om beräkning av maximal soltid på UV-Kollen.pdf"
                              target="_blank"
                            >
                              <button className="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded flex items-center">
                                <MdOutlineFileDownload className="h-4 w-4 mr-2" />
                                Ladda ner
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </p>
            </div>

            {!ttsIsRestOfDay && (
              <button
                className="px-4 py-2 text-sm bg-gray-900 text-white hover:bg-gray-600 rounded min-w-[110px]"
                onClick={() => (isRunning ? pause() : resume())}
              >
                {isRunning ? "Pausa timer" : "Starta timer"}
              </button>
            )}
          </div>
          <div className="text-lg font-medium">
            {ttsIsRestOfDay ? (
              <p className="text-4xl font-semibold block leading-tight">
                Resten av dagen
              </p>
            ) : (
              <ShowTime hours={hours} mins={minutes} />
            )}
          </div>
        </div>
        <div
          className="z-0 absolute top-0 left-0 h-full transition-all duration-300 bg-white rounded-t-md"
          ref={countDownBoxRef}
          style={{
            width: isRunning ? countDownBoxRefWidth * (seconds / 60) : "100%",
          }}
        />
      </div>
      <div className="p-3 bg-gray-200 rounded-b-md">
        <TanningSettings
          currentSPF={spf}
          currentSkinType={skinType}
          setSPF={setSPF}
          setSkinType={setSkinType}
        />
      </div>
    </div>
  );
}

interface ShowTimeProps {
  hours: number;
  mins: number;
}

function ShowTime({ hours, mins }: ShowTimeProps) {
  return (
    <p className="text-8xl font-semibold block leading-tight">
      {hours !== 0 && (
        <>
          {hours}
          <span className="inline-block text-5xl mx-2">h</span>
        </>
      )}
      {mins !== 0 && (
        <>
          {mins}
          <span className="inline-block text-5xl mx-2">min</span>
        </>
      )}
    </p>
  );
}

interface SkinTypeSelectProps {
  onChange: (value: string) => void;
  defaultValue?: string;
}

function SkinTypeSelect({ onChange, defaultValue }: SkinTypeSelectProps) {
  return (
    <select
      className="w-full text-sm bg-orange-100 font-medium hover:bg-yellow-100 cursor-pointer p-2 rounded"
      onChange={(e) => onChange(e.target.value)}
      defaultValue={defaultValue || "0"}
    >
      <option disabled value="0">
        Välj...
      </option>
      <option value="1">Alltid röd - aldrig brun</option>
      <option value="2">Alltid röd - ibland brun</option>
      <option value="3">Ibland röd - alltid brun</option>
      <option value="4">Sällan röd - alltid brun</option>
      <option value="5">Mycket sällan röd - alltid brun</option>
      <option value="6">Aldrig röd - alltid brun</option>
    </select>
  );
}

interface TanningSettingsProps {
  setSkinType: (value: string) => void;
  currentSkinType: string;
  currentSPF: number | null;
  setSPF: (value: number | null) => void;
}

function TanningSettings({
  setSkinType,
  currentSkinType,
  currentSPF,
  setSPF,
}: TanningSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 rounded p-3">
        <div className="p-1 mr-4">
          <div className="relative inline-block">
            <div className="leading-none">
              <p className="font-semibold">Hudtyp</p>
              <p
                className="text-sm whitespace-nowrap mt-1 cursor-pointer"
                onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              >
                Vad är detta?
              </p>
            </div>
            {isPopoverOpen && (
              <div className="absolute z-10 bg-white rounded-md shadow-lg mt-2 p-4 w-64">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-semibold">De sex hudtyperna</p>
                  <button
                    onClick={() => setIsPopoverOpen(false)}
                    className="text-gray-500"
                  >
                    ✕
                  </button>
                </div>
                <p>
                  Världshälsoorganisationen (WHO) har klassificerat hudtyper i
                  sex kategorier baserat på deras tolerans mot solstrålning. Läs
                  mer hos{" "}
                  <a
                    href="https://www.stralsakerhetsmyndigheten.se/omraden/sol-och-solarier/rad-och-rekommendationer/solkanslighet/"
                    rel="noreferrer noopener"
                    target="_blank"
                    className="text-blue-600"
                  >
                    Strålsäkerhetsmyndigheten
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="p-1">
          <SkinTypeSelect
            onChange={setSkinType}
            defaultValue={currentSkinType}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 bg-gray-100 rounded p-3">
        <p className="font-semibold mr-4 p-1">Solkrämsfaktor</p>
        <div className="h-8 overflow-hidden">
          <div className="pr-1 flex justify-start items-center flex-wrap flex-row-reverse">
            <div
              className="px-3 py-1 ml-2 h-8 bg-orange-100 font-medium rounded text-gray-900 cursor-pointer hover:bg-orange-200 transition-colors duration-300 text-center"
              onClick={() => setIsOpen(true)}
            >
              Fler
            </div>
            {["50", "30", "25", "20", "15", "10"].map((spf) => (
              <div
                key={spf}
                className={`
                  px-2 py-1 ml-2 h-8 font-medium rounded cursor-pointer transition-colors duration-300 text-center
                  ${
                    currentSPF === parseInt(spf, 10)
                      ? "bg-yellow-400 text-gray-700"
                      : "bg-orange-100 text-gray-900 hover:bg-yellow-400"
                  }
                `}
                onClick={() =>
                  currentSPF === parseInt(spf, 10)
                    ? setSPF(null)
                    : setSPF(parseInt(spf, 10))
                }
              >
                {spf}
              </div>
            ))}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="relative bg-white rounded-lg max-w-md w-full shadow-xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">
                    Välj solkrämsfaktor (SPF)
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    ✕
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["6", "10", "15", "20", "25", "30", "50"].map((spf) => (
                    <button
                      key={`${spf}.modal`}
                      className={`w-full p-2 rounded ${
                        currentSPF === parseInt(spf, 10)
                          ? "bg-yellow-400"
                          : "bg-orange-100 hover:bg-yellow-400"
                      }`}
                      onClick={() => {
                        if (currentSPF === parseInt(spf, 10)) {
                          setSPF(null);
                        } else {
                          setSPF(parseInt(spf, 10));
                        }
                        setIsOpen(false);
                      }}
                    >
                      {spf}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
