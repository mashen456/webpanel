import { Card, useTheme } from "@mui/material";
import {H5} from "./Typography.jsx";
import * as PropTypes from "prop-types";
// import { H5 } from "components/Typography";
import Chart from "react-apexcharts";



Chart.propTypes = {
  series: PropTypes.arrayOf(PropTypes.number),
  options: PropTypes.shape({
    plotOptions: PropTypes.shape({pie: PropTypes.shape({donut: PropTypes.shape({size: PropTypes.string})})}),
    legend: PropTypes.shape({
      itemMargin: PropTypes.shape({horizontal: PropTypes.number}),
      offsetY: PropTypes.number,
      show: PropTypes.bool,
      fontSize: PropTypes.string,
      onItemClick: PropTypes.shape({toggleDataSeries: PropTypes.bool}),
      position: PropTypes.string,
      fontWeight: PropTypes.number,
      onItemHover: PropTypes.shape({highlightDataSeries: PropTypes.bool})
    }),
    tooltip: PropTypes.shape({style: PropTypes.shape({fontSize: PropTypes.string})}),
    theme: PropTypes.shape({mode: PropTypes.any}),
    chart: PropTypes.shape({
      stacked: PropTypes.bool,
      fontFamily: PropTypes.any,
      background: PropTypes.string,
      sparkline: PropTypes.shape({enabled: PropTypes.bool})
    }),
    stroke: PropTypes.shape({width: PropTypes.number}),
    colors: PropTypes.arrayOf(PropTypes.string),
    states: PropTypes.shape({
      normal: PropTypes.shape({filter: PropTypes.shape({type: PropTypes.string})}),
      hover: PropTypes.shape({filter: PropTypes.shape({type: PropTypes.string})}),
      active: PropTypes.shape({filter: PropTypes.shape({type: PropTypes.string})})
    }),
    labels: PropTypes.arrayOf(PropTypes.string)
  }),
  type: PropTypes.string,
  height: PropTypes.number
};
export default function ProjectStatus({props}){
  const {parts,colors,names} = props
  const theme = useTheme();
  const chartOptions = {
    colors: colors,
    chart: {
      stacked: false,
      background: "transparent",
      sparkline: {
        enabled: true
      },
      fontFamily: theme.typography.fontFamily
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%"
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: "none"
        }
      },
      hover: {
        filter: {
          type: "none"
        }
      },
      active: {
        filter: {
          type: "none"
        }
      }
    },
    labels: names,
    theme: {
      mode: theme.palette.mode
    },
    legend: {
      show: true,
      position: "bottom",
      fontSize: "15px",
      fontWeight: 500,
      itemMargin: {
        horizontal: 60
      },
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: false
      },
      offsetY: 0
    },
    tooltip: {
      style: {
        fontSize: "20px"
      }
    },
    stroke: {
      width: 0
    }
  };
  return <Card sx={{
    padding: 3,
    height: "100%"
  }}>
      <H5 mb={3} textAlign="center">
        Anteile Gangs
      </H5>

      <Chart height={450} type="donut" options={chartOptions} series={parts} />
    </Card>;
};

