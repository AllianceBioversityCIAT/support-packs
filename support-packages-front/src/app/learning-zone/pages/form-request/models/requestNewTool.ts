export class RequestNewTool {
  name: string = '';
  email: string = '';
  source: string = '';
  description: string = '';
  target_scale: string = '';
  integrates_gender: string = '';
  participants: string = '';
  methods: string = '';
  input_types: string = '';
  expected_outputs: string = '';
  human_resources: string = '';
  estimated_time: string = '';
  strengths: string = '';
  limitations: string = '';
  is_tested_online: string = '';
  key_references: string = '';
  category_id: string = '';
  A: ImportanceLevels = new ImportanceLevels();
  R: ImportanceLevels = new ImportanceLevels();
  TS: ImportanceLevels = new ImportanceLevels();
  resource: Resource[] = [new Resource()];
}

export class ImportanceLevels {
  design: string = '';
  implementation: string = '';
  monitoring: string = '';
}

export class Resource {
  name: string = '';
  source: string = '';
  type: { name: string } = { name: '' };
}
