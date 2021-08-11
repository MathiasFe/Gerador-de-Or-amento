import { makeStyles, Theme } from "@material-ui/core";
import bgHome from '../../Content/bgHome.jpg';

const HomeStyle = makeStyles((theme: Theme) => ({
  container: {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.66), rgba(0, 0, 0, 0.66)), url(${bgHome})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    margin: '0',
    position:'relative',
    padding: '0 4em',
    zindex:0,

    '&::before': {
      content: "''",
      position: 'absolute',
      border: '50vh solid transparent',
      borderLeftColor: 'rgba(0, 0, 0, 1)',
      
      borderTopColor: 'rgba(0, 0, 0, 1)',
      top: '0',
      left: '0',
    }
  },


  container_logo:{
      zIndex:10000,
  },

  title:{
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '3.5rem',
    lineHeight: '61px',
    letterSpacing: '0.02em',
    color: '#FFFFFF',
    '& span': {
      color: '#AF3CFF',
    }
  },
  
  container_Button: {
    zIndex: 3,
    '& a': {
      textDecoration:'none',
    },
    '& button':{
      position: 'relative',
      top: '-2vh',
      height:'4rem',
      width: '20rem',
      letterSpacing: '0.21rem',
      fontFamily:'Roboto',
    }
  }
  



}))


export default HomeStyle;