import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'PeopleAdaptiveCardExtensionStrings';
import { IPeople, IPeopleAdaptiveCardExtensionProps, IPeopleAdaptiveCardExtensionState } from '../PeopleAdaptiveCardExtension';

export interface IQuickViewData {
  peoples:IPeople[];
}

export class QuickView extends BaseAdaptiveCardView<
  IPeopleAdaptiveCardExtensionProps,
  IPeopleAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {

    console.log(this.state.peoples)
    
    return {
      peoples:this.state.peoples
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
}