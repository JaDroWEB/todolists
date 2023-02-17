import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { plainToClass } from 'class-transformer';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { TodoList } from 'src/app/services/todo/todo';
import { TodoQuery } from 'src/app/services/todo/todo.query';
import { TodoService } from 'src/app/services/todo/todo.service';

@UntilDestroy()
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  todoLists$: Observable<TodoList[]>;
  isLoading$ = combineLatest([
    this.auth.isLoading$,
    this.todoQuery.selectLoading()
  ]).pipe(map(([authLoading, todoLoading]) => authLoading || todoLoading));

  constructor(
    public auth: AuthService,
    private todoService: TodoService,
    private todoQuery: TodoQuery
  ) {
    this.auth.user$
      .pipe(
        untilDestroyed(this),
        map(user => user?.email),
        switchMap(userEmail => this.todoService.getAllLists(userEmail!))
      )
      .subscribe();

    this.todoLists$ = this.todoQuery.selectAll().pipe(map(x => plainToClass(TodoList, x)));
  }

  identify(index: number, item: TodoList) {
    return item.id;
  }
}
