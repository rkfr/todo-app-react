import React from 'react';

const sortButtons = ['All', 'Active', 'Completed'];

const Footer = ({
                modeHandler,
                showMode,
                items
            }) => {

    const getClassName = buttonName => (
        (buttonName.toLowerCase() === showMode)
                    ? 
                    'todo__filter-item selected'
                    : 
                    'todo__filter-item'
    );

    const itemsInfo = ((items === 1) && `${items} item left`) || `${items} items left`;

    
    return(
        <footer className="footer">
            {(items > 0) && 
                <span className="todo__count">{itemsInfo}</span>
            }
            
            <ul className="todo__filters">
                {sortButtons.map((button, key) => (
                    <li 
                        key={`${button}${key}`}
                        className={getClassName(button)}
                        onClick={() => modeHandler(button.toLowerCase())}
                    >
                        {button}
                    </li>
                ))}
            </ul>
        </footer>
    );
};

export default Footer;