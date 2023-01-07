import React from "react";
import styled, { createGlobalStyle } from "styled-components/macro";
import { MenuBar } from "./options-menu";
import { Weather } from "./weather-widget/Weather";
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
      <Weather />
      <BookmarksPanel />
    </React.Fragment>
  );
};
