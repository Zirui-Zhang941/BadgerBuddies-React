import React, { useContext, useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudsBasSum from "./BadgerBudsBasSum";
import { Row, Col } from 'react-bootstrap';

export default function BadgerBudsBasket(props) {
    const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
    const badgerBuddiesData = useContext(BadgerBudsDataContext);
    const [showsaved,setShowsaved]=useState(badgerBuddiesData);

    //const savedBuddies = badgerBuddiesData.filter(buddy => savedCatIds.includes(buddy.id));
    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const adopted = JSON.parse(sessionStorage.getItem("adoptId")) || [];
        const savedBuddies = badgerBuddiesData.filter(buddy => savedCatIds.includes(buddy.id)&&!adopted.includes(buddy.id));
        setShowsaved(savedBuddies);
    }, [savedCatIds, badgerBuddiesData]);

    //const [savedCatIds, setSavedCatIds] = useState([]);
    function Unselect(id){
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const processedCatIds=savedCatIds.filter(item=>item!==id);
        sessionStorage.setItem("savedCatIds", JSON.stringify(processedCatIds));
        //const savedBuddies = badgerBuddiesData.filter(buddy => savedCatIds.includes(buddy.id));
        //setShowsaved(savedBuddies);
        const removedBuddy = savedBuddies.find(buddy => buddy.id === id);
        if(removedBuddy){
            alert(`${removedBuddy.name} has been removed from your basket!`);
        }
    }
    
    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        {
            showsaved.length==0&&(
                <p>You have no buds in your basket!</p>
            )
        }
        <Row >
            
            {showsaved.map(buddy => (
                <Col key={buddy.id}xs={12} sm={12} md={6} lg={3}>
                <BadgerBudsBasSum
                    key={buddy.id}
                    name={buddy.name}
                    IMGid={buddy.imgIds[0]}
                    id={buddy.id}
                    //HandleUnselect={Unselect}
                    //onAdopt={handleAdopt}
                />
                </Col>
            ))}
            
        </Row>
    </div>
}