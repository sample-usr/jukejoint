import { IPlayer } from '@jukejoint/common/lib/interfaces';

class Socket {
  // External Dependencies
  private socketUrl?: string;

  private ws?: WebSocket;
  private onOpenCallbacks:  Array<() => any> = [];
  private keepAliveInterval: any;
  public playerState: IPlayer|null = null;


  public setDependencies = (socketUrl: string) => {
    this.socketUrl = socketUrl;
  }

  public isOpen = () => !!this.ws && this.ws.readyState === this.ws.OPEN;
  public isConnecting = () => !!this.ws && this.ws.readyState === this.ws.CONNECTING;
  public isClosed = () => this.ws === undefined || this.ws.readyState === this.ws.CLOSED;

  private keepAliveMessage = () => {
    if (this.isOpen()) {
      this.ws!.send(JSON.stringify({}));
    }
  }

  public registerOnOpenCallback(callback: () => any) {
    this.onOpenCallbacks.push(callback);
  }

  public open = () => {
    if(!this.socketUrl) {
      console.error('cannot open socket connection to API without URL');
      return;
    }

    if (this.isOpen() || this.isConnecting()) {
      return;
    }

    this.ws = new WebSocket(this.socketUrl);

    this.ws.onopen = async () => {
      this.onOpenCallbacks.forEach((cb) => cb() );

      if (!this.keepAliveInterval) {
        this.keepAliveInterval = setInterval(this.keepAliveMessage, 5000);
      }

    };

    this.ws.onmessage = (e: any) => {

      const msg: IPlayer = JSON.parse(e.data);
      this.playerState = msg;
      console.log(msg);
    };

    this.ws.onerror = (e) => {
      if(this.keepAliveInterval) {
        clearInterval(this.keepAliveInterval);
      }
      delete this.keepAliveInterval;
      delete this.ws;
      this.reconnect();
    };

    this.ws.onclose = () => {
      if(this.keepAliveInterval) {
        clearInterval(this.keepAliveInterval);
      }
      delete this.keepAliveInterval;
      delete this.ws;
      this.reconnect();
    };
  }

  private reconnect = () => {
    if (this.isOpen()) {
      return;
    }

    setTimeout(this.open, 5000);
  }

  public close = () => {
    if (this.ws && this.isOpen()) {
      this.ws.close();
    }

    if (this.ws) {
      this.ws!.onopen = this.noop;
      this.ws!.onerror = this.noop;
      this.ws!.onmessage = this.noop;
      this.ws!.onclose = this.noop;
    }

    this.ws = undefined;
    if (!!this.keepAliveInterval) {
      clearInterval(this.keepAliveInterval);
    }
    this.keepAliveInterval = undefined;
  }

  private noop = () => null;
}

export default new Socket();