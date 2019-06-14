import React from 'react';

const NewToDo = () => {
    return (
        <div className="new-todo">
            <form>
                <label className="new-todo__label new-todo__label_button">
                    <input
                        className="new-todo__item new-todo__item_button"
                        type="button"
                        value=""
                    />
                </label>
                <label className="new-todo__label">
                    <input 
                        className="new-todo__item new-todo__item_input"
                        type="text"
                        name="todo"
                        placeholder="What needs to be done?"
                    />
                </label>
            </form>
        </div>
    );
};

export default NewToDo;