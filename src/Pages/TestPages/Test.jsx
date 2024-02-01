import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import ApiContent1 from './ApiContent1';



const TabContent1 = React.memo(() => <ApiContent1 />);
const TabContent2 = React.memo(() => <div>Item Two Content</div>);
const TabContent3 = React.memo(() => <div>Item Three Content</div>);

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabContent = (tabValue) => {
    switch (tabValue) {
      case '1':
        return <TabContent1/>;
      case '2':
        return <TabContent2 />;
      case '3':
        return <TabContent3 />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>

        {renderTabContent(value)}
      </TabContext>
    </Box>
  );
}
