import React, { useState,useEffect } from 'react';

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Button,
  TextField,
  Checkbox,
  FormGroup,

} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const FiltroCheques = props => {
  const {className} = props;
  
  const classes = useStyles();

  const [periodo, set_perido] = React.useState('Todas');
  const [status, set_status] = React.useState('Todas');
  const [data_cheque_inicial, set_Data_cheque_inicial] = useState([])
  const [data_cheque_final, set_Data_cheque_final] = useState([])

  
  const periodo_change = event => {
    if(event.target.value=="Todas"){
      set_Data_cheque_inicial([])
      set_Data_cheque_final([])
    }  
    set_perido(event.target.value);
  };

  const status_change = event => {
   
    set_status(event.target.value);
  };
 
  const onSubmit = (event) => {

    event.preventDefault();
    var filtros = {}
    var listafiltros = []
 
    if(periodo === "Mês"){
      filtros.data_cheque = data_cheque_inicial+","+data_cheque_final
      filtros.cond1 = "$gte"
      filtros.cond2 = "$lt"
      listafiltros.push(filtros)
      filtros = {}
    } 
    
    if(status === "Recebido"){
      filtros.status_cheque = 'E'
      filtros.cond1 = "$eq"
      listafiltros.push(filtros)
      filtros = {}
     
    } else if(status === "Pago"){
      filtros.status_cheque = 'EP'
      filtros.cond1 = "$eq"
      listafiltros.push(filtros)
      filtros = {}

    } else if(status === "Descontato"){
      filtros.status_cheque = 'ED'
      filtros.cond1 = "$eq"
      listafiltros.push(filtros)
      filtros = {}
    }


    props.listar_cheque_filtros(listafiltros)
  }

  return (
    <form onSubmit={e=> onSubmit(e)}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
              Filtros para Cheques
          </Typography>
          <Grid container spacing={3}>

          <Grid item xs={3}>
              <Card className={classes.root} variant="outlined" fullWidth>
                <CardContent>
                  <FormControl component="fieldset">
                      <FormLabel component="legend">Período</FormLabel>
                      <RadioGroup aria-label="gender" name="periodo" value={status} onChange={status_change}>
                          <FormControlLabel value="Recebido" control={<Radio />} label="Recebido" />
                          <FormControlLabel value="Pago" control={<Radio />} label="Pago" />     
                          <FormControlLabel value="Descontato" control={<Radio />} label="Descontato" />
                          <FormControlLabel value="Todas" control={<Radio />} label="Todas" />                                              
                      </RadioGroup>

                  </FormControl>
                </CardContent>  
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card className={classes.root} variant="outlined" fullWidth>
                <CardContent>
                  <FormControl component="fieldset">
                      <FormLabel component="legend">Período</FormLabel>
                      <RadioGroup aria-label="gender" name="periodo" value={periodo} onChange={periodo_change}>
                          <FormControlLabel value="Mês" control={<Radio />} label="Mês" />
                          <FormControlLabel value="Todas" control={<Radio />} label="Todas" />                                              
                      </RadioGroup>

                  </FormControl>
                </CardContent>  
              </Card>
            </Grid>

            <Grid item xs={3}>
              <Card className={classes.root} variant="outlined" fullWidth>
                <CardContent>
                  <FormControl component="fieldset">
                    <TextField
                      disabled  = {periodo !== "Mês" ? true : false}
                      name="data_cheque_inicial"
                      label="Mês inicial cheque *"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                          shrink: true,
                      }}
                      value={data_cheque_inicial}
                      onChange={e => set_Data_cheque_inicial(e.target.value)}
                    />

                    <TextField
                      disabled  = {periodo !== "Mês" ? true : false}
                      name="data_venda_final"
                      label="Mês cheque venda *"
                      type="date"
                      className={classes.textField}
                      InputLabelProps={{
                          shrink: true,
                      }}
                      value={data_cheque_final}
                      onChange={e => set_Data_cheque_final(e.target.value)}
                   />    
                  </FormControl>
                </CardContent>  
              </Card>
            </Grid>

            <Grid item xs={2}>
            <Button fullWidth  type="submit" variant="contained" color="primary">
                    Pesquisar
            </Button>
            </Grid>
          </Grid>
        </CardContent>  
      </Card>
    </form>
  );
};

FiltroCheques.propTypes = {
  className: PropTypes.string,

};

export default FiltroCheques;