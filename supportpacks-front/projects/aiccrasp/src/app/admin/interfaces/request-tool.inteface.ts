import { Resource } from "./resource.interface";

export interface RequestTool {
    fullname: string;
    email: string;
    toolName: string;
    link: string;
    description: string;
    estimated_time: string;
    integrates_gender: boolean;
    is_tested_online: boolean;
    target_scale: string;
    participants: string;
    methods: string;
    input_types: string;
    limitations: string;
    strengths: string;
    expected_outputs: string;
    human_resources: string;
    key_references: string;
    thematicArea: number;
    importanceResearcher: {design: string, implementation: string, me: string};
    importanceTechnical: {design: string, implementation: string, me: string};
    importanceAcademia: {design: string, implementation: string, me: string};
    resources: Resource[];
}