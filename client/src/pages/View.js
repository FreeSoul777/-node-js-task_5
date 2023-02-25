import React, {useEffect, useState} from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./View.css";

const View = () => {

    const [card, setState] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/cards/${id}`).then((resp) => 
        setState({ ...resp.data}));
    }, [setState]);

    return(
        <div style={{marginTop: "150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Card Detail</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{card.id}</span>
                    <br />
                    <br />
                    <strong>Title: </strong>
                    <span>{card.title}</span>
                    <br />
                    <br />
                    <strong>Description: </strong>
                    <span>{card.description}</span>
                    <br />
                    <br />
                    <strong>Is Done: </strong>
                    <span>{String(card.isDone)}</span>
                    <br />
                    <br />
                    <Link to="/">
                        <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>
            </div>
        </div>
        
    )
};

export default View;