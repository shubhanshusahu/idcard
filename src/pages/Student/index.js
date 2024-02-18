import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SchoolList from './StudentList';
import CreateSchool from './Create';
import TeachersList from './StudentList';
import StudentList from './StudentList';
import CreateStudent from './Create';
import ImportStudents from './ImportStudent';

function CustomTabPanel(props) {
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

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Students() {
  const [value, setValue] = React.useState(0);
  const [idstudent, setidstudent] = React.useState(0);


  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  return (
    <Box sx={{ margin :'10px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="School"
          variant="scrollable"
          scrollButtons="auto"
        textColor="secondary" indicatorColor="secondary">
          <Tab label="Students" {...a11yProps(0)} />
          <Tab label="Create" {...a11yProps(1)} />
          <Tab label="Import Data" {...a11yProps(2)} />

          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <StudentList setValue={setValue} setidstudent={setidstudent}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <CreateStudent setValue={setValue} idstudent={idstudent}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ImportStudents setValue={setValue}/>
      </CustomTabPanel>

    </Box>
  );
}