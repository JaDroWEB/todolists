import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { compareDesc } from 'date-fns';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { TodoItem, TodoList } from 'src/app/services/todo/todo';
import { TodoService } from 'src/app/services/todo/todo.service';
import { AddTodoItemComponent } from '../todo-item/add-todo-item/add-todo-item.component';
import { AddTodolistComponent } from './add-todolist/add-todolist.component';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodolistComponent {
  sort$ = new BehaviorSubject<string>('Closest Deadline');
  filter$ = new BehaviorSubject<string | null>(null);

  todoList$: Observable<TodoList>;

  @Input() set todoList(value: TodoList) {
    this.todoList$ = combineLatest([
      of(value),
      this.sort$,
      this.filter$
    ]).pipe(
      map(([todoList, sort, filter]) => ({
        ...todoList,
        todoItems: this.sortAndFilterTodoItems(todoList.todoItems, sort, filter)
      }))
    )
  };

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService
  ) {}

  addTodoItem(id: string) {
    this.dialog.open(AddTodoItemComponent, {
      width: '600px',
      data: {
        todoItem: null,
        listId: id
      }
    });
  }

  editList(list: TodoList) {
    this.dialog.open(AddTodolistComponent, {
      width: '400px',
      data: list
    })
  }

  deleteList(list: TodoList) {
    if (confirm(`Do you want to delete list ${list.name}?`)) {
      this.todoService.deleteList(list.id!);
    }
  }

  identify(index: number, item: TodoItem) {
    return item.id;
  }

  sortAndFilterTodoItems(todoItems: TodoItem[], sort: string, filter: string | null): TodoItem[] {
    switch (sort) {
      case 'Newest':
        todoItems.sort((a, b) => compareDesc(a.createdAt, b.createdAt));
        break;

      case 'Oldest':
        todoItems.sort((a, b) => compareDesc(b.createdAt, a.createdAt));
        break;

      case 'Active':
        todoItems.sort((a, b) => Number(a.isDone) - Number(b.isDone));
        break;

      case 'Done':
        todoItems.sort((a, b) => Number(b.isDone) - Number(a.isDone));
        break;

      default:
        todoItems.sort((a, b) => compareDesc(b.deadline, a.deadline));
        break;
    }

    return todoItems.filter(item => !!filter ? item.title.toLowerCase().includes(filter) : true);
  }

  getValueFromEvent(event: KeyboardEvent): string {
    return (event.target as HTMLInputElement).value;
  }
}
