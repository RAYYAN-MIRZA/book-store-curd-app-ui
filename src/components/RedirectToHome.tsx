
// /is puurey ki jaga navigate use kr skte hain 

import { Fragment } from "react";
import { Link } from "react-router-dom";
function RedirectToHome({ destination = '/home' }) {
    //like a default argument if none is passed
    return (
        <Fragment>
            <Link to={destination}>
                <button className="RedirectHomeButton">Back
                </button>
            </Link>
        </Fragment>
    )
}
export default RedirectToHome;