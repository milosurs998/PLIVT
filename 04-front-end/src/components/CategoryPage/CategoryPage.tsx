import BasePage, { BasePageProperties } from '../BasePage/BasePage';
import { Link, Redirect } from 'react-router-dom';
import CategoryModel from '../../../../03-back-end/src/components/category/model';
import CategoryService from '../../services/CategoryService';
import FeatureModel from '../../../../03-back-end/src/components/feature/model';

class CategoryPageProperties extends BasePageProperties {
    match?: {
        params: {
            cid: string;
        }
    }
}

class CategoryPageState {
    title: string = "";
    categories: CategoryModel[] = [];
    features: FeatureModel[] = [];
    showBackButton: boolean = false;
}
export default class CategoryPage extends BasePage<CategoryPageProperties> {
    state: CategoryPageState;

    constructor(props: CategoryPageProperties) {
        super(props);

        this.state = {
            title: "Ucitavanje...",
            categories: [],
            features: [],
            showBackButton: false,
        };
    }
    private getCategoryId(): number | null {
        const cid = this.props.match?.params.cid;
        return cid ? +(cid) : null;
    }

    private getCategoryData() {
        const cId = this.getCategoryId();

        this.state.categories = [];
        this.state.features = [];

        if (cId === null) {
            this.setState({
                categories: [],
            });

            this.apiGetTopLevelCategories();
        } else {
            this.apiGetCategory(cId);
        }
    }

    private apiGetTopLevelCategories() {

        CategoryService.getTopLevelCategories()
            .then(categories => {
                if (categories.length === 0) {
                    return this.setState({
                        title: "Nisu pronadjene Kategorije",
                        categories: [],
                        showBackButton: true,
                        parentCategoryId: null,
                    });
                }

                this.setState({
                    title: "Sve kategorije",
                    categories: categories,
                    showBackButton: false,
                });
            })

    }

    private apiGetCategory(cId: number) {
        CategoryService.getCategoryById(cId)
            .then(result => {
                if (result === null) {
                    return this.setState({
                        title: "Kategorija Nije Pronadjena",
                        categories: [],
                        showBackButton: true,
                    });
                }

                this.setState({
                    title: result.name,
                    features: result.features,
                    showBackButton: true,
                });
            })
    }



    componentDidMount() {
        this.getCategoryData();
    }

    componentDidUpdate(prevProps: CategoryPageProperties, prevState: CategoryPageState) {
        if (prevProps.match?.params.cid !== this.props.match?.params.cid) {
            this.getCategoryData();
        }
    }

    renderMain(): JSX.Element {
        return (
            <>
                <h1>
                    {
                        this.state.showBackButton
                            ? (
                                <>
                                    <Link to={"/category/"}>
                                        Nazad
                                    </Link>
                                </>
                            )
                            : ""
                    }
                    {" " + this.state.title}
                </h1>

                {
                    this.state.categories.length > 0
                        ? (
                            <>
                                <ul>
                                    {this.state.categories.map(
                                        category => (
                                            <li key={"subcategory-link-" + category.categoryId}>
                                                <Link to={"/category/" + category.categoryId}>
                                                    {category.name}
                                                </Link>
                                            </li>
                                        )
                                    )
                                    }
                                </ul>
                            </>
                        )
                        : ""

                }

                {
                    this.state.features.length > 0
                        ? (
                            <>
                                <ul>
                                    {
                                        this.state.features.map(
                                            feature => (
                                                <li key={"feature-link-" + feature.featureId}>

                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            </>
                        ) : ""
                }
            </>
        );
    }
}