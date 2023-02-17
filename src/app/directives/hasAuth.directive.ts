import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Directive({
  selector: '[hasAuth]'
})
export class AuthentificationDirective {
  condition: boolean = true;

  @Input() set hasAuth(condition: boolean | '') {
    this.condition = !!condition;
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService
  ) {
    this.authService.isAuthenticated$.pipe(untilDestroyed(this)).subscribe(isAuth => {
      if (isAuth === this.condition) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}

