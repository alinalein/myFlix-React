import React, { useState } from "react";
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { setFilter, clearFilter } from "../../redux/reducers/movies";
import { Search } from 'react-bootstrap-icons'
import './movies-filter.scss'

export const MoviesFilter = () => {

    const [visible, setVisible] = useState(false);
    const filter = useSelector((state) => state.movies.filter);
    const dispatch = useDispatch();

    // clears filter when input field closed 
    const toggleVisibility = () => {
        if (visible) {
            dispatch(clearFilter());
        }
        setVisible(!visible);
    };

    return (
        <InputGroup className="seamless-input-group">
            {visible && (
                <Form.Control
                    type="text"
                    placeholder="Search..."
                    value={filter}
                    onChange={(e) => dispatch(setFilter(e.target.value))}
                    autoFocus
                    className="filter_form"
                />
            )}
            <Button variant="outline-secondary" onClick={toggleVisibility} style={{ border: 'none', background: 'transparent' }}>
                <Search color="white" size={15} />
            </Button>
        </InputGroup>
    );
};
