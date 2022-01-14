import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { errorMonitor } from 'events';
import { response } from 'express';
import { userInfo } from 'os';
import { Sequelize } from 'sequelize-typescript';
import { CreateSupportPackDto } from './dto/create-support-pack.dto';
import { UpdateSupportPackDto } from './dto/update-support-pack.dto';
import { Category } from './entities/category.entity';
import { Guideline } from './entities/guideline.entity';
import { Role } from './entities/role.entity';
import { Stage } from './entities/stage.entity';
import { User } from './entities/user.entity.';
import moment from 'moment';

@Injectable()
export class SupportPacksService {

  constructor(private sequelize: Sequelize) { }

  create(createSupportPackDto: CreateSupportPackDto) {
    return 'This action adds a new supportPack';
  }

  async findAllGuidelinesByApp(app_id: string) {
    try {
      const guidelines = await this.sequelize.query(
        'SELECT * FROM  sp_guidelines WHERE app_id = :app_id ORDER BY code',
        {
          mapToModel: true,
          model: Guideline,
          replacements: { app_id },
          // type: QueryTypes.SELECT
        }
      );
      return guidelines;

    } catch (error) {
      return error;
    }


  }

  async findAllCategoriesByApp(app_id: string) {
    try {
      const categories = await this.sequelize.query(
        'SELECT * FROM  sp_categories WHERE app_id = :app_id',
        {
          mapToModel: true,
          model: Category,
          replacements: { app_id },
          // type: QueryTypes.SELECT
        }
      );
      return categories;

    } catch (error) {
      return error;
    }


  }
  async findAllRolesByApp(app_id: string) {
    try {
      const roles = await this.sequelize.query(
        'SELECT * FROM  sp_roles WHERE app_id = :app_id',
        {
          mapToModel: true,
          model: Role,
          replacements: { app_id },
          // type: QueryTypes.SELECT
        }
      );
      return roles;

    } catch (error) {
      return error;
    }


  }

  async findAllStagesByApp(app_id: string) {
    try {
      const stages = await this.sequelize.query(
        'SELECT * FROM  sp_stages WHERE app_id = :app_id',
        {
          mapToModel: true,
          model: Stage,
          replacements: { app_id },
          // type: QueryTypes.SELECT
        }
      );
      return stages;

    } catch (error) {
      return error;
    }


  }
  async getImportanceLevel(guideline_id: string, stage_id: string, role_id: string) {

    let sqlQuery = `
    SELECT
        id,
        guideline_id,
        category_id,
        stage_id,
        role_id,
        importance_level as "level"
        , (
            CASE importance_level
            WHEN 4 THEN "Very Important"
            WHEN 3 THEN "Important"
            WHEN 2 THEN "Useful"
            WHEN 1 THEN "Optional"
            END
        ) AS "importance_level"
    FROM
        sp_importance_levels
    WHERE
        guideline_id = :guideline_id
    AND
        stage_id = :stage_id
    AND
        role_id = :role_id
    `

    try {
      const importanceLevel = await this.sequelize.query(
        sqlQuery,
        {
          replacements: { guideline_id, stage_id, role_id },
          type: 'SELECT'
        }
      );
      return importanceLevel;
    } catch (error) {
      console.log(error)
      return error;
    }

  }

