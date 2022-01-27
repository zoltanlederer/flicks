import React from "react"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { flexbox } from '@mui/system';


const CardPopular = ({popular, mediaType}) => {
  console.log(popular)
  console.log(mediaType)
  return (
      <Grid 
        container
        spacing={3}
        justifyContent="center"
        marginBottom={5}
      >

      {
        popular.map(item => (
          <Grid item key={item.id}>
            
              <Paper  elevation={12} sx={{width: 200, height: 350}}>
                <Box>
                  <img width='100%'
                  src={mediaType === 'person' && item.profile_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.profile_path}`
                    : mediaType === 'person' && item.profile_path === null ? `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                    : mediaType === 'movie' && item.poster_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
                    : mediaType === 'movie' && item.poster_path === null ? `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                    : mediaType === 'tv' && item.poster_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
                    : mediaType === 'tv' && item.poster_path === null ? `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                    : mediaType === 'multi' && item.poster_path !== null ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`
                    : `https://st4.depositphotos.com/14953852/22772/v/600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg`
                    }              
                  alt={item.title} />                
               </Box>
               <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  height: 40
                  }}>
                <Typography>
                    { item.media_type === 'tv' || item.media_type === 'person' ? item.name 
                      : item.media_type === 'movie' ? item.title : '' }
                </Typography>  
               </Box> 
            </Paper>
          </Grid>
        ))
      }
      </Grid>
  )
}

export default CardPopular