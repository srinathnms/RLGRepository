import { IDocument } from './document';
import { IDashboardMenu } from './dashboard';
import { IFinance } from './finance';
import { IGlossary } from './glossary';
import { IFaq } from './faq';
import { MenuContentTypes } from './enum/menuContentTypes';

export interface IModalDialog {
    header: string;
    content: IDashboardMenu[] | IDocument | IDocument[] | IFinance[] | IGlossary[] | IFaq[];
    footer: string;
    menuContentType: MenuContentTypes;
    menuId?: number;
}
