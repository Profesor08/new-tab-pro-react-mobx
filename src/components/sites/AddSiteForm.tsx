import React, { useState } from "react";
import { observer } from "mobx-react";
import options from "./../../store-mobx/options";
import { Form, ButtonsList, ButtonsListItem } from "../../lib/form";
import sites, { ISite, ISiteProps } from "../../store-mobx/sites";

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

  const title = "Add Site";

  const buttons: ButtonsListItem[] = [
    {
      text: "Add",
      type: "btn-success",
    },
    {
      text: "Clear",
      type: "btn-warning",
      onClick: event => {
        event.preventDefault();
        clear();
      },
    },
  ];

  const buttonsList = <ButtonsList buttons={buttons} />;

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    sites.add(site);
    close();
    clear();
  };

  const content = (
    <div>
      <input
        type="text"
        placeholder="Site name"
        value={site.name}
        onChange={e => setSite({ name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Site url"
        value={site.url}
        onChange={e => setSite({ url: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Image url or data:base64"
        value={site.image}
        onChange={e => setSite({ image: e.target.value })}
        required
      />
    </div>
  );

  const closeAction = () => {
    clear();
    close();
  };

  return (
    <Form
      title={title}
      buttons={buttonsList}
      content={content}
      closeAction={closeAction}
      onSubmit={onSubmit}
      show={options.showAddSiteForm}
    />
  );
});

export default AddSiteForm;
