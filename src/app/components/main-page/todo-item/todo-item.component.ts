import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { TodoItem } from 'src/app/services/todo/todo';
import { TodoService } from 'src/app/services/todo/todo.service';
import { AddTodoItemComponent } from './add-todo-item/add-todo-item.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  todo$: Observable<TodoItem>;

  @Input() set todoItem(value: TodoItem) {
    this.todo$ = of(value);
  };

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService
  ) {}

  editTodoItem(todo: TodoItem) {
    this.dialog.open(AddTodoItemComponent, {
      width: '600px',
      data: {
        todoItem: todo,
        listId: todo.listId
      }
    });
  }

  deleteTodoItem(todo: TodoItem) {
    if(confirm(`Do you want to delete ${todo.title} item?`)) {
      this.todoService.deleteTodoItem(todo.listId, todo.id);
    }
  }

  toogleDoneItem(todo: TodoItem) {
    this.todoService.editTodoItem(
      todo.listId,
      todo.id,
      { isDone: !todo.isDone }
    );
  }
}
