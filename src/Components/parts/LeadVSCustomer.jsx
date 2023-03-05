import { Card, styled, useTheme } from "@mui/material";
// import AppSelect from "components/AppSelect";
// import FlexBetween from "components/flexbox/FlexBetween";
// import { H5 } from "components/Typography";
import Chart from "react-apexcharts";
import FlexBetween from "./flexbox/FlexBetween.jsx";
import AppSelect from "../../SubComponents/AppSelect.jsx";
import {H5} from "./Typography.jsx"; // --------------------------------------------------------------------------


const chartCategories = ["Sa", "So", "Mo", "Di", "Mi", "Do", "Fr"]; // --------------------------------------------------------------------------

const StyledChart = styled(Chart)(() => ({
  minHeight: "230px !important",
  "& .apexcharts-xaxistooltip": {
    display: "none !important"
  },
  "& .apexcharts-tooltip": {
    boxShadow: "none"
  }
}));

export default function LeadVSCustomer({abgabenChart}){
  const {colors,chartSeries} = abgabenChart
  const theme = useTheme(); // chart options

  const chartOptions = {
    chart: {
      background: "transparent",
      toolbar: {
        show: false
      },
      stacked: false
    },
    colors: colors,
    dataLabels: {
      enabled: false
    },
    grid: {
      show: false
    },
    theme: {
      mode: theme.palette.mode
    },
    xaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      categories: chartCategories,
      labels: {
        style: {
          fontWeight: 500,
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    yaxis: {
      tickAmount: 1,
      max: 50,
      min: 0,
      labels: {
        style: {
          fontWeight: 500,
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily
        }
      }
    },
    tooltip: {
      style: {
        fontFamily: theme.typography.fontFamily,
        fontSize: "13px"
      },
      x: {
        show: false
      },
      y: {
        formatter: val => `${val}`
      }
    },
    legend: {
      position: "top",
      fontWeight: 600,
      fontFamily: theme.typography.fontFamily,
      itemMargin: {
        horizontal: 15
      }
    },
    stroke: {
      curve: "smooth"
    }
  };
  return <Card sx={{
    padding: 3,
    height: "100%"
  }}>
      <FlexBetween mb={2}>
        <H5>Abgabenübersicht</H5>

        <AppSelect>
          <option value="month">Monat</option>
          <option value="week">Woche</option>
          <option value="day">Tag</option>
        </AppSelect>
      </FlexBetween>

      <StyledChart options={chartOptions} series={chartSeries} type="line" height={230} />
    </Card>;
};