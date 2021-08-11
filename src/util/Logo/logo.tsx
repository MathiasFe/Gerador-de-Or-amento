import React from 'react';
import logoStyle from './makeStyles';
//@ts-ignore
import logo from '../../Content/logoPrincipal.png';

const Logo: React.FC = () => {
  const classes = logoStyle();
  return <img src={logo} alt="GeraOrcs"/>;
}

export default Logo;