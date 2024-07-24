import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.services';

@Injectable()
export class SpGuidelinesService {
  constructor(private prisma: PrismaService) {}

  async getGuidelineByIdWithoutImportantLevels(app_id: string): Promise<any> {
    try {
      const guidelines: any[] = await this.prisma.$queryRaw(Prisma.sql`
            SELECT 
              sg.id, sg.name, sg.source, sg.contact, sgm.description, sgm.target_scale,
              sgm.integrates_gender, sgm.participants, sgm.methods, sgm.input_types, sgm.expected_outputs,
              sgm.human_resources, sgm.estimated_time, sgm.strengths, sgm.limitations, sgm.key_references
            FROM sp_guidelines sg
            LEFT JOIN sp_guidelines_metadata sgm ON sgm.guideline_id = sg.id
            WHERE sg.app_id = ${app_id} AND sg.active > 0;
        `);

      if (guidelines.length === 0) {
        return [];
      }

      const guidelineIds = guidelines.map((g) => g.id);

      const resourcesGuidelines: any[] = await this.prisma.$queryRaw(Prisma.sql`
            SELECT * FROM sp_resources_guidelines
            WHERE guideline_id IN (${Prisma.join(guidelineIds)})
        `);

      guidelines.forEach((guideline) => {
        guideline.resources = resourcesGuidelines.filter(
          (resource) => resource.guideline_id === guideline.id,
        );
      });

      return guidelines;
    } catch (error) {
      return {
        error:
          'An error occurred while fetching guidelines without important levels.',
        details: error,
      };
    }
  }

  async getAllGuidelines(app_id: string): Promise<any> {
    try {
      const guidelines: any = await this.prisma.$queryRaw(Prisma.sql`
            SELECT 
              sg.id, sg.name, sg.source, sg.contact, sgm.description, sgm.target_scale,
              sgm.integrates_gender, sgm.participants, sgm.methods, sgm.input_types, sgm.expected_outputs,
              sgm.human_resources, sgm.estimated_time, sgm.strengths, sgm.limitations, sgm.key_references,
              sil.importance_level, sr.name AS 'role_name', sc.name AS 'cate_name', ss.name AS 'staga_name',
              CONCAT(sg.id, sil.category_id, sil.stage_id, sil.role_id) AS 'code', sil.category_id AS 'id_cat', 
              sil.role_id AS 'id_rol', sil.stage_id AS 'id_stage'
            FROM sp_guidelines sg 
            JOIN sp_guidelines_metadata sgm ON sgm.guideline_id = sg.id
            JOIN sp_importance_levels sil ON sil.guideline_id = sg.id
            JOIN sp_roles sr ON sr.id = sil.role_id 
            JOIN sp_categories sc ON sc.id = sil.category_id 
            JOIN sp_stages ss ON ss.id = sil.stage_id 
            WHERE sg.app_id = ${app_id} AND sg.active > 0;
        `);

      if (guidelines.length > 0) {
        const guidelineIds = guidelines.map((g: any) => g.id);

        const resourcesGuidelines: any = await this.prisma.$queryRaw(Prisma.sql`
                SELECT * FROM sp_resources_guidelines
                WHERE guideline_id IN (${Prisma.join(guidelineIds)})
            `);

        guidelines.forEach((guideline: any) => {
          guideline.resources = resourcesGuidelines.filter(
            (resource: any) => resource.guideline_id === guideline.id,
          );
        });
      } else {
        const fallbackGuidelines: any = await this.prisma.$queryRaw(Prisma.sql`
                SELECT * FROM sp_guidelines sg 
                JOIN sp_importance_levels sil ON sil.guideline_id = sg.id
                WHERE sg.app_id = ${app_id} AND sg.active > 0
            `);

        return fallbackGuidelines;
      }

      return guidelines;
    } catch (error) {
      return {
        error: 'An error occurred while fetching guidelines.',
        details: error,
      };
    }
  }

