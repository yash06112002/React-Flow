import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import WorkFlow from '../components/WorkFlow';
import "../styles/workflowpage.css"

const WorkFlowPage = () => {
    const [data, setdata] = useState({})
    const params = useParams();
    useEffect(() => {

        const getData = async () => {

            const response = await fetch(`https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${params.workFlowId}`);

            if (!response.ok) {
                throw { message: 'Cound not fetch data' }
            } else {
                const resData = await response.json();
                // console.log(resData)
                setdata(resData)
            }
        }
        getData();
    }, [])

    return (
        <div className='body'>
            <div className='heading'>Workflow name: {data?.name}</div>
            <div className='container'>
                <div className='react-flow'>
                    <WorkFlow data={data} />
                </div>
            </div>
        </div>
    )
}

export default WorkFlowPage
