import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    ListComponent,
    NewComponent,
    HeaderComponent,
    ContactDetailsComponent,
    OrderDetailsComponent
} from './components';
import { MaterialModule } from './material';

const components = [
    ListComponent,
    HeaderComponent,
    NewComponent,
    ContactDetailsComponent,
    OrderDetailsComponent
];

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'new', component: NewComponent }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule.forRoot(routes)
    ],
    providers: [],
    declarations: [...components],
    exports: [...components, RouterModule]
})
export class AppRoutingModule { }
