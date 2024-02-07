import React from "react"
import { useState, useEffect } from 'react'
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { categoryDetail } from "../../actions/categoryActions";

export default function SpecificCategory(props) {
    const dispatch = useDispatch()
    const specificCategory = useSelector(state => state.categoryDetails) 
    const { loading, error, category } = specificCategory
    
    
    useEffect(() => {
        dispatch(categoryDetail(props.id))
    }, [props.id])

    return (
        <div style={{ textAlign: "center" }}>
            {loading ? <Loading /> : category ? < img src={category.image} alt="" />: error}
        </div>
    )


}