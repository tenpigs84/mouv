import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'system',
        loadChildren: () => import('./system/system.module').then(m => m.SystemModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EntitiesModule {}
