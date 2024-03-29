import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ usedId, currency }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [days, setDays] = useState("7");

  const getChartData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${usedId}/market_chart?vs_currency=${currency}&days=${days}&interval=${"daily"}`
      );
      const data = await response.json();
      setChartData(data);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const getCurrValue = (e) => {
    let selectedDay = e.target.value;
    setDays(selectedDay);
  };

  useEffect(() => {
    getChartData();
  }, [days, currency]);

  return (
    <>
      <select onChange={getCurrValue} id="currencyResult3">
        <option value="7">7 days</option>
        <option value="14">14 days</option>
        <option value="30">30 days</option>
        <option value="90">90 days</option>
        <option value="180">180 days</option>
        <option value="365">1 year</option>
        <option value="max">All Time</option>
      </select>
      {loading ? (
        <div className="chart_container_skeleton">
          <ClipLoader color="white" />
          <h5>loading...</h5>
        </div>
      ) : (
        <div className="chart_container">
          <ResponsiveContainer width="100%" height={325}>
            <LineChart
              className="chart"
              width={900}
              height={290}
              data={chartData.prices}
              fill="black"
            >
              <Line
                type="monotone"
                stroke="aqua"
                dataKey="1"
                strokeWidth={0.5}
                dot={false}
              />
              <XAxis tick={{ fill: "white" }} dataKey={0} />
              <YAxis tick={{ fill: "white" }} />
              <Tooltip
                formatter={(value) =>
                  value > 999.99 ? value.toLocaleString() : value
                }
                labelStyle={{ color: "white", textAlign: "center" }}
                contentStyle={{
                  backgroundColor: "var(--new-bg)",
                  color: "white",
                  border: "none",
                  outline: "none",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default Chart;
