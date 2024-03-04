import React, { useState } from "react";
import { Row, Col, Button,Carousel, CarouselItem } from 'react-bootstrap';

const BadgerBudSummary=({name,IMGid,id,gender,breed,age,description,removecat})=>{
    const url=`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${IMGid[0]}`;
    const [ifshowed,setIfshowed]=useState(false);
    const ifshowcontrol = () => {
        setIfshowed(!ifshowed);
    };
    const savedCatIds=[];
    //removecat(id);
    const Saveitem=()=>{
        //removecat(id);
        
        savedCatIds.push(id)
        //sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds));
        if (sessionStorage.getItem("savedCatIds")!=null){
            const temp=JSON.parse(sessionStorage.getItem("savedCatIds"));
            temp.push(id);
            sessionStorage.setItem("savedCatIds", JSON.stringify(temp));
        }else{
            //savedCatIds.push(id)
            sessionStorage.setItem("savedCatIds", JSON.stringify(savedCatIds));
        }
        //const savedCatIds=[];
        //savedCatIds.push(id);//push the id 
        //sessionStorage.setItem("savedCatIds", savedCatIds);

        //sessionStorage.setItem({id},id);
        alert(`${name} has been added to your basket!`);

        
    }
    return (
        
        <div key= {id} id={id}>
            
            {
                ifshowed ? (
                    <div className="image-container">
                        <Carousel>
                            {
                                IMGid.map((imgid)=>(
                                    <Carousel.Item>
                                        <img src={`https://raw.githubusercontent.com/CS571-S24/hw5-api-static-content/main/cats/${imgid}`} alt={`A picture of${name}`}>
                                        </img>
                                    </Carousel.Item>
                                ))
                            }
                        </Carousel>
                        <h1>{name}</h1>
                        <p>Gender: {gender}</p>
                        <p>Breed: {breed}</p>
                        <p>Age: {age}</p>
                        {description && <p>Description: {description}</p>}
                    </div>
                ) :(
                    <div className="image-container">
                        <img src={url} alt={`A picture of ${name}`}></img>
                        <h1>{name}</h1>
                    </div>
                )
            }
            
            <Button onClick={ifshowcontrol}>{ifshowed ?"Show Less" : "Show More"}</Button>
            
            <Button style={{ backgroundColor: 'grey', color: 'white' }} 
            onMouseEnter={(e)=>e.target.style.backgroundColor = 'red'} 
            onMouseLeave={(e)=>e.target.style.backgroundColor = 'grey'}
            onClick={Saveitem}>  Save</Button>
            
            
        </div>
    );
}
export default BadgerBudSummary;

//citation: asked chat gpt how to display a<div><div> part based on a boolean value in jsx?
//get:{showDiv && <div><div>Content</div></div>} used part of this