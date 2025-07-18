import type { IModelVendor } from '../IModelVendor';
import type { OpenAIAccessSchema } from '../../server/openai/openai.router';

import { ModelVendorOpenAI } from '../openai/openai.vendor';


export interface DDeepseekServiceSettings {
  deepseekKey: string;
}

export const ModelVendorDeepseek: IModelVendor<DDeepseekServiceSettings, OpenAIAccessSchema> = {
  id: 'deepseek',
  name: 'Deepseek',
  displayRank: 16,
  location: 'cloud',
  instanceLimit: 1,
  hasServerConfigKey: 'hasLlmDeepseek',

  // functions
  initializeSetup: () => ({
    deepseekKey: '',
  }),
  validateSetup: (setup) => {
    return setup.deepseekKey?.length >= 35;
  },
  getTransportAccess: (partialSetup) => ({
    dialect: 'deepseek',
    oaiKey: partialSetup?.deepseekKey || '',
    oaiOrg: '',
    oaiHost: '',
    heliKey: '',
    moderationCheck: false,
  }),

  // OpenAI transport ('Deepseek' dialect in 'access')
  rpcUpdateModelsOrThrow: ModelVendorOpenAI.rpcUpdateModelsOrThrow,

};
