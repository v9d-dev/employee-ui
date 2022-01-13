import React, { useContext } from 'react';
import CertificationList from './CertificationList';
import CertificationView from './certificationView';
import { useSelector } from 'react-redux';
import { AuthContext } from '../../store/auth-context';

const Certification = () => {

    const authCtx = useContext(AuthContext);
    const role = authCtx.role;

    const userDetails = useSelector((state) => state.employeeReducer);
     const { poc } = userDetails

    let Element = role!="EMPLOYEE" ? <CertificationList />: ( poc.map(element => <CertificationView id = {element._id}/> ))

    return (
        {Element}
    )

}

export default Certification;