import { memo } from 'react';

import AccountItems from './AccountItems';

function RenderAccountItem({ data }) {
   return (
      <>
         {data.map((result) => (
            <AccountItems key={result.id} data={result} />
         ))}
      </>
   );
}

export default memo(RenderAccountItem);
