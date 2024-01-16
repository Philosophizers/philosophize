import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import thinkerImage from './thinker.png';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

// 	return (
// 		<ul>
// 			<li>
// 				<NavLink exact to="/" classname="homeImage"><img src={thinkerImage} alt="Thinker" /></NavLink>
// 			</li>
// 			{isLoaded && (
// 				<li>
// 					<ProfileButton user={sessionUser} />
// 				</li>
// 			)}

// <NavLink exact to="/" className='brand'>P H I L O S O P H I Z E</NavLink>
// 		</ul>
// 	);
// }

return (
	<header>
    <ul className='navul'>
        <li className='navli'>
            <NavLink exact to="/" className="homeImage">
                <img src={thinkerImage} alt="Thinker" />
            </NavLink>
        </li>
        <li className="brand-text">P H I L O S O P H I Z E</li>
        {isLoaded && (
            <li className="profile-button">
                <ProfileButton user={sessionUser} />
            </li>
        )}
    </ul>
</header>
);
};

export default Navigation;