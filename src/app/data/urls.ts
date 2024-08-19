export class Urls {
  private baseUrl = 'https://greenland-rest.com/v1/user_app/api/';
  loginUrl = this.baseUrl + 'login.php';
  publicKeyUrl = this.baseUrl + 'get_public_key.php';
  productsUrl = this.baseUrl  + 'products/';
  categoriesUrl = this.baseUrl  + 'categories/';

  refreshLoginToken = this.baseUrl + 'refresh_token.php';

}
