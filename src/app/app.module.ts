import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component'; import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemeModule } from './services/theme/theme.module';
import { lightTheme } from './services/theme/light-theme';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { darkTheme } from './services/theme/dark-theme';
import { TutorsComponent } from './tutors/tutors.component';
import { ProfileComponent } from './profile/profile.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { RequestsComponent } from './requests/requests.component';
import { FavComponent } from './fav/fav.component';
import { UserService } from './services/userService/user.service';
import { RouterModule, Routes } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio'
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FormBuilder } from '@angular/forms';
import { HighContrastModeDetector } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  timeGridPlugin, dayGridPlugin, listPlugin
]);
//Routes
const routes: Routes = [{ path: 'profile', component: ProfileComponent },
{ path: 'home', component: FavComponent },
{ path: ' ', component: AppComponent },
{ path: 'connection', component: RequestsComponent },
{ path: 'explorer', component: TutorsComponent },
{ path: 'schedule', component: ScheduleComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TutorsComponent,
    ProfileComponent,
    ScheduleComponent,
    RequestsComponent,
    FavComponent

  ],
  imports: [
    BrowserAnimationsModule, BrowserModule,
    MatFormFieldModule, MatSnackBarModule,
    MatProgressSpinnerModule,
    MatRadioModule, MatTabsModule, MatNativeDateModule,
    MatButtonModule, HttpClientModule, FormsModule, MatSelectModule,
    MatButtonToggleModule,
    MatInputModule, MatIconModule, MatRippleModule, MatSidenavModule,
    RouterModule.forRoot(routes),
    ThemeModule.forRoot({
      themes: [lightTheme, darkTheme],
      active: 'light'
    }),
    FullCalendarModule
  ],
  providers: [HttpClient, UserService, FormBuilder,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
