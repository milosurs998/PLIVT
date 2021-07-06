import BasePage, { BasePageProperties } from '../../../BasePage/BasePage';
import { Redirect } from 'react-router-dom';
import CategoryService from '../../../../services/CategoryService';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { isRoleLoggedIn } from '../../../../api/api';
import EventRegister from '../../../../api/EventRegister';

interface CategoryDashboardEditProperties extends BasePageProperties {
    match?: {
        params: {
            cid: string;
        }
    }
}

interface CategoryDashboardEditState {

    name: string;

    message: string;

    redirectBackToCategories: boolean;
}

export default class CategoryDashboardEdit extends BasePage<CategoryDashboardEditProperties> {
    state: CategoryDashboardEditState;

    constructor(props: CategoryDashboardEditProperties) {
        super(props);

        this.state = {
            name: "",
            message: "",
            redirectBackToCategories: false,
        }
    }
    
    componentDidMount() {
         isRoleLoggedIn("administrator")
         .then(loggedIn => {
             if (!loggedIn) return EventRegister.emit("AUTH_EVENT", "force_login");
             this.loadCategoryData();
         });
        // this.loadCategoryData();
 
     }

    private getCategoryId(): number {
        return +(this.props.match?.params.cid ?? 0);
    }

    private loadCategoryData() {
        CategoryService.getCategoryById(this.getCategoryId())
        .then(res => {
            if (res === null) {
                return this.setState({
                    message: "Kategorija nije pronadjena.",
                    redirectBackToCategories: true,
                });
            }

            this.setState({
                name: res.name,
            });
        });
    }

    renderMain(): JSX.Element {
        if (this.state.redirectBackToCategories) {
            return (
                <Redirect to="/dashboard/category" />
            );
        }

        return (
            <Row>
                <Col sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <Card.Title>
                                <b>Izmeni Kategoriju </b>
                            </Card.Title>
                            <Card.Text as="div">
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={ this.state.name }
                                            onChange={ this.onChangeInput("Ime") }
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" className="mt-3"
                                            onClick= { () => this.handleEditButtonClick() } >
                                            Izmeni Kategoriju 
                                        </Button>
                                    </Form.Group>

                                    {
                                        this.state.message /* Zapamti */
                                        ? (<p className="mt-3">{ this.state.message }</p>)
                                        : ""
                                    }
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        );
    }

    private handleEditButtonClick() {
        console.log(this.state.name);
        CategoryService.editCategory(this.getCategoryId(), {
            name: this.state.name,
        })
        .then(res => {
            if (res.success === false) {
                return this.setState({
                    message: res.message,
                });
            }
        
            this.setState({
                redirectBackToCategories: true,
            });
        });
    }


    private onChangeInput(field: "Ime"): (event: React.ChangeEvent<HTMLInputElement>) => void {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({
                [field]: event.target.value,
            });
        }
    }
}