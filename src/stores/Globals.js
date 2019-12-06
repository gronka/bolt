import { AddressObject } from "../lib/AddressObject.js"
import { EventObject } from "../lib/EventObject.js"
import { OneshotterTrafficController } from "../lib/RequestHandlers.js"


export const NewTacObj = new AddressObject()

export const NewEventObj = new EventObject()
export const ViewEventObj = new EventObject()
export const EditEventObj = new EventObject()

export const MapsacAutocompleteOneshotter = new OneshotterTrafficController("/mapsac/predictions")
export const MapsacLookupOneshotter = new OneshotterTrafficController("/mapsac/lookup.byPlaceId")

export const AddTacController = new OneshotterTrafficController("/tac/add")
export const GetTacsController = new OneshotterTrafficController("/tac/get.byUserUuid")

export const CreateEventController = new OneshotterTrafficController("/event/create")
