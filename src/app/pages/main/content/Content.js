import React from 'react'; // useState
import { withRouter } from "react-router-dom";

import { PageContent } from 'app/elements';

import { Library } from './library';
import { MyPacks, PublicPacks } from './packs';
import { Study } from './study/Study.js';
import { Settings } from './settings';

const getPage = ({ pageID }) => {
  // eslint-disable-next-line 
  switch (pageID) {
    case 'my-packs':
      return MyPacks;
    case 'public-packs':
      return PublicPacks;
    case 'study':
      return Study;
    case 'settings':
      return Settings;
    case 'library':
    default:
      return Library
  }
}

const RawContent = ({ match: { params } }) => {
  // const [isLoading, setIsLoading] = useState(false);
  const Page = getPage(params);
  return (
    <PageContent>
      {/* isLoading={isLoading} TODO: use this from a dispatch props */}
      <Page />
    </PageContent>
  );
}


export const Content = withRouter(RawContent);
