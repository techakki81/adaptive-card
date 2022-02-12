import {
  BasePrimaryTextCardView,
  IPrimaryTextCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton,
  ICardAction,
  IActionArguments
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'MeetingsAdaptiveCardExtensionStrings';
import { IMeetingsAdaptiveCardExtensionProps, IMeetingsAdaptiveCardExtensionState, QUICK_VIEW_REGISTRY_ID } from '../MeetingsAdaptiveCardExtension';

export class ErrorCard extends BasePrimaryTextCardView<IMeetingsAdaptiveCardExtensionProps, IMeetingsAdaptiveCardExtensionState> {

  //TOTALK: Limitation of number of card buttons...only two possible 
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {    
    
    return undefined
  }

  public get data(): IPrimaryTextCardParameters {

    
    return {
      primaryText: "ERROR",
      description: "Please set the Tile in the properties of the card"
    };
  }

  

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return undefined
  
    };

   
  }

