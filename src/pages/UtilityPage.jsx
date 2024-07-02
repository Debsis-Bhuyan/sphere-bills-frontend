import React from "react";
import ReactApexChart from "react-apexcharts";
import Chart from "react-apexcharts";
import { connect, useSelector } from "react-redux";
import { dataFetch, dateToSeconds, getHalfYearDate } from "../utils";

class ApexChart extends React.Component {
  constructor(props) {
    super(props);
    // const sales = this.props.sales;
    // const year = "2022";
    // const month = "04";
    // const date = "25";
    // const c= new Date(`${year}-${month}-${date}`).getTime();
    // const d = new Date("2022 Mar 25").getTime();
   
    this.state = {
      series: [
        {
          data: this.props.sales,
        },
      ],
      options: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: "#999",
              label: {
                show: true,
                text: "Support",
                style: {
                  color: "#fff",
                  background: "#00E396",
                },
              },
            },
          ],
          xaxis: [
            {
              x: new Date("01 Jan 2024").getTime(),
              borderColor: "#999",
              yAxisIndex: 0,
              label: {
                show: true,
                text: "Rally",
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          min: new Date("01 Jan 2024").getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
      },

      selection: "one_year",
    };
  }

  updateData(timeline) {
    this.setState({
      selection: timeline,
    });
    const currentDate = new Date();
    let previousMonth = currentDate.getMonth();
    let previousYear = currentDate.getFullYear();

    switch (timeline) {
      case "one_month":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("02 May 2024").getTime(),

          new Date(currentDate).getTime()
        );
        break;
      case "six_months":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2024").getTime(),
          new Date(currentDate).getTime()
        );
        break;
      case "one_year":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date(
            currentDate.getFullYear() - 1,
            currentDate.getMonth(),
            currentDate.getDate()
          ).getTime(),

          // new Date("27 Feb 2012").getTime(),
          // new Date("27 Feb 2013").getTime(),
          new Date(currentDate).getTime()
          // new Date("27 Feb 2012").getTime(),
          // new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(), ).getTime()
        );
        break;
      case "ytd":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date(currentDate.getFullYear(), 0, 1).getTime(),

          new Date(currentDate).getTime()
        );
        break;
      case "all":
        ApexCharts.exec(
          "area-datetime",
          "zoomX",
          new Date("01 Jan 2024").getTime(),
          new Date(currentDate).getTime()
        );
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <div id="chart">
          <div className="toolbar flex justify-center items-center gap-10">
            <button
              id="one_month"
              onClick={() => this.updateData("one_month")}
              className={this.state.selection === "one_month" ? "active" : ""}
            >
              1M
            </button>

            <button
              id="six_months"
              onClick={() => this.updateData("six_months")}
              className={this.state.selection === "six_months" ? "active" : ""}
            >
              6M
            </button>

            <button
              id="one_year"
              onClick={() => this.updateData("one_year")}
              className={this.state.selection === "one_year" ? "active" : ""}
            >
              1Y
            </button>

            <button
              id="ytd"
              onClick={() => this.updateData("ytd")}
              className={this.state.selection === "ytd" ? "active" : ""}
            >
              YTD
            </button>

            <button
              id="all"
              onClick={() => this.updateData("all")}
              className={this.state.selection === "all" ? "active" : ""}
            >
              ALL
            </button>
          </div>

          <div id="chart-timeline">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height={350}
            />
          </div>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const sales = dataFetch(useSelector((state) => state.sales).sales);

  return {
    sales: sales,
  };
};

export default connect(mapStateToProps)(ApexChart);
