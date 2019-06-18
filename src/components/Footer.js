import React from 'react';

const Footer = () => {
    return(
        <footer className="footer">
            <span className="todo__count">1 item left</span>
            <ul className="todo__filters">
                <li className="todo__filter-item selected">All</li>
                <li className="todo__filter-item">Active</li>
                <li className="todo__filter-item">Completed</li>
            </ul>
        </footer>
    );
};

export default Footer;