import axios from "axios";
import React, { useState } from "react";
import { bookInterface } from "./interface/bookInterface";
import { useNavigate } from "react-router-dom";


function CreateBook() {
    const [title, settitle] = useState("");
    const [publishYear, setpublishYear] = useState(0);
    const [author, setauthor] = useState("");
    const navigate=useNavigate();
    
    const handleSubmit = (event:any) => {
        event.preventDefault();
        // Assuming     title, publishYear, and author are declared in the component's state
        console.log(title, publishYear, author);
        const newbook: bookInterface={
            _id:"",
            title:title,
            author:author,
            publishYear:publishYear
        };
        axios.post("http://localhost:3001/addBook",newbook)
        .then((response)=>{
            if(!response){
                console.log("some error roccured!",response);                
            }
            else {
                alert("book added sucessfully!");
                navigate('/home');
            }
        })
        .catch((error)=>{
            console.log(error);
        })
      };
      
    return (
        <div>
            Create Speaking
            <form className="formm" onSubmit={handleSubmit} >
                <label htmlFor="">Book Title </label>
                <input type="text" value={title} onChange={(e) => settitle(e.target.value)} />
                <label htmlFor="">Author</label>
                <input type="text" value={author} onChange={(e) => setauthor(e.target.value)} />
                <label htmlFor="">Publish Year</label>
                <input type="number" value={publishYear} onChange={(e) => setpublishYear(parseInt(e.target.value))} />
                <button type="submit" className="add" > Add to the store  </button>
            </form>
        </div>
    )
}

export default CreateBook;