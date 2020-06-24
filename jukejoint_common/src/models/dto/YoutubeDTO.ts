import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('YoutubeDTO')
export default class YoutubeResponse {
  @JsonProperty('length_seconds', String) duration:number = -1;
  @JsonProperty('thumbnail_url', String, true) thumbnailURL:string = undefined;
  @JsonProperty('title', String) title:string = undefined;
}