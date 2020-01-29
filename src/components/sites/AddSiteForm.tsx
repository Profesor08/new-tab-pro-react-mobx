import React, { useState } from "react";
import { observer } from "mobx-react";
import options from "./../../store/options";
import {
  Form,
  FormHeader,
  FormBody,
  FormFooter,
  FormButtonsGroup,
  FormButton,
  FormTextField,
} from "../../lib/form";
import sites, { ISite, ISiteProps } from "../../store/sites";

const useSite = (): [ISite, React.Dispatch<ISiteProps>] => {
  const [site, setSite] = useState({ name: "", url: "", image: "" } as ISite);

  const updateSite = (props: ISiteProps) => {
    setSite({
      ...site,
      ...props,
    });
  };

  return [site, updateSite];
};

export const AddSiteForm = observer(() => {
  const [site, setSite] = useSite();

  const clear = () => {
    setSite({ name: "", url: "", image: "" });
  };

  const close = () => {
    options.showAddSiteForm = false;
  };

  return (
    <Form
      active={options.showAddSiteForm}
      onSubmit={e => e.preventDefault()}
      closeAction={() => {
        close();
      }}
    >
      <FormHeader>Add Site</FormHeader>
      <FormBody>
        <FormTextField
          label="Site name"
          value={site.name}
          onChange={e => setSite({ name: e.target.value })}
        />
        <FormTextField
          label="Site url"
          value={site.url}
          onChange={e => setSite({ url: e.target.value })}
        />
        <FormTextField
          label="Image url or data:base64"
          value={site.image}
          onChange={e => setSite({ image: e.target.value })}
        />
      </FormBody>
      <FormFooter>
        <FormButtonsGroup>
          <FormButton
            success
            onClick={() => {
              sites.add(site);
              close();
              clear();
            }}
          >
            Add
          </FormButton>
          <FormButton warn onClick={() => clear()}>
            Undo
          </FormButton>
        </FormButtonsGroup>
      </FormFooter>
    </Form>
  );
});
