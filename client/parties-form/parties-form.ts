/// <reference path="../../typings/angular2-meteor.d.ts" />

/// <reference path="../../typings/meteor-accounts.d.ts" />

import {Component, View} from 'angular2/angular2';

import {FORM_DIRECTIVES, FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';

import {Parties} from 'collections/parties';
import {RouterLink} from 'angular2/router';


import {InjectUser} from 'meteor-accounts';
import {Service} from 'client/services/service';


@Component({
    selector: 'parties-form',
})

@View({
    template: `
    <form [ng-form-model]="partiesForm" #f="form" (submit)="addParty(f.value)">
    <div class='form-group'>
        <label>Name</label>
        <input type="text" ng-control="name" class='form-control'>
    </div>
    <div class='form-group'>
        <label>Description</label>
        <input type="text" ng-control="description" class='form-control'>
    </div>
    <div class='form-group'>
        <label>Location</label>
        <input type="text" ng-control="location" class='form-control'>
    </div>
    <label>Public</label>
    <button class='btn btn-success'>Save</button>
    <button [router-link]="['/PartiesList']" (click)='hideForm()' class='btn btn-danger'>cancel</button>
    </form>
    `,
    directives: [FORM_DIRECTIVES, RouterLink]
})
@InjectUser()
export class PartiesForm {
    partiesForm: ControlGroup;
    constructor(public service: Service) {
        var fb = new FormBuilder();
        this.partiesForm = fb.group({
            name: ['', Validators.required],
            description: [''],
            location: ['', Validators.required],
            public: [false]
        });
        
    }
    hideForm() {
      this.service.someProp = false;
      this.service.hideButton = false;
    }

    addParty(party) {
        if (this.partiesForm.valid) {
            if (Meteor.userId()) {
                Parties.insert({
                    name: party.name,
                    description: party.description,
                    location: party.location,
                    user_id: Meteor.userId()
                });

                (<Control>this.partiesForm.controls['name']).updateValue('');
                (<Control>this.partiesForm.controls['description']).updateValue('');
                (<Control>this.partiesForm.controls['location']).updateValue('');
                this.service.someProp = false;
                this.service.hideButton = false;
            } else {
                alert('Please log in to add a party');
            }
        } 
        else {
          alert('Please fully fill out form before submitting');
        }
    }
}