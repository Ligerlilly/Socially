/// <reference path='../../typings/angular2-meteor.d.ts' />
/// <reference path='../../typings/meteor-accounts.d.ts' />


import {FORM_DIRECTIVES, Component, View,  FormBuilder, Control, ControlGroup, Validators} from 'angular2/angular2';
import {RouteParams, RouterLink} from 'angular2/router';
import {Parties} from 'collections/parties';


@Component({
  selector: 'party-details'
})

@View({
  templateUrl: '/client/party-details/party-details.html',
  directives: [RouterLink, FORM_DIRECTIVES]
})


export class PartyDetails {
  party: Party;
    constructor(params: RouteParams) {
        var partyId = params.get('partyId');
        this.party = Parties.findOne(partyId);
    }

    saveParty(party) {
      if (Meteor.userId() === party.user_id) {
        Parties.update(party._id, {
          $set: {
            name: party.name,
            description: party.description,
            location: party.location
          }
      });
      }
      else {
        alert('You must be logged in and party creator in order to edit');
      }
      
    }
}
