import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import bookmarksStore from "../../store/bookmarks/store";
import {
  Form,
  FormHeader,
  FormBody,
  FormTextField,
  FormFooter,
  FormButtonsGroup,
  FormButton,
} from "../../lib/form";

export const BookmarkEditor = observer(() => {
  const bookmark = bookmarksStore.editingBookmark;
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const close = () => {
    bookmarksStore.editingBookmark = null;
  };

  useEffect(() => {
    setActive(bookmark !== null);

    if (bookmark) {
      setTitle(bookmark.title);
      setUrl(bookmark.url || "");
    }
  }, [bookmark]);

  return (
    <Form
      active={active}
      closeAction={() => {
        close();
      }}
      onSubmit={e => {
        e.preventDefault();

        if (bookmark) {
          bookmarksStore.updateBookmark(bookmark.id, {
            title,
            url,
          });
        }

        close();
      }}
    >
      <FormHeader>Edit Bookmark</FormHeader>
      <FormBody>
        <FormTextField
          label="Bookmark title"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
        />
        <FormTextField
          label="Bookmark url"
          value={url}
          onChange={e => {
            setUrl(e.target.value);
          }}
        />
      </FormBody>
      <FormFooter>
        <FormButtonsGroup>
          <FormButton success>Update</FormButton>
          <FormButton
            warn
            onClick={event => {
              event.preventDefault();
              close();
            }}
          >
            Cancel
          </FormButton>
        </FormButtonsGroup>
      </FormFooter>
    </Form>
  );
});
