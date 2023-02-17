import { Injectable } from '@angular/core';
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { TodoItem, TodoList } from './todo';

export interface TodoState extends EntityState<TodoList, string>, ActiveState<string> {}


@Injectable({ providedIn: 'root' })
@StoreConfig({
  name: 'lists',
  cache: {
    ttl: 24 * 60 * 60 * 1000 // 1day
  }
})
export class TodoStore extends EntityStore<TodoState> {
  constructor() {
    super();
  }

  addTodoItem(listId: string, item: TodoItem) {
    this.update(listId, e => {
      return {
        todoItems: [...e.todoItems, item]
      }
    })
  }

  editTodoItem(listId: string, itemId: string, item: TodoItem) {
    this.update(listId, e => {
      const index = e.todoItems.findIndex(item => item.id === itemId);
      const items = [...e.todoItems];
      items[index] = item;

      return {
        todoItems: items
      }
    })
  }

  removeTodoItem(listId: string, itemId: string) {
    this.update(listId, e => {
      const index = e.todoItems.findIndex(item => item.id === itemId);
      const items = [...e.todoItems];
      items.splice(index, 1);

      return {
        todoItems: items
      }
    })
  }
}
