import React, { useContext } from 'react';
import POCList from './pocList';
import PocView from './pocView';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../store/auth-context';

const Poc = () => {

    const authCtx = useContext(AuthContext);
    const role = authCtx.role;

    const userDetails = useSelector((state) => state.employeeReducer);
     const { poc } = userDetails

     const flag = role!="EMPLOYEE" ? true: false;

    let Element = role!="EMPLOYEE" ? <POCList />: ( poc.map(element => <PocView id = {element._id}/> ))
    console.log('Element :22222222222222', Element);

    return (
        flag && <POCList />
        {!flag && poc.map(element => <PocView id = {element._id}/> } 
    )

}

export default Poc;