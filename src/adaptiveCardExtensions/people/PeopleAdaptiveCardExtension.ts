import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { PeoplePropertyPane } from './PeoplePropertyPane';
import {HttpClient,HttpClientResponse} from '@microsoft/sp-http'

export interface IPeopleAdaptiveCardExtensionProps {
  title: string;
  description: string;
  iconProperty: string;
}

export interface IPeopleAdaptiveCardExtensionState {
  description: string;
  peoples?:IPeople[];
}

export interface IPeople{
  firstname:string;
  surname:string;
  jobTitle:string;
  mail:string;
  profileImage:string;
}


const CARD_VIEW_REGISTRY_ID: string = 'People_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'People_QUICK_VIEW';

export default class PeopleAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IPeopleAdaptiveCardExtensionProps,
  IPeopleAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: PeoplePropertyPane | undefined;

  public onInit(): Promise<void> {  

    let arrPpl: IPeople []
    this.state = {
      description: "Load Random users..."          
    };


    const call = async ()=> {
      const resp =  await this.context.httpClient.get("https://randomuser.me/api/?results=50", HttpClient.configurations.v1);
      const jsonObj:any =  await resp.json()     

      arrPpl = jsonObj.results.map( (r:any) => (
            {            
              firstname: r.name.first,
              surname:r.name.last,
              title:r.name.title,
              mail:r.email,
              profileImage:r.picture.thumbnail
            } 
      ))

     this.setState({
       ...this.state, 
       peoples:arrPpl
     })
     
    }

    call()

    
    // this.context.httpClient.get("https://randomuser.me/api/?results=50", HttpClient.configurations.v1)
    // .then((res: HttpClientResponse): Promise<any> => {
    //   return res.json();
    // })
    // .then((response: any): void => {
    //   console.log(response);
    // });
         
    // setTimeout(async () =>{

    //   const users = await this.context.httpClient.get("https://randomuser.me/api/?results=50",
    //   HttpClient.configurations.v1);

    //   console.log(`the user list`)
    //   console.log(users)
    // });


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
      /* webpackChunkName: 'People-property-pane'*/
      './PeoplePropertyPane'
    )
      .then(
      
        (component) => {
          this._deferredPropertyPane = new component.PeoplePropertyPane();
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
