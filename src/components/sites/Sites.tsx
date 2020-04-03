import React from "react";
import { observer } from "mobx-react";
import options from "./../../store/options";
import sites from "../../store/sites";
import editSite from "../../store/edit-site";
import { EditSiteForm } from "./EditSiteForm";
import styled from "styled-components/macro";
import { theme } from "../../theme/theme-default";
import { AddSiteForm } from "./AddSiteForm";
import { AnimationPanel } from "../animation-panel/AnimationPanel";

const SitesList = styled(AnimationPanel)`
  position: relative;
  z-index: 30;
  display: grid;
  grid-gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: repeat(5, 1fr);
  margin: 100px auto 100px auto;
  max-width: 1000px;

  @media (max-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SiteName = styled.div`
  text-indent: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  color: ${theme.siteNameColor};
  transition: ease color ${theme.animationSpeed};
  font-size: 14px;
`;

const SiteLink = styled.a`
  display: block;
  padding-top: 53%;
  flex: 1 0 100%;
  width: 100%;
  position: relative;
`;

interface ISiteImageProps {
  src?: string;
}

const SiteImage = styled.div<ISiteImageProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  height: 70%;
  transform: scale(1, 1) translate(-50%, -50%);
  background: no-repeat center center;
  background-image: url(${(p) => p.src});
  background-size: contain;
  transform-origin: 0 0;
  transition: ease transform ${theme.animationSpeed};
`;

const SiteIcon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 50%;
  width: auto;
  fill: ${theme.siteAddButtonIconColor};
  opacity: 0.6;
  transition: ease opacity ${theme.animationSpeed},
    ease fill ${theme.animationSpeed}, ease transform ${theme.animationSpeed};
`;

interface ISiteButtonProps {
  size: number;
}

interface ISiteButtonProps {
  active?: boolean;
}

const SiteButton = styled.div<ISiteButtonProps>`
  width: 16px;
  height: 16px;
  line-height: 1;
  font-size: ${(p) => p.size}px;
  color: grey;
  transition: ease color ${theme.animationSpeed};
  display: ${(p) => (p.active ? "flex" : "none")};
  align-items: center;
  justify-content: center;
`;

const EditSiteButton = styled(SiteButton).attrs({
  size: 14,
})`
  &:before {
    content: "✎";
  }

  &:hover {
    color: green;
  }
`;

const RemoveSiteButton = styled(SiteButton).attrs({
  size: 20,
})`
  &:before {
    content: "×";
  }

  &:hover {
    color: red;
  }
`;

const SiteHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 16px 16px;
  align-items: center;
  grid-gap: 5px;
  background: rgba(0, 0, 0, 0.15);

  ${SiteName} {
    flex: 1;
  }
`;

const SiteItem = styled.div`
  display: grid;
  grid-template-rows: 22px 1fr;
  background-color: ${theme.siteBackgroundColor};
  border: 2px solid ${theme.siteBorderColor};
  border-radius: 5px;
  min-width: 0;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  transition: ease background-color ${theme.animationSpeed},
    ease border-color ${theme.animationSpeed},
    ease transform ${theme.animationSpeed};
  transform: translateZ(0);

  &:hover {
    cursor: pointer;
    background-color: ${theme.siteHoverBackgroundColor};
    border-color: ${theme.siteHoverBorderColor};
    transform: perspective(900px) translateZ(30px);

    ${SiteName} {
      color: ${theme.siteHoverNameColor};
    }
  }

  &:active {
    background-color: ${theme.siteActiveBackgroundColor};
    border-color: ${theme.siteActiveBorderColor};

    ${SiteName} {
      color: ${theme.siteActiveNameColor};
    }
  }
`;

const SiteIconItem = styled(SiteItem)`
  padding-top: calc(53% + 22.8px);

  &:hover {
    ${SiteIcon} {
      opacity: 0.9;
      transform: translate(-50%, -50%) scale(1.1);
    }
  }
`;

export const Sites = observer(() => {
  if (options.showWebSites === false) {
    return null;
  }

  return (
    <React.Fragment>
      <SitesList>
        {sites.sites.map((site, id) => (
          <SiteItem key={`site-item-${id}`}>
            <SiteHeader>
              <SiteName>{site.name}</SiteName>
              <EditSiteButton
                active={options.additionalOptions}
                onClick={() => {
                  editSite.id = id;
                  editSite.active = true;
                }}
              />
              <RemoveSiteButton
                active={options.additionalOptions}
                onClick={() => {
                  sites.remove(id);
                }}
              />
            </SiteHeader>
            <SiteLink href={site.url}>
              <SiteImage src={site.image} />
            </SiteLink>
          </SiteItem>
        ))}
        <SiteIconItem
          onClick={() => {
            options.showAddSiteForm = true;
          }}
        >
          <SiteIcon viewBox="0 0 301 301">
            <path d="M112.5.5h76c9,0,12,5,12,12v88h88c7.45,0,12,4.49,12,12v76c0,7.38-4.48,12-12,12h-88v88c0,8-5.5,12-16,12h-76c-7.62,0-8-5.75-8-12v-88h-88c-7.54,0-12-4-12-12v-76c0-7.73,5.23-12,12-12h88v-88C100.5,4.69,103.78.5,112.5.5Z" />
          </SiteIcon>
        </SiteIconItem>
      </SitesList>
      <EditSiteForm />
      <AddSiteForm />
    </React.Fragment>
  );
});
