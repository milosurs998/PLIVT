import CategoryService from '../components/category/service';
import FeatureService from '../components/feature/service';
import AdministratorService from '../components/administrator/service';
export default interface IServices {
    categoryService: CategoryService;
    featureService: FeatureService;
    administratorService: AdministratorService;

}