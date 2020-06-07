import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Catalog from '../catalog/view/Catalog';
import Login from '../users/login/Login';
import ManageCatalog from '../catalog/manage/ManageCatalog';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import InfoIcon from '@material-ui/icons/Info';
import Types from './headtext';
import OverLine from './footliner';
import jwt_decode from "jwt-decode";
import Cart from '../cart/view/Cart';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

var token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
 
var decoded = jwt_decode(token);

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 
  return (
    <div className={classes.root}>
    <Types/>
   
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          centered="true"
          aria-label="scrollable force tabs example"
        >
            <Tab label="Авторизация" icon={<PersonPinIcon />} {...a11yProps(0)} />
            <Tab label="Каталог" icon={<StorefrontOutlinedIcon />} {...a11yProps(1)} />
            <Tab label="Каталог админа" icon={<PersonPinIcon />} {...a11yProps(2)} />
            <Tab label="Корзина" icon={<ShoppingBasket />} {...a11yProps(3)} />
            <Tab label="Инфо" icon={<InfoIcon />} {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={1}>
      
      {/* {
        jwt_decode({token}).role === "Manager" ? (
            <ManageCatalog/>
          ) : (
            <Catalog/>
          )
      } */}
      <Catalog/>
      </TabPanel>
      <TabPanel value={value} index={0}>
        <Login/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ManageCatalog/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <Cart/>
      </TabPanel> 
      <TabPanel value={value} index={4}>
      {console.log(decoded.role)}
      </TabPanel> 
          </div>
  );
}

