import React from 'react';

// Utils
// Constants
// Actions
// Models
// Interfaces
import { IPlayer } from '@jukejoint/common/lib/interfaces';
// Components
// Styles

export type AppContextType = {
  player:IPlayer | undefined;
  loading:boolean;
  setLoading: (laoding:boolean) => void;
};

const defaultPlayerContext:IPlayer = {
  isPlaying: false,
  volume: 0,
  currentSong: undefined,
  queue: [],
};

const ctxt = React.createContext<AppContextType>({
  player: defaultPlayerContext,
  loading: false,
  setLoading: () => {}
});

export const AppContextProvider = ctxt.Provider;
export const AppContextConsumer = ctxt.Consumer;

// Generic HOC for context API
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export function withAppContext<
P extends { appContext?: AppContextType },
R = Omit<P, 'appContext'>
>(
  Component:any
): React.SFC<R> {
  return function BoundComponent(props: R) {
    return (
      <AppContextConsumer>
        {(value) => <Component {...props} appContext={value} />}
      </AppContextConsumer>
    );
  };
}

export type AppContextProp = {
  appContext:AppContextType;
};