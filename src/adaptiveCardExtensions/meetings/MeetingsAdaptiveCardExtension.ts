import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { ErrorCard } from './cardView/ErrorCard';
import { QuickView } from './quickView/QuickView';
import { MeetingsPropertyPane } from './MeetingsPropertyPane';

export interface IMeetingsAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
}

export interface IMeetingsAdaptiveCardExtensionState {
  description: string;
  cardToShow: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'Meetings_CARD_VIEW';
const CARD_VIEW_ERROR_ID: string = 'Meetings_CARD_VIEW_ERROR';

export const QUICK_VIEW_REGISTRY_ID: string = 'Meetings_QUICK_VIEW';

export default class MeetingsAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IMeetingsAdaptiveCardExtensionProps,
  IMeetingsAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: MeetingsPropertyPane | undefined;

  public onInit(): Promise<void> {


    //this.isVisible = this.properties.title?true:false

    //TOTALK: common data object to be shared across all the project eg in view
    this.state = {
      description: this.properties.description,
      cardToShow: this.properties.title?CARD_VIEW_REGISTRY_ID :CARD_VIEW_ERROR_ID
    };

     
    // ALL the cards need to be regiested here.. 
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.cardNavigator.register(CARD_VIEW_ERROR_ID, () => new ErrorCard());

    // ALL the views to be registered here....
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView());

    return Promise.resolve();
  }

  public get title(): string {
    return this.properties.title;
  }

  protected get iconProperty(): string {
    return this.properties.iconProperty || require('./assets/SharePointLogo.svg');
  }

  protected loadPropertyPaneResources(): Promise<void> {

    // lazy loading... only when needed 
    // for running everytime you can also do 

    //  this._deferredPropertyPane = new MeetingsPropertyPane();
    //  return Promise.resolve();

    return import(
      /* webpackChunkName: 'Meetings-property-pane'*/
      './MeetingsPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.MeetingsPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    //return CARD_VIEW_REGISTRY_ID;

    return this.state.cardToShow;
  }


  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
