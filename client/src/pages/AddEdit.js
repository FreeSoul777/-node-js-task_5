import React, {useEffect, useState} from 'react';
import {useNavigate, Link, useParams} from "react-router-dom";
import "./AddEdit.css";
import axios from "axios";
import {toast} from "react-toastify";


const initialState = {
    title: "",
    description: ""
};

const AddEdit = () => {

    const [state, setState] = useState(initialState);
    const {title, description} = state;
    const history = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/cards/${id}`).then((resp) => 
        setState({ ...resp.data}));
    }, [setState]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!description || !title) {
            toast.error("Please provide value into each input field");
        } else {
            if(!id) {
                axios.post("http://localhost:5000/cards/add", {
                    title, description
                }).then(() => {
                    setState({title: "", description: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Card Added Successfully");
            } else {
                axios.put(`http://localhost:5000/cards/update/${id}`, {
                    title, description
                }).then(() => {
                    setState({title: "", description: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Card Update Successfully");
            }
            setTimeout(() => history("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value});
    };
     
    return(
        <div style={{marginTop: "100px"}}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "400px",
                alignContent: "center"
            }}
            onSubmit={handleSubmit} >
                <label htmlFor='title'>Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder='Title ...'
                    value={title || ""}
                    onChange={handleInputChange}
                />

                <label htmlFor='description'>Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder='Description ...'
                    value={description || ""}
                    onChange={handleInputChange}
                />
                
                <input type="submit" value={id ? "Update" :"Save"} />
                <Link to="/">
                    <input type="button" value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default AddEdit