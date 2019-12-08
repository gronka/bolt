import Ctx from "./Ctx.js"

import { Blanket } from "./styles/Blanket.js"
export Blanket


import { Dimensions } from "react-native"
export const WIDTH = Dimensions.get("window").width
export const HEIGHT = Dimensions.get("window").width


import { AddressObject } from "../lib/AddressObject.js"
import { EventObject } from "../lib/EventObject.js"
export const NewTacObj = new AddressObject(Ctx)
export const NewEventObj = new EventObject(Ctx)
export const ViewEventObj = new EventObject(Ctx)
export const EditEventObj = new EventObject(Ctx)


import { OneshotterTrafficController } from "../lib/RequestHandlers.js"
export const MapsacAutocompleteOneshotter = new OneshotterTrafficController(Ctx, "/mapsac/predictions")
export const MapsacLookupOneshotter = new OneshotterTrafficController(Ctx, "/mapsac/lookup.byPlaceId")

export const AddTacController = new OneshotterTrafficController(Ctx, "/tac/add")
export const GetTacsController = new OneshotterTrafficController(Ctx, "/tac/get.byUserUuid")

export const CreateEventController = new OneshotterTrafficController(Ctx, "/event/create")


//import { AgendaCacher } from "./lib/cache/AgendaCacher.js"
//import { CalendarCacher } from "./lib/cache/CalendarCacher.js"
import { ConvoCacher } from "./lib/cache/ConvoCacher.js"
import { ConvoSummaryCacher } from "./lib/cache/ConvoSummaryCacher.js"
import { ProfileCacher } from "./lib/cache/ProfileCacher.js"
//export const AgendaCache = new AgendaCacher(Ctx)
//export const CalendarCache = new CalendarCacher(Ctx)
export const ConvoCache = new ConvoCacher(Ctx)
export const ConvoSummaryCache = new ConvoSummaryCacher(Ctx)
export const ProfileCache = new ProfileCacher(Ctx)


import { MapDataCacher } from "./lib/cache/MapDataCacher.js"
export const EventMapData = new MapDataCacher(Ctx)
export const RestaurantMapData = new MapDataCacher(Ctx)
