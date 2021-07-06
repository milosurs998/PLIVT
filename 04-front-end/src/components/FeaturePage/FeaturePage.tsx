import BasePage, { BasePageProperties } from '../BasePage/BasePage';
import { Link } from 'react-router-dom';
import FeatureModel from '../../../../03-back-end/src/components/feature/model';
import CategoryService from '../../services/CategoryService';
import FeatureService from '../../services/FeatureService';

class FeaturePageProperties extends BasePageProperties {
    match?: {
        params: {
            fid: string;
        }
    }
}

class FeaturePageState {
    title: string = "";
    showBackButton: boolean = true;
    features: FeatureModel[] = [];
}


export default class FeaturePage extends BasePage<FeaturePageProperties> {
    state: FeaturePageState;

    constructor(props: FeaturePageProperties) {
        super(props);

        this.state = {
            title: "Ucitavanje...",
            showBackButton: true,
            features: [],
        };
    }

    private getFeatureId(): number | null {
        const fid = this.props.match?.params.fid;
        return fid ? +(fid) : null;
    }

    private getCategoryData() {
        const fId = this.getFeatureId();
        this.state.features = [];

        if (fId === null) {
            this.setState({
                features: [],
            });
            this.apiGetTopLevelCategories();
        } else {
            this.apiGetFeature(fId);
        }
    }

    private apiGetTopLevelCategories() {
        CategoryService.getTopLevelCategories()
            .then(categories => {
                if (categories.length === 0) {
                    return this.setState({
                        title: "Kategorije nisu pronadjene",
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

    private apiGetFeature(fId: number) {
        FeatureService.getFeatureById(fId)
            .then(result => {
                console.log("apiGetFeature: ", result);
                if (result === null) {
                    return this.setState({
                        title: "Karakteristika nije pronadjena",
                        features: [],
                        showBackButton: true,
                    });
                }

                this.setState({
                    title: result.name,
                    showBackButton: true,
                    features: [
                        {
                            featureId: result.featureId,
                            name: result.name,
                            categoryId: result.categoryId
                        }
                    ]
                });
            })
    }



    componentDidMount() {
        this.getCategoryData();
    }

    componentDidUpdate(prevProps: FeaturePageProperties, prevState: FeaturePageState) {
        if (prevProps.match?.params.fid !== this.props.match?.params.fid) {
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
                                    <Link to={"/category/" + this.state.features[0]?.categoryId}>
                                        &lt; Back
                                    </Link>
                                    |   {this.state.title}
                                </>
                            )
                            : ""
                    }

                </h1>
                {
                    this.state.features.length > 1
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