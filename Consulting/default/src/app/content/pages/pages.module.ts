import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { PartialsModule } from '../partials/partials.module';
import { ActionComponent } from './header/action/action.component';
import { ProfileComponent } from './header/profile/profile.component';
import { MailModule } from './components/apps/mail/mail.module';
import { ECommerceModule } from './components/apps/e-commerce/e-commerce.module';
import { CoreModule } from '../../core/core.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorPageComponent } from './snippets/error-page/error-page.component';
import { RolesComponent } from './roles/roles.component';
import * as Matr from '@angular/material';
import { EditComponent } from './roles/edit/edit.component';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
	declarations: [
		PagesComponent,
		ActionComponent,
		ProfileComponent,
		ErrorPageComponent,
		RolesComponent,
		EditComponent,
	],
	imports: [
		CommonModule,
		HttpClientModule,
		FormsModule,
		PagesRoutingModule,
		CoreModule,
		LayoutModule,
		PartialsModule,
		MailModule,
		ECommerceModule,
		AngularEditorModule,
		Matr.MatTableModule,
		Matr.MatSortModule,
		Matr.MatButtonModule,
		Matr.MatToolbarModule,
		FormsModule,
		Matr.MatButtonModule,
		Matr.MatInputModule,
		Matr.MatSelectModule,
		Matr.MatFormFieldModule,
		Matr.MatCheckboxModule,
		Matr.MatSlideToggleModule,
		SnotifyModule,
		ReactiveFormsModule,
	],
	providers: [
		{ provide: 'SnotifyToastConfig', useValue: ToastDefaults},
		SnotifyService
	  ],
})
export class PagesModule {}
