import React, { useCallback } from "react";
import { useControls, useOptions } from "./../../store/options";
import { EditSiteForm } from "./EditSiteForm";
import styled from "styled-components/macro";
import { theme } from "../../theme/theme-default";
import { AddSiteForm } from "./AddSiteForm";
import { AnimationPanel } from "../animation-panel/AnimationPanel";
import { useSiteEditor, useSites } from "./store";

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

const SiteImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  height: 70%;
  object-fit: contain;
  object-position: center center;
  transform: scale(1, 1) translate(-50%, -50%);
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

const Site = styled<
  Styled<{
    site: ISite;
    index: number;
    onEdit: (index: number) => void;
    onRemove: (index: number) => void;
  }>
>(({ site, index, onEdit, onRemove }) => {
  const additionalOptions = useOptions((state) => state.controls);

  const onEditClick = useCallback(() => {
    onEdit(index);
  }, [index, onEdit]);

  const onRemoveClick = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  return (
    <SiteItem>
      <SiteHeader>
        <SiteName>{site.name}</SiteName>
        <EditSiteButton active={additionalOptions} onClick={onEditClick} />
        <RemoveSiteButton active={additionalOptions} onClick={onRemoveClick} />
      </SiteHeader>
      <SiteLink href={site.url}>
        <SiteImage src={site.image} />
      </SiteLink>
    </SiteItem>
  );
})``;

export const Sites = () => {
  const showWebSites = useOptions((state) => state.sites);
  const additionalOptions = useOptions((state) => state.controls);
  const openAddSite = useControls((state) => state.openAddSite);
  const sites = useSites((state) => state.sites);
  const remove = useSites((state) => state.remove);
  const setIndex = useSiteEditor((state) => state.setIndex);
  const setActive = useSiteEditor((state) => state.setActive);

  const onEdit = useCallback(
    (index: number) => {
      setIndex(index);
      setActive(true);
    },
    [setActive, setIndex],
  );

  if (showWebSites === false) {
    return null;
  }

  return (
    <React.Fragment>
      <SitesList>
        {sites.map((site, index) => (
          <Site
            key={`site-item-${index}`}
            site={site}
            index={index}
            onEdit={onEdit}
            onRemove={remove}
          />
        ))}
        {additionalOptions === true && (
          <SiteIconItem onClick={openAddSite}>
            <SiteIcon viewBox="0 0 301 301">
              <path d="M112.5.5h76c9,0,12,5,12,12v88h88c7.45,0,12,4.49,12,12v76c0,7.38-4.48,12-12,12h-88v88c0,8-5.5,12-16,12h-76c-7.62,0-8-5.75-8-12v-88h-88c-7.54,0-12-4-12-12v-76c0-7.73,5.23-12,12-12h88v-88C100.5,4.69,103.78.5,112.5.5Z" />
            </SiteIcon>
          </SiteIconItem>
        )}
      </SitesList>
      <EditSiteForm />
      <AddSiteForm />
    </React.Fragment>
  );
};
