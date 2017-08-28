export class Source {
  src: string;
  type: string;
}

export default class MediaPlayer {
  autoplay: true;
  controls: true;
  poster: string;
  sources: Source[]
}

export class Country {
  name: string;
  iso2: string;
  dialCode: number;
  priority: string;
  areaCodes: string[];
}
