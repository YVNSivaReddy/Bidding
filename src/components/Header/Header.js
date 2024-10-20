import React, { useEffect, useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useNavigate, Outlet } from 'react-router-dom'; // Import useNavigate
import './Header.css'; // Import custom CSS for responsiveness
import { useAuth } from '../Auth/Auth';
import { getBidding } from '../../actions/authService';

function Header() {
    const navigate = useNavigate(); // Initialize navigate
    const { logout } = useAuth();
    const [error, setError] = useState(null);
    const [auctiondata, setAuctionData] = useState(null);

    const items = [
        { label: 'Auctions', icon: 'pi pi-briefcase', command: () => navigate('/home/auctions') },
        { label: 'Bidding', icon: 'pi pi-dollar', command: () => navigate('/home') },
        { label: 'About Us', icon: 'pi pi-info-circle' }
    ];

    const start = <Button label="Genix Auctions" className="" onClick={() => navigate('/home')} />
    const end = (
        <div className="p-mr-3">
            <Button label="Logout" className="p-button-rounded p-button-danger" onClick={() => { logout(); navigate('/login') }} />
        </div>
    );
    useEffect(() => {
        const fetchBidding = async () => {
            try {
                const response = await getBidding();
                if (response) {
                    setAuctionData(response);
                    setError(null);
                    alert('data')
                } else {
                    setError('Failed to fetch auction.');
                }
            } catch (err) {
                alert('catch block')
                setError('An error occurred: ' + err.message);
            }
        };
        fetchBidding(); // Call the async function
    }, []);
    console.log(auctiondata,'data')
    return (
        <div className="header">
            <Menubar model={items} start={start} end={end} />
            <Outlet />
        </div>
    );
}

export default Header;
