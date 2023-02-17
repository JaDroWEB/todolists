import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setLoading } from '@datorama/akita';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateTodoItem, CreateTodoList, TodoItem, TodoList } from './todo';
import { TodoQuery } from './todo.query';
import { TodoStore } from './todo.store';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private todoStore: TodoStore,
    private todoQuery: TodoQuery
  ) {}

  getAllLists(userEmail: string) {
    return this.todoQuery.selectHasCache().pipe(
      switchMap(hasCache => {
        const request$ = this.http
          .get<TodoList[]>(`${environment.dataApi}/lists`, { params: { userEmail: userEmail }})
          .pipe(
            setLoading(this.todoStore),
            tap(lists => this.todoStore.set(lists)),
            catchError(() => {
              this.badRequest();
              return EMPTY;
            })
          );

        return hasCache ? EMPTY : request$;
      })
    )
  }

  // Lists
  async addList(payload: CreateTodoList) {
    try {
      const res = await this.http
        .post<TodoList>(`${environment.dataApi}/lists`, payload, { observe: 'response' })
        .toPromise();

      if (res && res.body && res.status === 201) {
        this.todoStore.add(res.body)
        this.snackBar.open(`List "${res.body.name}" was created succesfully`, 'OK', {
          panelClass: 'green-snackbar'
        });
      }
    } catch(err) {
      this.badRequest();
    }
  }

  async editList(id: string, payload: Partial<CreateTodoList>) {
    try {
      const res = await this.http
        .put<TodoList>(`${environment.dataApi}/lists/${id}`, payload, { observe: 'response' })
        .toPromise();

      if (res && res.body && res.status === 200) {
        this.todoStore.update(id, res.body)
        this.snackBar.open(`List "${res.body.name}" was edited succesfully`, 'OK', {
          panelClass: 'green-snackbar'
        });
      }
    } catch(err) {
      this.badRequest();
    }
  }

  async deleteList(id: string) {
    try {
      const res = await this.http
        .delete<TodoList>(`${environment.dataApi}/lists/${id}`, { observe: 'response' })
        .toPromise();


      if (res && res.body && res.status === 200) {
        this.todoStore.remove(id);
        this.snackBar.open(`List "${res.body.name}" was deleted succesfully`, 'OK', {
          panelClass: 'green-snackbar'
        });
      }
    } catch(err) {
      this.badRequest();
    }
  }

  // Items
  async addTodoItem(listId: string, payload: CreateTodoItem) {
    try {
      const res = await this.http
        .post<TodoItem>(`${environment.dataApi}/lists/${listId}/todos`, payload, { observe: 'response' })
        .toPromise();

      if (res && res.body && res.status === 201) {
        this.todoStore.addTodoItem(listId, res.body);
        this.snackBar.open(`Item "${res.body.title}" was created succesfully`, 'OK', {
          panelClass: 'green-snackbar'
        });
      }
    } catch(err) {
      this.badRequest();
    }
  }

  async editTodoItem(listId: string, itemId: string, payload: Partial<CreateTodoItem>) {
    try {
      const res = await this.http
        .put<TodoItem>(`${environment.dataApi}/lists/${listId}/todos/${itemId}`, payload, { observe: 'response' })
        .toPromise();

      if (res && res.body && res.status === 200) {
        this.todoStore.editTodoItem(listId, itemId, res.body);
        this.snackBar.open(`Item "${res.body.title}" was edited succesfully`, 'OK', {
          panelClass: 'green-snackbar'
        });
      }
    } catch(err) {
      this.badRequest();
    }
  }

  async deleteTodoItem(listId: string, itemId: string) {
    try {
      const res = await this.http
        .delete<TodoItem>(`${environment.dataApi}/lists/${listId}/todos/${itemId}`, { observe: 'response' })
        .toPromise();

      if (res && res.body && res.status === 200) {
        this.todoStore.removeTodoItem(listId, itemId);
        this.snackBar.open(`Item "${res.body.title}" was deleted succesfully`, 'OK', {
          panelClass: 'green-snackbar'
        });
      }
    } catch(err) {
      this.badRequest();
    }
  }

  private badRequest() {
    this.snackBar.open(`Something went wrong`, 'OK', {
      panelClass: 'red-snackbar'
    });
  }
}
