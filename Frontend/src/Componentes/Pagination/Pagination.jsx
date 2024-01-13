import React from 'react';
import './mypagination.css';
import ReactPaginate from 'react-paginate';
import getMedias from '../MediaManagement/getMedias';

function MyPagination(props) {
    
   

    const handlePageChange = async (event) => {
        props.setLoading(true)
        console.log(event)
        const page = event.selected + 1;
        //console.log(newActivePage)
        let data = await getMedias(page,props.description,props.category,props.plan)
        console.log(data)
        props.setMedias(data.results)
        props.setLoading(false)
    };

   

    return (
        <>
            <ReactPaginate
                nextLabel={"siguiente"}
                previousLabel={"anterior"}
                pageCount={props.pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                pageClassName={'page-item'}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                activeClassName={"active"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
            />
        </>
    )

}
export default MyPagination