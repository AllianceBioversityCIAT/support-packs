import { routes } from './app.routes';
import { AppComponent } from '../app.component';
import { LearningZoneComponent } from '../learning-zone/learning-zone.component';
import { FaqComponent } from '../learning-zone/pages/faq/faq.component';
import { AdminComponent as AdminComponentLearning } from '../learning-zone/pages/admin/admin.component';
import { FormRequestComponent as FormRequestLearningZoneComponent } from '../learning-zone/pages/form-request/form-request.component';
import { DmspComponent } from '../dmsp/dmsp.component';
import { ToolsResultsComponent } from '../dmsp/page/tools-results/tools-results.component';
import { MelspComponent } from '../melsp/melsp.component';
import { HomeMelComponent } from '../melsp/pages/home-mel/home-mel.component';
import { OverviewComponent } from '../melsp/pages/overview/overview.component';
import { AdminComponent as AdminComponentMELSP } from '../melsp/pages/admin/admin.component';
import { HomeLearningComponent } from '../learning-zone/pages/home-learning/home-learning.component';
import { FormRequestComponent as FormRequestMELSPComponent } from '../melsp/pages/form-request/form-request.component';

describe('App Routes', () => {
  it('should contain the base route with an empty path', () => {
    expect(routes[0].path).toBe('');
  });

  it('should load the AppComponent for the base path', async () => {
    const component = await routes[0].loadComponent();

    expect(component).toBe(AppComponent);
  });

  it('should redirect empty path to aiccra/learning-zone', () => {
    const childRoutes = routes[0].children;
    expect(childRoutes[0].redirectTo).toBe('aiccra/learning-zone');
    expect(childRoutes[0].pathMatch).toBe('full');
  });

  it('should load the LearningZoneComponent for aiccra path', async () => {
    const component = await routes[0].children[1].loadComponent();
    expect(component).toBe(LearningZoneComponent);
  });

  it('should redirect aiccra empty path to learning-zone', () => {
    const aiccraChildRoutes = routes[0].children[1].children;
    expect(aiccraChildRoutes[1].redirectTo).toBe('learning-zone');
    expect(aiccraChildRoutes[1].pathMatch).toBe('full');
  });

  it('should load the HomeLearningComponent for aiccra/learning-zone path', async () => {
    const component = await routes[0].children[1].children[0].loadComponent();
    expect(component).toBe(HomeLearningComponent);
  });

  it('should load the FaqComponent for aiccra/FAQ path', async () => {
    const component = await routes[0].children[1].children[2].loadComponent();
    expect(component).toBe(FaqComponent);
  });

  it('should load the AdminComponent for aiccra/manage-tool path', async () => {
    const component = await routes[0].children[1].children[3].loadComponent();
    expect(component).toBe(AdminComponentLearning);
  });

  it('should load the FormRequestComponent for aiccra/form-request path', async () => {
    const component = await routes[0].children[1].children[4].loadComponent();
    expect(component).toBe(FormRequestLearningZoneComponent);
  });

  it('should load the DmspComponent for dmsp path', async () => {
    const component = await routes[0].children[2].loadComponent();
    expect(component).toBe(DmspComponent);
  });

  it('should redirect dmsp empty path to home', () => {
    const dmspChildRoutes = routes[0].children[2].children;
    expect(dmspChildRoutes[1].redirectTo).toBe('home');
    expect(dmspChildRoutes[1].pathMatch).toBe('full');
  });

  it('should load the ToolsResultsComponent for dmsp/home path', async () => {
    const component = await routes[0].children[2].children[0].loadComponent();
    expect(component).toBe(ToolsResultsComponent);
  });

  it('should load the MelspComponent for melsp path', async () => {
    const component = await routes[0].children[3].loadComponent();
    expect(component).toBe(MelspComponent);
  });

  it('should redirect melsp empty path to home', () => {
    const melspChildRoutes = routes[0].children[3].children;
    expect(melspChildRoutes[1].redirectTo).toBe('home');
    expect(melspChildRoutes[1].pathMatch).toBe('full');
  });

  it('should load the HomeMelComponent for melsp/home path', async () => {
    const component = await routes[0].children[3].children[0].loadComponent();
    expect(component).toBe(HomeMelComponent);
  });

  it('should load the OverviewComponent for melsp/overview path', async () => {
    const component = await routes[0].children[3].children[2].loadComponent();
    expect(component).toBe(OverviewComponent);
  });

  it('should load the AdminComponent for melsp/manage-tool path', async () => {
    const component = await routes[0].children[3].children[3].loadComponent();
    expect(component).toBe(AdminComponentMELSP);
  });

  it('should load the FormRequestComponent for melsp/form-request path', async () => {
    const component = await routes[0].children[3].children[4].loadComponent();
    expect(component).toBe(FormRequestMELSPComponent);
  });
});
