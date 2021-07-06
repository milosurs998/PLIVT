import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class TopMenuProperties {
    currentMenuType: "administrator" | "visitor" = "visitor";
}

export default class TopMenu extends React.Component<TopMenuProperties> {
    
    render() {
        console.log(this.props.currentMenuType);
    

        if (this.props.currentMenuType === "visitor") {
            return (

        <Nav className="">
            <Nav.Item>
                <Link className="nav-link" to="/">POČETNA</Link>
            </Nav.Item>

            <Nav.Item>
                <Link className="nav-link" to="/category">PECIVA</Link>
            </Nav.Item>

            <Nav.Item>
                <Link className="nav-link" to="contact">KONTAKT</Link>
            </Nav.Item>

            <Nav.Item>
                <Link className="nav-link" to="/administrator/login">PRIJAVA</Link>
            </Nav.Item>
        </Nav>
            );
        }
        if (this.props.currentMenuType === "administrator") {
            return (
        <Nav className="justify-content-center">
            
            <Nav.Item>
                <Link className="nav-link" to="/dashboard/category">Kategorije</Link>
            </Nav.Item>

            <Nav.Item>
                <Link className="nav-link" to="/administrator/logout">Odjava</Link>
            </Nav.Item>
        </Nav>
            );
        }
    }
}
