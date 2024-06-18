import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/prisma.services';




@Injectable()
export class SpSupportPackService {
  constructor(private prisma: PrismaService){}

  async getAllFiltersByApp(app_ids):Promise<any>{
      try {
        console.log(app_ids);
        
          const stage = await this.prisma.sp_stages.findMany({where: {app_id: parseInt(app_ids)}});
          const categories = await this.prisma.sp_categories.findMany({where: {app_id: parseInt(app_ids)}});
          const roles = await this.prisma.sp_roles.findMany({where: {app_id: parseInt(app_ids)}});
        return {
          stage,
          categories,
          roles
        }
      } catch (error) {
        console.log(error);
        
        return error;
      }
  }

  async createDowloandTool(data:any):Promise<any>{
    console.log(data);
    
    try {
      const result = [];
      data.forEach(async element => {
        result.push(await this.prisma.sp_guide_download.create({
          data: {
            guiade_id: parseInt(element.id),
            email: element.email,
          }
        }))
      });
      return result;
    } catch (error) {
      console.log(error);
      
      return error;
    }
  }

  async createRequestTool(data:any):Promise<any>{    
    try {
      const result = this.prisma.sp_request_tool.create({
        data: {
          name_request : data.name,
          email_request : data.email,
          tool_name : data.toolName,
          description_tool : data.description,
          link : data.link,
          estimated_time : data.estimatedTime,
          gender : data.gender,
          testing: data.test,
          target_scale : data.scale,
          participates : data.participates,
          method_used : data.method,
          type_data : data.types,
          limitations : data.limitations,
          Strengths : data.strngths,
          Expected : data.expected,
          Required : data.required,
          Key_reference : data.keyPerson,
          Thematic_area : parseInt(data.thematic.id),
          researcher_desing : data.researcher_desing.name,
          researcher_implementation : data.researcher_implementation.name,
          researcher_monitoring : data.researcher_monitoring.name,
          technical_desing : data.technical_desing.name,
          technical_implementation : data.technical_implementation.name,
          technical_monitoring : data.technical_monitoring.name,
          academia_desing : data.academia_desing.name,
          academia_implementation : data.academia_implementation.name,
          academia_monitoring : data.academia_monitoring.name,
          resouce_title : data.resouce_title,
          resouce_link : data.resouce_link,
          resouce_category : data.resouce_category.name,
          active: true
        }
      })

      return result;
    } catch (error) {
      return error;
    }
  }

  async getRequestPending():Promise<any>{
    try {
      
      const result:any = await this.prisma.$queryRaw(Prisma.sql`
      SELECT  srt.name_request as 'name', srt.id,
      srt.email_request as 'email', srt.tool_name as 'toolName', srt.description_tool as 'description',
      srt.link as 'link', srt.estimated_time as 'estimatedTime', srt.gender as 'gender', srt.testing as 'test',
      srt.target_scale as 'scale', srt.participates as 'participates', srt.method_used as 'method', srt.type_data as 'types',
      srt.limitations as 'limitations', srt.Strengths as 'strngths', srt.Expected as 'expected', srt.Required as 'required',
      srt.Key_reference as 'keyPerson', srt.Thematic_area as 'thematic', srt.researcher_desing, srt.researcher_implementation,
      srt.researcher_monitoring, srt.technical_desing,srt.technical_implementation, srt.technical_monitoring , srt.academia_desing,
      srt.academia_implementation, srt.academia_monitoring, srt.resouce_title as 'resouce_title', srt.resouce_link, srt.resouce_category
      from sp_request_tool srt 
      where srt.active > 0`);

      result.forEach(async element => {
        element.id = parseInt(element.id);
        element.thematic = parseInt(element.thematic);
      })
      return result;
    } catch (error) {
      console.log(error);
      
      return error;
    }
  }

