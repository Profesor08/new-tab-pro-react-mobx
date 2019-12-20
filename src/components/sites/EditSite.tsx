import React, { useState } from "react";
import { reaction } from "mobx";
import { observer } from "mobx-react";
import { Form, ButtonsList, ButtonsListItem } from "../../lib/form";
import sites, { ISite } from "../../store-mobx/sites";
import editSite from "../../store-mobx/edit-site";

export const EditSite = observer(() => {
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

  const title = "Edit Site";

  const buttons: ButtonsListItem[] = [
    {
      text: "Update",
      type: "btn-success",
      onClick: event => {
        event.preventDefault();
        if (editSite.id !== null) {
          sites.update(editSite.id, {
            ...site,
          });

          editSite.active = false;
        }
      },
    },
    {
      text: "Undo",
      type: "btn-warning",
      onClick: event => {
        event.preventDefault();
        undo();
      },
    },
  ];

  const buttonsList = <ButtonsList buttons={buttons} />;

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const content = (
    <div>
      <input
        type="text"
        placeholder="Site name"
        value={site.name}
        onChange={e => {
          setSite({
            ...site,
            name: e.target.value,
          });
        }}
        required
      />
      <input
        type="text"
        placeholder="Site url"
        value={site.url}
        onChange={e => {
          setSite({
            ...site,
            url: e.target.value,
          });
        }}
        required
      />
      <input
        type="text"
        placeholder="Image url or data:base64"
        value={site.image}
        onChange={e => {
          setSite({
            ...site,
            image: e.target.value,
          });
        }}
        required
      />
    </div>
  );

  return (
    <Form
      title={title}
      buttons={buttonsList}
      content={content}
      closeAction={() => {
        editSite.active = false;
      }}
      onSubmit={onSubmit}
      show={editSite.active}
    />
  );
});

export default EditSite;
