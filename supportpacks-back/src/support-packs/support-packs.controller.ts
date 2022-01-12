import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SupportPacksService } from './support-packs.service';
import { CreateSupportPackDto } from './dto/create-support-pack.dto';
import { UpdateSupportPackDto } from './dto/update-support-pack.dto';

@Controller('api/sp')
export class SupportPacksController {
  constructor(private readonly supportPacksService: SupportPacksService) {}

  @Post()
  create(@Body() createSupportPackDto: CreateSupportPackDto) {
    return this.supportPacksService.create(createSupportPackDto);
  }

  @Get('guidelines/:app_id')
  findAllGuidelinesByApp(@Param('app_id') app_id) {

    return this.supportPacksService.findAllGuidelinesByApp(app_id);
  }

  @Get('categories/:app_id')
  findAllCategoriesByApp(@Param('app_id') app_id) {

    return this.supportPacksService.findAllCategoriesByApp(app_id);
  }

  @Get('roles/:app_id')
  findAllRolesByApp(@Param('app_id') app_id) {

    return this.supportPacksService.findAllRolesByApp(app_id);
  }

  @Get('stages/:app_id')
  findAllStagesByApp(@Param('app_id') app_id) {

    return this.supportPacksService.findAllStagesByApp(app_id);
  }

  @Get('guidelinesByRSC')
  getGuidelinesByRoleStageCategory(@Body() {role, stage, category}) {
    console.log({role, stage, category});
    
    return this.supportPacksService.getGuidelinesByRoleStageCategory(role, stage, category);
  }
  @Get('guidelines-all/:userId?/:app_id')
  getAllGuidelines(@Param('app_id') app_id, @Param('userId') userId) {
    return this.supportPacksService.getAllGuidelines(userId, app_id);
  }

  @Post('importance-level')
  getImportanceLevel(@Body() body) {
    return this.supportPacksService.getImportanceLevel(body.guideline_id, body.stage_id, body.role_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supportPacksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupportPackDto: UpdateSupportPackDto) {
    return this.supportPacksService.update(+id, updateSupportPackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supportPacksService.remove(+id);
  }
}
