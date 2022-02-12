import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { TripPropertyPane } from './TripPropertyPane';

export interface ITripAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
}

export interface ITripAdaptiveCardExtensionState {
  description: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'Trip_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'Trip_QUICK_VIEW';

export default class TripAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  ITripAdaptiveCardExtensionProps,
  ITripAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: TripPropertyPane | undefined;

  public onInit(): Promise<void> {
    this.state = {
      description: this.properties.description
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
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
    return import(
      /* webpackChunkName: 'Trip-property-pane'*/
      './TripPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.TripPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
