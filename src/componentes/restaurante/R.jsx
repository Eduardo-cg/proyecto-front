import React from 'react';
import { useParams } from 'react-router-dom';
import Restaurante from './Restaurante';
import uuid from 'react-uuid';

function R() {

    const { id } = useParams();
    console.log(id);

    return (
        <div>
            <Restaurante key={uuid()} id={id} />
        </div>
    );

}

export default R;