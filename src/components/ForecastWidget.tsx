"use client";
import React, { useEffect, useState } from "react";
import UVChart from "@/src/components/UVChart";

interface MaxUV {
  value: number;
  time: string;
  isTomorrow: boolean;
}

interface SunsetTime {
  hasPassed: boolean;
  time: string;
}

interface ForecastWidgetProps {
  maxUV: MaxUV;
  sunsetTime: SunsetTime;
  uvHourByHour: [string, number][];
}

const collapseHourlyUVData = (dataHourByHour: [string, number][]) => {
  const res: [string, number][] = [];
  dataHourByHour.forEach((hour, i) => {
    if (i > 0 && res[res.length - 1][1] === hour[1]) {
      if (res[res.length - 1][0].toString().indexOf("-") !== -1) {
        res[res.length - 1][0] = `${res[res.length - 1][0].split("-")[0]}-${
          hour[0]
        }`;
      } else {
        res[res.length - 1][0] = `${res[res.length - 1][0]}-${hour[0]}`;
      }
    } else {
      res.push([...hour]);
    }
  });
  return res;
};

export default function ForecastWidget({
  maxUV,
  sunsetTime,
  uvHourByHour,
}: ForecastWidgetProps) {
  const [uvHourByHourCollapsed, setUVHourByHourCollapsed] =
    useState<[string, number][]>(uvHourByHour);

  useEffect(() => {
    setUVHourByHourCollapsed(collapseHourlyUVData(uvHourByHour));
  }, [uvHourByHour]);

  return (
    <div className="bg-white rounded-md text-black">
      <div className="p-6 pb-0">
        <p className="font-semibold font-serif text-xl mb-8 leading-tight">
          Dygnsprognos
        </p>
        <p className="font-medium max-w-sm">
          Det högsta UV-indexet under det kommande dygnet kommer att vara{" "}
          <span
            className="text-lg font-semibold bg-yellow-100 px-1 rounded-md"
            id="maxUV"
          >
            {maxUV.value}
          </span>{" "}
          klockan{" "}
          <span
            className="text-lg font-semibold bg-yellow-100 px-1 rounded-md"
            id="maxUVAt"
          >
            {maxUV.time}:00{maxUV.isTomorrow && " imorgon"}
          </span>
          .
        </p>
        <p className="font-medium leading-tight">
          Idag {sunsetTime.hasPassed ? "gick" : "går"} solen ner klockan{" "}
          <span className="text-lg font-semibold bg-yellow-100 px-1 rounded-md">
            {sunsetTime.time}
          </span>
          .
        </p>
      </div>
      <div className="pl-2 pr-4">
        <UVChart hourlyUVData={uvHourByHour} maxUVVal={maxUV.value} />
      </div>
      <div className="px-6 pb-6">
        <div className="flex justify-between items-center px-2 py-1 mb-1 text-[0.7em]">
          <p className="font-medium">TID</p>
          <div className="flex items-center">
            <span className="font-medium tracking-tighter mr-4 hidden sm:inline">
              NIVÅ
            </span>
            <div className="flex w-[130px] items-center">
              <div className="w-[90px] h-[8px] mr-4"></div>
            </div>
            <div className="font-semibold w-[60px] text-right">UV</div>
          </div>
        </div>
        {uvHourByHourCollapsed.map((hour) => (
          <div
            key={hour[0]}
            className="flex justify-between items-center px-2 py-1 mb-1 rounded-md text-black bg-gray-100"
          >
            <p className="font-medium whitespace-nowrap">
              {hour[0].replace("-", ":00-")}:00
            </p>
            <div className="flex items-center">
              <span className="text-[0.7em] font-medium tracking-tighter mr-4 hidden sm:inline">
                {
                  [
                    "Låg",
                    "Låg",
                    "Låg",
                    "Medel",
                    "Medel",
                    "Medel",
                    "Hög",
                    "Hög",
                    "Mycket hög",
                    "Mycket hög",
                    "Mycket hög",
                    "Extremt",
                    "Extremt",
                    "Extremt",
                  ][Math.round(hour[1])]
                }
              </span>
              <div className="flex w-[130px] items-center">
                <div className="bg-gradient-to-r from-purple-600 via-red-600 via-orange-600 via-yellow-500 to-green-600 w-[90px] h-[8px] rounded-[4px] mr-4 relative">
                  <div
                    className="w-[3px] h-[15px] border-l border-black -mt-[3.75px]"
                    style={{ marginLeft: `${90 * (hour[1] / 11)}px` }}
                  />
                </div>
              </div>
              <div className="font-semibold w-[40px] sm:w-[60px] text-right">
                <span>
                  {hour[1].toString()}
                  {hour[1].toString().indexOf(".") === -1 && ".00"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
