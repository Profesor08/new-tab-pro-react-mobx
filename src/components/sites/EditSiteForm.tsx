import React, { useCallback, useEffect, useState } from "react";
import {
  Form,
  FormButtonsGroup,
  FormButton,
  FormHeader,
  FormBody,
  FormFooter,
  FormTextField,
} from "../../lib/form";
import { useSiteEditor, useSites } from "./store";

export const EditSiteForm = () => {
  const [site, setSite] = useState<ISite>({ name: "", url: "", image: "" });
  const getSite = useSites((state) => state.get);
  const update = useSites((state) => state.update);
  const index = useSiteEditor((state) => state.index);
  const setIndex = useSiteEditor((state) => state.setIndex);
  const active = useSiteEditor((state) => state.active);
  const setActive = useSiteEditor((state) => state.setActive);

  const onSiteNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSite((state) => ({ ...state, name: event.target.value }));
    },
    [],
  );

  const onSiteUrlChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSite((state) => ({ ...state, url: event.target.value }));
    },
    [],
  );

  const onSiteImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSite((state) => ({ ...state, image: event.target.value }));
    },
    [],
  );

  const undo = useCallback(() => {
    if (index !== null) {
      const site = getSite(index);

      if (site !== undefined) {
        setSite({ ...site });
      }
    }
  }, [getSite, index]);

  const onClose = useCallback(() => {
    setActive(false);
    undo();
  }, [setActive, undo]);

  const onFormSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
  }, []);

  const onUpdateClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      if (index !== null) {
        update(index, { ...site });
      }
      setIndex(null);
      setActive(false);
    },
    [index, setActive, setIndex, site, update],
  );

  useEffect(() => {
    undo();
  }, [index, undo]);

  return (
    <Form
      active={active === true}
      closeAction={onClose}
      onSubmit={onFormSubmit}
    >
      <FormHeader>Edit Site</FormHeader>
      <FormBody>
        <FormTextField
          label="Site name"
          value={site.name}
          onChange={onSiteNameChange}
        />
        <FormTextField
          label="Site url"
          value={site.url}
          onChange={onSiteUrlChange}
        />
        <FormTextField
          label="Image url or data:base64"
          value={site.image}
          onChange={onSiteImageChange}
        />
      </FormBody>
      <FormFooter>
        <FormButtonsGroup>
          <FormButton success onClick={onUpdateClick}>
            Update
          </FormButton>
          <FormButton warn onClick={undo}>
            Undo
          </FormButton>
        </FormButtonsGroup>
      </FormFooter>
    </Form>
  );
};
