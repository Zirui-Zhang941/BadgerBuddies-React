import React, { useContext, useState,useEffect } from "react";
import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSummary from "./BadgerBudSummary";
import { Row, Col } from 'react-bootstrap';

export default function BadgerBudsAdoptable(props) {
    const badgerBuddiesData = useContext(BadgerBudsDataContext);
    const [showbuddies,setShowBuddies]=useState(badgerBuddiesData);
    
    //useEffect(() => {
//const savedids=sessionStorage.getItem("savedCatIds");
    //    if(savedids!=null){
    //        setShowBuddies(b => b.filter(buddy => !savedids.includes(buddy.id)));
    //    }
        //setShowBuddies(b => b.filter(buddy => !savedids.includes(buddy.id)));
    //}, [sessionStorage]);
    const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
    //const badgerBuddiesData = useContext(BadgerBudsDataContext);
    const savedBuddies = badgerBuddiesData.filter(buddy => !savedCatIds.includes(buddy.id));
    //setShowBuddies(savedBuddies);
    useEffect(() => {
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const adopted = JSON.parse(sessionStorage.getItem("adoptId")) || [];
    //const badgerBuddiesData = useContext(BadgerBudsDataContext);
        const savedBuddies = badgerBuddiesData.filter(buddy => !savedCatIds.includes(buddy.id)&&!adopted.includes(buddy.id));
        setShowBuddies(savedBuddies);
    }, [savedCatIds, badgerBuddiesData]);

    
    
    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        {
            showbuddies.length==0 &&(
                <p>No buds are available for adoption!</p>
            )
        }
        <Row >
        {showbuddies.map(buddy => (
            <Col key={buddy.id}xs={12} sm={12} md={6} lg={3}>
                <BadgerBudSummary
                    //removecat={removecat}
                    gender={buddy.gender}
                    breed={buddy.breed}
                    age={buddy.age}
                    description={buddy.description}
                    id={buddy.id}
                    name={buddy.name}
                    IMGid={buddy.imgIds}
                />
            </Col>
        ))}
        </Row>

    </div>
}