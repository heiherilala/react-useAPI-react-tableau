import React from 'react';

export function LigneList (props) {
    const idLine = props.idLine;
    const item = props.item;
    const functionChangID = props.functionChangID;
    const functionFermetur = props.functionFermetur;
    const functionParLing = ()=>{
        functionChangID(item.id-1);
        functionFermetur()
    }
    return (
        <>
            <tr id={""+item.id} key={item.name} onClick={functionParLing}>
                <td>{item.name}</td>
                <td>{item.address.city}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.company.name}</td>
            </tr>
        </>
    );
};

