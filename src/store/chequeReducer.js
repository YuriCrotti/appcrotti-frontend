
import api from '../services/api'

const ACTIONS = {

    ADD_LISTA: 'CHEQUE_ADD_LISTA',
    SALVAR: 'CHEQUE_SALVAR',
    LISTAR: 'CHEQUE_LISTAR',
    LIMPAR: 'CHEQUE_LIMPAR',
    LISTAR_FILTRO :'CHEQUE_LISTAR_FILTRO',
    ALTERARSTATUS: 'CHEQUE_ALTERARSTATUS',
    DESCONTAR: 'CHEQUE_DESCONTAR',

}

const ESTADO_INICIAL={
    cheque:[]
}

export const chequeReducer = (state = ESTADO_INICIAL, action) => {

    switch(action.type){
      
        case ACTIONS.ADD_LISTA:
            return {...state,cheque:[...state.cheque,action.cheque]}   
        case ACTIONS.LISTAR_FILTRO:
            return {...state,cheque:action.cheque}
        case ACTIONS.ALTERARSTATUS:
            return {...state,cheque:action.cheque}   
        case ACTIONS.DESCONTAR:
                return {...state,cheque:action.cheque}     
        case ACTIONS.SALVAR:
                return {...state,cheque:[...state.cheque,action.cheque]} 
        case ACTIONS.LIMPAR:
                    return {...state,cheque:[...state.cheque,action.cheque]}
        default:
            return state;
        }

}



export function alterarstatus_cheque(id,status){
 
    return dispatch =>{
        api.put('/cheque/updatestatus/'+id,{
            status_atual:status
        })
        .then(response => {
            dispatch({
                type: ACTIONS.ALTERARSTATUS,
                cheque : []
            })   
        })
        .catch(
            erro =>{console.log(erro)})

    }  
 
}

export function descontar_cheque(id,status){

    console.log("descontando cheque...")
    return dispatch =>{
        api.put('/cheque/descontarcheque/'+id,{
            status_atual:status
        })
        .then(response => {
            dispatch({
                type: ACTIONS.DESCONTAR,
                cheque : []
            })   
        })
        .catch(
            erro =>{console.log(erro)})

    }  
 
}

export function adicionar_lista_cheque(cheque){
    
    return dispatch =>{
            dispatch({
                type: ACTIONS.ADD_LISTA,
                cheque : cheque
            })   
        
    }  
    
}

export function limpar_lista_cheque(){
    
    return dispatch =>{
            dispatch({
                type: ACTIONS.LIMPAR,
                cheque : []
            })   
        
    }  
    
}

export function salvar_cheque(cheque){
    
    return dispatch =>{
        console.log(cheque)
        api.post('/cheque/save', cheque)
        .then(response => {
            dispatch({
                type: ACTIONS.SALVAR,
                cheque : []
            })   
        })
        .catch(
            erro =>{console.log(erro)})
    }  
    
}


export function listar_cheque_filtros(filtros){

    return dispatch =>{
        
        api.get('/cheque/show',{params:filtros} )
        .then(response => {
            dispatch({
                type: ACTIONS.LISTAR_FILTRO,
                cheque : response.data
            })         
        })
        .catch(function (error) {
          console.log(error)
        })
    }  
}
