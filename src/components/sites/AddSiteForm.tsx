import React, { useCallback, useState } from "react";
import {
  Form,
  FormHeader,
  FormBody,
  FormFooter,
  FormButtonsGroup,
  FormButton,
  FormTextField,
} from "../../lib/form";
import { useControls } from "../../store/options";
import { useSites } from "./store";

export const AddSiteForm = () => {
  const showAddSiteForm = useControls((state) => state.addSite);
  const closeAddSite = useControls((state) => state.closeAddSite);
  const [site, setSite] = useState<ISite>({ name: "", url: "", image: "" });
  const addSite = useSites((state) => state.add);

  const clear = useCallback(() => {
    setSite({ name: "", url: "", image: "" });
  }, [setSite]);

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

  const onFormSubmit = useCallback((event: React.FormEvent) => {
    event.preventDefault();
  }, []);

  const onAddClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      addSite(site);
      closeAddSite();
      clear();
    },
    [addSite, clear, closeAddSite, site],
  );

  return (
    <Form
      active={showAddSiteForm === true}
      onSubmit={onFormSubmit}
      closeAction={closeAddSite}
    >
      <FormHeader>Add Site</FormHeader>
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
          <FormButton success onClick={onAddClick}>
            Add
          </FormButton>
          <FormButton warn onClick={clear}>
            Undo
          </FormButton>
        </FormButtonsGroup>
      </FormFooter>
    </Form>
  );
};