  async registerDowloadTool(data:any):Promise<any>{
    try {
      const result = await this.prisma.sp_person.upsert({
        where: {
          email: data.email
        },
        update: {
          first_name: data.first_name,
          last_name: data.last_name,
        },
        create: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: '',
          registeredAt : new Date(),
        },
        select: {
          id: true
        }
      });

      const dowload = await this.prisma.sp_download.create({
        data: {
          institute: data.institute,
          intended_use : data.intended,
          user_id: result.id,
          date: new Date(),
          filter_type:true,
          app_id: parseInt(data.app_id)
        }
      });

      for (let index = 0; index < data.guiades.length; index++) {
        await this.prisma.sp_download_guidelines.create({
          data: {
            download_id: dowload.id,
            guideline_id: parseInt(data.guiades[index].guideline_id)
          }
        });
        
      }

      for (let index = 0; index < data.region.length; index++) {
        await this.prisma.sp_download_regions.create({
          data: {
            download_id: dowload.id,
            region_id: parseInt(data.region[index].id),
            region_scope : data.region[index].scope
          }
        });
        
      }
      
    } catch (error) {
      console.log(error);
      
      return error;
    }
  }

  async createRequestToolNew(app_id, data:any):Promise<any>{
    try {

      if(app_id != null && data != null){
       const requestNew =  await this.prisma.sp_guidelines_request.create(
          {
           data: {
              name : data.name,
              contact : data.email,
              source : data.source,
              app_id : parseInt(app_id),
              active: true
           }
          }
          );

        await this.prisma.sp_guidelines_metadata_request.create({
          data: {
            guideline_id : requestNew.id,
            description : data.description,
            target_scale : data.target_scale,
            integrates_gender : data.integrates_gender,
            participants : data.participants,
            methods : data.methods,
            input_types : data.input_types,
            expected_outputs : data.expected_outputs,
            human_resources : data.human_resources,
            estimated_time : data.estimated_time,
            strengths : data.strengths,
            limitations : data.limitations,
            is_tested_online : data.is_tested_online,
            key_references : data.key_references,
          }
        });



        for (const item in data.A) {
          if (item == "design") {
              await this.prisma.sp_importance_levels_request.create({
                  
                  data:{
                      guideline_id: requestNew?.id,
                      category_id: parseInt(data?.category_id),
                      role_id: 9,
                      stage_id: 9,
                      importance_level: data?.A[item].name
                  }
              });
              await this.prisma.sp_importance_levels_request.create({
                  
                  data:{
                    guideline_id: requestNew?.id,
                      category_id: parseInt(data?.category_id),
                      role_id: 7,
                      stage_id: 9,
                      importance_level: data?.R[item].name
                  }
              });
              await this.prisma.sp_importance_levels_request.create({
                  
                  data:{
                    guideline_id: requestNew?.id,
                      category_id: parseInt(data?.category_id),
                      role_id: 8,
                      stage_id: 9,
                      importance_level: data?.TS[item].name
                  }
              });
          }
          if(item == "implementation"){
              await this.prisma.sp_importance_levels_request.create({
                  
                  data:{
                    guideline_id: requestNew?.id,
                      category_id: parseInt(data?.category_id),
                      role_id: 9,
                      stage_id: 10,
                      importance_level: data?.A[item].name
                  }
              });
              await this.prisma.sp_importance_levels_request.create({
                  
                  data:{
                    guideline_id: requestNew?.id,
                      category_id: parseInt(data?.category_id),
                      role_id: 7,
                      stage_id: 10,
                      importance_level: data?.R[item].name
                  }
              });
              await this.prisma.sp_importance_levels_request.create({
                  
                  data:{
                    guideline_id: requestNew?.id,
                      category_id: parseInt(data?.category_id),
                      role_id: 8,
                      stage_id: 10,
                      importance_level: data?.TS[item].name
                  }
              });
          }
          if (item == "monitoring") {
              await this.prisma.sp_importance_levels_request.create({
                  
                  data:{
                    guideline_id: requestNew?.id,
                      category_id: parseInt(data?.category_id),
                      role_id: 9,
                      stage_id: 11,
                      importance_level: data?.A[item].name
                  }
              });
              await this.prisma.sp_importance_levels_request.create({
                  
                  data:{
                    guideline_id: requestNew?.id,
                      category_id: parseInt(data?.category_id),
                      role_id: 7,
                      stage_id: 11,
                      importance_level: data?.R[item].name
                  }
              });
              await this.prisma.sp_importance_levels_request.create({
                  
                  data:{
                    guideline_id: requestNew?.id,
                      category_id: parseInt(data?.category_id),
                      role_id: 8,
                      stage_id: 11,
                      importance_level: data?.TS[item].name
                  }
              });
          }
          
          
      }
        
        data?.resource.forEach(async element => {
          await this.prisma.sp_resources_guidelines_request.create({
            data: {
              guideline_id : requestNew.id,
              name : element.name,
              code : '',
              source : element.source,
              type : element.type,
              active: true
            }
          })
        })
      }
      
    } catch (error) {
      console.log(error);
      
      return error;
    }


  }


  async getAllRequestTools(app_id):Promise<any>{
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
              sc.name as 'category_name',
              sgm.id as 'id_metadata'
          from sp_guidelines_request sg 
            join sp_guidelines_metadata_request sgm ON sgm.guideline_id = sg.id 
            join sp_importance_levels_request sil on sil.guideline_id = sg.id 
            join sp_categories sc on sc.id = sil.category_id 
            where sg.active > 0 and sg.app_id = ${app_id};

      `);

      if(guiades.length > 0){
              const guidelinesIds = guiades.map((g: any) => g.id);
              const resources_guidelines_all:any = await this.prisma.$queryRaw(Prisma.sql`SELECT * FROM sp_resources_guidelines_request
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
              from sp_guidelines_request sg 
                  join sp_importance_levels_request sil on sil.guideline_id = sg.id 
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


  async putGuidelineRequest(app_id, id, body):Promise<any>{
    try {
        
        if(app_id != null && id != null && body != null){
            
            //edit guideline
            await this.prisma.sp_guidelines_request.update({
                where:{
                    id: parseInt(id),
                    app_id: parseInt(app_id)
                },
                data:{
                    name: body?.name,
                    source: body?.source,
                }
            });

            //edit guideline metadata

            await this.prisma.sp_guidelines_metadata_request.update({
                where:{
                    guideline_id: parseInt(body?.id),
                    id: parseInt(body?.id_metadata)
                },
                data:{
                    description : body?.description,
                    estimated_time : body?.estimated_time,
                    expected_outputs : body?.expected_outputs,
                    human_resources : body?.human_resources,
                    input_types : body?.input_types,
                    integrates_gender : body?.integrates_gender,
                    is_tested_online : body?.is_tested_online,
                    key_references : body?.key_references,
                    limitations : body?.limitations,
                    methods : body?.methods,
                    participants : body?.participants,
                    strengths : body?.strengths,
                    target_scale : body?.target_scale
                }
                }
            );

            //edit importance level

            for (const item in body.A) {
                if (item == "Design") {
                    await this.prisma.sp_importance_levels_request.update({
                        where:{
                            guideline_id: parseInt(body?.id),
                            category_id: parseInt(body?.category_id),
                            role_id: 9,
                            stage_id: 9
                        },
                        data:{
                            importance_level: body?.A[item].name
                        }
                    });
                    await this.prisma.sp_importance_levels_request.update({
                        where:{
                            guideline_id: parseInt(body?.id),
                            category_id: parseInt(body?.category_id),
                            role_id: 7,
                            stage_id: 9
                        },
                        data:{
                            importance_level: body?.R[item].name
                        }
                    });
                    await this.prisma.sp_importance_levels_request.update({
                        where:{
                            guideline_id: parseInt(body?.id),
                            category_id: parseInt(body?.category_id),
                            role_id: 8,
                            stage_id: 9
                        },
                        data:{
                            importance_level: body?.TS[item].name
                        }
                    });
                }
                if(item == "Implementation"){
                    await this.prisma.sp_importance_levels_request.update({
                        where:{
                            guideline_id: parseInt(body?.id),
                            category_id: parseInt(body?.category_id),
                            role_id: 9,
                            stage_id: 10
                        },
                        data:{
                            importance_level: body?.A[item].name
                        }
                    });
                    await this.prisma.sp_importance_levels_request.update({
                        where:{
                            guideline_id: parseInt(body?.id),
                            category_id: parseInt(body?.category_id),
                            role_id: 7,
                            stage_id: 10
                        },
                        data:{
                            importance_level: body?.R[item].name
                        }
                    });
                    await this.prisma.sp_importance_levels_request.update({
                        where:{
                            guideline_id: parseInt(body?.id),
                            category_id: parseInt(body?.category_id),
                            role_id: 8,
                            stage_id: 10
                        },
                        data:{
                            importance_level: body?.TS[item].name
                        }
                    });
                }
                if (item == "MonitoringandEvaluation") {
                    await this.prisma.sp_importance_levels_request.update({
                        where:{
                            guideline_id: parseInt(body?.id),
                            category_id: parseInt(body?.category_id),
                            role_id: 9,
                            stage_id: 11
                        },
                        data:{
                            importance_level: body?.A[item].name
                        }
                    });
                    await this.prisma.sp_importance_levels_request.update({
                        where:{
                            guideline_id: parseInt(body?.id),
                            category_id: parseInt(body?.category_id),
                            role_id: 7,
                            stage_id: 11
                        },
                        data:{
                            importance_level: body?.R[item].name
                        }
                    });
                    await this.prisma.sp_importance_levels_request.update({
                        where:{
                            guideline_id: parseInt(body?.id),
                            category_id: parseInt(body?.category_id),
                            role_id: 8,
                            stage_id: 11
                        },
                        data:{
                            importance_level: body?.TS[item].name
                        }
                    });
                }
                
                
            }

            //edit resources
            for(let i = 0; i < body.resources.length; i++){
                await this.prisma.sp_resources_guidelines_request.update({
                    where:{
                        id: parseInt(body.resources[i].id),
                        guideline_id: parseInt(body.resources[i].guideline_id)
                    },
                    data:{
                        name: body.resources[i].name,
                        source: body.resources[i].link,
                        type: body.resources[i].type.name
                    }
                });
            }
        }

        return {message: "Guideline updated successfully"};
    } catch (error) {
        throw error;
    }
}

  async deleteGuidelineRequest(app_id, id):Promise<any>{
    try {
      if(app_id != null && id != null){
          
          
          await this.prisma.sp_guidelines_request.update({
              where:{
                  id: parseInt(id),
                  app_id: parseInt(app_id)
              },
              data:{
                  active: false
              }
          });
      }
      return {message: "Guideline updated successfully"};
  } catch (error) {
      throw error;
  }
  }
}
