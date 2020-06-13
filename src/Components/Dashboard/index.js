import React ,{useEffect, useState} from 'react'
import axios from "axios";
import { Button, ButtonGroup} from "reactstrap";
import moment from "moment";
import "./dashboard.css";

function Dashboard({history}) {

    const [events, setEvents] = useState([]);
    
    const { userId } = localStorage.getItem('user');
    const [ cSelected, setCselected] = useState([]);
    const [rSelected, setRselected] = useState(null);

    console.log(userId);
    useEffect( ()=>{
        getEvents()
    },[])

    const filterHandler  = (query) => {
        setRselected(query)
        getEvents(query)
    }

    const getEvents = async (filter) => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard'
        const response = await axios.get(url, {headers: { userId}})
        setEvents(response.data);
    }

    return (
        <>
        <div>
            <ButtonGroup >
            <Button color="primary" onClick={() => filterHandler(null)} active={rSelected === null}>All Sports</Button>
                    <Button color="primary" onClick={() => filterHandler("running")} active={rSelected === 'running'}>Running</Button>
                        <Button color="primary" onClick={() => filterHandler("cycling")} active={rSelected === 'cycling'}>Cycling</Button>
                        <Button color="primary" onClick={() => filterHandler('swimming')} active={rSelected === 'swimming'}>Swimming</Button>
                </ButtonGroup>
                <Button color="secondary" onClick={()=> history.push('events')}>Events</Button>
        </div>
        <ul className="events-list">
            {
                events.map(event => {
                    return <li key={event._id}>
                        <header style={{ backgroundColor:"white"}} />
                        <strong>{event.title}</strong>
                        <span>Event Date: {moment(event.date).format('l')}</span>
                        <span>Event Price: {parseFloat(event.price).toFixed(2)}</span>
                        <span>Event Description: {event.description}</span>
                        <Button color="primary">Subscribe</Button>
                    </li>
                })
            }
        </ul>
        </>
        
    )
}

export default Dashboard
;