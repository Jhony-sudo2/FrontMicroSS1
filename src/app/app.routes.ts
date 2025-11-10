import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { CreateComponent } from './Blog/create/create.component';
import { UserCreate } from './User/create/create.component'
import { NavComponent } from './nav/nav.component';
import { ViewComponent } from './Blog/view/view.component';
import { MyProfileComponent } from './User/my-profile/my-profile.component';
import { AcceptComponent } from './Admin/accept/accept.component';
import { FriendRequestComponent } from './User/friend-request/friend-request.component';
import { SharedComponent } from './User/shared/shared.component';
import { ViewDetailsComponent } from './Blog/view-details/view-details.component';
import { BanUserComponent } from './Admin/ban-user/ban-user.component';
import { MyBlogsComponent } from './User/my-blogs/my-blogs.component';
import { authGuard } from './Guard/guard.guard';
import { TypeUser } from './interfaces/User';
import { ForbidenComponent } from './Forbiden/forbiden/forbiden.component';
import { NotificationsComponent } from './User/notifications/notifications.component';
import { UpdateComponent } from './User/update/update.component';

export const routes: Routes = [
    { path: '', redirectTo: 'blog/view', pathMatch: 'full' },
    { path: 'auth/login', component: LoginComponent, title: 'login' },
    {path:'auth/register',component:UserCreate,title:'create User'},
    { path: 'forbidden', component: ForbidenComponent, title: 'Forbidden' },
    {
        path: 'blog',
        component: NavComponent,
        children: [
            { path: 'view', component: ViewComponent, title: 'Main' },  // pública
        ],
    },
    {
        path: 'blog',
        component: NavComponent,
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            { path: '', redirectTo: 'view', pathMatch: 'full' },
            // Detalle
            { path: 'viewDetail/:id', component: ViewDetailsComponent, title: 'View' },

            // Crear blog (ADMIN o PERIODISTA)
            { path: 'create', component: CreateComponent, title: 'Create'},

            // Crear usuario (solo ADMIN)
            { path: 'user-create', component: UserCreate, title: 'User Create', data: { types: [TypeUser.ADMIN] } },

            // Mi perfil (cualquiera logueado)
            { path: 'myprofile', component: MyProfileComponent, title: 'My profile' },
            { path: 'myprofile/:id', component: MyProfileComponent, title: 'Profile' },

            // Solicitudes de amistad (logueados)
            { path: 'friendrequest', component: FriendRequestComponent, title: 'RequestFriends' },

            // Guardados (logueados)
            { path: 'shared', component: SharedComponent, title: 'Shared' },

            // Aceptar (moderación) -> ADMIN o PERIODISTA
            { path: 'accept', component: AcceptComponent, title: 'Accept Noticies', data: { types: [TypeUser.ADMIN] } },

            // Gestión/ban de usuarios (solo ADMIN)
            { path: 'ban', component: BanUserComponent, title: 'Ban Users', data: { types: [TypeUser.ADMIN] } },

            // Mis blogs (logueados)
            { path: 'myBlogs', component: MyBlogsComponent, title: 'My Blogs' },
            // Mis blogs (logueados)
            { path: 'notificaciones', component: NotificationsComponent, title: 'notificaciones' },
            {path:'updatePassword',component:UpdateComponent,title:'updatePassword'}
        ],
    },

    // Wildcard -> redirige a la principal
    { path: '**', redirectTo: 'blog/view' },

];
