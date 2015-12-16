/// <reference path="../../typings/angular2-meteor.d.ts" />
/// <reference path="../../typings/meteor-accounts-ui.d.ts" />

import {Component, View, NgFor, NgIf} from 'angular2/angular2';

import {Parties} from 'collections/parties';
import {AccountsUI} from 'meteor-accounts-ui';

import {PartiesForm} from 'client/parties-form/parties-form';
import {RouterLink} from 'angular2/router';
import {Service} from 'client/services/service';


@Component({
    selector: 'app'
})
@View({
    templateUrl: 'client/parties-list/parties-list.html',
    directives: [NgFor, PartiesForm, RouterLink, NgIf, AccountsUI]
})



export class PartiesList {
    parties: Mongo.Cursor<Party>;

    constructor(public service: Service) {
        this.parties = Parties.find();
    }

    removeParty(party) {
        if (Meteor.userId() === "jMN69S8aBcyXz5FjY") {
          Parties.remove(party._id);
        }
        else {
          alert('You are not authorized to do that')
        }

    }
    addForm() {
        this.service.someProp = true;
        this.service.hideButton = true;
       
    }
}
