//import * as React from 'react';
import Typography from '@mui/material/Typography';
import "./styles.css";
const bestActors_40s = require('../Images/bestActors_40s.png');
const bestActors_50s = require('../Images/bestActors_50s.png');
const bestActors_60s = require('../Images/bestActors_60s.png');
const bestActors_70s = require('../Images/bestActors_70s.png');
const bestActors_Action = require('../Images/bestActor_Action.png');
const bestActors_Comedy = require('../Images/bestActor_Comedy.png');
const bestActors_Drama = require('../Images/bestActor_Drama.png');
const bestActors_Romance = require('../Images/bestActor_Romance.png');
const director40 = require('../Images/director40.png');
const director50 = require('../Images/director50.png');
const director60 = require('../Images/director60.png');
const director70 = require('../Images/director70.png');
const movieDuration = require('../Images/movieDuration.png');



export default function StatsPage() {


    return (
<div>

        <div>
        <Typography  variant="h2"
        noWrap
        component="div"
        sx={{alignItems:'center',flexGrow: 3, display: { xs: 'none', sm: 'block' } }}>  Best actors per decade(most appering as a lead) </Typography>
        <img src={bestActors_40s}/>
        <img src={bestActors_50s}/>
        <img src={bestActors_60s}/>
        <img src={bestActors_70s}/>
        </div>

<div>
<Typography  variant="h2"
noWrap
component="div"
sx={{alignItems:'center',flexGrow: 3, display: { xs: 'none', sm: 'block' } }}>  Best actors per genre(most appering as a lead) </Typography>
<img src={bestActors_Action}/>
<img src={bestActors_Comedy}/>
<img src={bestActors_Drama}/>
<img src={bestActors_Romance}/>
</div>
<div>
        <Typography  variant="h2"
        noWrap
        component="div"
        sx={{alignContent:'center',alignSelf:'center',flexGrow: 3, display: { xs: 'none', sm: 'block' } }}>  Best directors per decade </Typography>
        <img src={director40}/>
        <img src={director50}/>
        <img src={director60}/>
        <img src={director70}/>
        </div>

        <div  >
        <Typography  variant="h2"
        noWrap
        component="div"
        sx={{alignContent:'center',alignSelf:'center',flexGrow: 3, display: { xs: 'none', sm: 'block' } }}>  Average duration for each movie </Typography>
        <img  width={1000} height={400} src={movieDuration}/>
     
        </div>

        </div>
        );
}

