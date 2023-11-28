import { Module } from '@nestjs/common';
import { MainRoutes } from './main.routes';
import { RouterModule } from '@nestjs/core';
import { SpUsersModule } from './api/sp-users/sp-users.module';
import { SpRolesModule } from './api/sp-roles/sp-roles.module';
import { SpAppsModule } from './api/sp-apps/sp-apps.module';
import { SpCategoriesModule } from './api/sp-categories/sp-categories.module';
import { SpSupportPackModule } from './api/sp-support-pack/sp-support-pack.module';
import { SpGuidelinesModule } from './api/sp-guidelines/sp-guidelines.module';
import { AuthModule } from './api/authentication/auth.module';


@Module({
  imports: [RouterModule.register(MainRoutes),
    SpUsersModule, 
    SpRolesModule, 
    SpAppsModule, 
    SpCategoriesModule, 
    SpSupportPackModule, SpGuidelinesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
