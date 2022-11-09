import React from "react";
import { Helmet } from "react-helmet";

type seoProps = {
  title: string;
  description: string;
};
export const Seo = ({ title, description }: seoProps) => {
  return (
    <Helmet>
      <title>{title}</title>‍
      <meta name="description" content={description} />
    </Helmet>
  );
};
