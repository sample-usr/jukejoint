import {JsonObject, JsonProperty} from "json2typescript";

@JsonObject('YoutubeDTO')
export default class YoutubeResponse {
  @JsonProperty('thumbnail_url', String, true) thumbnailURL:string = undefined;
  @JsonProperty('title', String) title:string = undefined;
}