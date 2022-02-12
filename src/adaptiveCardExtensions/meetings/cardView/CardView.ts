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

export class CardView extends BasePrimaryTextCardView<IMeetingsAdaptiveCardExtensionProps, IMeetingsAdaptiveCardExtensionState> {

  //TOTALK: Limitation of number of card buttons...only two possible 
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
     
    
    return [
      {
        title: strings.QuickViewButton,
        action: {
          // TOTALK: again connect team is divergin here... whole point of adaptive card was to use only one 
          // guidleine
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_REGISTRY_ID
          }
        }
      },{
        title: "Google",
        action: {
          // TOTALK: again connect team is divergin here... whole point of adaptive card was to use only one 
          // guidleine
          type: 'ExternalLink',
          parameters: {
            target: 'https://www.google.com'
          }
        }
      },
      

      // ,

      // {
      //   id: "btnCustomAction",
      //   title: "Invoke Custom",
      //   action:<any> {
      //     type: "Submit",
      //     data: {
      //       text:"this is Title"
      //     }
      //   }
      // }

    // TOTALK: After explaining OnCardSelection 

    
    //  }    
    ];
  }

  public get data(): IPrimaryTextCardParameters {

    
    return {
      primaryText: strings.PrimaryText,
      description: this.properties.description
    };
  }

  public onAction(action: IActionArguments): void {
      console.log(action)
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    // TOTALK: you can open a VIEW or External link.. you can make a call to any existing code and return something back..
   
    // return {
    //   type:"QuickView",
    //   parameters:{
    //      view:QUICK_VIEW_REGISTRY_ID
    //   }
    // }

    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing2.com'
      }
    };

   
  }
}
