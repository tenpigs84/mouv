import { DashboardDDSettingsComponent } from './settings/settings.component';
import { DashboardDDWidgetActivitiesComponent } from './widgets/activities/activities.component';
// widgets
import { DashboardDDContainerComponent } from './widgets/container.component';
import { DashboardDDWidgetEffectComponent } from './widgets/effect/effect.component';
import { DashboardDDWidgetGaugeComponent } from './widgets/gauge/gauge.component';
import { DashboardDDWidgetRadarComponent } from './widgets/radar/radar.component';
import { DashboardDDWidgetTotalSalesComponent } from './widgets/total-sales/total-sales.component';
import { DashboardDDWidgetVisitsComponent } from './widgets/visits/visits.component';

export const DashboardDDWidgets = [
  DashboardDDSettingsComponent,
  DashboardDDContainerComponent,
  DashboardDDWidgetTotalSalesComponent,
  DashboardDDWidgetVisitsComponent,
  DashboardDDWidgetEffectComponent,
  DashboardDDWidgetGaugeComponent,
  DashboardDDWidgetRadarComponent,
  DashboardDDWidgetActivitiesComponent,
];
