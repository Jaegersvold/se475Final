import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import ButtonBases from "../components/ButtonBases";
import { ShowResponse, Show } from "../common/types";
import { MovieResponse } from "../common/types";
import { BookResponse } from "../common/types";

import Button from "@mui/material/Button";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

type FullData = {
  name: string;
  descrip: string;
};

type ZoomData = {
  img_url: string;
  descrip: string;
};

export default function Final() {
  const [selectedTab, setSelectedTab] = React.useState(-1);

  const [data, setData] = React.useState<null | FullData[]>(null);
  //const [displayData, setDisplayData] = React.useState([
  // "Data Has Not Been Loaded",
  //]);

  const [zoomData, setZoomData] = React.useState<null | ZoomData>(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const zoomHandlerFunction = (event: React.SyntheticEvent) => {
    const name = event.currentTarget.id;

    const elementData = data!.find((el) => el.name === name)!;

    const url = `${name}.jpg`;
    setZoomData({ img_url: url, descrip: elementData.descrip });
  };

  const DisplayTab = () => {
    if (data === null) {
      return <p>No data has been loaded.</p>;
    }
    return (
      <Box>
        {data.map((element) => (
          <Button id={element.name} onClick={zoomHandlerFunction}>
            {element.name}
          </Button>
        ))}
      </Box>
    );
  };

  const televisHandler = (event: React.SyntheticEvent) => {
    fetch("/api/show")
      .then((res) => res.json())
      .then((newData: ShowResponse) => {
        const fullData: FullData[] = newData.data;

        setData(fullData);
      });
  };

  const theatreHandler = (event: React.SyntheticEvent) => {
    fetch("/api/movie")
      .then((res) => res.json())
      .then((newData: MovieResponse) => {
        const fullData: FullData[] = newData.data;

        setData(fullData);
      });
  };

  const libraryHandler = (event: React.SyntheticEvent) => {
    fetch("/api/book")
      .then((res) => res.json())
      .then((newData: BookResponse) => {
        const fullData: FullData[] = newData.data;

        setData(fullData);
      });
  };

  const ZoomTab = () => {
    if (zoomData === null) {
      return <p>No data has been loaded.</p>;
    }
    return (
      <Box>
        <img src={zoomData.img_url}></img>
        <p>{zoomData.descrip}</p>
      </Box>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Select" />
          <Tab label="Display" />
          <Tab label="Zoom In" />
        </Tabs>
      </Box>
      <TabPanel value={selectedTab} index={0}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            minWidth: 300,
            width: "100%",
          }}
        >
          <ButtonBases
            url="televis.jpg"
            title="Shows"
            width="30%"
            handler={televisHandler}
          />
          <ButtonBases
            url="/theatre.jpg"
            title="Movies"
            width="30%"
            handler={theatreHandler}
          />
          <ButtonBases
            url="/library.jpg"
            title="Books"
            width="30%"
            handler={libraryHandler}
          />
        </Box>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <DisplayTab></DisplayTab>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <ZoomTab></ZoomTab>
      </TabPanel>
    </Box>
  );
}
