import React from 'react'
import { useState, useEffect } from "react";
import { db } from '../firebase'
import { collection, onSnapshot, query } from "firebase/firestore";
import "./components.css"
import ListaUnidad from './ListaUnidad';

const List = () => {
    //Obtener datos de Firebase
    const [datos, setDatos] = useState([])
    const obtenerDatos = async () => {
        const q = query(collection(db, "unidades"));
        onSnapshot(q, (querySnapshot) => {
            const nom = [];
            querySnapshot.forEach((doc) => {
                nom.push({ ...doc.data(), id: doc.id });
                /* console.log(doc.data().nombre) */
            });
            setDatos(nom);
        });
    }
    useEffect(() => {
        obtenerDatos();
    }, [])

    return (
        <div className='lista'>
            <h2>Unidades Unicas Age Of Empires 2 DE</h2>
            {datos.map(e =>
                <div key={e.id}>
                    <ListaUnidad
                        nombre={e.nombre}
                        civilizacion={e.civilizacion}
                        unidadCompleta={e}
                    />
                </div>
            )}
        </div>
    )
}

export default List