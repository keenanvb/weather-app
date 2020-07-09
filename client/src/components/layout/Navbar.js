import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'


const Navbar = ({ }) => {

    const links = (
        <ul>
            <li><Link to="/"></Link></li>
        </ul>
    );

    return (
        <nav className="navbar">
            <h1>
                <Link to="/"> Weather</Link>
            </h1>
            {links}
        </nav>
    )
}

// Navbar.propTypes = {
//     logout: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
// }

// const mapStateToProps = (state) => {
//     return {
//         auth: state.auth
//     }
// }

export default connect(null, {})(Navbar)
