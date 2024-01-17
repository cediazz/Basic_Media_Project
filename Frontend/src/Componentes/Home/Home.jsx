import React from 'react';
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('access'))
            navigate('/Login');
    }, []);

    return (
        <div class="p-5 mb-4 bg-body-tertiary rounded-3">
            <div class="container-fluid py-5">
                <h1 class="display-5 fw-bold">Bienvenido a la Gestión de Medios Básicos</h1>
                <p class="col-md-12 fs-4">
                    En esta página web podrá insertar Medios Básicos(MB) o Activos Fijos Tangibles (AFT)
                    como se les conoce comúnmente y visualizarlos en un plano o mapa
                </p>
            </div>
        </div>
    )
}
export default Home