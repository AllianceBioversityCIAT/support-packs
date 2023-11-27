import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.services';

@Injectable()
export class SpGuidelinesService {
    constructor(private prisma: PrismaService){}
    

    async getAllGuidelines(app_id):Promise<any>{
        try {
            const guiades:any = await this.prisma.$queryRaw(Prisma.sql`
            select  sg.id, sg.name, sg.source, sg.contact, sgm.description, sgm.target_scale,
            sgm.integrates_gender, sgm.participants, sgm.methods, sgm.input_types, sgm.expected_outputs,
            sgm.human_resources,sgm.estimated_time,sgm.strengths,sgm.limitations, sgm.key_references,
            sil.importance_level, sr.name as 'role_name', sc.name as 'cate_name', ss.name as 'staga_name',
            concat(sg.id,sil.category_id, sil.stage_id, sil.role_id) as code, sil.category_id as 'id_cat', 
            sil.role_id as 'id_rol', sil.stage_id as 'id_stage'
            from sp_guidelines sg 
        join sp_guidelines_metadata sgm on sgm.guideline_id = sg.id
        join sp_importance_levels sil on sil.guideline_id = sg.id
        join sp_roles sr on sr.id = sil.role_id 
        join sp_categories sc on sc.id = sil.category_id 
        join sp_stages ss on ss.id = sil.stage_id 
        where sg.app_id = ${app_id} and sg.active > 0;
            `);
        if (guiades.length > 0) {
            
            const guidelinesIds = guiades.map((g: any) => g.id);
            
            const resources_guidelines:any = await this.prisma.$queryRaw(Prisma.sql`SELECT * FROM sp_resources_guidelines
            WHERE guideline_id IN (${guidelinesIds.join(', ')})`);
            for (let i = 0; i < guiades.length; i++) {
                const guideline_id = guiades[i].id;
                guiades[i].resources = resources_guidelines.filter(
                  (r) => r.guideline_id == guideline_id,
                );
              }
        }else{
            const guiadess:any = await this.prisma.$queryRaw(Prisma.sql`
            SELECT * from sp_guidelines sg 
	join sp_importance_levels sil on sil.guideline_id = sg.id
	WHERE sg.app_id = ${app_id} and sg.active > 0
            `);

            return guiadess;
        }
            
        return guiades;
        } catch (error) {
            return error;
        }
    }

    async getGuidelineById(app_id):Promise<any>{


        try {
            const guiades:any = await this.prisma.$queryRaw(Prisma.sql`
            select DISTINCT(sil.category_id), sg.id,sg.name, sc.name as 'cate_name'
                from sp_guidelines sg 
	                join sp_importance_levels sil on sil.guideline_id = sg.id 
	                join sp_categories sc on sc.id = sil.category_id 
	                where sg.active > 0 and sg.app_id = ${app_id};
            `);

            if(guiades.length > 0){
                
                const resources_guidelines:any = await this.prisma.$queryRaw(Prisma.sql`select sr.acronym, 
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

    async getGuidelineByApp(app_id):Promise<any>{
        try {
            const roles:any = await this.prisma.$queryRaw(Prisma.sql`SELECT * from sp_roles sr where sr.app_id = ${app_id};`);
            const stages:any = await this.prisma.$queryRaw(Prisma.sql`SELECT * from sp_stages ss WHERE ss.app_id = ${app_id};`);
            const guiades:any = await this.prisma.$queryRaw(Prisma.sql`
            select DISTINCT(sil.category_id), sg.id, sg.name, sgm.description, sg.source,
				sgm.estimated_time, 
				sgm.integrates_gender, sgm.is_tested_online,
				sgm.target_scale, sgm.participants, sgm.methods, sgm.input_types,
				sgm.limitations, sgm.strengths, sgm.expected_outputs, sgm.human_resources,
				sgm.key_references,
				sc.name as 'category_name'
                from sp_guidelines sg 
                	join sp_guidelines_metadata sgm ON sgm.guideline_id = sg.id 
	                join sp_importance_levels sil on sil.guideline_id = sg.id 
	                join sp_categories sc on sc.id = sil.category_id 
	                where sg.active > 0 and sg.app_id = ${app_id};
	
            `);

            if(guiades.length > 0){
                    const guidelinesIds = guiades.map((g: any) => g.id);
                    const resources_guidelines_all:any = await this.prisma.$queryRaw(Prisma.sql`SELECT * FROM sp_resources_guidelines
                                WHERE guideline_id IN (${guidelinesIds.join(', ')})`);
                    const resources_guidelines:any = await this.prisma.$queryRaw(Prisma.sql`
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
                        where sg.active > 0 and sg.app_id = ${app_id} `);

                    for (let i = 0; i < guiades.length; i++) {
                            const guideline_id = guiades[i].id;
                            const category_id = guiades[i].category_id;

                            roles.forEach((role) => {
                                guiades[i][role.acronym] = new Object();
                                stages.forEach((stage) => {
                                    const importans = resources_guidelines.filter((r) => r.id == guideline_id && r.category_id == category_id && r.role_id == role.id);
                                    const filterStages = importans.filter((i) => i.stage_id == stage.id);
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
            }
         catch (error) {
            throw error;
        }
    }
}
