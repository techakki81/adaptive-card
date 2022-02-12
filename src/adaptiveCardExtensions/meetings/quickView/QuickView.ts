import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MeetingsAdaptiveCardExtensionStrings';
import { IMeetingsAdaptiveCardExtensionProps, IMeetingsAdaptiveCardExtensionState } from '../MeetingsAdaptiveCardExtension';

export interface IQuickViewData {
  subTitle: string;
  title: string;
  description: string;
  person:any
}

export class QuickView extends BaseAdaptiveCardView<
  IMeetingsAdaptiveCardExtensionProps,
  IMeetingsAdaptiveCardExtensionState,
  IQuickViewData
> {
  public get data(): IQuickViewData {

    //TOTALK: make a call to person api and show the name 
    const person:any ={
      firstname:"akki"
    }
    

    return {
      subTitle: strings.SubTitle,
      title: strings.Title,
      description: this.properties.description,
      person:person
    };
  }

  public get template(): ISPFxAdaptiveCard {

    const adaptivTemplate: ISPFxAdaptiveCard =  require('./template/QuickViewTemplate.json');
    
    // ver 1
    // console.log( adaptivTemplate )
    // adaptivTemplate.body[1].text =" this is from code. Suranme is koul"

    //ver 2
    // let textBox = adaptivTemplate.body.filter( ctrl => ctrl.id === "personIdentifier")[0]
    // textBox.text =" This is via ID : Akshay Koul"

    return adaptivTemplate
  }
}