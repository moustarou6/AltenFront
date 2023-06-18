import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
const optionRequete = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': 'https://localhost:7074'
  })
};

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.log(err));