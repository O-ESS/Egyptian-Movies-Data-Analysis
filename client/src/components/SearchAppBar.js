import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import LoginIcon from '@mui/icons-material/Login';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Logout from '@mui/icons-material/Logout';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Alert } from '@mui/material';

const drawerWidth = 100;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);




const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const IconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));


const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const isLogged = props.isLogged;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [searchText, setSearchText] = useState("")
  // let history = useHistory()
  let navigate = useNavigate();

  const buttons = [
    <Button key="one" value="دراما" >دراما</Button>,
    <Button key="seven" value="دراما" > غموض</Button>,
    <Button key="eight" value=" دراما " >تشويق و اثارة</Button>,
    <Button key="nine" value="دراما" >حركة</Button>,
    <Button key="ten" value="دراما" >مغامرات</Button>,
    <Button key="eleven" value="دراما" >جريمة</Button>,

    <Button key="three" value="كوميدي" >كوميدي</Button>,
    <Button key="twelve" value="كوميدي" >عائلي</Button>,

    <Button key="six" value="رومانسي" >رومانسي</Button>,

    <Button key="thirteen" value="استعراضي" >استعراضي</Button>,

    <Button key="fourteen" value="تاريخي" >تاريخي</Button>,

    <Button key="fifteen" value="سيرة ذاتية" >سيرة ذاتية</Button>,

    <Button key="sixteen" value="حرب" >حرب</Button>,

    <Button key="seventeen" value="وثائقي" >وثائقي</Button>,

    <Button key="eighteen" value="قصير" >قصير</Button>,

    <Button key="nineteen" value="خيال" >خيال</Button>,

    <Button key="twenty" value="خيال" >خيال علمي</Button>,

    <Button key="twenty one" value="رياضي" >رياضي</Button>,

    <Button key="two" value="رعب" >رعب</Button>
  ];


  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <ButtonGroup onClick={handleClick} size="large" orientation="vertical" aria-label="large button group">
        {buttons}

      </ButtonGroup>


    </div>
  );

  async function handleClick(e) {

    e.preventDefault();
    props.setCategory(e.target.value);

    navigate(`filter/${e.target.value}`, { replace: true });





  }

  async function handleSubmit(e) {
    e.preventDefault();
    navigate(`/search/${searchText}`);
    window.location.reload();
  }
  console.log(isLogged, props.userName)
  if (!isLogged) {
    return (
      <Box style={{ zIndex: 100 }} sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Egyptian Movies
            </Typography>

            <nav className="navbar">
              <ul>
                <Button color="inherit" onClick={event => window.location.href = '/MovieStats'}>Movies statistics</Button>
                <Button endIcon={<LoginIcon />} color="inherit" className="links" onClick={event => window.location.href = '/login'}>Login</Button>
                <Button endIcon={<LockOpenIcon />} color="inherit" className="links" onClick={event => window.location.href = '/register'}>SignUP</Button>
                {//<Button endIcon={<SupervisorAccountIcon />} className="links" onClick={event =>  window.location.href='/admin'}>I'm an ADMIN</Button>
                }
              </ul>
            </nav>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <form onSubmit={handleSubmit}>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchText}
                  onChange={(e) => { setSearchText(e.target.value) }}

                />
              </form>
            </Search>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          {drawer}
        </Drawer>
      </Box>
    );
  }
  else {
    return (
      <Box style={{ zIndex: 100 }} sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Egyptian Movies
            </Typography>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Hello {props.userName}
            </Typography>
            <Button color="inherit" onClick={event => window.location.href = '/MovieStats'}>Movies statistics</Button>

            <MenuItem onClick={event => {
              // localStorage.removeItem("username");
              // localStorage.removeItem("user token");
              // localStorage.removeItem("type");
              localStorage.clear()
              window.location.href = '/'
            }}>

              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <form onSubmit={handleSubmit}>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchText}
                  onChange={(e) => { setSearchText(e.target.value) }}

                />
              </form>
            </Search>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          {drawer}
        </Drawer>
      </Box>);
  }

}
