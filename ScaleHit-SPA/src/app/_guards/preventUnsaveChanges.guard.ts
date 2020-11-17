import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';

@Injectable()
export class preventUnsavedChanges implements CanDeactivate<ProfileComponent> {
    canDeactivate(component: ProfileComponent) {
        if(component.editForm.dirty) {
            return confirm('changes will not saved');
        }
        return true;
    }
}