import { QueryTypes, Sequelize } from "sequelize";
import * as dotenv from "dotenv";
import { database } from '../_helpers/db';
import { Request, Response } from "express";
import Guidelines from "../models/GuideLinesModel";
import { User } from "../models/UserModel";
import { validate } from "class-validator";
import moment from 'moment';

// import { sign } from "crypto";
// import { ne, lte } from "sequelize/types/lib/operators";
dotenv.config();

class SupportPackController {
    static getGuidelines = async (req: Request, res: Response) => {
        const { app_id } = req.params;
        try {
            const guidelines = await database.query(
                'SELECT * FROM  sp_guidelines WHERE app_id = :app_id ORDER BY code',
                {
                    mapToModel: true,
                    model: Guidelines,
                    replacements: { app_id },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(guidelines)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static updateImportanceLevel = async (req: Request, res: Response) => {
        const { id, importanceL } = req.params;
        try {
            let impLevel = await database.query(
                'SELECT * FROM  sp_importance_levels WHERE id =:id ORDER BY code',
                {
                    replacements: { id },
                    type: QueryTypes.SELECT
                }
            );
            console.log(impLevel, importanceL)
            // impLevel = importanceL;
            res.status(200).json(impLevel)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static getGuidelinesByRoleStageCategory = async (req: Request, res: Response) => {
        const { role, stage, category } = req.body;
        let sqlQuery = `SELECT
                        g.id,
                        g.code,
                        (REPLACE(g.code, ".", "")) as "composedCode",
                            g.name,
                            g.type,
                            TRIM(g.source) AS "source",
                            il.importance_level as "level",
                            (
                                CASE il.importance_level
                                WHEN 4 THEN "Very Important"
                                WHEN 3 THEN "Important"
                                WHEN 2 THEN "Useful"
                                WHEN 1 THEN "Optional"
                                END
                            ) AS "importance_level"
                        FROM
                            sp_importance_levels il
                        INNER JOIN sp_categories c ON il.category_id = c.id
                        INNER JOIN sp_stages s ON il.stage_id = s.id
                        INNER JOIN sp_roles r ON il.role_id = r.id
                        INNER JOIN sp_guidelines g ON il.guideline_id = g.id
                        WHERE
                            il.role_id = :role
                        AND il.stage_id = :stage
                        AND il.category_id = :category
                        AND g.active = 1
                        ORDER BY
                            composedCode
                        `;

        try {
            const guidelinesByRoleStageCategory = await database.query(
                sqlQuery,
                {
                    replacements: { role, stage, category },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(guidelinesByRoleStageCategory)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }

    }

    static getAllGuidelines = async (req: Request, res: Response) => {
        const { userId, appId } = req.params;
        // let Usr = Sequelize.define('User', User)


        try {
            let user = null;
            if (userId) {
                user = await User.findOne({ where: { id: userId } });
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
            const allGuides = await database.query(
                sqlQuery,
                {
                    replacements: {},
                    type: QueryTypes.SELECT
                }
            );
            const allGuidesStages = await database.query(
                sqlQuery2,
                {
                    replacements: {},
                    type: QueryTypes.SELECT
                }
            );


            let response = SupportPackController.formatAllGuidances(allGuides, allGuidesStages);

            // console.log(response)
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }

    static formatAllGuidances(guides: any[], guidesStages: any[]) {
        let result = []
        for (let index = 0; index < guides.length; index++) {
            const element = guides[index];
            let guideStages = guidesStages.filter(gS => gS.id == element.id);
            element['stages'] = this.groupBy(guideStages, 'stage');
        }
        return guides;
    }

    private static groupBy(xs: any[], key: string | number) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };

    // Get importance level
    static getImportanceLevel = async (req: Request, res: Response) => {
        const { gId, sId, rId } = req.body;
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
                        guideline_id = :gId
                    AND
                        stage_id = :sId
                    AND
                        role_id = :rId
                    `

        try {
            const importanceLevel = await database.query(
                sqlQuery,
                {
                    replacements: { gId, sId, rId },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(importanceLevel)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }

    }


    // Get Categories
    static getCategories = async (req: Request, res: Response) => {
        const { app_id } = req.params;
        try {
            const categories = await database.query(
                'SELECT * FROM  sp_categories WHERE app_id = :app_id',
                {
                    replacements: { app_id },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(categories)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }

    // Get Regions
    static getRegions = async (req: Request, res: Response) => {
        const { app_id } = req.params;
        try {
            const regions = await database.query(
                'SELECT * FROM  sp_regions',
                {
                    replacements: { app_id },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(regions)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Get Stages
    static getStages = async (req: Request, res: Response) => {
        const { app_id } = req.params;
        try {
            const stages = await database.query(
                'SELECT * FROM  sp_stages WHERE app_id = :app_id',
                {
                    replacements: { app_id },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(stages)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // Get Roles
    static getRoles = async (req: Request, res: Response) => {
        const { app_id } = req.params;
        try {
            const roles = await database.query(
                'SELECT * FROM  sp_roles WHERE app_id = :app_id',
                {
                    replacements: { app_id },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(roles)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //Get Person information
    static getPersonInfo = async (req: Request, res: Response) => {
        const { email } = req.body;
        let sqlQuery = `
                SELECT
                -- Person
                dp.id, dp.first_name, dp.last_name, dp.registeredAt, dp.email,
                -- Download
                dd.institute, dd.date
                FROM
                sp_person dp,
                sp_download dd
                WHERE
                -- Person Filter
                dp.email = :email
                AND dp.id = dd.user_id
                ORDER BY dd.id DESC limit 1;
        `;

        try {
            const personInfo = await database.query(
                sqlQuery,
                {
                    replacements: { email },
                    type: QueryTypes.SELECT
                }
            );
            res.status(200).json(personInfo)
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }

    }
    // Create Person
    static createPerson = async (req: Request, res: Response) => {
        const { email, first_name, last_name, password } = req.body;
        try {
            SupportPackController._createPerson(email, first_name, last_name, password);
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }

    static _createPerson = async (email: string, first_name: string, last_name: string, password?: string) => {
        try {


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
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    // Set Downloaded
    static setDownload = async (body: any) => {
        const { user_id, institute, intended_use } = body;
        try {
            let sqlQuery = `
                INSERT INTO sp_download (user_id, institute, intended_use, filter_type, date)
                VALUES (:user_id,:institute,:intended_use,:filter_type,:date)
            `;

            const newDownload = await database.query(
                sqlQuery,
                {
                    replacements: { user_id, institute, intended_use, date: moment().toDate(), filter_type: 0 },
                    type: QueryTypes.INSERT
                }
            );
            const downloadsPerson = await database.query(
                `
                SELECT * FROM sp_download WHERE user_id = :user_id ORDER BY date DESC LIMIT 1
            `,
                {
                    replacements: { user_id },
                    type: QueryTypes.SELECT
                }
            );

            return downloadsPerson[0];
        } catch (error) {
            console.log(error)
            throw Error(error);
        }

    }

    // Set Downloaded Guideline
    static setDownloadedGuideline = async (body: any) => {
        const { download_id, guideline_id } = body;
        try {
            let sqlQuery = `
                INSERT INTO sp_download_guidelines (download_id, guideline_id)
                VALUES (:download_id, :guideline_id)
            `

            const downloadedGuideline = await database.query(
                sqlQuery,
                {
                    replacements: { download_id, guideline_id },
                    type: QueryTypes.INSERT
                }
            );

            return downloadedGuideline;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }

    // Set Downloaded Region
    static setDownloadedRegion = async (body: any) => {
        const { download_id, region_id, region_scope } = body;
        try {
            let sqlQuery = `
                INSERT INTO sp_download_regions (download_id, region_id, region_scope)
                VALUES (:download_id, :region_id, :region_scope)
            `

            const downloadedRegion = await database.query(
                sqlQuery,
                {
                    replacements: { download_id, region_id, region_scope },
                    type: QueryTypes.INSERT
                }
            );

            return downloadedRegion;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }

    }


    // download manager
    static downloadManager = async (req: Request, res: Response) => {
        const { first_name, last_name, email, use, guide_selected, institute_name, institute_regions, research_regions } = req.body;
        let { user_id } = req.body;

        let download_id: any;

        try {
            if (user_id == '' || !user_id) {
                let user = await SupportPackController._createPerson(email, first_name, last_name);
                user_id = user.id;
            }
            // else {
            // }
            download_id = await SupportPackController.setDownload({ user_id, institute: institute_name, intended_use: use });
            if (download_id) {
                let promises: any = [];
                // Set Guidelines downloaded
                guide_selected.forEach((guide: any) => {
                    console.log(guide)
                    promises.push(SupportPackController.setDownloadedGuideline({ download_id: download_id['id'], guideline_id: guide }))
                });
                // Set region(s) where your institute is located download
                institute_regions.forEach((region: any) => {
                    promises.push(SupportPackController.setDownloadedRegion({ download_id: download_id['id'], region_id: region, region_scope: "instituteRegion" }))
                });
                // Set region(s) of your research interest download
                research_regions.forEach((research: any) => {
                    promises.push(SupportPackController.setDownloadedRegion({ download_id: download_id['id'], region_id: research, region_scope: "researchRegion" }))
                });
                // guides?.concat( researchs, institutes)
                let savedManager = await Promise.all(promises);
                console.log(savedManager);
            }

            res.status(200).json({ download_id });
        } catch (error) {
            console.log(error)
            res.status(500).json(error);
        }
    }
}

export default SupportPackController;