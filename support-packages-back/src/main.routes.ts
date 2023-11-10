import { Routes } from "@nestjs/core";
import { ModulesRoutes } from "./api/api.routes";

export const MainRoutes: Routes = [

    {
        path: '/api',
        children: ModulesRoutes
    }
]