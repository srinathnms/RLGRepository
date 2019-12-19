import { IBackgroundImage } from './backgroundImage';

export interface IDashboardMenu {
    Id: number;
    MenuName: string;
    ParentId: number;
    Attachments: boolean;
    ImageSource: string;
    Contents?: string;
    DocumentUrls?: string[];
    MenuContentType?: string;
    BackgroundImage?: IBackgroundImage;
    Flip?: string;
}
