import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './SearchForm.module.css';
import Button from 'react-bootstrap/Button';

if (!window.searchTerm) {
    window.searchTerm = '';
}

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState(window.searchTerm);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        window.searchTerm = e.target.value;
    };

    const handleSubmit = () => {
        window.pageNum = 1;
        navigate('/search-table',);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className={css.input}
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search by keyword or movie title..."
            />
            <Button variant="primary" type="submit" className={css.click} disabled={!searchTerm}>Search</Button>{' '}
        </form>
    );
};