
import BasePage from "../BasePage/BasePage";
import { CardDeck } from "react-bootstrap";
import logo from 'logo.png';

class HomePageState {
}
export default class HomePage extends BasePage<{}> {
    state: HomePageState = {

    };

    componentDidMount() {

    }
    renderMain(): JSX.Element {
        return (
            <CardDeck className="row">
                {

                }
            </CardDeck>
        );
    }
}