import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Button } from "@blueprintjs/core"
import "./Home.css";
import axios from "axios";
import { toast } from "react-toastify";


const Home = () => {

    const [listCard, setCard] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadCard = async () => {
        setLoading(true);
        const response = await fetch("http://localhost:5000/cards");
        const data = await response.json();
        setCard(data);
        setLoading(false);
    };

    useEffect(() => {
    loadCard();
    }, []);


    if(loading) return <div>loading...</div>

    const deleteCard = (id) => {
        if(window.confirm("Are you sure that you wanted to delete that card ?")) {
            axios.delete(`http://localhost:5000/cards/delete/${id}`);
            toast.success("Card Deleted Successfully");
            setTimeout(() => loadCard(), 500);
        }
    }

    const deleteAllCards = () => {
        if(window.confirm("Are you sure that you wanted to delete all that cards ?")) {
            axios.delete(`http://localhost:5000/cards/delete`);
            toast.success("Cards Deleted Successfully");
            setTimeout(() => loadCard(), 500);
        }
    }

    return (
        
        <div class="wrapper">
            <Link to="/addCard">
                <button className="btn btn-card">Add Card</button>
            </Link>
            <Link>
                <button 
                className="btn btn-delete-all"
                onClick={() => deleteAllCards()}>Delete All</button>
            </Link>
            <div style={{height: "500px", overflow: "scroll"}}>
            <table className="styled-table">
                <thead>
                <tr>
                    <th style={{textAlign: "center"}}>ID</th>
                    <th style={{textAlign: "center"}}>Title</th>
                    <th style={{textAlign: "center"}}>Description</th>
                    <th style={{textAlign: "center"}}>isDone</th>
                    <th style={{textAlign: "center"}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {listCard.map(card => {
                    const { id, title, description, isDone } = card
                    return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{title}</td>
                        <td>{description}</td>
                        <td>{isDone.toString()}</td>
                        <td>
                        <Link to={`/update/${id}`}>
                            <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button 
                        className="btn btn-delete"
                        onClick={() => deleteCard(id)}>Delete</button>
                        <Link to={`/view/${id}`}>
                            <button className="btn btn-view">View</button>
                        </Link>
                        </td>
                    </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Home;