  async getGuidelineById(app_id): Promise<any> {
    try {
      const guiades: any = await this.prisma.$queryRaw(Prisma.sql`
            select DISTINCT(sil.category_id), sg.id,sg.name, sc.name as 'cate_name', sg.type, sg.source
                from sp_guidelines sg 
	                join sp_importance_levels sil on sil.guideline_id = sg.id 
	                join sp_categories sc on sc.id = sil.category_id 
	                where sg.active > 0 and sg.app_id = ${app_id};
            `);

      if (guiades.length > 0) {
        const resources_guidelines: any = await this.prisma
          .$queryRaw(Prisma.sql`select sr.acronym, 
                ss.name, sil.importance_level, sil.category_id, sg.id, sil.role_id
                from sp_guidelines sg 
                    join sp_importance_levels sil on sil.guideline_id = sg.id 
                    join sp_categories sc on sc.id = sil.category_id 
                    join sp_roles sr on sr.id = sil.role_id 
                    join sp_stages ss on ss.id = sil.stage_id 
                    where sg.active > 0 and sg.app_id = ${app_id}`);

        for (let i = 0; i < guiades.length; i++) {
          const guideline_id = guiades[i].id;
          const category_id = guiades[i].category_id;
          guiades[i].resources = resources_guidelines.filter(
            (r) => r.id == guideline_id && r.category_id == category_id,
          );
          //console.log(resources_guidelines);

          //console.log(guiades[i].resources);
        }
      }

      return guiades;
    } catch (error) {
      throw error;
    }
  }