  async getGuidelinesByRoleStageCategory(role: string, stage: string, category: string) {

    let getGuidelinesQuery = `SELECT
    g.id,
    g.code,
    (REPLACE(g.code, ".", "")) as "composedCode",
        g.name,
        g.type,
        TRIM(g.source) AS "source",
        il.importance_level as "importance_level",
        (
            CASE il.importance_level
            WHEN "Very Important" THEN 1
            WHEN "Important" THEN 2
            WHEN "Useful" THEN 3
            WHEN "Optional" THEN 4
            END
        ) AS "level",
        gm.description,
        gm.estimated_time,
        gm.strengths,
        gm.limitations
    FROM
        sp_importance_levels il
    INNER JOIN sp_categories c ON il.category_id = c.id
    INNER JOIN sp_stages s ON il.stage_id = s.id
    INNER JOIN sp_roles r ON il.role_id = r.id
    INNER JOIN sp_guidelines g ON il.guideline_id = g.id
    LEFT JOIN sp_guidelines_metadata gm ON gm.guideline_id = g.id
    WHERE
        il.role_id = :role
    AND il.stage_id = :stage
    AND il.category_id = :category
    AND g.active = 1
    ORDER BY level, code ASC
    `;

    try {
      let guidelinesByRSC:any = await this.sequelize.query(
        getGuidelinesQuery,
        {
          replacements: { role, stage, category },
          type: 'SELECT'
        }
      );

      const guidelinesIds = guidelinesByRSC.map((g:any) => g.id);
      
      let getResourcesByTool = `SELECT * FROM sp_resources_guidelines
      WHERE guideline_id IN (:guidelinesIds)`;
  
      const resourcesByTool: any = await this.sequelize.query(
        getResourcesByTool,
        {
          replacements: { guidelinesIds },
          type: 'SELECT'
        }
      );

      // Add resources to tools
      for (let i = 0; i < guidelinesByRSC.length; i++) {
        const guideline_id = guidelinesByRSC[i].id;
        guidelinesByRSC[i].resources = resourcesByTool.filter(r => r.guideline_id == guideline_id);     
      }

      console.log(guidelinesByRSC);
      

      return guidelinesByRSC;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async getAllGuidelines(userId: string, appId: string) {
    // let Usr = Sequelize.define('User', User)

    console.log({ userId });
    console.log({ appId });

    try {
      let user = null;
      if (userId) {
        // user = await User.findOne({ where: { id: userId } });
      }

      let sqlQuery = `SELECT
                            g.id,
                            g.code,
                            (REPLACE(g.code, ".", "")) as "composedCode",
                            g.name,
                            g.type,
                            g.active,
                            TRIM(g.source) AS "source"
                        FROM
                            sp_guidelines g
                        WHERE g.app_id = ${appId}
                        ${user ? '' : 'AND g.active = 1'}
                        ORDER BY composedCode
                        `;
      let sqlQuery2 = `SELECT
                            g.id,
                            s.name as "stage",
                            (REPLACE(g.code, ".", "")) as "composedCode",
                            r.name as role,
                            (
                                CASE il.importance_level
                                WHEN  "Very important" THEN 4
                                WHEN "Important" THEN 3
                                WHEN "Useful" THEN 2
                                WHEN "Optional" THEN 1
                                END
                            ) AS "importance_level"
                        FROM
                            sp_importance_levels il
                        INNER JOIN sp_categories c ON il.category_id = c.id
                        INNER JOIN sp_stages s ON il.stage_id = s.id
                        INNER JOIN sp_roles r ON il.role_id = r.id
                        INNER JOIN sp_guidelines g ON il.guideline_id = g.id
                        ${user ? '' : 'WHERE g.active = 1'}
                        ORDER BY composedCode
                        `;
      const allGuides = await this.sequelize.query(
        sqlQuery,
        {
          replacements: {},
          type: 'SELECT'
        }
      );
      const allGuidesStages = await this.sequelize.query(
        sqlQuery2,
        {
          replacements: {},
          type: 'SELECT'
        }
      );


      let response = this.formatAllGuidances(allGuides, allGuidesStages);

      return response;
    } catch (error) {
      console.log(error)
      return error;
    }
  }

  async _createPerson(email: string, first_name: string, last_name: string, password?: string): Promise<User> {
    let p = password ? password : null;
    console.log(email, first_name, last_name, p);
    let newPerson = new User({ email, first_name, last_name, p });

    const errors = await validate(newPerson);

    if (errors.length > 0) {
      console.log(errors)
      throw new Error(errors.toString());
    }
    if (p)
      newPerson.hashPassword();
    let response = await newPerson.save();

    return response;

  }

  // Set Downloaded
  async setDownload(body: any) {
    const { user_id, institute, intended_use } = body;
    try {
      let sqlQuery = `
            INSERT INTO sp_download (user_id, institute, intended_use, filter_type, date)
            VALUES (:user_id,:institute,:intended_use,:filter_type,:date)
        `;

      const newDownload = await this.sequelize.query(
        sqlQuery,
        {
          replacements: { user_id, institute, intended_use, date: moment().toDate(), filter_type: 0 },
          type: 'INSERT'
        }
      );
      const downloadsPerson = await this.sequelize.query(
        `
            SELECT * FROM sp_download WHERE user_id = :user_id ORDER BY date DESC LIMIT 1
        `,
        {
          replacements: { user_id },
          type: 'SELECT'
        }
      );

      return downloadsPerson[0];
    } catch (error) {
      console.log(error)
      throw Error(error);
    }

  }

  // Set Downloaded Guideline
  async setDownloadedGuideline(body: any) {
    const { download_id, guideline_id } = body;
    try {
      let sqlQuery = `
          INSERT INTO sp_download_guidelines (download_id, guideline_id)
          VALUES (:download_id, :guideline_id)
      `

      const downloadedGuideline = await this.sequelize.query(
        sqlQuery,
        {
          replacements: { download_id, guideline_id },
          type: 'INSERT'
        }
      );

      return downloadedGuideline;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }

  }

  // Set Downloaded Region
 async setDownloadedRegion(body: any) {
    const { download_id, region_id, region_scope } = body;
    try {
      let sqlQuery = `
              INSERT INTO sp_download_regions (download_id, region_id, region_scope)
              VALUES (:download_id, :region_id, :region_scope)
          `

      const downloadedRegion = await this.sequelize.query(
        sqlQuery,
        {
          replacements: { download_id, region_id, region_scope },
          type:'INSERT'
        }
      );

      return downloadedRegion;
    } catch (error) {
      console.log(error)
      throw new Error(error);
    }

  }

  async downloadManager(ga: any, user_id) {
    let download_id: any;

    try {
      if (user_id == '' || !user_id) {
        let user = await this._createPerson(ga.email, ga.first_name, ga.last_name);
        user_id = user.id;
      }
      // else {
      // -TO-DO
      // }
      download_id = await this.setDownload({ user_id, institute: ga.institute_name, intended_use: ga.use });
      if (download_id) {
        let promises: any = [];
        // Set Guidelines downloaded
        ga.guide_selected.forEach((guide: any) => {
          console.log(guide)
          promises.push(this.setDownloadedGuideline({ download_id: download_id['id'], guideline_id: guide }))
        });
        // Set region(s) where your institute is located download
        ga.institute_regions.forEach((region: any) => {
          promises.push(this.setDownloadedRegion({ download_id: download_id['id'], region_id: region, region_scope: "instituteRegion" }))
        });
          // Set region(s) of your research interest download
          ga.research_regions.forEach((research: any) => {
            promises.push(this.setDownloadedRegion({ download_id: download_id['id'], region_id: research, region_scope: "researchRegion" }))
          });
        //   // guides?.concat( researchs, institutes)
          let savedManager = await Promise.all(promises);
          console.log(savedManager);
      }

      return download_id;
    } catch (error) {
      console.log(error)
      return error;
    }

  }

  formatAllGuidances(guides: any[], guidesStages: any[]) {
    let result = []
    for (let index = 0; index < guides.length; index++) {
      const element = guides[index];
      let guideStages = guidesStages.filter(gS => gS.id == element.id);
      element['stages'] = this.groupBy(guideStages, 'stage');
    }
    return guides;
  }

  groupBy(xs: any[], key: string | number) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  findOne(id: number) {
    return `This action returns a #${id} supportPack`;
  }

  update(id: number, updateSupportPackDto: UpdateSupportPackDto) {
    return `This action updates a #${id} supportPack`;
  }

  remove(id: number) {
    return `This action removes a #${id} supportPack`;
  }
}
