
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import React, { useEffect, useState } from "react"
import axios from "axios";
import { Link, Route } from "react-router-dom"
import { bookInterface } from "./interface/bookInterface";
import ShowBook from "./ShowBook";

interface HomeProps {
    greet: string
}
// Assuming your type definition for the 'to' prop looks like this
const Home: React.FunctionComponent<HomeProps> = (props) => {
    //  intially books ek array of object hai jo k empty hai!
    const [books, setBooks] = useState<bookInterface[]>([]);
    const [input, setInput] = useState("");
    const [Loading, setLoading] = useState(true);
    const [hookcheck, sethookcheck] = useState(false);
    useEffect(() => {
        // setLoading(true);
        axios.get("http://localhost:3001/books")
            .then((response) => {
                setBooks(response.data);
                setLoading(false);
                console.log("or ki haal hai ?");
            })
            .catch((error) => {
                console.log(error);
            });
    }, [hookcheck]);
    // ye second paramaeter bhi leta hai jissey hm dependency array kehte hain 
    //     means k agr is array me se ksiis cheeez ki value bhi change hoti hai toh hame pata chal 
    //      jata hai or ye re render hota ahi 

    function confirmdel(id: string): void {
        const confirmDelete = window.confirm("Do you want to delete?");

        if (confirmDelete) {
            console.log(`Deleting item with ID: ${id}`);
            axios.delete(`http://localhost:3001/del/${id}`).then((response) => {
                console.log(response.data);
                sethookcheck(!hookcheck);
            })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div>
            {props.greet}
            <header  style={{textAlign:"center",color:"darkblue",fontWeight:"bold"}}>Available Books</header>
            <Link to='/add'>
                <button className="learn-more">
                    <span className="circle" aria-hidden="true">
                        <span className="icon arrow"></span>
                    </span>
                    <span className="button-text">Add More</span>
                </button>
            </Link>
            {Loading ? (<h1>loadingnig</h1>) :
                (
                    <table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Publish year</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book: bookInterface, index: number) => (
                                <tr key={book._id}>
                                    <td>{index + 1}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publishYear}</td>
                                    <td>
                                        <div className="operations">
                                            <Link to={`/showbooks/${book._id}`}>
                                                <button><FaEye style={{ color: 'blue' }} /></button>
                                            </Link>
                                            {/* <Link to={`/update/${book._id}`}> */}
                                            <Link to={{ pathname: `/update/${book._id}`}}>
                                                <button><FaEdit style={{ color: 'black' }}></FaEdit></button>
                                            </Link>
                                            <button onClick={() => (confirmdel(book._id))}><FaTrash style={{ color: 'red', fontSize: '15px' }} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
            }
        </div>
    )
}

export default Home;

