import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { MenuBar, OptionsPanel } from "./options-menu";
import { WeatherWidget } from "./weather-widget/Weather";
import { CurrencyConverter } from "./currency-converter/CurrencyConverter";
import { VoiceSearch } from "./voice-search/VoiceSearch";
import { Background } from "./background/Background";
import { Sites } from "./sites/Sites";
import { BookmarksPanel } from "./bookmarks-panel/BookmarksPanel";

const GlobalStyle = createGlobalStyle`
  body {
    background: #1e1e1e;
    font-family: Roboto, sans-serif;
    font-size: 16px;

    * {
      box-sizing: border-box;
      outline: none;
    }
  }
`;

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* overflow-y: auto; */
  overflow: hidden;
`;

const MainLayout = styled.div`
  display: flex;
`;

const Sidebar = styled.div`
  width: 340px;
  flex: 0 0 340px;
  padding: 0 15px;
`;

const SidebarRight = styled(Sidebar)`
  @media (max-width: 1600px) {
    width: auto;
    flex: 1 1 auto;
    max-width: 340px;
  }
`;

const MainContainer = styled.div`
  flex: 1 1 auto;
  padding: 0 15px;
  position: relative;
`;

export const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Background />
      <AppContainer>
        <MainLayout>
          <Sidebar>
            <CurrencyConverter />
          </Sidebar>
          <MainContainer>
            <VoiceSearch />
            <Sites />
          </MainContainer>
          <SidebarRight />
        </MainLayout>
      </AppContainer>
      <MenuBar />
      <OptionsPanel />
      <WeatherWidget />
      <BookmarksPanel />
    </React.Fragment>
  );
};

/*
import React, { Component } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import "./scss/App.scss";
import VoiceSearch from "./components/VoiceSearch/VoiceSearch";
import Menu from "./components/options-menu/MenuBar";
import Sites from "./components/sites/Sites";
import Background from "./components/background/Background";
import AddSiteForm from "./components/sites/AddSiteForm";
import { CurrencyConverter } from "./components/currency-converter/CurrencyConverter";
import Bookmarks from "./components/bookmarks";
import {
  toggleOptionsPanel,
  OptionsAppInitialState,
} from "./store/reducers/optionsApp";
import { OptionsPanel } from "./components/options-menu/OptionsPanel";
import { WeatherWidget } from "./components/weather-widget/Weather";

interface OptionsAppState {
  optionsApp: OptionsAppInitialState;
}

interface AppStateProps {
  optionsPanelShow: boolean;
}

interface AppDispatchProps {
  toggleOptionsPanel: (isActive: boolean) => void;
}

type Props = AppStateProps & AppDispatchProps;

class App extends Component<Props> {
  closeOptionsPanel = () => {};

  render() {
    return (
      <div className="App">
        <Background />
        <div className="main-layout">
          <div className="sidebar-left">
            <CurrencyConverter />
          </div>
          <div className="main-container">
            <VoiceSearch />
            <Sites />
          </div>
          <div className="sidebar-right" />
        </div>
        <Menu />
        <AddSiteForm />
        <WeatherWidget />
        <Bookmarks />
        <OptionsPanel />
      </div>
    );
  }
}

const mapStateToProps = (state: OptionsAppState): AppStateProps => {
  return {
    optionsPanelShow: state.optionsApp.optionsPanelShow,
  };
};

const mapDispatchProps = (dispatch: Dispatch): AppDispatchProps => {
  return {
    toggleOptionsPanel: (isActive: boolean) => {
      dispatch(toggleOptionsPanel(isActive));
    },
  };
};

export default connect(mapStateToProps, mapDispatchProps)(App);
*/
