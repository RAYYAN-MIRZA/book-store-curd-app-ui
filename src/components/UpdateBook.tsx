import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { bookInterface } from "./interface/bookInterface";
import { useNavigate, useParams } from "react-router-dom";
import RedirectToHome from "./RedirectToHome";

// function UpdateBook() 
function UpdateBook() {

    const { bookId } = useParams();
    const [title, settitle] = useState("");
    const [publishYear, setpublishYear] = useState(0);
    const [author, setauthor] = useState("");
    let newbook: bookInterface = {
        _id: "",
        title: title,
        author: author,
        publishYear: publishYear
    };
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/books/${bookId}`)
            .then((response) => {
                newbook = response.data;
                console.log(newbook);
                setauthor(newbook.author);
                settitle(newbook.title);
                setpublishYear(newbook.publishYear);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const handleSubmit = (event: any) => {
        event.preventDefault();
        // Assuming title, publishYear, and author are declared in the component's state
        console.log(title, publishYear, author);
        newbook._id = String(bookId);
        newbook.author = author;
        newbook.publishYear = publishYear;
        newbook.title = title;
        console.log("ja raha ");
        axios.put(`http://localhost:3001/update/${bookId}`, newbook)
            .then((response) => {
                if (!response) {
                    console.log("some error roccured!", response);
                }
                else {
                    alert("book updated sucessfully!");
                    navigate('/home');
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <Fragment>
            <RedirectToHome />
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }} >
                Update Speaking
                <form className="formm" onSubmit={handleSubmit} >
                    <label htmlFor="">Book Title </label>
                    <input type="text" value={title} onChange={(e) => settitle(e.target.value)} />
                    <label htmlFor="">Author</label>
                    <input type="text" value={author} onChange={(e) => setauthor(e.target.value)} />
                    <label htmlFor="">Publish Year</label>
                    <input type="number" value={publishYear} onChange={(e) => setpublishYear(parseInt(e.target.value))} />
                    <button type="submit" className="add" > Update to the store  </button>
                </form>
            </div>
        </Fragment>
    )
}

export default UpdateBook;