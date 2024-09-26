import { Routes } from '@angular/router';
import { AddContentComponent } from './components/features/content/add-content/add-content.component';
import { HomeComponent } from './components/core/home/home.component';
import { ContentListComponent } from './components/features/content/content-list/content-list.component';
import { UpdateContentComponent } from './components/features/content/update-content/update-content.component';
import { ViewContentComponent } from './components/features/content/view-content/view-content.component';
import { ContentListBtComponent } from './components/features/content/content-list-bt/content-list-bt.component';
import { ContentListVtComponent } from './components/features/content/content-list-vt/content-list-vt.component';
import { LoginComponent } from './components/features/Auth/login/login.component';

export const routes: Routes = [
    //Home
    { path: '', component: HomeComponent },
    
    //Auth
    { path: 'login', component: LoginComponent },
    

    //content
    { path: 'admin/content/create', component: AddContentComponent },
    { path: 'admin/content/listvbl', component: ContentListComponent },
    { path: 'admin/content/listbt', component: ContentListBtComponent },
    { path: 'admin/content/listvt', component: ContentListVtComponent },
    { path: 'admin/content/update/:id', component: UpdateContentComponent },
    { path: 'admin/content/:id', component: ViewContentComponent },
    // { path: 'admin/content/:id', component: UpdateContentComponent },
];
