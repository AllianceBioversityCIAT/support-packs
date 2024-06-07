import { Routes } from '@nestjs/core';
import { SpUsersModule } from './sp-users/sp-users.module';
import { SpRolesModule } from './sp-roles/sp-roles.module';
import { SpAppsModule } from './sp-apps/sp-apps.module';
import { SpSupportPackModule } from './sp-support-pack/sp-support-pack.module';
import { SpCategoriesModule } from './sp-categories/sp-categories.module';
import { SpGuidelinesModule } from './sp-guidelines/sp-guidelines.module';
import { AuthModule } from './authentication/auth.module';
import { FileManagementModule } from './file-management/file-management.module';

export const ModulesRoutes: Routes = [
  {
    path: 'users',
    module: SpUsersModule,
  },
  {
    path: 'roles',
    module: SpRolesModule,
  },
  {
    path: 'apps',
    module: SpAppsModule,
  },
  {
    path: 'support',
    module: SpSupportPackModule,
  },
  {
    path: 'categories',
    module: SpCategoriesModule,
  },
  {
    path: 'guidelines',
    module: SpGuidelinesModule,
  },
  {
    path: 'auth',
    module: AuthModule,
  },
  {
    path: 'file-management',
    module: FileManagementModule,
  },
];
