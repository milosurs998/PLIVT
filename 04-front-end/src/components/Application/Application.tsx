import React from 'react';
import { Container } from 'react-bootstrap';
import TopMenu from '../TopMenu/TopMenu';
import './Application.sass';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import CategoryPage from '../CategoryPage/CategoryPage';
import ContactPage from '../ContactPage/ContactPage';
import AdministratorLogin from '../Administrator/AdministratorLogin';
import EventRegister from '../../api/EventRegister';
import api from '../../api/api';
import AdministratorLogout from '../Administrator/AdministratorLogout';
import FeaturePage from '../FeaturePage/FeaturePage';
import CategoryDashboardList from '../Administrator/Dashboard/Category/CategoryDashboardList';
import CategoryDashboardAdd from '../Administrator/Dashboard/Category/CategoryDashboardAdd';
import CategoryDashboardEdit from '../Administrator/Dashboard/Category/CategoryDashboardEdit';
import FeatureDashboardList from '../Administrator/Dashboard/Feature/FeatureDashboardList';
import logo1 from './logo.png';


class ApplicationState {
  authorizedRole: "administrator" | "visitor" = "visitor";
}
export default class Application extends React.Component {
  state: ApplicationState;

  constructor(props: any) {
    super(props);

    this.state = {
      authorizedRole: "visitor",
    };
  }

  componentDidMount() {
    EventRegister.on("AUTH_EVENT", this.authEvenntHandler.bind(this));

    api("get", "/auth/administrator/ok", "administrator")
      .then(res => {
        console.log(res.data);
        if (res?.data === "OK") {
          this.setState({
            authorizedRole: "administrator",
          });
          EventRegister.emit("AUTH_EVENT", "administrator_login");
        }
      })
      .catch(() => { });
  }

  componentWillUnmount() {
    EventRegister.off("AUTH_EVENT", this.authEvenntHandler.bind(this));
  }

  private authEvenntHandler(message: string) {
    if (message === "force_login" || message === "administrator_logout") {
      return this.setState({
        authorizedRole: "visitor"
      });
    }
    if (message === "administrator_login") {
      return this.setState({
        authorizedRole: "administrator"
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Container className="Application">
          <div className="Application-header">
            <img src={logo1} alt="" />
          </div>

          <TopMenu currentMenuType={this.state.authorizedRole} />

          <div className="Application-body">
            <Switch>
              <Route exact path="/" component={HomePage} />

              <Route path="/category/:cid?"
                render={
                  (props: any) => {
                    return (
                      <CategoryPage {...props} />);
                  }
                } />



              <Route path="/contact">
                <ContactPage
                  address="Milosa Obrenovica 316, 26000 Pančevo"
                  phone="+381 66 565-59-53" />
              </Route>
              <Route path="/administrator/login" component={AdministratorLogin} />
              <Route path="/administrator/logout" component={AdministratorLogout} />

              <Route exact path="/dashboard/category" component={CategoryDashboardList} />
              <Route exact path="/dashboard/category/add" component={CategoryDashboardAdd} />
              <Route path="/dashboard/category/edit/:cid" component={CategoryDashboardEdit} />
              <Route path="/dashboard/category/features/:cid/list" component={FeatureDashboardList} />


            </Switch>
          </div>
          <div>
          </div>
        </Container>
      </BrowserRouter>
    );
  }
}

