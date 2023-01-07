import React, { useState, useEffect } from "react";
import {
  Form,
  FormHeader,
  FormBody,
  FormTextField,
  FormFooter,
  FormButtonsGroup,
  FormButton,
} from "../../lib/form";
import {
  updateBookmark,
  useEditingBookmarkStore,
} from "../../store/bookmarks/store";

export const BookmarkEditor = () => {
  const bookmark = useEditingBookmarkStore((state) => state.bookmark);
  const setBookmark = useEditingBookmarkStore((state) => state.setBookmark);
  const [active, setActive] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const close = () => {
    setBookmark(null);
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
      onSubmit={(e) => {
        e.preventDefault();

        if (bookmark !== null) {
          updateBookmark(bookmark.id, {
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
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <FormTextField
          label="Bookmark url"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
      </FormBody>
      <FormFooter>
        <FormButtonsGroup>
          <FormButton success>Update</FormButton>
          <FormButton
            warn
            onClick={(event) => {
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
};
