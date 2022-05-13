import { Resource } from "./resource.interface";

export interface RequestTool {
    fullname: string;
    email: string;
    toolName: string;
    description: string;
    link: string;
    estimatedTime: string;
    integratesGender: boolean;
    isTestedOnline: boolean;
    targetScale: string;
    participants: string;
    methodsUsed: string;
    dataTypes: string;
    limitations: string;
    strenghts: string;
    thematicArea: number;
    importanceResearcher: {design: number, implementation: number, me: number};
    importanceTechnical: {design: number, implementation: number, me: number};
    importanceAcademia: {design: number, implementation: number, me: number};
    resources: Resource[];
}