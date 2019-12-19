import { AuthService } from './auth.service';

export class BaseService {
    formDigestValue: string;
    constructor(authService: AuthService) {
        this.formDigestValue = authService.currentUserValue && authService.currentUserValue.FormDigestValue;
    }
}
