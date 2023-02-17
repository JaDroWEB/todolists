import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { AddTodoItemComponent } from './todo-item/add-todo-item/add-todo-item.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AddTodolistComponent } from './todolist/add-todolist/add-todolist.component';
import { TodolistComponent } from './todolist/todolist.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent
  }
];

@NgModule({
  declarations: [
    AddTodolistComponent,
    TodolistComponent,
    TodoItemComponent,
    AddTodoItemComponent,
    MainPageComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MainPageModule { }
