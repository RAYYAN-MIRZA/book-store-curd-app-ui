import { Fragment, useEffect, useState } from "react";
import { bookInterface } from "./interface/bookInterface";
import RedirectToHome from "./RedirectToHome";
import { useParams } from "react-router-dom";
import axios from "axios";
function ShowBook() {
    const { bookId } = useParams();
    const [bookdata, setbookdata] = useState<bookInterface>({
        _id: "",
        title: "",
        author: "",
        publishYear: 0
    }
    );
    useEffect(() => {
        axios.get(`http://localhost:3001/books/${bookId}`)
            .then((response) => {
                setbookdata(response.data);
                console.log(bookdata);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <Fragment>
            <RedirectToHome />
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center" }}>
                <h3>Show book component Speaking</h3>
                <div>
                    Author name is :{bookdata.author}
                </div>
                <div>
                    ID is :
                    {bookdata._id}
                </div>
                <div>
                    Publish Year is :
                    {bookdata.publishYear}
                </div>
                <div>
                    Title is :
                    {bookdata.title}
                </div>
            </div>
        </Fragment>
    )
}

export default ShowBook;