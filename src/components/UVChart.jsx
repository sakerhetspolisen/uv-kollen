import React from "react";
import dynamic from "next/dynamic";
import { useColorModeValue } from "@chakra-ui/react";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function UVChart({ hourlyUVData, maxUVVal }) {
  const series = [
    {
      data: hourlyUVData.map((hour) => ({
        x: hour[0],
        y: hour[1],
      })),
      name: "UV-index",
    },
  ];

  const generateColorStops = () => {
    const res = [];
    for (let i = 0; i < Math.floor(maxUVVal); i += 1) {
      res.push({
        offset: (100 / Math.floor(maxUVVal)) * i,
        color: [
          "#38A169",
          "#38A169",
          "#38A169",
          "#D69E2E",
          "#D69E2E",
          "#D69E2E",
          "#DD6B20",
          "#DD6B20",
          "#E53E3E",
          "#E53E3E",
          "#E53E3E",
          "#805AD5",
          "#805AD5",
          "#805AD5",
        ][Math.floor(maxUVVal) - i],
        opacity: 1,
      });
    }
    return res;
  };

  const options = {
    chart: {
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      borderColor: "rgba(0,0,0,0.4)",
      strokeDashArray: 5,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        colorStops: generateColorStops(),
      },
    },
    stroke: {
      curve: "smooth",
      width: 6,
    },
    yaxis: {
      tickAmount: 4,
      labels: {
        style: {
          colors: useColorModeValue("#000", "#fff"),
        },
        formatter(val) {
          return val.toFixed(0);
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      tickAmount: 6,
      labels: {
        rotate: 0,
        rotateAlways: true,
        style: {
          colors: useColorModeValue("#000", "#fff"),
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    colors: ["#000"],
    annotations: {
      yaxis: [
        {
          y: 0,
          borderColor: "transparent",
          label: {
            borderColor: "#fff",
            style: {
              color: "#000",
              background: "#fff",
            },
            text: "Lågt",
          },
        },
        {
          y: 3,
          borderColor: "transparent",
          label: {
            borderColor: "#fff",
            style: {
              color: "#000",
              background: "#fff",
            },
            text: "Måttligt",
          },
        },
        {
          y: 6,
          borderColor: "transparent",
          label: {
            borderColor: "#fff",
            style: {
              color: "#000",
              background: "#fff",
            },
            text: "Högt",
          },
        },
        {
          y: 8,
          borderColor: "transparent",
          label: {
            borderColor: "#fff",
            style: {
              color: "#000",
              background: "#fff",
            },
            text: "Mycket högt",
          },
        },
      ],
    },
    title: {
      text: "",
    },
    tooltip: {
      theme: "light",
      shared: false,
      intersect: false,
      marker: {
        show: false,
      },
      x: {
        show: false,
      },
      y: {
        formatter(val) {
          return val.toFixed(2);
        },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetX: -10,
      labels: {
        colors: useColorModeValue("#fff", "#000"),
      },
    },
  };
  return <ApexCharts options={options} series={series} type="line" />;
}
