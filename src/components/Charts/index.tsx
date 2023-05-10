import dynamic from "next/dynamic";
import { NextPage } from "next";
const ReactECharts = dynamic(() => import("echarts-for-react"), { ssr: false });
import { Aave, AaveMarketCap } from "@/pages";
interface Props {
  aave: Aave;
  marketCaps: AaveMarketCap;
}
const Chart: NextPage<Props> = ({ aave, marketCaps }) => {
  const date = aave.tvl.map(
    (item) =>
      new Date(item.date * 1000).getDate() +
      "/" +
      (new Date(item.date * 1000).getMonth() + 1) +
      "/" +
      new Date(item.date * 1000).getFullYear()
  );
  const events = aave.hallmarks.map((item) => ({
    description: item[1],
    date:
      new Date(item[0] * 1000).getDate() +
      "/" +
      (new Date(item[0] * 1000).getMonth() + 1) +
      "/" +
      new Date(item[0] * 1000).getFullYear(),
  }));
  const options = {
    tooltip: {
      trigger: "axis",
      position: function (pt: any) {
        return [pt[0], "10%"];
      },
      valueFormatter: (value: number) =>
        Intl.NumberFormat("en", {
          notation: "compact",
          currency: "USD",
          style: "currency",
          maximumFractionDigits: 2,
        }).format(value),
    },
    title: {
      left: "center",
      text: "Historical TVL of Protocol",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: date,
    },
    yAxis: {
      type: "value",
      boundaryGap: false,
      axisLabel: {
        formatter: (value: number) =>
          Intl.NumberFormat("en", {
            notation: "compact",
            currency: "USD",
            style: "currency",
            maximumFractionDigits: 2,
          }).format(value),
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: "TVL:",
        type: "line",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 30)",
        },
        areaStyle: {
          color: "rgb(255, 158, 18)",
        },
        data: aave.tvl.map((item) => item.totalLiquidityUSD),
        markLine: {
          label: {
            formatter: "{b}",
          },
          lineStyle: {
            type: "dashed",
            witdh: 2,
          },
          data: events.map((event) => ({
            name: event.description,
            xAxis: event.date,
          })),
        },
      },
    ],
  };

  const dateSec = marketCaps.market_caps.map(
    (item) =>
      new Date(item[0]).getDate() +
      "/" +
      (new Date(item[0]).getMonth() + 1) +
      "/" +
      new Date(item[0]).getFullYear()
  );
  const optionsSec = {
    tooltip: {
      trigger: "axis",
      position: function (pt: any) {
        return [pt[0], "10%"];
      },
      valueFormatter: (value: number) =>
        Intl.NumberFormat("en", {
          notation: "compact",
          currency: "USD",
          style: "currency",
          maximumFractionDigits: 2,
        }).format(value),
    },
    title: {
      left: "center",
      text: "Historical Market Cap of Protocol",
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: "none",
        },
        restore: {},
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: true,
      data: dateSec,
    },
    yAxis: {
      type: "value",
      boundaryGap: false,
      axisLabel: {
        formatter: (value: number) =>
          Intl.NumberFormat("en", {
            notation: "compact",
            currency: "USD",
            style: "currency",
            maximumFractionDigits: 2,
          }).format(value),
      },
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 10,
      },
    ],
    series: [
      {
        name: "Market Cap:",
        type: "line",
        sampling: "lttb",
        itemStyle: {
          color: "rgb(255, 70, 30)",
        },
        areaStyle: {
          color: "rgb(250, 108, 28)",
        },
        data: marketCaps.market_caps.map((item) => item[1]),
      },
    ],
  };
  return (
    <div style={{ padding: "30px 0", maxWidth: "800px", margin: "0 auto" }}>
      <ReactECharts
        option={options}
        style={{ height: "400px", width: "100%" }}
      />
      <div style={{ padding: "30px 0", maxWidth: "800px", margin: "0 auto" }}>
        <ReactECharts
          option={optionsSec}
          style={{ height: "400px", width: "100%" }}
        />
      </div>
    </div>
  );
};

export default Chart;
