import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  {
    path: 'index',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then((module) => module.HomeComponent)
      },
      {
        path: 'create-story',
        loadComponent: () => import('./pages/create-story/create-story.component').then((module) => module.CreateStoryComponent)
      },
      {
        path: 'create-line',
        loadComponent: () => import('./pages/create-story-line/create-story-line.component').then((module) => module.CreateStoryLineComponent)
      },
      {
        path: 'story-detail',
        loadComponent: () => import('./pages/story-detail/story-detail.component').then((module) => module.StoryDetailComponent)
      },
      {
        path: 'read',
        loadComponent: () => import('./pages/read-story/read-story.component').then((module) => module.ReadStoryComponent)
      },
      {
        path: 'continue-story',
        loadComponent: () => import('./pages/continue-story/continue-story.component').then((module) => module.ContinueStoryComponent)
      },
      {
        path: 'other-line',
        loadComponent: () => import('./pages/create-other-line/create-other-line.component').then((module) => module.CreateOtherLineComponent)
      }
    ]
  },
  { path: '**', redirectTo: '/index/home'}
];
