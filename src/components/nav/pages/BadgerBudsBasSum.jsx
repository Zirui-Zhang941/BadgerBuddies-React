import React, { useState } from "react";
import { Row, Col, Button } from 'react-bootstrap';
const BadgerBudsBasSum= ({name, IMGid, id})=>{
    const url = `https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${IMGid}`;

    const Adopt=()=>{
        if(sessionStorage.getItem("adoptId")!=null){
            const temp=JSON.parse(sessionStorage.getItem("adoptId"));
            temp.push(id);
            console.log(temp);
            sessionStorage.setItem("adoptId",JSON.stringify(temp));
            alert(`Thank you for adopting ${name}!`);

        }else{
            const adopted=[];
            adopted.push(id);
            sessionStorage.setItem("adoptId",JSON.stringify(adopted));
            alert(`Thank you for adopting ${name}!`);
        }
        
    }

    const Unselect=()=>{
        const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds")) || [];
        const processedCatIds=savedCatIds.filter(item=>item!==id);
        sessionStorage.setItem("savedCatIds", JSON.stringify(processedCatIds));
        //const savedBuddies = badgerBuddiesData.filter(buddy => savedCatIds.includes(buddy.id));
        //setShowsaved(savedBuddies);
        
        alert(`${name} has been removed from your basket!`);
        
    }
    return (
        <div className="image-container" key={id} id={id}>
            <img src={url} alt={`A picture of ${name}`}></img>
            <h1>{name}</h1>
            <Button onClick={Unselect} >Unselect</Button>
            <Button style={{ backgroundColor: 'grey', color: 'white' }} 
            onMouseEnter={(e)=>e.target.style.backgroundColor = 'red'} 
            onMouseLeave={(e)=>e.target.style.backgroundColor = 'grey'}
            onClick={Adopt}>Adopt</Button>
        </div>
    );
}

export default BadgerBudsBasSum;