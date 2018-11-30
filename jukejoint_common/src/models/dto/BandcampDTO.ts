import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('BandcampDTO')
export default class BandcampDTO {
  @JsonProperty('title', String) title:string = undefined;
  @JsonProperty('album', String) album:string = undefined;
  @JsonProperty('artist', String) artist:string = undefined;
  @JsonProperty('image', String) image:string = undefined;
  @JsonProperty('url', String) url:string = undefined;
}