import { Module } from '@nestjs/common';
import { SupportPacksService } from './support-packs.service';
import { SupportPacksController } from './support-packs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Guideline } from './entities/guideline.entity';
import { Category } from './entities/category.entity';
import { Role } from './entities/role.entity';
import { Stage } from './entities/stage.entity';
import { ImportanceLevel } from './entities/importance-level.entity';
import { Download } from './entities/download.entity';
import { User } from './entities/user.entity.';
import { DownloadGuidelines } from './entities/download-guidelines.entity';
import { Region } from './entities/region.entity';
import { DownloadRegions } from './entities/download-regions.entity';
import { ResourcesGuidelines } from './entities/resources-guidelines.entity';
import { App } from './entities/app.entity';

@Module({
  imports: [SequelizeModule.forFeature([
    App, Guideline, Category, Role, Stage, ImportanceLevel, User, Region, Download, DownloadGuidelines, DownloadRegions, ResourcesGuidelines])
  ],
  controllers: [SupportPacksController],
  providers: [SupportPacksService]
})
export class SupportPacksModule { }