  async getGuidelineByApp(app_id): Promise<any> {
    try {
      const roles: any = await this.prisma.$queryRaw(
        Prisma.sql`SELECT * FROM sp_roles sr WHERE sr.app_id = ${app_id};`,
      );
      const stages: any = await this.prisma.$queryRaw(
        Prisma.sql`SELECT * FROM sp_stages ss WHERE ss.app_id = ${app_id};`,
      );

      let query;

      if (app_id === '3') {
        query = Prisma.sql`
          SELECT DISTINCT
            sil.category_id, sg.id, sg.name, sgm.description,
            sg.source, sgm.estimated_time, sgm.integrates_gender, sgm.is_tested_online,
            sgm.target_scale, sgm.participants, sgm.methods, sgm.input_types, sgm.limitations,
            sgm.strengths, sgm.expected_outputs, sgm.human_resources, sgm.key_references,
            sc.name AS category_name, sgm.id AS id_metadata
          FROM sp_guidelines sg
          JOIN sp_guidelines_metadata sgm ON sgm.guideline_id = sg.id
          JOIN sp_importance_levels sil ON sil.guideline_id = sg.id
          JOIN sp_categories sc ON sc.id = sil.category_id
          WHERE sg.app_id = ${app_id} AND sg.active > 0;
        `;
      } else {
        query = Prisma.sql`
          SELECT DISTINCT
            sil.category_id, sg.id, sg.name, sg.source, sc.name AS category_name
          FROM sp_guidelines sg
          JOIN sp_importance_levels sil ON sil.guideline_id = sg.id
          JOIN sp_categories sc ON sc.id = sil.category_id
          WHERE sg.app_id = ${app_id} AND sg.active > 0;
        `;
      }

      const guiades: any = await this.prisma.$queryRaw(query);

      if (guiades.length > 0) {
        const guidelinesIds = guiades.map((g: any) => g.id);
        let resources_guidelines_all = [];
        let resources_guidelines = [];

        if (app_id === '3') {
          resources_guidelines_all = await this.prisma.$queryRaw(
            Prisma.sql`
            SELECT * FROM sp_resources_guidelines 
            WHERE guideline_id IN (${Prisma.join(guidelinesIds)})`,
          );
        }

        resources_guidelines = await this.prisma.$queryRaw(
          Prisma.sql`
          SELECT 
            sr.name AS name_role,
            sr.acronym,
            ss.name AS stage_name,
            sil.stage_id,
            sil.importance_level,
            sil.category_id,
            sg.id AS guideline_id,
            sil.role_id,
            CASE
              WHEN sil.importance_level = 'Very important' THEN 4
              WHEN sil.importance_level = 'Important' THEN 3
              WHEN sil.importance_level = 'Useful' THEN 2
              WHEN sil.importance_level = 'Optional' THEN 1
              ELSE 0
            END AS id_important_level
          FROM sp_guidelines sg
          JOIN sp_importance_levels sil ON sil.guideline_id = sg.id
          JOIN sp_categories sc ON sc.id = sil.category_id
          JOIN sp_roles sr ON sr.id = sil.role_id
          JOIN sp_stages ss ON ss.id = sil.stage_id
          WHERE sg.active > 0 AND sg.app_id = ${app_id}`,
        );

        guiades.forEach((guide: any) => {
          const { id: guideline_id, category_id } = guide;

          roles.forEach((role) => {
            guide[role.acronym] = {};
            stages.forEach((stage) => {
              const importances = resources_guidelines.filter(
                (r) =>
                  r.guideline_id === guideline_id &&
                  r.category_id === category_id &&
                  r.role_id === role.id &&
                  r.stage_id === stage.id,
              );

              if (importances.length > 0) {
                const stageName = stage.name.replace(/\s/g, '');
                guide[role.acronym][stageName] = {
                  id: parseInt(importances[0].id_important_level, 10),
                  name: importances[0].importance_level,
                };
              }
            });
          });

          if (app_id === '3') {
            guide.resources = resources_guidelines_all.filter(
              (r) => r.guideline_id === guideline_id,
            );
          }
        });
      }
      return guiades;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async putGuideline(app_id, id, body): Promise<any> {
    try {
      if (app_id != null && id != null && body != null) {
        //edit guideline
        await this.prisma.sp_guidelines.update({
          where: {
            id: parseInt(id),
            app_id: parseInt(app_id),
          },
          data: {
            name: body?.name,
            source: body?.source,
          },
        });

        //edit guideline metadata

        await this.prisma.sp_guidelines_metadata.update({
          where: {
            guideline_id: parseInt(body?.id),
            id: parseInt(body?.id_metadata),
          },
          data: {
            description: body?.description,
            estimated_time: body?.estimated_time,
            expected_outputs: body?.expected_outputs,
            human_resources: body?.human_resources,
            input_types: body?.input_types,
            integrates_gender: body?.integrates_gender,
            is_tested_online: body?.is_tested_online,
            key_references: body?.key_references,
            limitations: body?.limitations,
            methods: body?.methods,
            participants: body?.participants,
            strengths: body?.strengths,
            target_scale: body?.target_scale,
          },
        });

        //edit importance level

        for (const item in body.A) {
          if (item == 'Design') {
            await this.prisma.sp_importance_levels.update({
              where: {
                guideline_id: parseInt(body?.id),
                category_id: parseInt(body?.category_id),
                role_id: 9,
                stage_id: 9,
              },
              data: {
                importance_level: body?.A[item].name,
              },
            });
            await this.prisma.sp_importance_levels.update({
              where: {
                guideline_id: parseInt(body?.id),
                category_id: parseInt(body?.category_id),
                role_id: 7,
                stage_id: 9,
              },
              data: {
                importance_level: body?.R[item].name,
              },
            });
            await this.prisma.sp_importance_levels.update({
              where: {
                guideline_id: parseInt(body?.id),
                category_id: parseInt(body?.category_id),
                role_id: 8,
                stage_id: 9,
              },
              data: {
                importance_level: body?.TS[item].name,
              },
            });
          }
          if (item == 'Implementation') {
            await this.prisma.sp_importance_levels.update({
              where: {
                guideline_id: parseInt(body?.id),
                category_id: parseInt(body?.category_id),
                role_id: 9,
                stage_id: 10,
              },
              data: {
                importance_level: body?.A[item].name,
              },
            });
            await this.prisma.sp_importance_levels.update({
              where: {
                guideline_id: parseInt(body?.id),
                category_id: parseInt(body?.category_id),
                role_id: 7,
                stage_id: 10,
              },
              data: {
                importance_level: body?.R[item].name,
              },
            });
            await this.prisma.sp_importance_levels.update({
              where: {
                guideline_id: parseInt(body?.id),
                category_id: parseInt(body?.category_id),
                role_id: 8,
                stage_id: 10,
              },
              data: {
                importance_level: body?.TS[item].name,
              },
            });
          }
          if (item == 'MonitoringandEvaluation') {
            await this.prisma.sp_importance_levels.update({
              where: {
                guideline_id: parseInt(body?.id),
                category_id: parseInt(body?.category_id),
                role_id: 9,
                stage_id: 11,
              },
              data: {
                importance_level: body?.A[item].name,
              },
            });
            await this.prisma.sp_importance_levels.update({
              where: {
                guideline_id: parseInt(body?.id),
                category_id: parseInt(body?.category_id),
                role_id: 7,
                stage_id: 11,
              },
              data: {
                importance_level: body?.R[item].name,
              },
            });
            await this.prisma.sp_importance_levels.update({
              where: {
                guideline_id: parseInt(body?.id),
                category_id: parseInt(body?.category_id),
                role_id: 8,
                stage_id: 11,
              },
              data: {
                importance_level: body?.TS[item].name,
              },
            });
          }
        }

        //edit resources
        for (let i = 0; i < body.resources.length; i++) {
          await this.prisma.sp_resources_guidelines.update({
            where: {
              id: parseInt(body.resources[i].id),
              guideline_id: parseInt(body.resources[i].guideline_id),
            },
            data: {
              name: body.resources[i].name,
              source: body.resources[i].link,
              type: body.resources[i].type.name,
            },
          });
        }
      }

      return { message: 'Guideline updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async activeOrDesactiveTool(app_id, id, body, active): Promise<any> {
    try {
      if (app_id != null && id != null && body != null && active != null) {
        console.log(active);
        let activeF = false;
        if (active == 1) {
          activeF = true;
        }

        await this.prisma.sp_guidelines.update({
          where: {
            id: parseInt(id),
            app_id: parseInt(app_id),
          },
          data: {
            active: activeF,
          },
        });
        console.log(Boolean(active));
      }
      return { message: 'Guideline updated successfully' };
    } catch (error) {
      throw error;
    }
  }

  async getGuidelineByAppDesactive(app_id): Promise<any> {
    try {
      const roles: any = await this.prisma.$queryRaw(
        Prisma.sql`SELECT * from sp_roles sr where sr.app_id = ${app_id};`,
      );
      const stages: any = await this.prisma.$queryRaw(
        Prisma.sql`SELECT * from sp_stages ss WHERE ss.app_id = ${app_id};`,
      );
      const guiades: any = await this.prisma.$queryRaw(Prisma.sql`
            select DISTINCT(sil.category_id), sg.id, sg.name, sgm.description, sg.source,
				sgm.estimated_time, 
				sgm.integrates_gender, sgm.is_tested_online,
				sgm.target_scale, sgm.participants, sgm.methods, sgm.input_types,
				sgm.limitations, sgm.strengths, sgm.expected_outputs, sgm.human_resources,
				sgm.key_references,
				sc.name as 'category_name',
                sgm.id as 'id_metadata'
                from sp_guidelines sg 
                	join sp_guidelines_metadata sgm ON sgm.guideline_id = sg.id 
	                join sp_importance_levels sil on sil.guideline_id = sg.id 
	                join sp_categories sc on sc.id = sil.category_id 
	                where sg.active = 0 and sg.app_id = ${app_id};
	
            `);

      if (guiades.length > 0) {
        const guidelinesIds = guiades.map((g: any) => g.id);
        const resources_guidelines_all: any = await this.prisma
          .$queryRaw(Prisma.sql`SELECT * FROM sp_resources_guidelines
                                WHERE guideline_id IN (${guidelinesIds.join(
                                  ', ',
                                )})`);
        const resources_guidelines: any = await this.prisma
          .$queryRaw(Prisma.sql`
                    select sr.name as 'name_role',sr.acronym,
                    ss.name,sil.stage_id, sil.importance_level, sil.category_id, sg.id, sil.role_id,
                    (case 
					when sil.importance_level = 'Very important' then 4
					when sil.importance_level = 'Important' then 3
					when sil.importance_level = 'Useful' then 2
					when sil.importance_level = 'Optional' then 1
					else 0
					end) as 'id_important_level'
                    from sp_guidelines sg 
                        join sp_importance_levels sil on sil.guideline_id = sg.id 
                        join sp_categories sc on sc.id = sil.category_id 
                        join sp_roles sr on sr.id = sil.role_id 
                        join sp_stages ss on ss.id = sil.stage_id 
                        where sg.active = 0 and sg.app_id = ${app_id} `);

        for (let i = 0; i < guiades.length; i++) {
          const guideline_id = guiades[i].id;
          const category_id = guiades[i].category_id;

          roles.forEach((role) => {
            guiades[i][role.acronym] = new Object();
            stages.forEach((stage) => {
              const importans = resources_guidelines.filter(
                (r) =>
                  r.id == guideline_id &&
                  r.category_id == category_id &&
                  r.role_id == role.id,
              );
              const filterStages = importans.filter(
                (i) => i.stage_id == stage.id,
              );
              if (filterStages.length > 0) {
                const name = stage.name.replace(/\s/g, '');
                guiades[i][role.acronym][name] = {
                  id: parseInt(filterStages[0].id_important_level),
                  name: filterStages[0].importance_level,
                };
              }
            });
          });
          guiades[i].resources = resources_guidelines_all.filter(
            (r) => r.guideline_id == guideline_id,
          );
        }
      }
      return guiades;
    } catch (error) {
      throw error;
    }
  }

  async createToolNew(app_id, data: any): Promise<any> {
    try {
      if (app_id != null && data != null) {
        const requestNew = await this.prisma.sp_guidelines.create({
          data: {
            name: data.name,
            contact: '',
            source: data.source,
            app_id: parseInt(app_id),
            active: true,
          },
        });

        await this.prisma.sp_guidelines_metadata.create({
          data: {
            guideline_id: requestNew.id,
            description: data.description,
            target_scale: data.target_scale,
            integrates_gender: data.integrates_gender,
            participants: data.participants,
            methods: data.methods,
            input_types: data.input_types,
            expected_outputs: data.expected_outputs,
            human_resources: data.human_resources,
            estimated_time: data.estimated_time,
            strengths: data.strengths,
            limitations: data.limitations,
            is_tested_online: data.is_tested_online,
            key_references: data.key_references,
          },
        });

        for (const item in data.A) {
          if (item == 'Design') {
            await this.prisma.sp_importance_levels.create({
              data: {
                guideline_id: requestNew?.id,
                category_id: parseInt(data?.category_id),
                role_id: 9,
                stage_id: 9,
                importance_level: data?.A[item].name,
              },
            });
            await this.prisma.sp_importance_levels.create({
              data: {
                guideline_id: requestNew?.id,
                category_id: parseInt(data?.category_id),
                role_id: 7,
                stage_id: 9,
                importance_level: data?.R[item].name,
              },
            });
            await this.prisma.sp_importance_levels.create({
              data: {
                guideline_id: requestNew?.id,
                category_id: parseInt(data?.category_id),
                role_id: 8,
                stage_id: 9,
                importance_level: data?.TS[item].name,
              },
            });
          }
          if (item == 'Implementation') {
            await this.prisma.sp_importance_levels.create({
              data: {
                guideline_id: requestNew?.id,
                category_id: parseInt(data?.category_id),
                role_id: 9,
                stage_id: 10,
                importance_level: data?.A[item].name,
              },
            });
            await this.prisma.sp_importance_levels.create({
              data: {
                guideline_id: requestNew?.id,
                category_id: parseInt(data?.category_id),
                role_id: 7,
                stage_id: 10,
                importance_level: data?.R[item].name,
              },
            });
            await this.prisma.sp_importance_levels.create({
              data: {
                guideline_id: requestNew?.id,
                category_id: parseInt(data?.category_id),
                role_id: 8,
                stage_id: 10,
                importance_level: data?.TS[item].name,
              },
            });
          }
          if (item == 'MonitoringandEvaluation') {
            await this.prisma.sp_importance_levels.create({
              data: {
                guideline_id: requestNew?.id,
                category_id: parseInt(data?.category_id),
                role_id: 9,
                stage_id: 11,
                importance_level: data?.A[item].name,
              },
            });
            await this.prisma.sp_importance_levels.create({
              data: {
                guideline_id: requestNew?.id,
                category_id: parseInt(data?.category_id),
                role_id: 7,
                stage_id: 11,
                importance_level: data?.R[item].name,
              },
            });
            await this.prisma.sp_importance_levels.create({
              data: {
                guideline_id: requestNew?.id,
                category_id: parseInt(data?.category_id),
                role_id: 8,
                stage_id: 11,
                importance_level: data?.TS[item].name,
              },
            });
          }
        }

        data?.resources.forEach(async (element) => {
          await this.prisma.sp_resources_guidelines.create({
            data: {
              guideline_id: requestNew.id,
              name: element.name,
              code: '',
              source: element.source,
              type: element.type,
              active: true,
            },
          });
        });
      }

      await this.prisma.sp_guidelines_request.update({
        where: {
          id: parseInt(data.id),
        },
        data: {
          active: false,
        },
      });
    } catch (error) {
      console.log(error);

      return error;
    }
  }
}
