import React from 'react';

interface IProps {
    texto: string;
    color: string;
}


export function Title(props: IProps) {
    const textTitle = !props.texto ? "Titulo no definido" : props.texto;
    const colorTitle = !props.color ? "black" : props.color;

    return <h2 style={{color:colorTitle}}> { textTitle } </h2>
}
