import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WomensComponent } from './components/womens/womens.component';
import { SectionsComponent } from './containers/sections/sections.component';
import { CategoryClothes } from './components/clothescategory/clothescategory.component';

const routes: Routes = [
  
  {
    path: '',
    children: [
      {
        path: 'womens', component: WomensComponent
      },
      {
        path: 'clothes-category/:category', component: CategoryClothes
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectionsRoutingModule { }
