import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Category } from '@mui/icons-material';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './styles.css'

const drawerWidth = 100;

const buttons = [
    <Button key="one" value="دراما" >دراما</Button>,
    <Button key="two" value="كوميدي" >كوميدي</Button>,
    <Button key="three" value="اكشن" >اكشن</Button>,
    <Button key="four" value="رعب" >رعب</Button>,
    <Button key="five" value="رومانسي" >رومانسي</Button>
  ];

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />

        <ButtonGroup onClick={handleClick} size="large" orientation="vertical" aria-label="large button group">
          {buttons}

      </ButtonGroup>


    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const [movieData, setMovieData] = useState();
  let navigate = useNavigate();

  async function handleClick(e) {
    
    e.preventDefault();
    props.setCategory(e.target.value);
  //  console.log("cat: ",category);
    //console.log("val: ",e.target.value);
    navigate(`filter/${e.target.value}`, { replace: true });
    //window.location.reload();

}
  
  // useEffect(() => {
  //     axios.get(`http://localhost:8080/filter/${category}`)
  //         .then(res => {
  //             setMovieData(res.data)
  //             console.log("hi")
  //             console.log(movieData)
  //         })
  //         .catch(err => console.log(err.response.data))

  // }, [])

  return (
    <Box  sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        {}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
