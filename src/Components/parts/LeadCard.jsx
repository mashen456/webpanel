import { alpha, Avatar, Box, Card, Stack, useTheme } from "@mui/material";
import {H2, H4, H6, Tiny} from "./Typography.jsx";
import FlexBox from "./flexbox/FlexBox.jsx";
import FlexRowAlign from "./flexbox/FlexRowAlign.jsx";
import ChartPieIcon from "./icons/ChartPieIcon.jsx";

export default function LeadCard({topProducer}) {
  const {name,ammount,max} = topProducer
  const theme = useTheme();
  return <Card sx={{
    padding: 3,
    height: "100%"
  }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box flex={1}>
          <H4>{name}</H4>
          <H2 color="primary.main">{Math.round((ammount/max)*100)} %</H2>

          <FlexBox alignItems="center" mt={1}>
            <FlexRowAlign gap={1} sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: alpha(theme.palette.text.disabled, 0.2)
          }}>
              <ChartPieIcon sx={{
              fontSize: 17,
              color: "text.disabled"
            }} />
            </FlexRowAlign>
            <Tiny fontWeight={600}>{ammount} out of {max}</Tiny>
          </FlexBox>
        </Box>

        <Avatar src="/static/illustration/crm-lead.svg" alt="Top Gang des Monats" sx={{
        width: "auto",
        height: "auto",
        borderRadius: "0%"
      }} />
      </Stack>
    </Card>;
};

