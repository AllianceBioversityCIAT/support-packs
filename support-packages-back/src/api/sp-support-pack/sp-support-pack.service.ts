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
      const result = await this.prisma.sp_person.create({
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: '',
          registeredAt : new Date(),
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
}
