import React from "react";
import { DiscussionEmbed } from "disqus-react";

export const Comment = ({ url, id, title }) => {
  return (
    <DiscussionEmbed
      shortname="example"
      config={{
        url: url,
        identifier: id,
        title: title,
        language: "en-US", //e.g. for Traditional Chinese (Taiwan)
      }}
    />
  );
};
