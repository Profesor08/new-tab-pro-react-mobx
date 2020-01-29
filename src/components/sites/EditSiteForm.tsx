import React, { useState } from "react";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import {
  Form,
  FormButtonsGroup,
  FormButton,
  FormHeader,
  FormBody,
  FormFooter,
  FormTextField,
} from "../../lib/form";
import sites, { ISite } from "../../store/sites";
import editSite from "../../store/edit-site";

export const EditSiteForm = observer(() => {
  const [site, setSite]: [ISite, React.Dispatch<ISite>] = useState({
    name: "",
    url: "",
    image: "",
  });

  reaction(
    () => editSite.id,
    id => {
      const site = sites.get(id);

      if (site) {
        setSite(site);
      }
    },
  );

  const undo = () => {
    const site = sites.get(editSite.id);

    if (site) {
      setSite(site);
    }
  };

  return (
    <Form
      active={editSite.active}
      closeAction={() => {
        editSite.active = false;
      }}
      onSubmit={e => e.preventDefault()}
    >
      <FormHeader>Edit Site</FormHeader>
      <FormBody>
        <FormTextField
          label="Site name"
          value={site.name}
          onChange={e => {
            setSite({
              ...site,
              name: e.target.value,
            });
          }}
        />
        <FormTextField
          label="Site url"
          value={site.url}
          onChange={e => {
            setSite({
              ...site,
              url: e.target.value,
            });
          }}
        />
        <FormTextField
          label="Image url or data:base64"
          value={site.image}
          onChange={e => {
            setSite({
              ...site,
              image: e.target.value,
            });
          }}
        />
      </FormBody>
      <FormFooter>
        <FormButtonsGroup>
          <FormButton
            success
            onClick={event => {
              event.preventDefault();
              if (editSite.id !== null) {
                sites.update(editSite.id, {
                  ...site,
                });

                editSite.active = false;
              }
            }}
          >
            Update
          </FormButton>
          <FormButton warn onClick={() => undo()}>
            Undo
          </FormButton>
        </FormButtonsGroup>
      </FormFooter>
    </Form>
  );
});
