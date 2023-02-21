import React, { useState, useEffect } from 'react';
import css from './Home.module.css';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { LogInModal } from '../LogIn/LogInModal';

const homeBackground = {
    backgroundImage: "url('./movies.jpg')",
    backgroundSize: 'cover',
}

export function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleModalOpen() {
        setIsModalOpen(!isModalOpen);
    }

    useEffect(() => {
        document.body.style = { homeBackground };
    });

    return (
        <div>
            <div className={css.box}>
                <h2 className={css.h2}>One search for all your streaming services. Find your next favorite movie here!</h2>
                <div className={css.row}>
                    <div className={css.column}>
                    <img src="https://venturebeat.com/wp-content/uploads/2016/06/netflix-logo.png?fit=750%2C750&strip=allhttps://www.google.com/url?sa=i&url=https%3A%2F%2Fventurebeat.com%2Fmedia%2Fnetflix-made-a-new-logo-thats-designed-for-mobile-devices%2F&psig=AOvVaw2QTJD9qcrMRn-De7L2ouRB&ust=1673313625263000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCNj_wJOpufwCFQAAAAAdAAAAABAE" className={css.imgsize} />
                    </div>
                    <div className={css.column}>
                        <img src="https://play-lh.googleusercontent.com/4whGAVjZGrrlNxzheKAfBXrxggtyAb4euWLeQI8fDfVfdnFEZjE0DZTJ8DKoh64pqcIa" className={css.imgsize} />
                    </div>
                    <div className={css.column}>
                        <img src="http://store-images.s-microsoft.com/image/apps.7471.14495311847124170.e89a4dce-fd9a-4a10-b8e4-a6c3aa1c055e.03d81561-4078-4efb-8884-19e1161ab56b" className={css.imgsize} />
                    </div>
                    <div className={css.column}>
                        <img src="https://hbomax-images.warnermediacdn.com/2020-05/square%20social%20logo%20400%20x%20400_0.png" className={css.imgsize} />
                    </div>
                    <div className={css.column}>
                        <img src="https://play-lh.googleusercontent.com/VojafVZNddI6JvdDGWFrRmxc-prrcInL2AuBymsqGoeXjT4f9sv7KnetB-v3iLxk_Koi" className={css.imgsize} />
                    </div>
                </div>
                <div className={css.rowbuttons}>
                    <div className={css.columnbuttons}>
                        <Link to="/create-account"><Button variant="primary" className={css.click}>Sign Up!</Button>{' '}</Link>
                    </div>
                    <div className={css.columnbuttons}>
                        <Button variant="primary" className={css.click} onClick={handleModalOpen}>Log In!</Button>{' '}
                    </div>
                </div>
            </div>
            <LogInModal
                isModalOpen={isModalOpen}
                handleModalOpen={handleModalOpen}
            />
        </div>
    );
}