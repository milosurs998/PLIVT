import { BasePageProperties } from "../BasePage/BasePage";
import BasePage from '../BasePage/BasePage';

class ContactPageProperties extends BasePageProperties{
    title?: string = "Kontakt";
    phone: string = "";
    address: string = "";
}

export default class ContactPage extends BasePage<ContactPageProperties> {
    constructor(props: ContactPageProperties) {
        super(props);        
    }

    renderMain() {
        return (
            <div>
                <h1>{ this.props.title ?? "Kontakt" }</h1>
                    <p>Adresa Pekare: <br />
                    { this.props.address }
                    </p>
                    <p>Telefon: { this.props.phone }</p>               
            </div>
        );
    }
}