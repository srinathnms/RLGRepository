import { IBackgroundImage } from "./backgroundImage";

export interface IHome {
    ID: number;
    Image: IBackgroundImage;
    Title: string;
    SubTitle: string;
    FooterText: string;
    IsAccountsDescriptionPage:boolean;
}
